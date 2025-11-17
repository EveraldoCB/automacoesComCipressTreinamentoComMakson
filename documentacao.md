# documentação técnica

## 📋 índice

1. [análise package.json](#análise-packagejson)
2. [configuração cypress](#configuração-cypress)
3. [estrutura de testes](#estrutura-de-testes)
4. [comandos personalizados](#comandos-personalizados)
5. [sistema de tags](#sistema-de-tags)
6. [execução e resultados](#execução-e-resultados)

---

## análise package.json

### estrutura hierárquica
- **1 arquivo** → **3 módulos** → **19 itens totais**

**breakdown detalhado:**
- **7 propriedades raiz**: name, version, description, main, scripts, devDependencies, author
- **9 scripts npm**: test, test:positivos, test:negativos, test:smoke, cypress:open, cypress:run, cypress:run:chrome, cypress:grep:positivos, cypress:grep:negativos  
- **3 devDependencies**: cypress (15.4.0), @cypress/grep (5.0.0), todas com versionamento semântico

### dependências críticas
```json
{
  "cypress": "^15.4.0",
  "@cypress/grep": "^5.0.0"
}
```

---

## configuração cypress

### cypress.config.js - coração do projeto
**função**: centro de integração que controla toda a inteligência do sistema

**configurações principais:**
- **video recording**: habilitado para documentação
- **plugin integration**: @cypress/grep para filtragem
- **timeout settings**: 10 segundos para comandos
- **e2e configuration**: padrões modernos do cypress

```javascript
module.exports = defineConfig({
  e2e: {
    video: true,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  },
});
```

---

## estrutura de testes

### hierarquia organizacional
```
describe("análise de frete - cálculo v3 - detalhes", () => {
  context("cenários positivos", { tags: ['cenariosPositivos', 'smoke'] }, () => {
    it("deve retornar tipo de entrega, prazo, data e valor", { tags: 'validation' }, () => {
      // implementação do teste
    });
  });
});
```

### arquivo principal: `frete-calculo-v3-detalhes.cy.js`
- **describe**: contexto macro do teste
- **context**: agrupamento por cenário (positivos/negativos)
- **it**: casos de teste específicos
- **tags**: marcadores para execução seletiva

---

## comandos personalizados

### arquivo: `cypress/support/commands.js`

**funcionalidade**: sistema inteligente de mocks com controle via `USE_REAL_API`

### comandos implementados

#### 1. cy.calculaFreteDetalhe(massa)
```javascript
Cypress.Commands.add('calculaFreteDetalhe', (massa) => {
  const useRealAPI = Cypress.env('USE_REAL_API') === 'true';
  // lógica de mock ou api real
});
```

#### 2. cy.deveRetornaroTipoDeEntregaoPrazoaDataeoValor()
- valida cenários positivos
- verifica tipos de entrega, prazos e valores

#### 3. cy.testeComCampoCepVazio()  
- testa validações de campos obrigatórios
- cenários negativos de error handling

---

## sistema de tags

### implementação com @cypress/grep

**tags disponíveis:**
- `cenariosPositivos`: testes de fluxos de sucesso
- `cenariosNegativos`: validações de erro
- `smoke`: testes críticos rápidos
- `validation`: validações de campos

### execução por tags
```bash
# cenários positivos
npm run test:positivos

# cenários negativos  
npm run test:negativos

# testes smoke
npm run test:smoke
```

### configuração nos testes
```javascript
context("cenários positivos", { tags: ['cenariosPositivos', 'smoke'] }, () => {
  it("teste específico", { tags: 'validation' }, () => {
    // implementação
  });
});
```

---

## execução e resultados

### status atual
- **✅ 2 testes implementados**
- **✅ 100% de taxa de sucesso**  
- **✅ cypress 15.4.0 funcionando**
- **✅ gravação de vídeo ativa**
- **✅ sistema de tags operacional**

### comandos de execução
```bash
# execução completa
npm test

# abertura da interface
npm run cypress:open

# execução headless
npm run cypress:run
```

### arquivos de dados
- **fixtures/frete-calculo-v3-detalhes.json**: dados de teste estruturados
- **videos/**: gravações automáticas dos testes
- **screenshots/**: capturas em caso de falhas

---

## aspectos técnicos avançados

### mock vs api real
- **desenvolvimento**: usa mocks para agilidade
- **homologação**: pode usar apis reais com flag `USE_REAL_API=true`
- **ci/cd**: sempre usa mocks para estabilidade

### boas práticas implementadas
- **page object pattern**: através de custom commands
- **data driven testing**: via fixtures json
- **tag-based execution**: execução seletiva eficiente
- **video documentation**: evidência automática

### debugging e troubleshooting
- **cy.log()**: logs personalizados nos comandos
- **should assertions**: validações declarativas
- **error screenshots**: captura automática de falhas

---

**documentação atualizada**: dezembro 2024
**cypress version**: 15.4.0  
**node version**: 20.x
