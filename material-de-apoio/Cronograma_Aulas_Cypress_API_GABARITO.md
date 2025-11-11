# 📋 GABARITO COMPLETO - Cronograma de Aulas Cypress API
**Projeto: Automação da API Frete Cálculo V3 Detalhes**  
**Duração por aula: 1h30min | Total: 10 aulas (15 horas)**  
**Versão: 2.0 | Atualizado para Cypress 13.6.1 + @cypress/grep 5.0.0**

> **🎯 Este arquivo contém respostas detalhadas, soluções práticas, troubleshooting e exemplos completos para usar durante o ensino das aulas. Ideal para instrutores que precisam de referência rápida durante as apresentações.**

## 🚀 **MODO DE USO DESTE GABARITO:**
- **Durante as aulas:** Use como referência para responder perguntas
- **Exercícios práticos:** Copie e cole soluções quando necessário  
- **Troubleshooting:** Seção específica para cada problema comum
- **Avaliação:** Use os critérios de validação para corrigir entregas

---

## 📚 **AULA 1: Fundamentos e Visão Geral do Projeto**
**⏰ Duração:** 1h30min

### **🎯 Respostas Esperadas dos Alunos:**

#### **Pergunta: O que são APIs REST?**
**Resposta:** APIs REST são interfaces que permitem comunicação entre sistemas usando protocolo HTTP com métodos (GET, POST, PUT, DELETE) e retornam dados em formato JSON/XML.

#### **Pergunta: Qual a diferença entre testes E2E UI vs API?**
**Resposta:** 
- **E2E UI:** Testa através da interface gráfica, mais lento, depende de navegador
- **API:** Testa diretamente os endpoints, mais rápido, independente de UI

#### **Comandos práticos para executar:**
```powershell
# Clone do projeto
git clone https://github.com/EveraldoCB/automacoesComCipressTreinamentoComMakson.git

# Instalação
cd automacoesComCipressTreinamentoComMakson
npm install

# Verificação
npm run cypress:verify
```

### **🎯 Problemas Comuns e Soluções:**
- **Erro de Node.js não encontrado:** Instalar Node.js 20.x
- **Erro de permissão:** Executar terminal como administrador
- **Cypress não verifica:** Limpar cache com `npm run cypress:clear`

---

## 📦 **AULA 2: Package.json - Configuração do Projeto**
**⏰ Duração:** 1h30min

### **🎯 Explicações Detalhadas:**

#### **Dependências do Projeto:**
```json
{
  "devDependencies": {
    "@cypress/grep": "^5.0.0",        // Plugin para filtros por tags
    "cypress": "^15.4.0",             // Framework de automação
    "cypress-plugin-api": "^2.11.2"   // Extensões para testes de API
  }
}
```

#### **Scripts Explicados:**
```json
{
  "scripts": {
    // BÁSICOS
    "test": "cypress run",                    // Execução padrão de todos os testes
    "cypress:open": "npx cypress open",      // Interface gráfica para desenvolvimento
    
    // FILTROS POR TAGS (usando @cypress/grep)
    "cypress:grep:negativos": "cypress run --env grep=cenariosNegativos",
    "cypress:grep:positivos": "cypress run --env grep=cenariosPositivos",
    
    // UTILITÁRIOS
    "cypress:verify": "cypress verify",      // Verifica instalação
    "cypress:clear": "npx cypress cache clear"  // Limpa cache
  }
}
```

### **🔧 Exercício Prático:**
**Criar script personalizado:**
```json
"cypress:smoke": "cypress run --env grep=smoke"
```

### **📋 Perguntas e Respostas:**
**P:** Por que usar `devDependencies` e não `dependencies`?
**R:** Porque são ferramentas de desenvolvimento, não necessárias em produção.

**P:** O que significa `^15.4.0`?
**R:** Aceita atualizações de versão menor (15.x.x), mas não maior (16.x.x).

---

## ⚙️ **AULA 3: Cypress.config.js - Configuração Principal**
**⏰ Duração:** 1h30min

### **🎯 Arquivo Completo Explicado:**

