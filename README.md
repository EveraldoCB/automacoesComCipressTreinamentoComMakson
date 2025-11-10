# 🚀 Automação de API com Cypress

[![Cypress Version](https://img.shields.io/badge/cypress-15.4.0-brightgreen)](https://cypress.io)
[![Node Version](https://img.shields.io/badge/node-20.x-brightgreen)](https://nodejs.org)

Projeto de automação de testes para API de cálculo de frete usando Cypress com sistema de tags para execução seletiva.

## 🚀 Como usar

### Pré-requisitos
- Node.js 20.x ou superior
- npm

### Instalação
```bash
# 1. Clone o projeto
git clone <repo-url>

# 2. Instale as dependências
npm install

# 3. Execute os testes
npm test
```

## 📂 Estrutura do Projeto

```
├── cypress/
│   ├── e2e/                    # Testes automatizados
│   ├── fixtures/               # Dados de teste (JSON)
│   └── support/               # Comandos customizados
├── .github/workflows/         # CI/CD com GitHub Actions
├── cypress.config.js          # Configuração do Cypress
└── package.json              # Dependências e scripts
```

## 🧪 Execução de Testes

### Comandos Básicos
```bash
# Executar todos os testes
npm test

# Abrir interface gráfica
npm run cypress:open

# Executar com browser específico
npm run cypress:run:chrome
```

### Sistema de Tags
```bash
# Executar apenas cenários positivos
npm run cypress:grep:positivos

# Executar apenas cenários negativos
npm run cypress:grep:negativos

# Executar tag específica
npx cypress run --env grep=smoke
```

## 🛠️ Funcionalidades

### Comandos Customizados
- `cy.calculaFreteDetalhe(massa)` - Executa requisição para API de frete
- `cy.deveRetornaroTipoDeEntregaoPrazoaDataeoValor()` - Valida cenário positivo
- `cy.testeComCampoCepVazio()` - Valida cenário negativo

### Sistema de Tags
- `cenariosPositivos` - Testes de fluxos de sucesso
- `cenariosNegativos` - Testes de validação de erros
- `smoke` - Testes essenciais
- `validation` - Testes de validação de campos

### Mock para CI/CD
- Respostas simuladas em ambiente de CI
- Testes independentes de APIs externas

## 🔄 CI/CD

O projeto possui integração contínua configurada com GitHub Actions:

- **Triggers**: Push e Pull Request nas branches `main` e `pdiQaNaPratica`
- **Execução manual**: Via interface do GitHub com filtro por tags
- **Artefatos**: Screenshots e vídeos salvos automaticamente

## 📚 Tecnologias

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| **Cypress** | 15.4.0 | Framework de testes |
| **@cypress/grep** | 5.0.0 | Sistema de tags |
| **Node.js** | 20.x | Runtime |
| **GitHub Actions** | - | CI/CD |

## 📖 Referências

- [Cypress GitHub Actions](https://docs.cypress.io/guides/continuous-integration/github-actions)
- [@cypress/grep](https://www.npmjs.com/package/@cypress/grep)

---

**Autor:** Everaldo  
**Mentoria:** Makson