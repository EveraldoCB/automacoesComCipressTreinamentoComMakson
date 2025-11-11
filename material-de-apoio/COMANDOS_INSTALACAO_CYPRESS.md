# 🚀 COMANDOS DE INSTALAÇÃO DO CYPRESS

**Projeto: Automação da API Frete Cálculo V3 Detalhes**  
**Guia Completo de Instalação e Configuração**  
**Data:** Novembro 2025

---

## 📋 **PRÉ-REQUISITOS**

### **1. Verificar Node.js**
```powershell
# Verificar se Node.js está instalado (versão 16+ recomendada)
node --version

# Verificar NPM
npm --version

# Versões mínimas recomendadas:
# Node.js: 16.x ou superior
# NPM: 8.x ou superior
```

### **2. Instalar Node.js (se necessário)**
```powershell
# Via winget (Gerenciador de Pacotes Windows)
winget install OpenJS.NodeJS

# Ou baixar diretamente de: https://nodejs.org/
# Escolher versão LTS (Long Term Support)
```

---

## 🔧 **INSTALAÇÃO PARA PROJETO EXISTENTE**

### **1. Clonar e Instalar Dependências (Recomendado)**
```powershell
# Clonar repositório
git clone https://github.com/EveraldoCB/automacoesComCipressTreinamentoComMakson.git

# Entrar no diretório
cd automacoesComCipressTreinamentoComMakson

# Instalar todas as dependências (recomendado)
npm install

# Verificar instalação
npm run cypress:verify
```

### **2. Instalação Limpa (CI/CD)**
```powershell
# Para ambientes de produção/CI (mais rápido e determinístico)
npm ci

# Verificar instalação
npx cypress verify
```

---

## 🆕 **INSTALAÇÃO PARA PROJETO NOVO**

### **1. Criar Projeto do Zero**
```powershell
# Criar diretório do projeto
mkdir meu-projeto-cypress
cd meu-projeto-cypress

# Inicializar package.json
npm init -y
```

### **2. Instalar Cypress e Dependências**
```powershell
# Instalar Cypress (framework principal)
npm install --save-dev cypress

# Instalar @cypress/grep (filtros por tags)
npm install --save-dev @cypress/grep

# Instalar cypress-plugin-api (extensões para API)
npm install --save-dev cypress-plugin-api
```

### **3. Configurar Versões Específicas (como no projeto)**
```powershell
# Instalar versões exatas do projeto atual
npm install --save-dev cypress@^15.4.0
npm install --save-dev @cypress/grep@^5.0.0
npm install --save-dev cypress-plugin-api@^2.11.2
```

---

## ⚙️ **CONFIGURAÇÃO INICIAL**

### **1. Gerar Estrutura Base do Cypress**
```powershell
# Primeira execução (cria estrutura de pastas)
npx cypress open

# Ou via linha de comando
npx cypress run --spec "cypress/e2e/**"
```

### **2. Configurar cypress.config.js**
```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // Configura @cypress/grep para filtrar testes por tags
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
      cypressGrepPlugin(config)
      return config;
    },
  },
});
```

### **3. Configurar cypress/support/e2e.js**
```javascript
import './commands';
import 'cypress-plugin-api';
import '@cypress/grep';  // Import obrigatório para @cypress/grep
```

---

## 🎯 **VERIFICAÇÃO DA INSTALAÇÃO**

### **1. Comandos de Verificação**
```powershell
# Verificar se Cypress foi instalado corretamente
npx cypress verify

# Verificar versão instalada
npx cypress version

# Listar todas as dependências
npm list --depth=0

# Verificar específicamente as dependências do projeto
npm list cypress @cypress/grep cypress-plugin-api
```

### **2. Saída Esperada**
```powershell
# cypress version deve mostrar:
Cypress package version: 15.4.0
Cypress binary version: 15.4.0
Electron version: 25.8.4
Bundled Node version: 18.17.1

# npm list deve mostrar:
├── @cypress/grep@5.0.0
├── cypress@15.4.0
└── cypress-plugin-api@2.11.2
```

---

## 🏃 **EXECUÇÃO DOS TESTES**

### **1. Scripts do Projeto (já configurados)**
```powershell
# Interface gráfica para desenvolvimento
npm run cypress:open

# Executar todos os testes
npm test

# Executar cenários positivos
npm run cypress:grep:positivos

# Executar cenários negativos
npm run cypress:grep:negativos

# Verificar instalação
npm run cypress:verify

# Limpar cache
npm run cypress:clear
```

### **2. Comandos Diretos**
```powershell
# Abrir Cypress Test Runner (interface gráfica)
npx cypress open

# Executar todos os testes via linha de comando
npx cypress run

# Executar com filtros por tags
npx cypress run --env grepTags=cenariosPositivos
npx cypress run --env grepTags=cenariosNegativos
npx cypress run --env grepTags=smoke

# Executar teste específico
npx cypress run --spec "cypress/e2e/frete-calculo-v3-detalhes.cy.js"
```

