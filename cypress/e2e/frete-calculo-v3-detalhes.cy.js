// Teste modernizado para Frete Cálculo V3 Detalhes, usando intercept para mockar a resposta

describe('Testes da API Frete Cálculo V3 Detalhes', () => {
  beforeEach(() => {
    cy.intercept(
      'POST',
      'http://frete-hub-plataforma-frete-hlg.casasbahia.com.br/frete/v3/calculo/detalhe',
      {
        statusCode: 200,
        body: {
          fretes: [
            {
              tipo: { nome: 'Normal' },
              prazoEntrega: 5,
              valor: 59.8,
              dataEntrega: '2025-09-15'
            }
          ]
        }
      }
    ).as('mockFreteV3');
  });

  context('Quando o CEP é válido', () => {
    it('Deve retornar os principais dados do frete', () => {
      cy.deveRetornarOsPrincipaisDadosDaEntrega();
    });
  });
});
