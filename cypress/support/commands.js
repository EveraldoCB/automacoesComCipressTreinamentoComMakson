Cypress.Commands.add('calculaFreteDetalhe', (body) => {
  return cy.request({
    method: 'POST',
    url: 'http://frete-hub-plataforma-frete-hlg.casasbahia.com.br/frete/v3/calculo/detalhe', // url absoluta
    headers: { 'Content-Type': 'application/json' },
    body,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('deveRetornarOsPrincipaisDadosDaEntrega', () => {
  cy.fixture('frete-calculo-v3-detalhes').then((massa) => {
    cy.calculaFreteDetalhe(massa).then((response) => {
      expect(response.status).to.equal(200);
      const frete = response.body.fretes[0];
      expect(frete.tipo.nome).to.equal('Normal');
      expect(frete).to.have.property('prazoEntrega').that.is.a('number');
      expect(frete).to.have.property('valor').that.is.a('number');
      expect(frete.dataEntrega).to.exist;
    });
  });
});