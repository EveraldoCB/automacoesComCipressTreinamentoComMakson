# Cronograma de Aulas - Automação de API com Cypress
**Projeto: Automação da API Frete Cálculo V3 Detalhes**  
**Duração por aula: 1h30min**  
**Total: 10 aulas (15 horas)**

---

## 📚 **AULA 1: Fundamentos e Visão Geral do Projeto**
**⏰ Duração:** 1h30min

### **🎯 Objetivos:**
- Entender o que é automação de testes de API
- Conhecer a estrutura geral do projeto
- Compreender o fluxo de trabalho

### **📋 Conteúdo:**
1. **Introdução aos Testes de API (20min)**
   - O que são APIs REST
   - Diferença entre testes E2E UI vs API
   - Vantagens da automação de API

2. **Apresentação do Projeto (30min)**
   - API Frete Cálculo V3 Detalhes
   - Casos de uso (cenários positivos e negativos)
   - Estrutura de pastas do projeto

3. **Ferramentas Utilizadas (25min)**
   - Node.js e npm
   - Cypress para automação
   - @cypress/grep para filtros
   - GitHub Actions para CI/CD

4. **Hands-on: Setup Inicial (15min)**
   - Clonagem do repositório
   - Instalação das dependências: `npm install`
   - Verificação: `npm run cypress:verify`

### **🎯 Entregável:**
Ambiente configurado e funcionando

---

## 📦 **AULA 2: Package.json - Configuração do Projeto**
**⏰ Duração:** 1h30min

### **🎯 Objetivos:**
- Dominar a estrutura do package.json
- Entender dependências e scripts
- Criar scripts personalizados

### **📋 Conteúdo:**
1. **Anatomia do package.json (30min)**
   - Metadados do projeto (name, version, description)
   - Diferença entre dependencies e devDependencies
   - Versionamento semântico

2. **Dependências do Projeto (35min)**
   - **cypress**: Framework principal de automação
   - **@cypress/grep**: Plugin para filtros por tags
   - **cypress-plugin-api**: Extensões para testes de API

3. **Scripts de Automação (25min)**
   - `cypress:open`: Interface gráfica para desenvolvimento
   - `cypress:grep:positivos`: Execução filtrada de cenários positivos
   - `cypress:grep:negativos`: Execução filtrada de cenários negativos
   - Scripts utilitários (verify, clear, etc.)

### **🎯 Hands-on:**
- Executar cada script e observar comportamento
- Criar um script personalizado
- Modificar dependências (conceitual)

### **🎯 Entregável:**
Compreensão completa dos scripts disponíveis

---

## ⚙️ **AULA 3: Cypress.config.js - Configuração Principal**
**⏰ Duração:** 1h30min

### **🎯 Objetivos:**
- Compreender configurações do Cypress
- Implementar plugins e extensões
- Configurar artefatos (vídeos/screenshots)

### **📋 Conteúdo:**
1. **Estrutura do Arquivo de Configuração (25min)**
   - `defineConfig()`: Função oficial do Cypress
   - Propriedade `e2e`: Configurações para testes End-to-End
   - Diferença entre configurações globais e específicas

2. **Configurações Essenciais (35min)**
   - `supportFile`: Arquivo de comandos globais
   - `video: true`: Gravação de artefatos de vídeo
   - `screenshotOnRunFailure`: Captura de imagens em falhas

3. **Plugin @cypress/grep (30min)**
   - Função `setupNodeEvents()`: Registro de plugins
   - Implementação da Seção 3 da documentação oficial
   - Como o plugin habilita filtros por tags

### **🎯 Hands-on:**
- Modificar configurações e observar impacto
- Testar com/sem plugin @cypress/grep
- Localizar artefatos gerados

### **🎯 Entregável:**
Arquivo de configuração personalizado funcionando

---

## 🔧 **AULA 4: Support Files - Configurações Globais**
**⏰ Duração:** 1h30min

### **🎯 Objetivos:**
- Configurar arquivos de suporte
- Implementar comandos globais
- Integrar plugins essenciais

### **📋 Conteúdo:**
1. **cypress/support/e2e.js (45min)**
   - Import do @cypress/grep (Seção 2 obrigatória)
   - Import dos comandos customizados
   - Configurações que se aplicam a todos os testes

2. **cypress/support/commands.js (35min)**
   - Estrutura de comandos customizados
   - `cy.calculaFreteDetalhe()`: Comando principal de API
   - `cy.deveRetornaroTipoDeEntrega...()`: Comando de validação
   - `cy.testeComCampoCepVazio()`: Comando de erro

3. **Boas Práticas (10min)**
   - Nomenclatura de comandos
   - Reutilização vs. especificidade
   - Documentação inline

