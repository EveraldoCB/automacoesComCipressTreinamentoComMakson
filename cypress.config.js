const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // Configura @cypress/grep para filtrar testes por tags
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  },
});