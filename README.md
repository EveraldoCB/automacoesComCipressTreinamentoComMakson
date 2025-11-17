# projeto cypress api automation

## 📝 visão geral

projeto educacional completo de automação de testes api com cypress, focado em análise de frete e cálculos de entrega.

## 🚀 execução rápida

```bash
# instalar dependências
npm install

# executar todos os testes
npm test

# executar apenas testes positivos
npm run test:positivos

# executar apenas testes negativos  
npm run test:negativos

# executar testes smoke
npm run test:smoke
```

## 📂 estrutura do projeto

```
├── cypress/
│   ├── e2e/                    # testes automatizados
│   ├── support/                # comandos personalizados
│   └── fixtures/               # dados de teste
├── material-apoio/             # documentação de aprendizado
├── cypress.config.js           # configuração principal
└── package.json               # dependências e scripts
```

## 🎯 funcionalidades principais

- **api testing**: testes de apis de cálculo de frete
- **mock system**: sistema inteligente de mocks com flag USE_REAL_API
- **tag filtering**: execução seletiva com @cypress/grep
- **video recording**: gravação automática dos testes
- **custom commands**: comandos reutilizáveis para automação

## 📖 documentação completa

- **[documentacao.md](./documentacao.md)** - documentação técnica detalhada
- **[material-apoio/aprendizado.md](./material-apoio/aprendizado.md)** - material de estudos

---
**Status**: ✅ 2 testes | 100% success | cypress 15.4.0