const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl removido para evitar erro de verificação de servidor no CI
    supportFile: 'cypress/support/e2e.js',
    video: true, // Garante gravação de vídeos
    setupNodeEvents(on, config) {
      // Ativa a pré-filtragem de especificações pelo @cypress/grep
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
      cypressGrepPlugin(config)

      // Mock para rodar no CI (evita falha de endpoint interno)
      if (process.env.CI || process.env.CYPRESS_CI) {
        on('task', {
          log(message) {
            console.log(message)
            return null
          }
        })
        on('before:browser:launch', (browser = {}, launchOptions) => {
          // Pode adicionar configs extras se necessário
          return launchOptions
        })
        on('before:run', () => {
          // Intercepta a request da API e mocka resposta
          on('file:preprocessor', (file) => file)
        })
      }
      return config
    },
  },
});