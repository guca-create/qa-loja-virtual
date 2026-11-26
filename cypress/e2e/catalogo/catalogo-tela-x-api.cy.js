import { listarProdutos } from '../../support/api/lojaApi';
import ProdutosPage from '../../pages/ProdutosPage';
import HomePage from '../../pages/HomePage';

describe('Catálogo - tela e API contam a mesma história', { tags: ['@catalogo', '@regressao'] }, () => {
  it('a página de produtos mostra exatamente os produtos da API', { tags: ['@smoke'] }, () => {
    listarProdutos().then((r) => {
      const nomesApi = r.json.products.map((p) => p.name.trim()).sort();
      ProdutosPage.abrir().nomesExibidos().then((nomesTela) => {
        expect(nomesTela.sort()).to.deep.eq(nomesApi);
      });
    });
  });

  it('as contagens de marcas da lateral batem com a API', () => {
    listarProdutos().then((r) => {
      const esperado = {};
      r.json.products.forEach((p) => { esperado[p.brand] = (esperado[p.brand] || 0) + 1; });
      HomePage.abrir().contagemDeMarcas().should('deep.eq', esperado);
    });
  });

  it('[FALHA ESPERADA][OBS-004] todos os "Recommended Items" têm nomes que existem na API', { tags: ['@bug-conhecido'] }, () => {
    listarProdutos().then((r) => {
      const nomesApi = r.json.products.map((p) => p.name.trim());
      HomePage.abrir().nomesRecomendados().then((recomendados) => {
        const desconhecidos = recomendados.filter((n) => !nomesApi.includes(n));
        expect(desconhecidos, 'nomes recomendados que não existem na API').to.deep.eq([]);
      });
    });
  });

  it('[FALHA ESPERADA][OBS-005] produto inexistente não deve ser exibido como à venda', { tags: ['@bug-conhecido'] }, () => {
    listarProdutos().then((r) => {
      const idInexistente = Math.max(...r.json.products.map((p) => p.id)) + 1000;
      cy.visit(`/product_details/${idInexistente}`, { failOnStatusCode: false });
      cy.get('button.cart').should('not.exist');
      cy.contains(/in stock/i).should('not.exist');
    });
  });
});