```javascript
const { defineConfig } = require('cypress')  // Import da função oficial

module.exports = defineConfig({              // Exporta configuração validada
  e2e: {                                     // Seção para testes End-to-End
    supportFile: 'cypress/support/e2e.js',  // Onde estão comandos customizados
    video: true,                             // Grava vídeos automaticamente
    screenshotOnRunFailure: true,            // Captura imagem em falhas
    setupNodeEvents(on, config) {           // Função para registrar plugins
      // Configura @cypress/grep (Seção 3 da documentação oficial)
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
      cypressGrepPlugin(config)
      return config;
    },
  },
});
```

### **📋 Configurações por Função:**

| Configuração | Função | Local dos Arquivos |
|-------------|--------|-------------------|
| `video: true` | Grava MP4 dos testes | `cypress/videos/` |
| `screenshotOnRunFailure` | Captura PNG em falhas | `cypress/screenshots/` |
| `supportFile` | Comandos globais | `cypress/support/e2e.js` |
| `setupNodeEvents` | Registra plugins | Função para @cypress/grep |

### **🔧 Exercício Prático:**
```javascript
// Alunos devem modificar e testar:
video: false,                    // Desabilitar vídeos
screenshotOnRunFailure: false,   // Desabilitar screenshots
// Executar teste e observar diferença
```

### **❌ Erros Comuns:**
- **Caminho errado do plugin:** `'@cypress/grep/src/plugin'` → Correto: `'@cypress/grep/plugin'`
- **Não retornar config:** Sempre fazer `return config`

---

## 🔧 **AULA 4: Support Files - Configurações Globais**
**⏰ Duração:** 1h30min

### **🎯 cypress/support/e2e.js Explicado:**

```javascript
import './commands';       // Importa comandos customizados
import 'cypress-plugin-api';  // Plugin para testes de API  
import '@cypress/grep';    // Import obrigatório do @cypress/grep (Seção 2)
```

### **🎯 cypress/support/commands.js - Estrutura:**

```javascript
// COMANDO PRINCIPAL - API com Mock para CI
Cypress.Commands.add('calculaFreteDetalhe', (body) => {
  if (Cypress.env('CI') || Cypress.env('CYPRESS_CI')) {
    // Mock para CI: dados simulados
    return cy.wrap({
      status: 200,
      body: { fretes: [{ tipo: { nome: 'Normal' }, prazoEntrega: 7 }] }
    });
  }
  // Ambiente local: requisição real
  return cy.api('POST', 'http://frete-hub-plataforma...', body);
});

// COMANDO DE VALIDAÇÃO POSITIVA
Cypress.Commands.add('deveRetornaroTipoDeEntregaoPrazoaDataeoValor', () => {
  cy.fixture('frete-calculo-v3-detalhes').then(massa => {
    cy.calculaFreteDetalhe(massa).then(response => {
      expect(response.status).to.eq(200);
      const frete = response.body.fretes[0];
      expect(frete.tipo.nome).to.eq('Normal');
      expect(frete.prazoEntrega).to.be.a('number');
    });
  });
});

// COMANDO DE VALIDAÇÃO NEGATIVA
Cypress.Commands.add('testeComCampoCepVazio', () => {
  const massa = { Canal: 'SITE', Cep: '', UnidadeNegocio: 'B2CCasasBahia' };
  
  if (Cypress.env('CI') || Cypress.env('CYPRESS_CI')) {
    // Mock de erro para CI
    const response = { status: 400, body: { erro: { mensagem: 'CEP inválido' } } };
    expect(response.status).to.eq(400);
    return;
  }
  
  // Requisição real para ambiente local
  cy.request({ method: 'POST', url: '...', body: massa, failOnStatusCode: false })
    .then(response => {
      expect(response.status).to.eq(400);
    });
});
```

### **🔧 Exercício Prático - Criar Comando Simples:**
```javascript
Cypress.Commands.add('validaStatusCode', (expectedStatus) => {
  cy.then((subject) => {
    expect(subject.status).to.eq(expectedStatus);
  });
});

// Uso: cy.calculaFreteDetalhe(massa).validaStatusCode(200);
```

---

## 🗂️ **AULA 5: Fixtures - Gerenciamento de Dados**
**⏰ Duração:** 1h30min

### **🎯 cypress/fixtures/frete-calculo-v3-detalhes.json:**

```json
{
  "Canal": "SITE",
  "Cep": "01310-100",
  "UnidadeNegocio": "B2CCasasBahia",
  "Produtos": [
    {
      "IdLojista": 10037,
      "IdSku": 12857509,
      "Quantidade": 1,
      "ValorUnitario": "299.00"
    }
  ]
}
```

