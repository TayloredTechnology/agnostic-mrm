const {install} = require('mrm-core')

module.exports = () => {
	const dependencies = ['pino', 'pino-debug']

	// Install
	install(dependencies, {dev: false})
}
