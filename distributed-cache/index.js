const {install, json} = require('mrm-core')
const replace = require('replace-in-file')
const execa = require('execa')

module.exports = async () => {
	// Update Config Variables
	json('./config/default.json').merge({
		redis: {
			host: null,
			password: null,
			port: '20112',
			db: 0
		}
	})
	json('./config/custom-environment-variables.json').merge({
		redis: {
			host: 'REDIS_HOST',
			password: 'REDIS_PASSWORD'
		}
	})

	// Install Relevant Packages
	const packages = ['abstract-cache-redis', 'fastify-redis', 'ioredis']
	const devPackages = ['ioredis-mock']

	install(devPackages, {dev: true})
	install(packages, {dev: false})

	// Update Root PlopFile
	await replace({
		files: './index.js',
		from: '/* MRMInjection:Redis@Step1 */',
		to: `const Redis = require('ioredis')
				const redis = new Redis(global.config.redis)`
	})
	await replace({
		files: './index.js',
		from: '/* MRMInjection:Redis@Step2 */',
		to: `, driver: {
					name: 'abstract-cache-redis',
					options: {client: redis}
				}`
	})
	await replace({
		files: './index.js',
		from: '/* MRMInjection:Redis@Step3 */',
		to: `.register(require('fastify-redis'), {client: redis})`
	})

	// Apply Prettier to Standardize Formatting
	try {
		await execa('./node_modules/.bin/prettier', ['--write', './index.js'])
	} catch (error) {
		console.log(error)
	}
}

module.exports.description = 'Extension to support Redis Cache Functionality'
