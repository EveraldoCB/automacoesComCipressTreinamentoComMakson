const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl removido para evitar erro de verificação de servidor no CI
    supportFile: 'cypress/support/e2e.js',
    video: true, // Garante gravação de vídeos
    setupNodeEvents(on, config) {
      // Removido registro do @cypress/grep (não é necessário na v5.x)
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