### **📋 Estrutura Explicada:**
- **Canal:** Origem da requisição (SITE, APP, etc.)
- **Cep:** CEP de destino para cálculo
- **UnidadeNegocio:** Identificação da empresa
- **Produtos:** Array com itens para frete

### **🔧 Exercício - Criar Fixture para Cenário Negativo:**
```json
// cypress/fixtures/frete-cep-invalido.json
{
  "Canal": "SITE",
  "Cep": "00000-000",        // CEP inválido
  "UnidadeNegocio": "B2CCasasBahia",
  "Produtos": [
    {
      "IdLojista": 10037,
      "IdSku": 12857509,
      "Quantidade": 1,
      "ValorUnitario": "299.00"
    }
  ]
}
```

### **💡 Boas Práticas:**
- **Um fixture por cenário** (positivo, negativo, borda)
- **Nomes descritivos** (frete-cep-invalido.json)
- **Documentar os dados** (comentários no JSON não são válidos, usar README)

---

## 🧪 **AULA 6: Casos de Teste - Estrutura e Organização**
**⏰ Duração:** 1h30min

### **🎯 Estrutura Completa com Tags:**

```javascript
/**
 * Testes da API Frete Cálculo V3 Detalhes
 * Utiliza @cypress/grep para filtrar execução por tags
 */

describe('Testes da API Frete Cálculo V3 Detalhes', { tags: ['api', 'frete'] }, () => {
  
  context('Cenários Positivos', { tags: ['cenariosPositivos'] }, () => {
    it('Deve retornar o tipo de entrega, o prazo, a data e o valor', { tags: ['smoke'] }, () => {
      cy.deveRetornaroTipoDeEntregaoPrazoaDataeoValor();
    });
  });

  context('Cenários Negativos', { tags: ['cenariosNegativos'] }, () => {
    it('Deve retornar erro quando CEP estiver vazio', { tags: ['validation'] }, () => {
      cy.testeComCampoCepVazio();
    });
  });
});
```

### **📋 Hierarquia Explicada:**

| Nível | Função | Tags Exemplo |
|-------|--------|--------------|
| `describe()` | Suíte principal | `['api', 'frete']` |
| `context()` | Agrupamento por tipo | `['cenariosPositivos']` |
| `it()` | Caso de teste individual | `['smoke']`, `['validation']` |

### **🔧 Exercício - Adicionar Novo Caso:**
```javascript
context('Cenários de Borda', { tags: ['cenariosBorda'] }, () => {
  it('Deve tratar CEP com formato diferente', { tags: ['borda'] }, () => {
    // Implementação do aluno
  });
});
```

### **📋 Sistema de Tags:**
- **smoke:** Testes essenciais (execução rápida)
- **validation:** Testes de validação de campos
- **borda:** Testes de casos limite
- **regression:** Conjunto completo de regressão

---

## 🔍 **AULA 7: @cypress/grep - Filtros Avançados**
**⏰ Duração:** 1h30min

### **🎯 Implementação dos 3 Passos Oficiais:**

#### **Passo 1 - Instalação:**
```powershell
npm install --save-dev @cypress/grep
```

#### **Passo 2 - Support File (OBRIGATÓRIO):**
```javascript
// cypress/support/e2e.js
import '@cypress/grep';  // Registro global do plugin
```

#### **Passo 3 - Config (OPCIONAL):**
```javascript
// cypress.config.js
setupNodeEvents(on, config) {
  const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
  cypressGrepPlugin(config)
  return config;
}
```

### **📋 Comandos de Execução:**

```powershell
# Por tags específicas
npm run cypress:grep:positivos    # Só cenários positivos
npm run cypress:grep:negativos    # Só cenários negativos

# Por título (comando direto)
npx cypress run --env grep="CEP vazio"

# Por tags (comando direto)
npx cypress run --env grepTags="@smoke"

# Combinação título + tag
npx cypress run --env grep="retornar",grepTags="smoke"
```

### **🔧 Exercício - Scripts Personalizados:**
```json
{
  "scripts": {
    "test:smoke": "cypress run --env grep=smoke",
    "test:validation": "cypress run --env grep=validation",
    "test:borda": "cypress run --env grep=borda",
    "test:fast": "cypress run --env grepTags='smoke validation'"
  }
}
```

