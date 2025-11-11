# 📋 GABARITO Q&A - Cronograma de Aulas Cypress API

**Projeto: Automação da API Frete Cálculo V3 Detalhes**  
**Formato: Pergunta & Resposta | Total: 10 aulas (15 horas)**  
**Versão: 3.0 | Atualizado para Cypress 15.4.0 + @cypress/grep 5.0.0**

> **🎯 Este gabarito está organizado em formato de perguntas e respostas para facilitar o ensino interativo e a avaliação do aprendizado dos alunos.**

---

## 📚 **AULA 1: Fundamentos e Visão Geral do Projeto**
**⏰ Duração:** 1h30min

### **❓ P1: O que são APIs REST?**
**💡 R:** APIs REST são interfaces que permitem comunicação entre sistemas usando protocolo HTTP com métodos (GET, POST, PUT, DELETE) e retornam dados em formato JSON/XML. São stateless, ou seja, cada requisição é independente.

### **❓ P2: Qual a diferença entre testes E2E UI vs API?**
**💡 R:** 
- **E2E UI:** Testa através da interface gráfica, mais lento, depende de navegador, testa fluxo completo do usuário
- **API:** Testa diretamente os endpoints, mais rápido, independente de UI, foca na lógica de negócio

### **❓ P3: Por que automatizar testes de API?**
**💡 R:** Porque são mais rápidos, estáveis, permitem testar regras de negócio diretamente, são independentes da interface e podem ser executados em paralelo.

### **❓ P4: Quais são os comandos para configurar o projeto pela primeira vez?**
**💡 R:** 
```powershell
git clone https://github.com/EveraldoCB/automacoesComCipressTreinamentoComMakson.git
cd automacoesComCipressTreinamentoComMakson
npm install
npm run cypress:verify
```

### **❓ P5: O que fazer se o Cypress não verificar corretamente?**
**💡 R:** Executar `npm run cypress:clear` para limpar o cache, verificar se Node.js está instalado (versão 16+) e executar terminal como administrador se necessário.

---

## 📦 **AULA 2: Package.json - Configuração do Projeto**
**⏰ Duração:** 1h30min

### **❓ P6: Quais são as 3 dependências principais do projeto?**
**💡 R:** 
- `@cypress/grep: ^5.0.0` - Plugin para filtros por tags
- `cypress: ^15.4.0` - Framework de automação principal
- `cypress-plugin-api: ^2.11.2` - Extensões para testes de API

### **❓ P7: Por que usar devDependencies e não dependencies?**
**💡 R:** Porque são ferramentas de desenvolvimento, não necessárias em produção. O projeto final não precisa do Cypress para funcionar, apenas para ser testado.

### **❓ P8: O que significa o símbolo ^ na versão "^15.4.0"?**
**💡 R:** Aceita atualizações de versão menor (15.x.x), mas não versão maior (16.x.x). Garante compatibilidade mantendo funcionalidades.

### **❓ P9: Para que servem os scripts cypress:grep:positivos e cypress:grep:negativos?**
**💡 R:** Para executar apenas cenários específicos usando filtros do @cypress/grep:
- `cypress:grep:positivos`: Executa só testes de cenários que devem passar
- `cypress:grep:negativos`: Executa só testes de cenários que devem falhar

### **❓ P10: Como criar um script personalizado para testes smoke?**
**💡 R:** Adicionar no package.json: `"cypress:smoke": "cypress run --env grep=smoke"`

---

## ⚙️ **AULA 3: Cypress.config.js - Configuração Principal**
**⏰ Duração:** 1h30min

### **❓ P11: Qual é a função do defineConfig no Cypress?**
**💡 R:** É uma função oficial do Cypress que valida e tipifica as configurações, garantindo que apenas propriedades válidas sejam usadas e fornecendo autocomplete.

### **❓ P12: Para que serve a propriedade supportFile?**
**💡 R:** Define o arquivo que contém comandos customizados e configurações globais que se aplicam a todos os testes. No projeto: `'cypress/support/e2e.js'`

### **❓ P13: Por que video: true e screenshotOnRunFailure: true são importantes?**
**💡 R:** 
- `video: true`: Grava MP4 dos testes para análise posterior (pasta cypress/videos/)
- `screenshotOnRunFailure: true`: Captura PNG automaticamente quando testes falham (pasta cypress/screenshots/)

### **❓ P14: Como registrar corretamente o plugin @cypress/grep?**
**💡 R:** 
```javascript
setupNodeEvents(on, config) {
  const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
  cypressGrepPlugin(config)
  return config; // SEMPRE retornar o config
}
```

