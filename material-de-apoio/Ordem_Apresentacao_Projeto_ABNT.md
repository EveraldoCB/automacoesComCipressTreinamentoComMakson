# ORDEM DE APRESENTAÇÃO DO PROJETO CYPRESS API

**Automação da API Frete Cálculo V3 Detalhes**

Autor: [Seu Nome]  
Instituição: [Sua Empresa/Instituição]  
Data: Novembro de 2025

---

## RESUMO

Este documento apresenta a ordem estrutural recomendada para apresentação do projeto de automação de API utilizando Cypress, @cypress/grep e GitHub Actions. A sequência proposta segue uma lógica pedagógica que facilita o entendimento progressivo da arquitetura e implementação do sistema de testes automatizados.

**Palavras-chave:** Cypress. Automação de Testes. API Testing. CI/CD. GitHub Actions.

---

## 1 INTRODUÇÃO

A automação de testes de API representa um componente fundamental na garantia de qualidade de software moderno. Este documento estabelece uma metodologia estruturada para apresentação de projetos de automação utilizando o framework Cypress em conjunto com ferramentas de filtros avançados e integração contínua.

O objetivo principal é fornecer uma sequência lógica de apresentação que permita ao público-alvo compreender desde as configurações básicas até as implementações mais avançadas do projeto.

---

## 2 METODOLOGIA DE APRESENTAÇÃO

### 2.1 Princípios Norteadores

A ordem de apresentação segue os seguintes princípios:

a) **Progressão Hierárquica**: Das configurações fundamentais para as implementações específicas;
b) **Dependência Lógica**: Cada elemento prepara o terreno para o próximo;
c) **Compreensibilidade**: Estrutura que facilita o entendimento técnico progressivo.

### 2.2 Estrutura Proposta

A apresentação deve seguir a seguinte sequência de componentes:

---

## 3 ORDEM DE APRESENTAÇÃO DETALHADA

### 3.1 Package.json - Configuração do Projeto

**Justificativa**: Ponto de partida fundamental que estabelece as dependências e scripts do projeto.

**Elementos-chave a abordar:**
- Dependências principais (@cypress/grep 5.0.0, cypress 15.4.0, cypress-plugin-api)
- Scripts de automação (grep:positivos, grep:negativos)
- Metadados do projeto e configurações essenciais

**Tempo sugerido**: 3-5 minutos

### 3.2 Cypress.config.js - Configuração Principal

**Justificativa**: Arquivo de configuração central que define o comportamento do Cypress e registra plugins essenciais.

**Elementos-chave a abordar:**
- Import das configurações oficiais do Cypress
- Propriedades de configuração (e2e, supportFile, video, screenshots)
- Registro correto do plugin @cypress/grep
- Função setupNodeEvents e suas responsabilidades

**Tempo sugerido**: 4-6 minutos

### 3.3 Cypress/support/e2e.js - Support File

**Justificativa**: Arquivo de suporte global que estabelece imports obrigatórios e configurações que se aplicam a todos os testes.

**Elementos-chave a abordar:**
- Import obrigatório do @cypress/grep (seção 2 da documentação oficial)
- Import dos comandos customizados
- Configurações globais do ambiente de teste

**Tempo sugerido**: 2-3 minutos

### 3.4 Cypress/support/commands.js - Comandos Customizados

**Justificativa**: Implementação da lógica de negócio reutilizável que encapsula operações complexas de API.

**Elementos-chave a abordar:**
- Comandos de API (cy.calculaFreteDetalhe)
- Comandos de validação específicos
- Sistema inteligente de mocks (CI vs Local)
- Encapsulamento da lógica de negócio

**Tempo sugerido**: 5-7 minutos

### 3.5 Cypress/fixtures/ - Massa de Dados

**Justificativa**: Separação clara entre dados e código, permitindo manutenção independente e reutilização de cenários.

**Elementos-chave a abordar:**
- Estrutura dos dados de entrada (frete-calculo-v3-detalhes.json)
- Princípio de separação de dados e código
- Estratégias de gerenciamento de massa de dados

**Tempo sugerido**: 2-3 minutos

### 3.6 Cypress/e2e/ - Casos de Teste

**Justificativa**: Implementação concreta dos cenários de teste utilizando toda a infraestrutura preparada anteriormente.

**Elementos-chave a abordar:**
- Estrutura hierárquica (describe/context/it)
- Sistema de tags para filtros (@cypress/grep)
- Execução dos comandos customizados
- Cobertura de cenários (positivos, negativos, borda)

**Tempo sugerido**: 6-8 minutos

### 3.7 .github/workflows/cypress.yml - CI/CD

**Justificativa**: Integração com pipeline de entrega contínua, demonstrando a automação completa do processo de qualidade.

**Elementos-chave a abordar:**
- Integração com GitHub Actions
- Workflow dinâmico utilizando @cypress/grep
- Upload automatizado de artefatos
- Execução em diferentes contextos (push, PR, manual)

**Tempo sugerido**: 4-6 minutos

---

## 4 LÓGICA DA SEQUÊNCIA

### 4.1 Fundamento Pedagógico

A sequência proposta segue o princípio de construção incremental do conhecimento:

1. **Configurações Base**: Package.json e cypress.config.js estabelecem o ambiente
2. **Arquivos de Suporte**: e2e.js e commands.js preparam a infraestrutura
3. **Dados e Testes**: Fixtures e casos de teste implementam a funcionalidade
4. **Integração**: CI/CD demonstra a automação completa

### 4.2 Interdependências

Cada componente da apresentação prepara o terreno para o próximo:

- Package.json → Define dependências usadas em cypress.config.js
- Cypress.config.js → Referencia o supportFile (e2e.js)
- e2e.js → Importa commands.js
- Commands.js → Utiliza fixtures
- Casos de teste → Executam comandos e fixtures
- CI/CD → Orquestra toda a execução

---

## 5 CONSIDERAÇÕES FINAIS

### 5.1 Benefícios da Metodologia

A aplicação desta ordem de apresentação proporciona:

a) **Compreensão Progressiva**: Audiência acompanha a evolução natural do projeto
b) **Redução de Complexidade**: Cada elemento é apresentado no momento adequado
c) **Replicabilidade**: Metodologia pode ser aplicada a outros projetos similares

### 5.2 Adaptações Possíveis

Dependendo do público-alvo e tempo disponível, a apresentação pode ser adaptada:

- **Público Técnico**: Maior detalhamento nos aspectos de implementação
- **Público Executivo**: Foco nos benefícios e resultados
- **Tempo Reduzido**: Concentração nos elementos 3.1, 3.4 e 3.7

---

## REFERÊNCIAS

CYPRESS.IO. Documentation. Disponível em: https://docs.cypress.io/. Acesso em: 11 nov. 2025.

CYPRESS.IO. @cypress/grep Documentation. GitHub. Disponível em: https://github.com/cypress-io/cypress/tree/develop/npm/grep. Acesso em: 11 nov. 2025.

GITHUB. GitHub Actions Documentation. Disponível em: https://docs.github.com/en/actions. Acesso em: 11 nov. 2025.

---

**Anexos**: 
- A. Código fonte completo do projeto
- B. Screenshots da execução
- C. Logs de execução do CI/CD
- D. Métricas de performance dos testes
