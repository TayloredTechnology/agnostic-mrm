const {install, packageJson} = require('mrm-core')

module.exports = config => {
	const {coverage, codecovToken} = config
		.defaults({
			coverage: {
				branches: 90,
				functions: 90,
				lines: 90,
				statements: 90
			},
			codecovToken: ''
		})
		.values()

	const pkg = packageJson()
	const packages = [
		'ajv',
		'is-installed',
		'per-env',
		'redrun',
		'zora'
	]
	const devPackages = [
		'chuhai',
		'clear-require',
		'codecov',
		'faker',
		'nock',
		'nyc',
		'rewire',
		'run-tests',
		'supertest',
		'testdouble'
	]

	const coverageOptions = Object.keys(coverage).map(
		item => `--${item}=${coverage[item]}`
	)

	// Package.json
	pkg
		.setScript('test', 'per-env')
		.setScript(
			'test:api',
			"nyc --cache --per-file --silent run-tests '{,!(node_modules)/**/}*.?(api).js' | tap-mocha-reporter list",
		)
		.setScript(
			'test:development',
			"nyc --cache --per-file --silent run-tests '{,!(node_modules)/**/}*.?(spec|sanity).js' | tap-mocha-reporter list"
		)
		.setScript(
			'test:sanity',
			"nyc --cache --per-file --silent run-tests '{,!(node_modules)/**/}*.?(sanity).js' | tap-mocha-reporter list"
		)
		.setScript(
			'test:ci',
			"nyc --cache --per-file --silent run-tests '{,!(node_modules)/**/}*.?(spec|sanity|api).js' | tap-mocha-reporter list",
		)
		.setScript('posttest:ci', 'redrun -p codecov:*')
		.setScript(
			'codecov:check',
			`nyc check-coverage ${coverageOptions.join(' ')}`
		)
		.setScript(
			'codecov:generate',
			'nyc report --reporter=text-lcov > coverage.lcov'
		)
		.setScript('codecov:report', 'nyc report --reporter=text')
		.setScript('codecov:upload', `codecov -t ${codecovToken}`)
		.setScript(
			'prestart:production',
			"run-tests '{,!(node_modules)/**/}*.?(sanity|api).js' | tap-mocha-reporter dot"
		)
		.setScript('posttest', 'redrun -p codecov:report codecov:check')
		.save()

	// Install
	install(devPackages, {dev: true})
	install(packages, {dev: false})
}

module.exports.description =
	'Enable Test Framework for Development & Production sanity checks'