### **🎯 Hands-on:**
- Criar um comando customizado simples
- Testar comandos existentes isoladamente
- Verificar funcionamento do @cypress/grep

### **🎯 Entregável:**
Comando customizado criado e funcionando

---

## 🗂️ **AULA 5: Fixtures - Gerenciamento de Dados**
**⏰ Duração:** 1h30min

### **🎯 Objetivos:**
- Organizar massa de dados de teste
- Implementar data-driven testing
- Separar dados de lógica de teste

### **📋 Conteúdo:**
1. **Conceito de Fixtures (20min)**
   - Separação entre dados e código
   - Vantagens da centralização de dados
   - Formatos suportados (JSON, CSV, etc.)

2. **Análise do Arquivo frete-calculo-v3-detalhes.json (40min)**
   - Estrutura dos dados de entrada
   - Dados para cenários positivos
   - Dados para cenários negativos
   - Correlação com casos de teste

3. **Uso de Fixtures no Cypress (30min)**
   - `cy.fixture()`: Carregamento de dados
   - Integração com comandos customizados
   - Fixtures dinâmicas vs. estáticas

### **🎯 Hands-on:**
- Modificar dados no fixture
- Criar novo fixture para outro cenário
- Implementar data-driven test simples

### **🎯 Entregável:**
Fixture personalizado criado e integrado

---

## 🧪 **AULA 6: Casos de Teste - Estrutura e Organização**
**⏰ Duração:** 1h30min

### **🎯 Objetivos:**
- Estruturar casos de teste profissionalmente
- Implementar tags para organização
- Aplicar padrões de nomenclatura

### **📋 Conteúdo:**
1. **Estrutura Hierárquica (25min)**
   - `describe()`: Suíte de testes principal
   - `context()`: Agrupamento por cenário
   - `it()`: Caso de teste individual

2. **Sistema de Tags com @cypress/grep (40min)**
   - Tags no nível de describe: `['api', 'frete']`
   - Tags no nível de context: `['cenariosPositivos']`, `['cenariosNegativos']`
   - Tags no nível de it: `['smoke']`, `['validation']`
   - Execução filtrada por tags

3. **Casos de Teste Atuais (25min)**
   - **Cenário Positivo:** Validação completa da API
   - **Cenário Negativo:** Tratamento de erro (CEP vazio)
   - Padrões de nomenclatura descritiva

### **🎯 Hands-on:**
- Criar novo caso de teste com tags
- Executar filtros por diferentes tags
- Testar comandos `npm run cypress:grep:positivos`

### **🎯 Entregável:**
Novo caso de teste implementado com tags

---

## 🔍 **AULA 7: @cypress/grep - Filtros Avançados**
**⏰ Duração:** 1h30min

### **🎯 Objetivos:**
- Dominar completamente o @cypress/grep
- Implementar filtros complexos
- Otimizar execução de testes

### **📋 Conteúdo:**
1. **Instalação e Configuração Completa (30min)**
   - **Passo 1:** `npm install --save-dev @cypress/grep`
   - **Passo 2:** Import no support file (obrigatório)
   - **Passo 3:** Plugin no cypress.config.js (opcional)

2. **Documentação Oficial na Prática (35min)**
   - Seção "Filter by Tags": Exemplos práticos
   - Seção "Configuration Examples": Scripts no package.json
   - Comparação: implementação vs. documentação oficial

3. **Filtros Avançados (25min)**
   - Execução por título: `--env grep="texto"`
   - Execução por tags: `--env grepTags="@tag"`
   - Combinações complexas
   - Filtros negativos (exclusão)

### **🎯 Hands-on:**
- Implementar todos os tipos de filtros
- Criar scripts personalizados com grep
- Testar performance com/sem filtros

### **🎯 Entregável:**
Scripts de filtros personalizados funcionando

---

## 🔄 **AULA 8: GitHub Actions - CI/CD Básico**
**⏰ Duração:** 1h30min

### **🎯 Objetivos:**
- Implementar pipeline de CI/CD
- Configurar execução automática
- Gerenciar artefatos de teste

### **📋 Conteúdo:**
1. **Fundamentos de CI/CD (25min)**
   - O que é Continuous Integration
   - Vantagens da automação no pipeline
   - GitHub Actions vs. outras ferramentas

2. **Arquivo .github/workflows/cypress.yml (40min)**
   - Triggers: push, pull_request, workflow_dispatch
   - Jobs e steps: estrutura do pipeline
   - `cypress-io/github-action@v6`: Action oficial

3. **Integração com @cypress/grep (25min)**
   - Input manual: `workflow_dispatch`
   - Comando dinâmico: `--env grep=${{ github.event.inputs.grepTag }}`
   - Fallback inteligente: `|| ''`