---

## 🔄 **AULA 8: GitHub Actions - CI/CD Básico**
**⏰ Duração:** 1h30min

### **🎯 Arquivo .github/workflows/cypress.yml Explicado:**

```yaml
name: E2E tests                    # Nome do workflow no GitHub
on:
  push:                           # Execução automática em push
    branches: [main, pdiQaNaPratica]
  pull_request:                   # Execução automática em PR
    branches: [main, pdiQaNaPratica] 
  workflow_dispatch:              # Execução manual com input
    inputs:
      grepTag:                    # Campo para informar tag
        description: 'Tag do @cypress/grep para rodar'
        required: false
        default: ''

jobs:
  cypress-run:
    runs-on: ubuntu-latest        # Máquina virtual Ubuntu
    steps:
      - name: Checkout            # Baixa código do repositório
        uses: actions/checkout@v4
        
      - name: Cypress run         # Executa testes
        uses: cypress-io/github-action@v6  # Action oficial
        with:
          command: npx cypress run --env grep=${{ github.event.inputs.grepTag || '' }}
        env:
          CYPRESS_CI: true        # Ativa mocks nos comandos
```

### **🔍 Como Funciona:**
1. **Push/PR:** Executa automaticamente todos os testes
2. **Manual:** Permite escolher tag específica via interface
3. **Fallback:** Se não informar tag, executa todos (`|| ''`)

### **🔧 Teste Prático:**
1. Fazer push no repositório
2. Verificar execução automática no GitHub Actions
3. Executar manualmente com tag `cenariosPositivos`
4. Verificar logs e status

---

## 📦 **AULA 9: GitHub Actions - Artefatos e Otimizações**
**⏰ Duração:** 1h30min

### **🎯 Configuração Completa com Artefatos:**

```yaml
name: E2E tests
on:
  push:
    branches: [main, pdiQaNaPratica]
  pull_request:
    branches: [main, pdiQaNaPratica]
  workflow_dispatch:
    inputs:
      grepTag:
        description: 'Tag do @cypress/grep para rodar'
        required: false
        default: ''

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Cache dependencies        # OTIMIZAÇÃO: Cache do npm
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          
      - name: Install dependencies
        run: npm ci                     # Mais rápido que npm install
        
      - name: Cypress run
        uses: cypress-io/github-action@v6
        with:
          command: npx cypress run --env grep=${{ github.event.inputs.grepTag || '' }}
        env:
          CYPRESS_CI: true
          
      - name: Upload screenshots        # ARTEFATO: Imagens de falhas
        if: always()                    # Sempre executa, mesmo com falha
        uses: actions/upload-artifact@v4
        with:
          name: cypress-screenshots
          path: cypress/screenshots
          
      - name: Upload videos            # ARTEFATO: Vídeos dos testes
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: cypress-videos
          path: cypress/videos
```

### **📊 Otimizações Implementadas:**
- **Cache de dependências:** Acelera instalação
- **npm ci:** Mais rápido que npm install
- **Node.js específico:** Versão 20 garantida
- **Upload sempre:** `if: always()` salva artefatos mesmo com falha

### **🔧 Como Baixar Artefatos:**
1. Acessar GitHub → Actions → Workflow executado
2. Seção "Artifacts" → Download dos arquivos
3. Analisar screenshots de falhas
4. Assistir vídeos dos testes

---

## 🎓 **AULA 10: Projeto Final e Boas Práticas**
**⏰ Duração:** 1h30min

### **🎯 Projeto Final Sugerido:**
**Implementar validação de múltiplos produtos no frete**

#### **1. Criar novo fixture:**
```json
// cypress/fixtures/frete-multiplos-produtos.json
{
  "Canal": "SITE",
  "Cep": "01310-100",
  "UnidadeNegocio": "B2CCasasBahia",
  "Produtos": [
    {
      "IdLojista": 10037,
      "IdSku": 12857509,
      "Quantidade": 2,
      "ValorUnitario": "299.00"
    },
    {
      "IdLojista": 10037,
      "IdSku": 98765432,
      "Quantidade": 1,
      "ValorUnitario": "150.00"
    }
  ]
}
```