### **❓ P15: Qual erro comum acontece no caminho do plugin @cypress/grep?**
**💡 R:** Usar caminho incorreto `'@cypress/grep/src/plugin'`. O correto para versão 5.0.0 é `'@cypress/grep/plugin'`.

---

## 🔧 **AULA 4: Support Files - Configurações Globais**
**⏰ Duração:** 1h30min

### **❓ P16: Quais são os 3 imports obrigatórios no cypress/support/e2e.js?**
**💡 R:** 
```javascript
import './commands';        // Comandos customizados
import 'cypress-plugin-api';  // Plugin para testes de API
import '@cypress/grep';     // Import obrigatório do @cypress/grep
```

### **❓ P17: Como funciona o sistema de mock inteligente nos comandos customizados?**
**💡 R:** 
```javascript
if (Cypress.env('CI') || Cypress.env('CYPRESS_CI')) {
  // Mock para CI: dados simulados
  return cy.wrap({ status: 200, body: { /* dados fake */ } });
}
// Ambiente local: requisição real à API
return cy.api('POST', 'http://api-real...', body);
```

### **❓ P18: Qual é a sintaxe correta para criar um comando customizado?**
**💡 R:** 
```javascript
Cypress.Commands.add('nomeDoComando', (parametro1, parametro2) => {
  // lógica do comando
  return cy.wrap(resultado);
});
```

### **❓ P19: Como usar um comando customizado nos testes?**
**💡 R:** Simplesmente chamar `cy.nomeDoComando(parametros)`. Exemplo: `cy.calculaFreteDetalhe(massa)`

