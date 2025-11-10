const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    video: true,
    screenshotOnRunFailure: true,    setupNodeEvents(on, config) {
      // Configura @cypress/grep para filtrar testes por tags
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
      cypressGrepPlugin(config)
      return config;
    },
  },
});