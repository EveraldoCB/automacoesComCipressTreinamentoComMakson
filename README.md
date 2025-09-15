# Automação da API de Frete cálculo com Cypress para Apresentação

## Como iniciar o projeto

1. Inicialize o projeto Node.js:
   ```sh
   npm init -y
   ```
   O parâmetro `-y` serve para aceitar todas as configurações padrão automaticamente, criando o arquivo `package.json` sem perguntar cada detalhe.
2. Instale o Cypress como dependência de desenvolvimento:
   ```sh
   npm install --save-dev cypress
   ```
3. Verifique a versão instalada do Cypress:
   ```sh
   npx cypress --version
   ```

## Onde ficam instaladas as bibliotecas do Cypress?

As bibliotecas do Cypress (e todas as dependências instaladas via npm) ficam na pasta `node_modules`, criada automaticamente na raiz do projeto ao rodar o comando `npm install`. O arquivo responsável por registrar essas dependências é o `package.json`.

As bibliotecas do Cypress (e de todas as dependências instaladas via npm) ficam na pasta `node_modules`, que é criada automaticamente na raiz do projeto quando você executa o comando:

```sh
npm install --save-dev cypress
```

- O Cypress e todas as suas dependências ficam dentro de `node_modules/cypress/`.
- O arquivo `package.json` registra que o Cypress está instalado como dependência de desenvolvimento.
- A pasta `node_modules` não deve ser editada manualmente e geralmente está listada no `.gitignore` para não ser versionada no Git.

Assim, sempre que você instalar ou atualizar dependências, elas ficarão organizadas dentro de `node_modules`, facilitando a gestão do ambiente do projeto.

## Arquivos criados na raiz do projeto (por ordem de relevância)

1. **package.json**  
   Arquivo principal de configuração do projeto Node.js.  
   Exemplo real:
   ```json
   {
     "name": "projeto-de-automacao-de-api-com-cypress-para-apresentacao",
     "version": "1.0.0",
     "description": "Projeto de automação da API de Frete para apresentação.",
     "main": "index.js",
     "scripts": {
       "test": "cypress run",
       "cypress:open": "npx cypress open"
     },
     "author": "Everaldo",
     "license": "ISC",
     "devDependencies": {
       "cypress": "^14.5.4"
     }
   }
   ```

2. **cypress.config.js**  
   Arquivo de configuração do Cypress.  
   Exemplo real:
   ```javascript
   module.exports = {
     e2e: {
       baseUrl: 'https://frete-hub-plataforma-frete-sit.casasbahia.com.br',
       supportFile: 'cypress/support/e2e.js'
     }
   };
   ```
   - `module.exports = { ... }`: Torna o objeto de configuração disponível para o Cypress usar.
   - `e2e`: Indica que as configurações dentro desse bloco são para testes E2E.
   - `baseUrl`: Define o endereço base da API. Assim, nos testes, podemos usar caminhos relativos (ex: `/frete/v2/calculo/detalhe`) em vez de escrever a URL completa.
   - `supportFile`: Especifica o arquivo de suporte global (`cypress/support/e2e.js`), que é carregado antes de cada teste. Nele, podemos importar comandos customizados e definir configurações globais.

   Resumindo: esse bloco centraliza e automatiza configurações essenciais para que o Cypress saiba onde rodar os testes e como prepará-los.

3. **README.md**  
   Documentação do projeto.  
   - Explica a finalidade, como rodar os testes, estrutura das pastas e exemplos de uso.

4. **.gitignore**  
   Arquivo para ignorar arquivos/pastas no versionamento.  
   Exemplo real:
   ```
   node_modules/
   screenshots/
   videos/
   ```

5. **package-lock.json**  
   Garante o controle de versões exatas das dependências instaladas.

