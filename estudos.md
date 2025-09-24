# Estudos para Evolução em Cypress (QA Júnior → Pleno)

## Como QA Júnior (Iniciante)

1. **Conceitos básicos de testes automatizados**
   - O que é automação de testes e por que usar.
   - Diferença entre testes manuais e automatizados.

2. **Instalação e primeiros passos com Cypress**
   - Instalar Cypress (`npm install --save-dev cypress`).
   - Rodar testes com `npx cypress open` e `npx cypress run`.
   - Entender a estrutura de pastas do Cypress (`e2e`, `fixtures`, `support`).

3. **Escrever testes simples**
   - Usar comandos básicos: `cy.visit`, `cy.get`, `cy.click`, `cy.request`.
   - Validar elementos na tela e respostas de API.
   - Usar fixtures para massa de dados.

4. **Comandos customizados**
   - Criar comandos para reutilizar lógicas de teste.
   - Exemplo: `cy.calculaFreteDetalhe(massa)`.

5. **Execução local e no CI**
   - Rodar testes localmente e entender como funcionam no pipeline (CI).
   - Saber o que é mock e quando ele é usado.

---

## Como QA Pleno (Intermediário/Avançado)

1. **Estruturação e organização dos testes**
   - Separar cenários por arquivos e contextos.
   - Usar hooks (`before`, `beforeEach`, etc.) para preparar o ambiente.

2. **Testes mais complexos**
   - Testar fluxos completos, múltiplos cenários e diferentes tipos de dados.
   - Usar interceptação de requisições (`cy.intercept`) para mockar ou validar chamadas de API.

   ```javascript
   // Exemplo de uso de cy.intercept para mockar uma resposta de API
   // Este comando pode ser colocado em um teste para simular o retorno da API
   // e garantir que o teste passe mesmo sem acesso ao serviço externo.

   // cy.intercept('POST', '/frete/v3/calculo/detalhe', {
   //   statusCode: 200,
   //   body: {
   //     fretes: [{ tipo: { nome: 'Normal' }, prazoEntrega: 7, valor: 41.82, dataEntrega: '24/09/2025' }]
   //   }
   // }).as('mockFrete');
   // cy.visit('/'); // ou qualquer ação que dispare a requisição
   // cy.wait('@mockFrete');

   // Explicação:
   // - O cy.intercept intercepta a requisição POST para o endpoint especificado.
   // - Retorna o corpo definido, ignorando a resposta real da API.
   // - O teste pode validar o comportamento da aplicação com dados simulados.
   ```

3. **Boas práticas**
   - Manter código limpo, reutilizável e fácil de manter:
     - Use comandos customizados para evitar repetição de código.
     - Separe cenários de teste em arquivos e funções pequenas.
     - Nomeie variáveis, funções e arquivos de forma clara e objetiva.
     - Remova código morto, duplicado ou desnecessário.
     - Refatore sempre que possível para simplificar e organizar.
   - Documentar cenários, comandos e massa de dados:
     - Adicione comentários explicativos nos testes e comandos customizados.
     - Mantenha um README atualizado com exemplos de uso e estrutura do projeto.
     - Documente a finalidade de cada cenário de teste.
     - Descreva os dados dos fixtures e o motivo de cada massa de teste.
     - Use nomes descritivos para arquivos de fixture e comandos.
   - Garantir que os testes sejam independentes e confiáveis:
     - Use `beforeEach` para preparar o ambiente antes de cada teste.
     - Evite dependência entre testes (cada teste deve rodar sozinho).
     - Limpe ou resete dados e estado antes de cada execução.
     - Use mocks/intercepts apenas quando necessário e documente quando estiver simulando dados.
     - Valide não só o resultado esperado, mas também cenários de erro e borda.
       - **Cenário de borda:** Testar situações extremas, limites ou casos pouco prováveis, como valores mínimos/máximos, campos vazios, dados inválidos, grandes volumes de dados, ou uso fora do padrão. Isso ajuda a garantir que o sistema se comporte corretamente mesmo em condições inesperadas ou raras.

4. **Integração contínua**
   - Configurar e entender pipelines (ex: GitHub Actions).
   - Garantir que os testes rodem automaticamente a cada alteração no código.

5. **Debug e análise de falhas**
   - Usar screenshots, vídeos e logs para investigar falhas.
   - Saber diferenciar problemas de ambiente, dados e código.