#### **2. Criar comando customizado:**
```javascript
Cypress.Commands.add('validaFreteMultiplosProdutos', () => {
  cy.fixture('frete-multiplos-produtos').then(massa => {
    cy.calculaFreteDetalhe(massa).then(response => {
      expect(response.status).to.eq(200);
      const frete = response.body.fretes[0];
      expect(frete.valor).to.be.a('number');
      expect(frete.valor).to.be.greaterThan(299); // Valor deve ser maior
    });
  });
});
```

#### **3. Adicionar caso de teste:**
```javascript
context('Cenários Especiais', { tags: ['cenariosEspeciais'] }, () => {
  it('Deve calcular frete para múltiplos produtos', { tags: ['multiplos', 'smoke'] }, () => {
    cy.validaFreteMultiplosProdutos();
  });
});
```

#### **4. Criar script no package.json:**
```json
"cypress:especiais": "cypress run --env grep=cenariosEspeciais"
```

### **📋 Checklist de Boas Práticas:**

#### **✅ Estrutura de Projeto:**
- [ ] Pastas organizadas (e2e, fixtures, support)
- [ ] Nomenclatura consistente
- [ ] Documentação atualizada

#### **✅ Código:**
- [ ] Comandos customizados reutilizáveis
- [ ] Tags bem definidas e organizadas
- [ ] Tratamento adequado de CI vs Local

#### **✅ CI/CD:**
- [ ] Workflow funcional no GitHub Actions
- [ ] Artefatos configurados
- [ ] Execução manual e automática

#### **✅ Documentação:**
- [ ] README com instruções claras
- [ ] Comentários nos códigos complexos
- [ ] Cronograma de aulas atualizado

### **🚀 Próximos Passos (Pós-Curso):**
1. **Expandir cobertura:** Mais cenários de teste
2. **Testes de contrato:** Validação de schema JSON
3. **Relatórios:** Integração com Mochawesome
4. **Performance:** Testes de carga com Artillery
5. **Segurança:** Testes de penetração em APIs

---

## 📊 **Avaliação Final**

### **📋 Rubrica de Avaliação:**

| Critério | Iniciante (1-2) | Intermediário (3-4) | Avançado (5) |
|----------|----------------|-------------------|--------------|
| **Estruturação** | Arquivos básicos | Organização clara | Padrões profissionais |
| **Comandos** | Uso básico | Comandos customizados | Reutilização avançada |
| **Tags** | Tags simples | Sistema organizado | Filtros complexos |
| **CI/CD** | Workflow básico | Artefatos configurados | Otimizações implementadas |

### **🎯 Projeto Final - Pontuação:**
- **Funcionamento (40%):** Testes executam corretamente
- **Qualidade (30%):** Código limpo e organizado  
- **Inovação (20%):** Melhorias além do solicitado
- **Documentação (10%):** Explicação clara da implementação

### **🏆 Certificação:**
Alunos que obtiverem pontuação ≥ 4.0 recebem certificado de conclusão do curso "Automação de API com Cypress - Nível Pleno".

---

## 🔧 **Troubleshooting - Problemas Comuns**

### **❌ Erro: "@cypress/grep plugin not found"**
```powershell
# Solução:
npm uninstall @cypress/grep
npm install --save-dev @cypress/grep@5.0.0
```

### **❌ Erro: "cypress run command not found"**
```powershell
# Solução:
npx cypress run --env grep=cenariosPositivos
```

### **❌ GitHub Actions falha na instalação:**
```yaml
# Adicionar no workflow:
- name: Clean install
  run: |
    rm -rf node_modules package-lock.json
    npm install
```

### **❌ Mocks não funcionam no CI:**
```javascript
// Verificar se a variável está definida:
console.log('CYPRESS_CI:', Cypress.env('CYPRESS_CI'));

// Deve imprimir: true no ambiente CI
```

---

## 🔧 **TROUBLESHOOTING COMPLETO - PROBLEMAS & SOLUÇÕES**

### **❌ Problema: @cypress/grep não funciona**
**Sintomas:** Tags não filtram testes, `--env grepTags=smoke` não funciona  
**Soluções:**
```bash
# 1. Verificar versão instalada
npm list @cypress/grep

# 2. Reinstalar versão correta
npm uninstall @cypress/grep
npm install --save-dev @cypress/grep@5.0.0

# 3. Verificar import obrigatório em cypress/support/e2e.js
import '@cypress/grep'

# 4. Verificar plugin em cypress.config.js
cypressGrepPlugin(on, config)
return config
```

