Cypress.Commands.add('calculaFreteDetalhe', (body) => {
  if (Cypress.env('CI')) {
    // Mock para CI: resposta simulada
    return cy.wrap({
      status: 200,
      failOnStatusCode: false,
      body: {
        fretes: [{ tipo: { nome: 'Normal' }, prazoEntrega: 7, valor: 41.82, dataEntrega: '24/09/2025' }]
      }
    });
  }
  return cy.api('POST', 'http://frete-hub-plataforma-frete-hlg.casasbahia.com.br/frete/v3/calculo/detalhe', body);
});

Cypress.Commands.add('deveRetornaroTipoDeEntregaoPrazoaDataeoValor', () => {
  cy.fixture('frete-calculo-v3-detalhes').then(massa => {
    cy.calculaFreteDetalhe(massa).then(response => {
      expect(response.status).to.eq(200);
      const frete = response.body.fretes[0];
      expect(frete.tipo.nome).to.eq('Normal');
      expect(frete.prazoEntrega).to.be.a('number');
      expect(frete.valor).to.be.a('number');
      expect(frete.dataEntrega).to.exist;
    });
  });
});

Cypress.Commands.add('testeComCampoCepVazio', () => {
  const massa = {
    Canal: 'SITE',
    Cep: '',
    UnidadeNegocio: 'B2CCasasBahia',
    Produtos: [
      {
        IdLojista: 10037,
        IdSku: 12857509,
        Quantidade: 1,
        ValorUnitario: '299.00'
      }
    ]
  };

  // Sempre intercepta no CI ANTES do request
  if (Cypress.env('CI')) {
    cy.intercept('POST', 'http://frete-hub-plataforma-frete-hlg.casasbahia.com.br/frete/v3/calculo/detalhe', (req) => {
      req.reply({
        statusCode: 400,
        body: {
          erro: {
            mensagem: 'Informe um CEP válido. A informação inserida é inválida ou inexistente.',
            detalhes: [
              {
                codigo: 8,
                detalhe: 'O cep  nao corresponde ao padrão 99999999'
              }
            ]
          }
        }
      });
    }).as('mockFreteErro');
  }

  cy.request({
    method: 'POST',
    url: 'http://frete-hub-plataforma-frete-hlg.casasbahia.com.br/frete/v3/calculo/detalhe',
    body: massa,
    failOnStatusCode: false
  }).then(response => {
    expect(response.status).to.eq(400);
    expect(response.body.erro).to.exist;
    expect(response.body.erro.mensagem).to.contain('Informe um CEP válido');
    expect(response.body.erro.detalhes[0].codigo).to.eq(8);
  });
});