6. **node_modules/**  
   Pasta gerada automaticamente com todas as dependências instaladas do projeto (não deve ser editada manualmente).

---

## Estrutura da pasta `cypress` (por ordem de relevância)

1. **e2e/Frete-calculo-sit/**  
   Onde ficam os arquivos de teste automatizado para o cenário de frete.  
   Exemplo real:
   - `cypress/e2e/Frete-calculo-sit/frete-calculo-v2-detalhes.cy.js`:
     ```javascript
     describe('Frete Cálculo V2 Detalhes ambiente de sit', () => {
       it('Deve retornar o tipo de entrega e a data de entrega do produto', () => {
         cy.fixture('frete-calculo-v2-detalhes').then((massa) => {
           cy.calculaFreteDetalhe(massa).then((response) => {
             expect(response.status).to.eq(200);
             expect(response.body).to.have.property('fretes');
             expect(response.body.fretes[0]).to.have.nested.property('tipo.nome');
             expect(response.body.fretes[0]).to.have.property('dataEntrega');
           });
         });
       });
     });
     ```

2. **fixtures/**  
   Arquivos de massa de dados (JSON, imagens, etc.) usados nos testes.  
   Exemplo real:
   - `cypress/fixtures/frete-calculo-v2-detalhes.JSon`:
     ```json
     {
       "Canal": "SITE",
       "Cep": "80730000",
       "UnidadeNegocio": "B2CCasasBahia",
       "Produtos": [
         {
           "IdLojista": 10798,
           "IdSku": 1547747740,
           "Quantidade": 1,
           "ValorUnitario": "330",
           "Componentes": null
         }
       ]
     }
     ```

3. **support/**  
   Arquivos de configuração e comandos customizados do Cypress.  
   - `commands.js`: Comandos customizados, como `cy.calculaFreteDetalhe`.
     Exemplo real:
     ```javascript
     Cypress.Commands.add('calculaFreteDetalhe', (body) => {
       return cy.request({
         method: 'POST',
         url: '/frete/v2/calculo/detalhe',
         headers: { 'Content-Type': 'application/json' },
         body
       });
     });
     ```
   - `e2e.js`: Importa os comandos customizados para uso global nos testes:
     ```javascript
     import './commands';
     ```

4. **screenshots/**  
   Prints gerados automaticamente quando um teste falha.

5. **videos**  
   Gravações em vídeo da execução dos testes.

---

## Explicação do cenário de teste automatizado

Arquivo: `cypress/e2e/Frete-calculo-sit/frete-calculo-v2-detalhes.cy.js`

```javascript
describe('Frete Cálculo V2 Detalhes', () => {
  it('Deve retornar os principais dados do frete', () => {
    cy.fixture('frete-calculo-v2-detalhes').then((massa) => {
      cy.calculaFreteDetalhe(massa).then((response) => {
        if (response.status !== 200 || !response.body.fretes || !response.body.fretes.length) {
          return;
        }
        const frete = response.body.fretes[0];
        expect(frete.tipo.nome, 'descricao').to.equal('Normal');
        expect(frete.prazoEntrega, 'PrazoEntrega').to.equal(20);
        expect(frete.dataEntrega, 'dataEntrega').to.equal('16/09/2025');
        expect(frete.valor, 'valor').to.equal(0.00);
      });
    });
  });
});
```

### O que faz cada linha:

- `describe('Frete Cálculo V2 Detalhes', ...)`: Define o grupo de testes para o cenário de cálculo de frete.
- `it('Deve retornar os principais dados do frete', ...)`: Define o caso de teste que será executado.
- `cy.fixture('frete-calculo-v2-detalhes')`: Carrega a massa de dados do arquivo `cypress/fixtures/frete-calculo-v2-detalhes.JSon` (os dados de entrada da requisição).
- `.then((massa) => { ... })`: Recebe a massa de dados carregada e executa o restante do teste.
- `cy.calculaFreteDetalhe(massa)`: Executa o comando customizado (definido em `cypress/support/commands.js`) que faz a requisição POST para a API de frete, usando a massa de dados carregada.
- `.then((response) => { ... })`: Recebe a resposta da API.
- `if (response.status !== 200 || !response.body.fretes || !response.body.fretes.length) { return; }`: Se a resposta não for sucesso (status 200) ou não houver frete disponível, encerra o teste sem falhar.
- `const frete = response.body.fretes[0];`: Pega o primeiro objeto de frete retornado pela API.
- `expect(frete.tipo.nome, 'descricao').to.equal('Normal');`: Verifica se o nome do tipo de entrega é 'Normal'.
- `expect(frete.prazoEntrega, 'PrazoEntrega').to.equal(20);`: Verifica se o prazo de entrega é 20.
- `expect(frete.dataEntrega, 'dataEntrega').to.equal('16/09/2025');`: Verifica se a data de entrega é '16/09/2025'.
- `expect(frete.valor, 'valor').to.equal(0.00);`: Verifica se o valor do frete é 0.00.

### De onde vem cada informação:
- **Massa de dados**: do arquivo `cypress/fixtures/frete-calculo-v2-detalhes.JSon`.
- **Comando customizado**: definido em `cypress/support/commands.js` (faz a requisição para a API).
- **Resposta da API**: a estrutura esperada é um objeto com a propriedade `fretes`, que é um array de opções de frete.
- **Valores esperados**: definidos conforme o retorno esperado da API para o cenário de teste.

---

## Organização do cenário de teste principal

- O cenário **"Deve retornar os principais dados da entrega"** está implementado como um comando customizado Cypress chamado `deveRetornarOsPrincipaisDadosDaDntrega` no arquivo `cypress/support/commands.js`.
- O arquivo de teste `cypress/e2e/Frete-calculo-sit/frete-calculo-v2-detalhes.cy.js` apenas chama esse comando, deixando o teste limpo e fácil de reutilizar:

```javascript
describe('Frete Cálculo V2 Detalhes', () => {
  it('Deve retornar os principais dados da entrega', () => {
    cy.deveRetornarOsPrincipaisDadosDaDntrega();
  });
});
```

### Vantagens dessa abordagem
- Centraliza a lógica do cenário em um único lugar (commands.js), facilitando manutenção e reuso.
- O arquivo de teste fica mais limpo e objetivo.
- Permite reaproveitar o mesmo comando em outros testes, se necessário.

---

## Como funcionam os comandos customizados do Cypress

No projeto, criamos comandos customizados para deixar os testes mais limpos e reutilizáveis. Eles ficam no arquivo `cypress/support/commands.js` e podem ser usados em qualquer teste.

### 1. `cy.calculaFreteDetalhe(massa)`

- **O que faz:**  
  Envia uma requisição POST para a API de cálculo de frete, usando os dados de entrada (massa) do teste.
- **Como funciona:**  
  - Recebe como parâmetro a massa de dados (normalmente vinda de um fixture).
  - Faz a requisição para o endpoint `/frete/v2/calculo/detalhe`.
  - Retorna a resposta da API para ser validada no teste.
- **Exemplo de uso:**  
  ```javascript
  cy.fixture('frete-calculo-v2-detalhes').then((massa) => {
    cy.calculaFreteDetalhe(massa).then((response) => {
      // Validações aqui
    });
  });
  ```

### 2. `cy.deveRetornarOsPrincipaisDadosDaEntrega()`

- **O que faz:**  
  Executa todo o fluxo principal do teste: carrega a massa de dados, faz a requisição e valida os principais campos da resposta da API.
- **Como funciona:**  
  - Carrega automaticamente o fixture com os dados de entrada.
  - Chama o comando `cy.calculaFreteDetalhe` para fazer a requisição.
  - Valida se a resposta tem status 200 e se existe pelo menos um frete.
  - Valida os campos principais do frete retornado (tipo, prazo, data, valor).
  - Se algo estiver errado, o teste falha explicitamente.
- **Exemplo de uso:**  
  ```javascript
  cy.deveRetornarOsPrincipaisDadosDaEntrega();
  ```

### Por que usar comandos customizados?

- Deixam os testes mais organizados e fáceis de entender.
- Evitam repetição de código.
- Facilitam a manutenção: se a lógica mudar, basta ajustar o comando em um só lugar.

---

## Observações importantes sobre o fluxo dos testes

- No comando customizado `deveRetornarOsPrincipaisDadosDaDntrega`, agora o teste **sempre irá falhar explicitamente** se a resposta da API não for sucesso (status diferente de 200) ou não houver fretes na resposta, usando asserções explícitas:
  ```javascript
  expect(response.status, 'Status da resposta').to.equal(200);
  expect(response.body.fretes, 'Deve existir pelo menos um frete').to.exist.and.to.have.length.greaterThan(0);
  ```
  Assim, se a API não retornar o esperado, o teste irá falhar e você será alertado sobre o problema.

- **Por que isso é importante?**
  - Garante que o cenário sempre seja validado.
  - Se a API nunca retornar dados, o teste irá falhar, alertando sobre o problema.
  - Ajuda a identificar rapidamente falhas reais na API ou na massa de dados.

---

## O que são hooks no Cypress?

Hooks são funções especiais usadas para executar comandos antes ou depois dos testes, automatizando preparações e limpezas. Eles ajudam a organizar o fluxo dos testes e evitar repetição de código.

Principais hooks:
- before(): roda uma vez antes de todos os testes do bloco.
- after(): roda uma vez depois de todos os testes do bloco.
- beforeEach(): roda antes de cada teste.
- afterEach(): roda depois de cada teste.

Exemplo:
```javascript
describe('Exemplo com hooks', () => {
  before(() => {
    // Executa uma vez antes de todos os testes
  });

  beforeEach(() => {
    // Executa antes de cada teste
  });

  it('Teste 1', () => {
    // ...
  });

  it('Teste 2', () => {
    // ...
  });

  afterEach(() => {
    // Executa depois de cada teste
  });

  after(() => {
    // Executa uma vez depois de todos os testes
  });
});
```

---

## Qual a diferença entre describe e context no Cypress?

- Ambos servem para agrupar testes e estruturar cenários.
- Não há diferença funcional: context é apenas um alias de describe.
- Use describe para agrupar funcionalidades ou módulos.
- Use context para destacar diferentes condições ou cenários dentro de uma funcionalidade.

Exemplo:
```javascript
describe('API de Frete', () => {
  context('Quando o CEP é válido', () => {
    it('Deve retornar o frete corretamente', () => {
      // teste aqui
    });
  });

  context('Quando o CEP é inválido', () => {
    it('Deve retornar erro', () => {
      // teste aqui
    });
  });
});
```

Resumo: context deixa o código mais legível quando você quer destacar diferentes condições/cenários, mas tecnicamente é igual ao describe.

---

## Sobre module.exports e o sistema de módulos do Node.js

- O Node.js utiliza um sistema de módulos chamado CommonJS para organizar e compartilhar código entre arquivos.
- O comando `module.exports = { ... }` é usado para exportar objetos, funções ou variáveis de um arquivo para que possam ser importados e utilizados em outros arquivos do projeto.
- No contexto do arquivo `cypress.config.js`, usamos:
  ```javascript
  module.exports = {
    e2e: {
      baseUrl: 'https://frete-hub-plataforma-frete-sit.casasbahia.com.br',
      supportFile: 'cypress/support/e2e.js'
    }
  };
  ```
  Isso significa que estamos exportando um objeto de configuração para o Cypress, que será lido automaticamente quando os testes forem executados.
- As propriedades desse objeto (`e2e`, `baseUrl`, `supportFile`) não são variáveis, mas sim chaves do objeto de configuração.
- Esse padrão permite que o Cypress (ou qualquer outro módulo Node.js) importe e utilize essas configurações de forma padronizada e interativa, tornando o projeto modular e fácil de manter.

---

> **Nota sobre hooks e context no Cypress**
>
> **Hooks** são funções especiais usadas para controlar o ciclo de vida dos testes, permitindo executar comandos antes ou depois dos testes ou de cada teste individual. Exemplos: `before`, `after`, `beforeEach`, `afterEach`.
>
> **describe** e **context** servem para agrupar testes. No Cypress, ambos têm a mesma funcionalidade, mas `context` é usado para dar mais clareza ao cenário ou condição testada, enquanto `describe` normalmente descreve uma funcionalidade ou módulo. Usar ambos pode deixar a estrutura dos testes mais organizada e legível.
>
> **Exemplo de uso:**
> ```javascript
> describe('API de Frete', () => {
>   context('Quando o CEP é válido', () => {
>     beforeEach(() => {
>       // Setup específico para este contexto
>     });
>     it('Deve retornar o frete corretamente', () => { /* ... */ });
>   });
> });
> ```

---

## Como executar os testes

Para rodar os testes automatizados, utilize um dos comandos abaixo no terminal, na raiz do projeto:

```sh
npx cypress open
```
Abre a interface gráfica do Cypress para executar e visualizar os testes manualmente.

ou

```sh
npx cypress run
```
Executa todos os testes em modo headless (sem interface gráfica), ideal para integração contínua.

---

## Conclusão

Este projeto demonstra como estruturar e automatizar testes de API utilizando Cypress, com organização de comandos customizados, uso de fixtures e separação clara entre lógica de teste e massa de dados. Essa abordagem facilita a manutenção, reuso e expansão dos testes, garantindo maior qualidade e confiabilidade para a API de frete.