### **❌ Problema: Testes passam local mas falham no CI**
**Sintomas:** GitHub Actions falha, mas `npm run cypress:run` local funciona  
**Soluções:**
```javascript
// 1. Verificar mocks estão ativados no CI
if (Cypress.env('CI') || Cypress.env('CYPRESS_CI')) {
  // Mock deve estar aqui
}

// 2. Adicionar logs para debug
console.log('Ambiente CI:', Cypress.env('CYPRESS_CI'))
console.log('Ambiente NODE_ENV:', Cypress.env('NODE_ENV'))

// 3. Forçar execução local em modo CI
CYPRESS_CI=true npx cypress run
```

### **❌ Problema: Comandos customizados não encontrados**
**Sintomas:** `cy.calculaFreteDetalhe is not a function`  
**Soluções:**
```javascript
// 1. Verificar import em cypress/support/e2e.js
import './commands'

// 2. Verificar sintaxe do comando
Cypress.Commands.add('nomeComando', (param1, param2) => {
  // implementação
})

// 3. Verificar TypeScript (se usar)
// cypress.d.ts deve declarar o comando
```

### **❌ Problema: GitHub Actions não executa**
**Sintomas:** Workflow não aparece na aba Actions  
**Soluções:**
```yaml
# 1. Verificar localização do arquivo
.github/workflows/cypress.yml

# 2. Verificar sintaxe YAML (indentação com espaços)
name: Cypress Tests
on:
  push:                    # Sem tab, apenas espaços
    branches: [main]

# 3. Verificar branch está correto
git branch --show-current
```

### **❌ Problema: Artefatos não são salvos**
**Sintomas:** Não há screenshots/vídeos disponíveis para download  
**Soluções:**
```yaml
# 1. Verificar paths existem
- name: Upload videos
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: cypress-videos
    path: cypress/videos/        # Verificar se pasta existe

# 2. Verificar configuração no cypress.config.js
video: true,
screenshotOnRunFailure: true,

# 3. Forçar criação de pasta
- name: Create artifact directories
  run: mkdir -p cypress/videos cypress/screenshots
```

---

## 💡 **DICAS AVANÇADAS PARA INSTRUTORES**

### **🎯 Gestão de Tempo por Aula:**

| Aula | Teoria | Prática | Exercícios | Dúvidas |
|------|--------|---------|------------|---------|
| 1-3 | 30min | 45min | 10min | 5min |
| 4-6 | 25min | 50min | 10min | 5min |
| 7-10 | 20min | 55min | 10min | 5min |

### **🎯 Pontos Críticos de Validação:**

#### **Aula 1-2: Fundação**
- [ ] Node.js versão ≥ 16 instalada
- [ ] Git configurado corretamente
- [ ] VS Code com extensões básicas
- [ ] Projeto clonado e npm install executado

#### **Aula 3-4: Configuração Core**
- [ ] cypress.config.js sem erros de sintaxe
- [ ] @cypress/grep plugin registrado corretamente
- [ ] cypress/support/e2e.js com imports obrigatórios
- [ ] Comando `npx cypress run` executa sem erro

#### **Aula 5-6: Implementação**
- [ ] Fixtures criados e estruturados
- [ ] Comandos customizados funcionando
- [ ] Casos de teste com tags executando
- [ ] Filtros `--env grepTags=` funcionando

#### **Aula 7-8: CI/CD**
- [ ] GitHub Actions workflow criado
- [ ] Execução manual com inputs funcionando
- [ ] Execução automática no push funcionando
- [ ] Mocks ativados em ambiente CI

#### **Aula 9-10: Finalização**
- [ ] Artefatos sendo salvos e acessíveis
- [ ] Projeto final implementado completamente
- [ ] Documentação atualizada
- [ ] Apresentação técnica preparada

### **🎯 Estratégias de Engajamento:**

#### **Variação de Atividades (a cada 20min):**
1. **Explicação conceitual** (10min)
2. **Demonstração prática** (live coding - 10min)
3. **Exercício hands-on** (alunos fazem - 15min)
4. **Revisão e dúvidas** (5min)

