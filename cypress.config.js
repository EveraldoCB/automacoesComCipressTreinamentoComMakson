const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl removido para evitar erro de verificação de servidor no CI
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // Ativa a pré-filtragem de especificações pelo @cypress/grep
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
      cypressGrepPlugin(config)
      return config
    },
  },
});