6. **Evolução**
   - Aprender sobre Page Objects, testes paralelos, relatórios customizados.
   - Participar de revisões de código e sugerir melhorias.
   - Estudar integração com outras ferramentas (ex: API, banco de dados, CI/CD).

---

## Lista de cenários de teste por grau de relevância

**Essenciais para API:**
- [x] Cenário de sucesso (dados válidos, resposta esperada)
- [x] Cenário de erro (dados inválidos, campos obrigatórios ausentes)
  - Testa situações em que o sistema recebe dados claramente inválidos ou incompletos, como campo obrigatório ausente, tipo de dado errado, formato inválido, valores fora do permitido. O objetivo é garantir que o sistema rejeite e trate corretamente entradas erradas, mostrando mensagens de erro ou status apropriados.
- [x] Cenário de borda (valores mínimos/máximos, campos vazios, grandes volumes)
  - Testa os limites extremos do sistema, mas ainda dentro do permitido. Exemplos: valor mínimo/máximo aceito, maior quantidade de itens possível, campo preenchido com o maior texto permitido, data no limite, etc. O objetivo é garantir que o sistema funcione corretamente nos extremos das regras de negócio, sem falhar ou apresentar comportamento inesperado.
  - Campo vazio pode ser borda se permitido pela regra (campo opcional), ou erro se obrigatório.
- [x] Cenário de autenticação/autorização (token inválido, usuário sem permissão)
- [x] Cenário de timeout ou indisponibilidade da API
- [x] Cenário de dados duplicados ou conflito
- [x] Cenário de tipos de dados incorretos
- [x] Cenário de validação de contratos (estrutura do JSON, tipos de campos)
- [x] Cenário de performance (requisições simultâneas, carga)
- [x] Cenário de versionamento (endpoint v2, v3, etc)

**Importantes para sistemas web:**
- [x] Cenário de navegação (acesso a páginas, redirecionamentos)
- [x] Cenário de login/logout
- [x] Cenário de permissões de usuário
- [x] Cenário de upload/download de arquivos
- [x] Cenário de responsividade (diferentes tamanhos de tela)
- [x] Cenário de acessibilidade
- [x] Cenário de internacionalização (idiomas, formatos de data)

**Complementares:**
- [x] Cenário de integração com outros sistemas (banco, serviços externos)
- [x] Cenário de logs e auditoria
- [x] Cenário de recuperação de falhas (rollback, retentativas)
- [x] Cenário de atualização de dados (PUT/PATCH)
- [x] Cenário de exclusão de dados (DELETE)
- [x] Cenário de segurança (SQL Injection, XSS, CSRF)

> **Dica:** Priorize cenários de API, pois garantem a robustez e confiabilidade do backend. Testes de borda, erro e contrato são fundamentais para evitar problemas em produção.

---

## Passo a passo para evoluir

1. **Domine o básico:** Instale, rode e escreva testes simples.
2. **Pratique comandos customizados e fixtures.**
3. **Aprenda a estruturar cenários e usar hooks.**
4. **Entenda e configure pipelines de CI.**
5. **Estude interceptação, mock e testes de API.**
6. **Aprimore boas práticas e organização do projeto.**
7. **Participe de revisões, peça feedback e estude casos reais.**
8. **Explore recursos avançados do Cypress e automação.**
9. **Compartilhe conhecimento e ajude outros QAs.**

---

## Cronograma de Evolução: QA Júnior → Pleno (3-4 meses)

> **Sugestão de progresso semanal. Adapte conforme disponibilidade e ritmo de aprendizado.**