#### **Técnicas de Fixação:**
- **Repetição espaçada:** Revisar conceito anterior no início de cada aula
- **Ensino por pares:** Alunos explicam para colegas
- **Debugging em grupo:** Resolver erros colaborativamente
- **Mini-apresentações:** Cada aluno mostra uma funcionalidade

---

## 📚 **RECURSOS COMPLEMENTARES**

### **🔗 Links Úteis Durante as Aulas:**
- [Cypress Official Docs](https://docs.cypress.io/)
- [@cypress/grep Documentation](https://github.com/cypress-io/cypress-grep)
- [GitHub Actions Cypress Official](https://github.com/cypress-io/github-action)
- [JSON Validator Online](https://jsonlint.com/)
- [YAML Validator Online](https://yamllint.com/)
- [Node.js Download](https://nodejs.org/)

### **🛠️ Ferramentas de Apoio:**
- **VS Code Extensions:**
  - Cypress Fixture-IntelliSense
  - YAML Support by Red Hat
  - GitLens
  - REST Client (para testar APIs manually)

### **📋 Checklist de Preparação das Aulas:**

#### **Antes de Cada Aula:**
- [ ] Ambiente de desenvolvimento testado e funcionando
- [ ] Internet estável para demonstrações
- [ ] Repositório GitHub atualizado
- [ ] VS Code configurado com extensões necessárias
- [ ] Terminal preparado com comandos frequentes

#### **Material de Backup:**
- [ ] Screenshots dos resultados esperados
- [ ] Arquivos de exemplo prontos para copiar/colar
- [ ] Lista de comandos essenciais impressa
- [ ] Contatos de suporte técnico (se disponível)

### **🎯 Critérios de Avaliação Detalhados:**

#### **Funcionalidade (40 pontos):**
- Testes executam sem erros (10 pts)
- Filtros por tags funcionam corretamente (10 pts) 
- GitHub Actions executa automaticamente (10 pts)
- Comandos customizados implementados (10 pts)

#### **Qualidade de Código (30 pontos):**
- Código bem estruturado e comentado (10 pts)
- Nomenclatura clara e consistente (10 pts)
- Boas práticas seguidas (10 pts)

#### **Inovação (20 pontos):**
- Implementações além do solicitado (10 pts)
- Criatividade na solução de problemas (10 pts)

#### **Documentação (10 pontos):**
- README.md claro e completo (5 pts)
- Comentários inline relevantes (5 pts)

---

## 🚀 **PRÓXIMOS PASSOS APÓS O CURSO**

### **🎓 Certificação e Continuidade:**
- **Certificado:** Emitido para nota ≥ 7.0
- **LinkedIn:** Habilidades para adicionar no perfil
- **Portfólio:** Projeto pode ser usado como referência

### **📈 Evolução Profissional:**
1. **Nível Junior → Pleno:**
   - Implementar testes de contrato (Pact/OpenAPI)
   - Aprender testes de performance (K6/Artillery)
   - Dominar CI/CD avançado (Pipeline as Code)

2. **Nível Pleno → Senior:**
   - Arquitetar frameworks de automação
   - Mentoring de equipes júniors
   - Estratégia de testes organizacional

### **🔮 Tecnologias Complementares:**
- **Playwright:** Alternativa moderna ao Cypress
- **Postman/Insomnia:** Exploração manual de APIs
- **Docker:** Containerização de ambientes de teste
- **AWS/Azure:** Cloud testing e deployment

---

## 📞 **SUPORTE E CONTATOS**

### **🆘 Canais de Suporte Durante o Curso:**
- **Email:** [instrutor@exemplo.com]
- **Slack/Discord:** [#cypress-qa-turma-2024]
- **Office Hours:** Terças e quintas, 18h-19h

### **📚 Material Extra:**
- **Gravações das aulas:** [Link para plataforma]
- **Slides e materiais:** [Repositório GitHub específico]
- **Exercícios extras:** [Pasta de atividades complementares]

---

**🎯 Este gabarito completo garante que você tenha todas as ferramentas necessárias para conduzir um curso de excelência em automação de API com Cypress. Use-o como seu guia mestre durante todas as aulas!**

**📋 Lembre-se: O objetivo final é formar profissionais capazes de implementar automação de API robusta e profissional em projetos reais.**
