# Automação da API de Frete cálculo com Cypress - Mentoria Com Makson

## Gerenciamento de dependências e node_modules

- Todas as dependências do projeto (incluindo o Cypress) são registradas no arquivo `package.json`.
- Para instalar as dependências, execute `npm install`. Isso cria a pasta `node_modules` na raiz do projeto.
- A pasta `node_modules` **não é enviada para o GitHub** porque está listada no `.gitignore`. Cada pessoa que clonar o projeto deve rodar `npm install` para gerar essa pasta localmente.
- Não edite manualmente a `node_modules`.

---

## Como iniciar o projeto

1. Inicialize o projeto Node.js:
   ```sh
   npm init -y
   ```
   O parâmetro `-y` aceita todas as configurações padrão automaticamente, criando o arquivo `package.json`.
2. Instale o Cypress como dependência de desenvolvimento:
   ```sh
   npm install --save-dev cypress
   ```
3. Verifique a versão instalada do Cypress:
   ```sh
   npx cypress --version
   ```

---

## Estrutura dos arquivos principais do projeto

1. **package.json**
   - Arquivo principal de configuração do projeto Node.js. Registra dependências, scripts e metadados.
2. **cypress.config.js**
   - Arquivo de configuração do Cypress. Define baseUrl, arquivos de suporte e outras opções globais.
3. **.gitignore**
   - Lista arquivos e pastas que não devem ser versionados (ex: node_modules, screenshots, videos).
4. **package-lock.json**
   - Garante o controle de versões exatas das dependências instaladas.
