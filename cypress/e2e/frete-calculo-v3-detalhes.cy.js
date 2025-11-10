/**
 * Testes da API Frete Cálculo V3 Detalhes
 * Utiliza @cypress/grep para filtrar execução por tags
 * 
 * Execução por tags:
 * - npm run cypress:grep:positivos (cenários de sucesso)
 * - npm run cypress:grep:negativos (cenários de erro)
 */

describe('Testes da API Frete Cálculo V3 Detalhes', { tags: ['api', 'frete'] }, () => {
  
  context('Cenários Positivos', { tags: ['cenariosPositivos'] }, () => {
    it('Deve retornar o tipo de entrega, o prazo, a data e o valor', { tags: ['smoke'] }, () => {
      cy.deveRetornaroTipoDeEntregaoPrazoaDataeoValor();
    });
  });

  context('Cenários Negativos', { tags: ['cenariosNegativos'] }, () => {
    it('Deve retornar erro quando CEP estiver vazio', { tags: ['validation'] }, () => {
      cy.testeComCampoCepVazio();
    });
  });

});
