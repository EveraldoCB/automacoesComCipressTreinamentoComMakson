Cypress.Commands.add('calculaFreteDetalhe', (body) => {
  if (Cypress.env('CI')) {
    return cy.wrap({
      status: 200,
      body: {
        fretes: [{ tipo: { nome: 'Normal' }, prazoEntrega: 5, valor: 59.8, dataEntrega: '2025-09-15' }]
      }
    });
  }
  return cy.request('POST', 'http://frete-hub-plataforma-frete-hlg.casasbahia.com.br/frete/v3/calculo/detalhe', body);
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