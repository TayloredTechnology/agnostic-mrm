const installGlobal = require('npm-install-global')
const isGlobal = require('get-installed-path')

module.exports = () => {
	const globalInstalls = [
		'@tayloredtechnology/oneflow',
		'authenticator',
		'finepack',
		'microgen',
		'npm-check',
		'nyc',
		'pollinate',
		'redrun',
		'run-tests',
		'snyk',
		'tap-mocha-reporter'
	]

	const toInstall = []
	globalInstalls.map(install => {
		try {
			isGlobal.getInstalledPathSync(install, {
				local: false
			})
		} catch (err) {
			toInstall.push(install)
		}
		return true
	})

	if (toInstall.length > 0)
		installGlobal.install(toInstall, err => {
			if (err) throw err
		})

	// Additional manual steps to run
	if (toInstall.includes('snyk'))
		console.log('Sign into Snyk via `snyk auth` to finish installing')
}

module.exports.description = 'Ensure Global toolset is installed'