| Semana | Foco Principal | Atividades e Metas | Checkpoints |
|--------|----------------|-------------------|-------------|
| 1-2    | Fundamentos e Instalação | - Estude conceitos de automação e diferença entre testes manuais/automatizados.<br>- Instale Cypress, rode testes de exemplo.<br>- Explore estrutura de pastas e arquivos do projeto. | Rodar um teste simples localmente. |
| 3-4    | Comandos Básicos e Fixtures | - Pratique comandos Cypress (`cy.visit`, `cy.get`, `cy.request`).<br>- Use e crie fixtures para massa de dados.<br>- Escreva cenários de sucesso e erro. | Criar e rodar testes usando fixture. |
| 5-6    | Comandos Customizados e Hooks | - Implemente comandos customizados.<br>- Aprenda e utilize hooks (`before`, `beforeEach`).<br>- Estruture cenários em arquivos separados. | Refatorar um teste usando comando customizado e hooks. |
| 7-8    | Interceptação, Mock e Testes de API | - Pratique `cy.intercept` para mockar APIs.<br>- Simule cenários de borda, erro e autenticação.<br>- Documente cenários e dados de teste. | Rodar teste que passa com mock no CI. |
| 9-10   | Boas Práticas e Organização | - Refatore código para clareza e reutilização.<br>- Documente comandos, cenários e fixtures.<br>- Remova duplicidades e código morto. | Atualizar README e comentários nos testes. |
| 11-12  | Integração Contínua e Debug | - Configure pipeline CI (ex: GitHub Actions).<br>- Analise falhas usando logs, screenshots e vídeos.<br>- Diferencie problemas de ambiente, dados e código. | Garantir que testes rodem automaticamente no CI. |
| 13-14  | Recursos Avançados e Revisão | - Estude Page Objects, testes paralelos, relatórios.<br>- Participe de revisões de código.<br>- Explore integração com outras ferramentas. | Sugerir melhoria em um teste ou estrutura do projeto. |
| 15-16  | Consolidação e Compartilhamento | - Revise todos os tópicos.<br>- Compartilhe conhecimento com outros QAs.<br>- Documente aprendizados e dúvidas.<br>- Prepare um mini portfólio de testes. | Apresentar evolução e principais aprendizados. |

**Dicas:**
- Reserve tempo semanal para prática (mínimo 2-3h/semana).
- Foque em cenários de API, borda e erro para consolidar conhecimento.
- Busque feedback constante e participe de revisões.
- Documente tudo: facilita aprendizado e evolução.

> **Ao final do cronograma, você terá domínio dos fundamentos, boas práticas, integração contínua e recursos avançados, pronto para atuar como QA Pleno em automação de testes com Cypress.**

---

## Dicas práticas para documentação de testes (APIs e Frontend)

1. **Documente cada cenário de teste**
   - Objetivo do cenário (ex: "Valida cálculo de frete v3").
   - Pré-condições, dados de entrada, passos e resultado esperado.
   - Separe cenários por produto e tipo (API, Frontend).

2. **Padronize a estrutura**
   - Use templates para cenários e comandos customizados.
   - Nomeie arquivos e funções de forma clara (ex: `frete-calculo-v3-detalhes.cy.js`).

3. **Atualize semanalmente**
   - Após cada refinamento, revise e atualize cenários, comandos e fixtures.
   - Documente mudanças relevantes no README ou changelog.

4. **Integração entre produtos**
   - Mantenha seções separadas para cada produto, mas documente integrações e dependências.
   - Explique como os testes de API impactam o Frontend e vice-versa.

5. **Exemplos práticos**
   - Inclua exemplos de comandos customizados, interceptação e mocks.
   - Documente como rodar testes localmente e no CI.

6. **Checklist de qualidade**
   - Adicione uma lista de boas práticas e pontos de revisão (ex: independência dos testes, cobertura de cenários de erro/borda).

7. **Facilite o onboarding**
   - Mantenha um guia rápido para novos QAs, explicando estrutura, comandos principais e fluxo de trabalho.

---

## Retirada da propriedade baseUrl do cypress.config.js

A propriedade `baseUrl` foi removida do objeto `module.exports` no arquivo `cypress.config.js` para evitar erros de verificação de servidor durante a execução dos testes em ambientes de Integração Contínua (CI). 

### O que muda na prática?
- **Antes:** Com `baseUrl` definido, era possível usar caminhos relativos (ex: `/login`) nos comandos `cy.visit()` e `cy.request()`, pois o Cypress completava automaticamente a URL usando o valor de `baseUrl`.
- **Depois:** Sem `baseUrl`, é necessário informar a URL completa (ex: `http://localhost:3000/login`) em cada comando, pois o Cypress não tem mais uma URL base para completar os caminhos relativos.

### Por que remover?
- Em ambientes de CI, o endereço do servidor pode variar ou não estar disponível, o que pode causar falhas nos testes se o `baseUrl` estiver definido de forma fixa.
- Remover o `baseUrl` torna os testes mais flexíveis para rodar em diferentes ambientes, mesmo que exija informar a URL completa nos comandos.

### Resumo
A retirada do `baseUrl` visa garantir que os testes rodem sem dependência de um endereço fixo, evitando erros em pipelines automatizados e facilitando a execução em múltiplos ambientes.

---