### **🎯 Hands-on:**
- Fazer push e observar execução automática
- Executar manualmente com diferentes tags
- Verificar logs e status

### **🎯 Entregável:**
Pipeline funcionando com execução manual e automática

---

## 📦 **AULA 9: GitHub Actions - Artefatos e Otimizações**
**⏰ Duração:** 1h30min

### **🎯 Objetivos:**
- Gerenciar artefatos de teste
- Otimizar performance do pipeline
- Implementar notificações e relatórios

### **📋 Conteúdo:**
1. **Artefatos de Teste (35min)**
   - Videos: `cypress/videos/` → `actions/upload-artifact@v4`
   - Screenshots: `cypress/screenshots/` → `actions/upload-artifact@v4`
   - Configuração: `if: always()` para upload mesmo com falhas

2. **Otimizações de Performance (30min)**
   - Cache de dependências
   - Paralelização de testes
   - Estratégias de execução (matriz de browsers)

3. **Monitoramento e Relatórios (25min)**
   - Status badges no README
   - Notificações de falha
   - Integração com ferramentas de relatório

### **🎯 Hands-on:**
- Configurar upload de artefatos
- Fazer um teste falhar e verificar screenshots
- Baixar artefatos do GitHub

### **🎯 Entregável:**
Pipeline otimizado com artefatos configurados

---

## 🎓 **AULA 10: Projeto Final e Boas Práticas**
**⏰ Duração:** 1h30min

### **🎯 Objetivos:**
- Consolidar conhecimentos
- Implementar melhorias
- Estabelecer padrões de qualidade

### **📋 Conteúdo:**
1. **Revisão Completa do Projeto (30min)**
   - Fluxo end-to-end: do desenvolvimento ao CI/CD
   - Interação entre todos os componentes
   - Troubleshooting de problemas comuns

2. **Boas Práticas e Padrões (35min)**
   - Estrutura de pastas profissional
   - Nomenclatura consistente
   - Documentação inline e README
   - Versionamento e controle de mudanças

3. **Expansões e Melhorias (25min)**
   - Adicionar novos casos de teste
   - Implementar testes de contrato
   - Integração com outras APIs
   - Relatórios avançados

### **🎯 Projeto Final:**
- Implementar uma nova funcionalidade completa
- Criar casos de teste com tags
- Configurar execução no CI/CD
- Documentar a implementação

### **🎯 Entregável:**
Projeto completo com nova funcionalidade implementada

---

## 📚 **Recursos Adicionais**

### **📖 Documentações de Referência:**
- [Cypress Official Documentation](https://docs.cypress.io/)
- [@cypress/grep Documentation](https://github.com/cypress-io/cypress/tree/develop/npm/grep)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### **🛠️ Ferramentas Recomendadas:**
- VS Code com extensões Cypress
- Postman para testes manuais de API
- Git para controle de versão

### **📝 Templates e Exemplos:**
- Template de casos de teste
- Template de comandos customizados
- Template de workflow GitHub Actions

---

## ✅ **Critérios de Avaliação por Aula**

### **📊 Conhecimento Teórico (40%)**
- Compreensão dos conceitos
- Explicação das ferramentas
- Correlação entre componentes

### **🔧 Implementação Prática (40%)**
- Execução correta dos hands-on
- Qualidade do código produzido
- Resolução de problemas

### **🎯 Entregáveis (20%)**
- Completude das tarefas
- Funcionamento correto
- Documentação adequada

---

**📅 Cronograma Sugerido:**
- **Aulas 1-3:** Fundamentos (3 semanas)
- **Aulas 4-6:** Implementação Core (3 semanas)
- **Aulas 7-9:** Funcionalidades Avançadas (3 semanas)
- **Aula 10:** Consolidação (1 semana)

**🎯 Total: 10 semanas de aprendizado estruturado**

---

## 🎯 **Metodologia de Ensino**

### **📚 Para QA Iniciante:**
Este cronograma foi especialmente projetado para QAs sem experiência prévia em automação de API. A progressão é cuidadosamente estruturada para construir conhecimento de forma sólida e incremental.

### **🎯 Abordagem Prática:**
Cada aula combina teoria essencial com hands-on práticos, garantindo que o aprendiz não apenas entenda os conceitos, mas também saiba implementá-los na prática.

### **📋 Acompanhamento:**
Os entregáveis de cada aula permitem acompanhar o progresso e identificar pontos que precisam de reforço antes de avançar para o próximo tópico.

**🚀 Ao final do curso, o aluno será capaz de:**
- Estruturar projetos de automação de API profissionalmente
- Implementar testes com Cypress e @cypress/grep
- Configurar pipelines de CI/CD com GitHub Actions
- Aplicar boas práticas de qualidade e manutenção de código
