// Teste modernizado para Frete Cálculo V3 Detalhes, usando intercept para mockar a resposta

// @grep regressivo
describe('Testes da API Frete Cálculo V3 Detalhes', () => {
  context('Quando o CEP é válido', () => {
    // @grep cenariosPositivos regressivo
    it('Deve retornar o tipo de entrega, o prazo, a data e o valor', () => {
      cy.deveRetornaroTipoDeEntregaoPrazoaDataeoValor();
    });
  });

  context('Quando o CEP é inválido (vazio)', () => {
    // @grep cenariosNegativos regressivo
    it('testeComCampoCepVazio', () => {
      cy.testeComCampoCepVazio();
    });
  });
});
