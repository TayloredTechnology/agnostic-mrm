const {install, json} = require('mrm-core')
const replace = require('replace-in-file')
const execa = require('execa')

module.exports = async () => {
	// Update Config Variables
	await json('./config/default.json')
		.merge({
			domain: undefined
		})
		.save()
	json('./config/custom-environment-variables.json')
		.merge({
			domain: 'DOMAIN'
		})
		.save()

	// Install Relevant Packages
	const packages = ['fastify-server-session', 'fastify-cookie']
	const devPackages = []

	install(devPackages, {dev: true})
	install(packages, {dev: false})

	// Update Root PlopFile
	await replace({
		files: './index.js',
		from: '/* MRMInjection:ServerSession@Step1 */',
		to: `.register(require('fastify-cookie'))`
	})
	await replace({
		files: './index.js',
		from: '/* MRMInjection:ServerSession@Step2 */',
		to: `.register(require('fastify-server-session'), {
					secretKey: config.session.secret,
					sessionMaxAge: config.session.maxAge,
					domain: config.domain
		})`
	})

	// Apply Prettier to Standardize Formatting
	try {
		await execa('./node_modules/.bin/prettier', ['--write', './index.js'])
	} catch (error) {
		console.log(error)
	}
}

module.exports.description = 'Extension to support Server Session Functionality'