### **❓ P20: Por que separar comandos em arquivo diferente dos testes?**
**💡 R:** Para reutilização, organização, manutenção centralizada e seguir o princípio DRY (Don't Repeat Yourself).

---

## 🗂️ **AULA 5: Fixtures - Gerenciamento de Dados**
**⏰ Duração:** 1h30min

### **❓ P21: O que são fixtures no Cypress?**
**💡 R:** São arquivos JSON que contêm dados de teste (massa de dados) separados do código, permitindo reutilização e manutenção independente.

### **❓ P22: Quais são os 4 campos principais do fixture frete-calculo-v3-detalhes.json?**
**💡 R:** 
- `Canal`: Origem da requisição (SITE, APP, etc.)
- `Cep`: CEP de destino para cálculo
- `UnidadeNegocio`: Identificação da empresa
- `Produtos`: Array com itens para cálculo do frete

### **❓ P23: Como carregar dados de um fixture no teste?**
**💡 R:** 
```javascript
cy.fixture('nome-do-arquivo').then(dados => {
  // usar dados aqui
});
```

### **❓ P24: Qual é a boa prática para nomear fixtures?**
**💡 R:** Usar nomes descritivos que indiquem o cenário: `frete-cep-invalido.json`, `frete-multiplos-produtos.json`, etc.

### **❓ P25: Como criar fixture para cenário negativo (CEP inválido)?**
**💡 R:** 
```json
{
  "Canal": "SITE",
  "Cep": "00000-000",
  "UnidadeNegocio": "B2CCasasBahia",
  "Produtos": [/* array produtos */]
}
```

---

## 🧪 **AULA 6: Casos de Teste - Estrutura e Organização**
**⏰ Duração:** 1h30min

### **❓ P26: Qual é a hierarquia correta dos blocos de teste no Cypress?**
**💡 R:** 
- `describe()`: Suíte principal de testes
- `context()`: Agrupamento por tipo de cenário  
- `it()`: Caso de teste individual

### **❓ P27: Como aplicar tags usando @cypress/grep nos testes?**
**💡 R:** 
```javascript
describe('Suite', { tags: ['api', 'frete'] }, () => {
  context('Positivos', { tags: ['cenariosPositivos'] }, () => {
    it('Teste', { tags: ['smoke'] }, () => {
      // teste aqui
    });
  });
});
```

### **❓ P28: Qual é a diferença entre as tags 'smoke', 'validation' e 'regression'?**
**💡 R:** 
- `smoke`: Testes essenciais e rápidos para validação básica
- `validation`: Testes de validação de campos e regras de negócio
- `regression`: Conjunto completo para garantir que mudanças não quebram funcionalidades

### **❓ P29: Como estruturar um teste de cenário negativo?**
**💡 R:** 
```javascript
context('Cenários Negativos', { tags: ['cenariosNegativos'] }, () => {
  it('Deve retornar erro quando CEP estiver vazio', { tags: ['validation'] }, () => {
    cy.testeComCampoCepVazio();
  });
});
```

### **❓ P30: Por que usar context() além de describe()?**
**💡 R:** Para organizar melhor os testes por tipo (positivos, negativos, borda), facilitando execução seletiva e manutenção.

---

## 🔍 **AULA 7: @cypress/grep - Filtros Avançados**
**⏰ Duração:** 1h30min

### **❓ P31: Quais são os 3 passos oficiais para configurar @cypress/grep?**
**💡 R:** 
1. **Instalação:** `npm install --save-dev @cypress/grep`
2. **Support File:** `import '@cypress/grep';` (OBRIGATÓRIO)
3. **Config:** Plugin no cypress.config.js (OPCIONAL)

### **❓ P32: Qual passo é obrigatório e qual é opcional no @cypress/grep?**
**💡 R:** 
- **OBRIGATÓRIO:** Import no support file (`import '@cypress/grep';`)
- **OPCIONAL:** Plugin no cypress.config.js (melhora funcionalidades)

### **❓ P33: Como executar testes por título usando @cypress/grep?**
**💡 R:** `npx cypress run --env grep="texto do título"`

### **❓ P34: Como executar testes por tags usando @cypress/grep?**
**💡 R:** `npx cypress run --env grepTags="smoke"`

### **❓ P35: Como combinar filtro por título E tags?**
**💡 R:** `npx cypress run --env grep="retornar",grepTags="smoke"`

### **❓ P36: Quais scripts personalizados podemos criar com @cypress/grep?**
**💡 R:** 
```json
{
  "test:smoke": "cypress run --env grepTags=smoke",
  "test:validation": "cypress run --env grepTags=validation", 
  "test:fast": "cypress run --env grepTags='smoke validation'"
}
```

---

## 🔄 **AULA 8: GitHub Actions - CI/CD Básico**
**⏰ Duração:** 1h30min

### **❓ P37: Quais são os 3 tipos de trigger configurados no GitHub Actions do projeto?**
**💡 R:** 
- `push`: Execução automática quando código é enviado
- `pull_request`: Execução automática em pull requests
- `workflow_dispatch`: Execução manual com possibilidade de informar parâmetros

### **❓ P38: Para que serve o input grepTag no workflow_dispatch?**
**💡 R:** Permite informar uma tag específica do @cypress/grep para executar apenas alguns testes na execução manual.

### **❓ P39: Como funciona o fallback no comando do GitHub Actions?**
**💡 R:** 
```yaml
command: npx cypress run --env grep=${{ github.event.inputs.grepTag || '' }}
```
Se não informar tag (execução automática), usa string vazia e executa todos os testes.

### **❓ P40: Por que definir CYPRESS_CI: true no ambiente do GitHub Actions?**
**💡 R:** Para ativar os mocks nos comandos customizados, já que no CI não temos acesso às APIs reais.

### **❓ P41: Qual Action oficial do Cypress usar no GitHub Actions?**
**💡 R:** `cypress-io/github-action@v6` - É a action oficial mantida pelo time do Cypress.

---

## 📦 **AULA 9: GitHub Actions - Artefatos e Otimizações**
**⏰ Duração:** 1h30min

### **❓ P42: Quais são as 4 otimizações implementadas no workflow avançado?**
**💡 R:** 
- Cache de dependências npm
- `npm ci` (mais rápido que npm install)
- Node.js versão específica (20)
- Upload de artefatos mesmo com falhas (`if: always()`)

### **❓ P43: Por que usar npm ci em vez de npm install no CI?**
**💡 R:** Porque `npm ci` é mais rápido, determinístico, usa apenas o package-lock.json e não modifica arquivos de dependência.

### **❓ P44: Como configurar upload de screenshots e vídeos?**
**💡 R:** 
```yaml
- name: Upload screenshots
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: cypress-screenshots
    path: cypress/screenshots
```

### **❓ P45: Por que usar 'if: always()' no upload de artefatos?**
**💡 R:** Para garantir que screenshots e vídeos sejam salvos mesmo quando testes falham, permitindo análise posterior dos problemas.

### **❓ P46: Como baixar artefatos do GitHub Actions após execução?**
**💡 R:** Acessar GitHub → Actions → Workflow executado → Seção "Artifacts" → Download dos arquivos ZIP.

---

## 🎓 **AULA 10: Projeto Final e Boas Práticas**
**⏰ Duração:** 1h30min

### **❓ P47: Qual projeto final é sugerido para consolidar o aprendizado?**
**💡 R:** Implementar validação de múltiplos produtos no frete, incluindo: novo fixture, comando customizado, caso de teste com tags e script no package.json.

### **❓ P48: Quais são os 4 pilares do checklist de boas práticas?**
**💡 R:** 
- **Estrutura:** Pastas organizadas, nomenclatura consistente
- **Código:** Comandos reutilizáveis, tags organizadas, tratamento CI/Local
- **CI/CD:** Workflow funcional, artefatos configurados
- **Documentação:** README claro, comentários relevantes

### **❓ P49: Como criar fixture para múltiplos produtos?**
**💡 R:** 
```json
{
  "Canal": "SITE", "Cep": "01310-100", "UnidadeNegocio": "B2CCasasBahia",
  "Produtos": [
    {"IdLojista": 10037, "IdSku": 12857509, "Quantidade": 2, "ValorUnitario": "299.00"},
    {"IdLojista": 10037, "IdSku": 98765432, "Quantidade": 1, "ValorUnitario": "150.00"}
  ]
}
```

### **❓ P50: Quais são os 4 critérios de avaliação e seus pesos?**
**💡 R:** 
- **Funcionamento (40%):** Testes executam corretamente
- **Qualidade (30%):** Código limpo e organizado
- **Inovação (20%):** Melhorias além do solicitado
- **Documentação (10%):** Explicação clara da implementação

---

## 🚨 **TROUBLESHOOTING Q&A**

### **❓ P51: O que fazer quando @cypress/grep não funciona?**
**💡 R:** 
1. Verificar versão: `npm list @cypress/grep`
2. Reinstalar: `npm uninstall @cypress/grep && npm install --save-dev @cypress/grep@5.0.0`
3. Verificar import: `import '@cypress/grep'` em cypress/support/e2e.js
4. Verificar plugin registrado corretamente

### **❓ P52: Por que testes passam local mas falham no CI?**
**💡 R:** Verificar se mocks estão ativados: `if (Cypress.env('CI') || Cypress.env('CYPRESS_CI'))` e se variável CYPRESS_CI=true está definida no workflow.

### **❓ P53: Como resolver "cy.comandoCustomizado is not a function"?**
**💡 R:** 
1. Verificar import em cypress/support/e2e.js: `import './commands'`
2. Verificar sintaxe: `Cypress.Commands.add('nomeComando', () => {})`
3. Reiniciar Cypress se necessário

### **❓ P54: Por que GitHub Actions não aparece na aba Actions?**
**💡 R:** 
1. Verificar localização: `.github/workflows/cypress.yml`
2. Verificar sintaxe YAML (usar espaços, não tabs)
3. Verificar se está na branch correta
4. Fazer push para trigger inicial

### **❓ P55: Como resolver problema de artefatos não sendo salvos?**
**💡 R:** 
1. Verificar se paths existem: `cypress/videos/`, `cypress/screenshots/`
2. Verificar configuração: `video: true`, `screenshotOnRunFailure: true`
3. Forçar criação: `mkdir -p cypress/videos cypress/screenshots`

---

## 💯 **RESUMO DOS PONTOS-CHAVE**

### **❓ P56: Quais são as 5 tecnologias essenciais do projeto?**
**💡 R:** 
1. **Cypress 15.4.0:** Framework de automação
2. **@cypress/grep 5.0.0:** Sistema de filtros por tags
3. **Node.js 16+:** Runtime JavaScript
4. **GitHub Actions:** Pipeline de CI/CD
5. **JSON:** Formato de fixtures e configurações

### **❓ P57: Qual é o fluxo completo de execução do projeto?**
**💡 R:** 
1. Package.json define dependências → 2. Cypress.config.js registra plugins → 3. Support files importam configurações → 4. Commands.js define lógica → 5. Fixtures fornecem dados → 6. Testes executam cenários → 7. GitHub Actions automatiza pipeline

### **❓ P58: Quais comandos um QA precisa saber para usar o projeto?**
**💡 R:** 
```powershell
npm install                           # Instalar dependências
npm run cypress:open                  # Interface gráfica
npm run cypress:grep:positivos        # Cenários positivos
npm run cypress:grep:negativos        # Cenários negativos
npm run cypress:verify                # Verificar instalação
```

### **❓ P59: O que torna este projeto "enterprise-ready"?**
**💡 R:** Sistema de mocks inteligente (CI/Local), filtros avançados por tags, pipeline automatizado, documentação completa, estrutura escalável, boas práticas implementadas.

### **❓ P60: Qual é o objetivo final do treinamento?**
**💡 R:** Formar QAs capazes de implementar automação de API robusta e profissional, evoluindo de júnior para pleno, com domínio de Cypress, CI/CD e boas práticas de mercado.

---

**🎯 Total: 60 perguntas e respostas cobrindo todos os aspectos essenciais do projeto de automação de API com Cypress!**

**📚 Este formato Q&A facilita:**
- Ensino interativo durante as aulas
- Avaliação rápida do conhecimento
- Revisão antes de apresentações
- Treinamento de novos membros da equipe