5. **node_modules/**
   - Pasta gerada automaticamente com todas as dependências instaladas do projeto (não deve ser editada manualmente).
6. **README.md**
   - Documentação do projeto: finalidade, como rodar os testes, estrutura das pastas e exemplos de uso.

---

## Estrutura da pasta `cypress`

1. **e2e/Frete-calculo-sit/**  
   Onde ficam os arquivos de teste automatizado para o cenário de frete.  
   Exemplo real:
   - `cypress/e2e/Frete-calculo-sit/frete-calculo-v3-detalhes.cy.js`:
     ```javascript
     describe('Frete Cálculo V3 Detalhes ambiente de sit', () => {
       it('Deve retornar o tipo de entrega e a data de entrega do produto', () => {
         cy.fixture('frete-calculo-v3-detalhes').then((massa) => {
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
   - `cypress/fixtures/frete-calculo-v3-detalhes.JSon`:
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
         url: '/frete/v3/calculo/detalhe',
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

Arquivo: `cypress/e2e/Frete-calculo-sit/frete-calculo-v3-detalhes.cy.js`

```javascript
describe('Frete Cálculo V3 Detalhes', () => {
  it('Deve retornar os principais dados do frete', () => {
    cy.fixture('frete-calculo-v3-detalhes').then((massa) => {
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

- `describe('Frete Cálculo V3 Detalhes', ...)`: Define o grupo de testes para o cenário de cálculo de frete.
- `it('Deve retornar os principais dados do frete', ...)`: Define o caso de teste que será executado.
- `cy.fixture('frete-calculo-v3-detalhes')`: Carrega a massa de dados do arquivo `cypress/fixtures/frete-calculo-v3-detalhes.JSon` (os dados de entrada da requisição).
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
- **Massa de dados**: do arquivo `cypress/fixtures/frete-calculo-v3-detalhes.JSon`.
- **Comando customizado**: definido em `cypress/support/commands.js` (faz a requisição para a API).
- **Resposta da API**: a estrutura esperada é um objeto com a propriedade `fretes`, que é um array de opções de frete.
- **Valores esperados**: definidos conforme o retorno esperado da API para o cenário de teste.

---

## Organização do cenário de teste principal

- O cenário **"Deve retornar os principais dados da entrega"** está implementado como um comando customizado Cypress chamado `deveRetornarOsPrincipaisDadosDaDntrega` no arquivo `cypress/support/commands.js`.
- O arquivo de teste `cypress/e2e/Frete-calculo-sit/frete-calculo-v3-detalhes.cy.js` apenas chama esse comando, deixando o teste limpo e fácil de reutilizar:

```javascript
describe('Frete Cálculo V3 Detalhes', () => {
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
  - Faz a requisição para o endpoint `/frete/v3/calculo/detalhe`.
  - Retorna a resposta da API para ser validada no teste.
- **Exemplo de uso:**  
  ```javascript
  cy.fixture('frete-calculo-v3-detalhes').then((massa) => {
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

- Todos os testes, fixtures e comandos agora usam apenas a versão v3 do endpoint e dos arquivos.
- O teste principal (`frete-calculo-v3-detalhes.cy.js`) utiliza `cy.intercept()` para mockar a resposta da API, garantindo que o teste passe mesmo sem acesso externo.
- Arquivos, exemplos e instruções que referenciavam "v2" foram atualizados para "v3".
- O arquivo antigo `frete-calculo-v2-detalhes.cy.js` foi substituído por `frete-calculo-v3-detalhes.cy.js`.

## Explicação do workflow CI (`.github/workflows/ci-cypress.yml`)

Este arquivo define o pipeline de integração contínua (CI) para rodar os testes automatizados do Cypress no GitHub Actions. Veja o que faz cada linha:

- `name: CI Cypress`: Dá um nome para o workflow.
- `on`: Define quando o workflow será executado.
  - `push` e `pull_request`: O workflow roda em pushes e pull requests nas branches `main` e `pdiQaNaPratica`.
- `jobs`: Define os trabalhos (jobs) que serão executados.
  - `cypress-run`: Nome do job principal.
    - `runs-on: ubuntu-latest`: O job será executado em uma máquina virtual Ubuntu.
    - `steps`: Lista de etapas do job.
      - `Checkout code`: Baixa o código do repositório.
      - `Setup Node.js`: Instala o Node.js na versão 20.x.
      - `Install dependencies`: Executa `npm install` para instalar todas as dependências do projeto.
      - `Run Cypress tests`: Executa os testes Cypress com `npm test`. As variáveis de ambiente `CI: true` e `CYPRESS_CI: true` garantem que o mock dos testes seja ativado, evitando falhas por falta de acesso externo à API.
      - `Save Cypress screenshots`: Salva os screenshots gerados pelos testes como artefato do workflow.
      - `Save Cypress videos`: Salva os vídeos gerados pelos testes como artefato do workflow.

Esse workflow garante que, a cada alteração enviada para o repositório, os testes automatizados sejam executados automaticamente, validando a qualidade do código e evitando que erros cheguem à branch principal.

---

## Integração Cypress com GitHub Actions e uso de tags (@cypress/grep)

### 1. Configuração do GitHub Actions para Cypress
- Foi criado o arquivo `.github/workflows/cypress.yml` para rodar testes Cypress automaticamente em cada push ou pull request.
- O workflow executa os seguintes passos:
  1. Faz checkout do código.
  2. Instala o Node.js (versão 20).
  3. Instala as dependências do projeto (`npm ci`).
  4. Executa os testes Cypress normalmente (`npx cypress run`).
  5. Executa os testes Cypress filtrando por tags usando o pacote @cypress/grep (`npx cypress run --env grep=smoke`).
  6. Salva screenshots e vídeos dos testes como artefatos do workflow.

### 2. Instalação do pacote @cypress/grep
- O pacote @cypress/grep foi instalado para permitir o uso de tags nos testes Cypress.
- Para instalar manualmente, execute:
  ```pwsh
  npm install @cypress/grep --save-dev
  ```

### 3. Como usar tags nos testes Cypress
- Adicione tags nos seus testes usando a propriedade `tags`:
  ```js
  describe('Frete', { tags: ['regressivo', 'frete'] }, () => {
    it('deve calcular o frete corretamente', { tags: ['smoke'] }, () => {
      // seu teste aqui
    });
  });
  ```
- Para rodar apenas testes com uma tag específica:
  ```pwsh
  npx cypress run --env grep=smoke
  ```
- O workflow já está configurado para rodar testes com e sem filtro de tags.

### 4. Referências
- Documentação Cypress GitHub Actions: https://docs.cypress.io/guides/continuous-integration/github-actions
- Pacote @cypress/grep: https://www.npmjs.com/package/@cypress/grep

### 5. Onde cada passo está na configuração do workflow

Abaixo está o mapeamento dos passos descritos para a configuração do arquivo `.github/workflows/cypress.yml`:

1. **Checkout do código**
   - Step:
     ```yaml
     - name: Checkout code
       uses: actions/checkout@v4
     ```
2. **Instalação do Node.js (versão 20)**
   - Step:
     ```yaml
     - name: Setup Node.js
       uses: actions/setup-node@v4
       with:
         node-version: '20'
     ```
3. **Instalação das dependências**
   - Step:
     ```yaml
     - name: Install dependencies
       run: npm ci
     ```
4. **Execução dos testes Cypress normalmente**
   - Step:
     ```yaml
     - name: Run Cypress tests
       run: npx cypress run
     ```
5. **Execução dos testes Cypress filtrando por tags (@cypress/grep)**
   - Step:
     ```yaml
     - name: Run Cypress tests with grep (tags)
       run: npx cypress run --env grep=smoke
     ```
6. **Salvamento de screenshots e vídeos como artefatos**
   - Steps:
     ```yaml
     - name: Upload screenshots
       uses: actions/upload-artifact@v4
       with:
         name: cypress-screenshots
         path: cypress/screenshots

     - name: Upload videos
       uses: actions/upload-artifact@v4
       with:
         name: cypress-videos
         path: cypress/videos
     ```

Esses passos garantem que o workflow está de acordo com o que foi documentado, permitindo que qualquer usuário siga o README e entenda como tudo funciona manualmente.

---

### 6. Como habilitar o uso de tags (@cypress/grep) nos testes Cypress

Para permitir o uso de tags nos testes automatizados, foi adicionado o seguinte trecho ao arquivo `cypress/support/e2e.js`:

```javascript
// Para habilitar o uso de tags (@cypress/grep) nos testes, adicione as linhas abaixo:
const { register: registerCypressGrep } = require('@cypress/grep');
registerCypressGrep();
```

Essas linhas registram o plugin @cypress/grep, permitindo filtrar e executar testes por tags usando o comando:

```pwsh
npx cypress run --env grep=nomeDaTag
```

Com isso, o projeto está pronto para utilizar tags em qualquer cenário de teste Cypress.

---

### 7. Como ativar a pré-filtragem de especificações (specs) com @cypress/grep

Opcionalmente, você pode configurar o Cypress para pré-filtrar os arquivos de teste (specs) antes da execução, tornando a filtragem por tags ainda mais eficiente. Para isso, adicione o seguinte trecho ao arquivo `cypress.config.js`:

```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Ativa a pré-filtragem de especificações pelo @cypress/grep
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
      cypressGrepPlugin(config)
      return config
    },
  },
})
```

Com essa configuração, o Cypress irá considerar apenas os arquivos de teste que possuem as tags especificadas ao rodar comandos como:

```pwsh
npx cypress run --env grep=nomeDaTag
```

Essa opção é útil para projetos grandes, pois acelera a execução dos testes filtrando os arquivos relevantes antes mesmo de rodar o Cypress.

---

## Modelo de documentação de cenários de teste (API e Frontend)

### Exemplo de cenário de teste

**Produto:** [Nome do Produto]  
**Tipo:** API / Frontend  
**Cenário:** [Nome do cenário]  
**Objetivo:** Descrever o que está sendo validado  
**Pré-condições:** Listar requisitos para execução  
**Dados de entrada:** Informar massa de dados ou parâmetros  
**Passos:**  
1. [Passo 1]  
2. [Passo 2]  
3. ...  
**Resultado esperado:** Descrever o resultado esperado  
**Observações:** Pontos de atenção, dependências, integrações  

---

### Checklist semanal de refinamento
- [ ] Cenários atualizados conforme refinamento
- [ ] Comandos customizados revisados
- [ ] Fixtures revisadas e documentadas
- [ ] Integração entre produtos validada
- [ ] README e estudos.md atualizados
- [ ] Cobertura de cenários de erro e borda
- [ ] Documentação de mudanças relevantes

---

### Boas práticas para múltiplos produtos
- Separe cenários e documentação por produto
- Documente integrações e dependências
- Mantenha exemplos práticos para cada produto
- Atualize documentação após cada refinamento
- Facilite onboarding de novos QAs com guias rápidos

---

## Como usar tags (@cypress/grep) nos testes Cypress

### Diferença entre tags nos comentários e no nome dos cenários

O plugin @cypress/grep permite filtrar testes de duas formas:

- **Tags nos comentários (`// @grep tag`)**  
  Adicione comentários acima dos testes ou blocos. Para filtrar por essas tags, use o parâmetro `--env grepTags=nomeDaTag`.  
  Exemplo:
  ```javascript
  // @grep cenariosPositivos
  it('Meu teste positivo', () => { ... });
  ```
  Comando para rodar:
  ```sh
  npx cypress run --env grepTags=cenariosPositivos
  ```

- **Tags no nome do cenário**  
  Coloque a palavra-chave da tag no nome do teste. O filtro é feito com o parâmetro `--env grep=nomeDaTag`.  
  Exemplo:
  ```javascript
  it('[cenariosPositivos] Meu teste positivo', () => { ... });
  ```
  Comando para rodar:
  ```sh
  npx cypress run --env grep=cenariosPositivos
  ```

### Qual a melhor prática?

> **A melhor prática é usar tags nos comentários**  
> Isso mantém o nome dos testes limpo, permite múltiplas tags por teste e facilita a manutenção.  
> Sempre prefira o uso de `// @grep tag` acima dos testes e utilize `--env grepTags=nomeDaTag` para filtrar.

---

## Exemplos de uso

- Para rodar todos os testes marcados como cenários positivos:
  ```sh
  npx cypress run --env grepTags=cenariosPositivos
  ```

- Para rodar todos os testes marcados como cenários negativos:
  ```sh
  npx cypress run --env grepTags=cenariosNegativos
  ```

- Para rodar todos os testes marcados como regressivo:
  ```sh
  npx cypress run --env grepTags=regressivo
  ```

- Para rodar todos os testes (sem filtro de tag):
  ```sh
  npx cypress run
  ```

## Pipeline (GitHub Actions)

Para filtrar por tag na pipeline, use steps como:

```yaml
- name: Run Cypress tests with tag (cenariosPositivos)
  run: npx cypress run --env grepTags=cenariosPositivos
  env:
    CYPRESS_CI: true
```

Assim, só os testes com essa tag serão executados nesse passo.

---

## Resumo rápido

- Use `// @grep tag` acima do teste para marcar com uma ou mais tags.
- Use `--env grepTags=nomeDaTag` para filtrar por tags nos comentários.
- Use `--env grep=nome` para filtrar por palavra no nome do teste (menos recomendado).
- Tags nos comentários são mais flexíveis e deixam o nome do teste limpo.

---

## Links importantes do Cypress

### 1. [Run Cypress tests in GitHub Actions: A Step-by-Step Guide | Cypress Documentation](https://docs.cypress.io/guides/continuous-integration/github-actions)
- **Para que serve:** Guia oficial do Cypress para configurar e rodar testes automatizados no GitHub Actions.
- **O que estudar:**
  - Como criar e estruturar o arquivo de workflow YAML.
  - Como instalar dependências, rodar testes e salvar artefatos (screenshots, vídeos) na pipeline.
  - Boas práticas para integração contínua com Cypress.
- **Quando usar:** Sempre que precisar configurar, revisar ou refatorar a pipeline de testes automatizados no GitHub Actions.

### 2. [@cypress/grep - npm](https://www.npmjs.com/package/@cypress/grep)
- **Para que serve:** Página oficial do pacote @cypress/grep no npm, que permite filtrar e executar testes Cypress por tags ou palavras-chave.
- **O que estudar:**
  - Como instalar o pacote via npm.
  - Como marcar testes com tags (comentários ou nomes).
  - Como rodar testes filtrando por tags usando os parâmetros `grep` e `grepTags`.
  - Exemplos de uso e opções avançadas de configuração.
- **Quando usar:** Sempre que quiser implementar, revisar ou entender o uso de tags para filtrar cenários de teste no Cypress.

---
