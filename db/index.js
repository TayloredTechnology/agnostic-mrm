const {install, packageJson, json} = require('mrm-core')
const replace = require('replace-in-file')

module.exports = async config => {
	const {dbType} = config.defaults({dbType: 'pg'}).values()

	const pkg = json('package.json')
	const packages = [
		'objection',
		'objection-db-errors',
		'objection-soft-delete',
		'knex',
		'knex-migrate'
	]
	const devPackages = []

	switch (dbType) {
		case 'pg':
		case 'postgresql':
			packages.push('pg')
			pkg.merge({plop: {dbType: 'pg'}})
			break
		case 'sqlite':
		case 'lite':
			packages.push('sqlite3')
			pkg.merge({plop: {dbType: 'sqlite'}})
			break
		default:
			console.error('MRM@database: dbType default called')
	}

	// Update Scripts for DB Support
	packageJson()
		.setScript('start', 'knex-migrate up && node index.js')
		.save()

	// Install
	install(devPackages, {dev: true})
	install(packages, {dev: false})

	// Update PlopFile
	await replace({
		files: './plopfile.js',
		from:
			"plop.setGenerator('new model', require('./plop/generators/new/db/model'))",
		to: ''
	})
	replace({
		files: './plopfile.js',
		from: '/* MRMInjection */',
		to:
			"/* MRMInjection */\nplop.setGenerator('new model', require('./plop/generators/new/db/model'))"
	})
}

module.exports.description = 'Extension to support Database Functionality'
