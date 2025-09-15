// Teste modernizado para Frete Cálculo V3 Detalhes, usando intercept para mockar a resposta

describe('Testes da API Frete Cálculo V3 Detalhes', () => {
  context('Quando o CEP é válido', () => {
    it('Deve retornar o tipo de entrega, o prazo, a data e o valor', () => {
      cy.deveRetornaroTipoDeEntregaoPrazoaDataeoValor();
    });
  });
});