---

## 🔧 **TROUBLESHOOTING**

### **1. Problemas Comuns e Soluções**

#### **❌ Cypress não encontrado:**
```powershell
# Reinstalar globalmente (não recomendado, mas resolve em alguns casos)
npm install -g cypress

# Ou usar npx sempre
npx cypress verify
```

#### **❌ Erro de permissão:**
```powershell
# Executar PowerShell como Administrador
# Ou ajustar política de execução
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### **❌ @cypress/grep não funciona:**
```powershell
# Verificar se foi importado corretamente
# cypress/support/e2e.js deve conter:
import '@cypress/grep';

# Verificar se plugin foi registrado
# cypress.config.js deve conter a configuração do setupNodeEvents
```

### **2. Limpeza Completa (último recurso)**
```powershell
# Remover tudo e reinstalar
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm cache clean --force
npm install

# Verificar após reinstalação
npm run cypress:verify
```

### **3. Problemas de Cache**
```powershell
# Limpar cache do Cypress
npx cypress cache clear

# Ver localização do cache
npx cypress cache path

# Listar versões em cache
npx cypress cache list
```

---

## 🚀 **CONFIGURAÇÃO PARA CI/CD**

### **1. GitHub Actions (já configurado no projeto)**
```yaml
name: Cypress Tests
on: [push, pull_request, workflow_dispatch]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cypress-io/github-action@v6
        with:
          command: npx cypress run --env grep=${{ github.event.inputs.grepTag || '' }}
        env:
          CYPRESS_CI: true
```

### **2. Comandos para CI**
```powershell
# Instalação otimizada para CI
npm ci

# Execução sem interface gráfica
npx cypress run

# Com relatórios (se configurado)
npx cypress run --reporter json --reporter-options output=results.json
```

---

## 📊 **ESTATÍSTICAS DO PROJETO ATUAL**

### **Configuração Atual:**
```powershell
# Dependências instaladas:
- Cypress: 15.4.0 (framework principal)
- @cypress/grep: 5.0.0 (filtros por tags)
- cypress-plugin-api: 2.11.2 (extensões API)

# Tamanhos:
- package-lock.json: 117KB (267 pacotes)
- node_modules: 52.79MB (11.151 arquivos)
- cypress.config.js: Configurado com @cypress/grep

# Status: ✅ Totalmente funcional e otimizado
```

### **Scripts Disponíveis:**
```json
{
  "scripts": {
    "test": "cypress run",
    "cypress:open": "npx cypress open",
    "cypress:grep:negativos": "cypress run --env grep=cenariosNegativos",
    "cypress:grep:positivos": "cypress run --env grep=cenariosPositivos",
    "cypress:verify": "cypress verify",
    "cypress:clear": "npx cypress cache clear"
  }
}
```

---

## 🎓 **PRÓXIMOS PASSOS**

### **1. Após Instalação Bem-Sucedida:**
1. Executar `npm run cypress:open` para conhecer a interface
2. Rodar `npm run cypress:grep:positivos` para testar filtros
3. Verificar se videos/screenshots são gerados em `cypress/videos` e `cypress/screenshots`
4. Explorar os comandos customizados em `cypress/support/commands.js`

### **2. Para Aprendizado:**
1. Seguir o cronograma em `material-de-apoio/Cronograma_Aulas_Cypress_API.md`
2. Consultar o gabarito completo para dúvidas
3. Usar `material-de-apoio/estudos.md` para evolução profissional

### **3. Para Projetos Novos:**
1. Copiar a estrutura deste projeto como template
2. Adaptar os fixtures para suas APIs
3. Modificar comandos customizados conforme necessário
4. Configurar CI/CD seguindo o modelo do GitHub Actions

---

## 📞 **SUPORTE E RECURSOS**

### **Documentação Oficial:**
- [Cypress Documentation](https://docs.cypress.io/)
- [@cypress/grep GitHub](https://github.com/cypress-io/cypress/tree/develop/npm/grep)
- [Cypress GitHub Action](https://github.com/cypress-io/github-action)

### **Comunidade:**
- [Cypress Discord](https://discord.gg/cypress)
- [Stack Overflow - Cypress](https://stackoverflow.com/questions/tagged/cypress)

### **Projeto Local:**
- `material-de-apoio/`: Materiais educacionais completos
- `README.md`: Documentação do projeto
- Issues no GitHub para dúvidas específicas

---

**✅ Este guia garante uma instalação completa e funcional do Cypress seguindo as melhores práticas e a configuração exata do projeto profissional!**
