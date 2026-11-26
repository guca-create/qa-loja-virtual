import BasePage from './BasePage';

class ProdutosPage extends BasePage {
  el = {
    campoBusca: () => cy.get('#search_product'),
    botaoBusca: () => cy.get('#submit_search'),
    titulo: () => cy.get('.features_items .title'),
  };

  abrir() {
    this.visitar('/products');
    return this;
  }

  buscar(termo) {
    this.el.campoBusca().clear().type(termo);
    this.el.botaoBusca().click();
    this.el.titulo().should('contain.text', 'Searched Products');
    return this;
  }

  /** Nomes exibidos na grade de produtos (vazio se não houver resultado). */
  nomesExibidos() {
    return cy.get('.features_items').then(($grade) =>
      $grade.find('.productinfo p').toArray().map((el) => el.textContent.trim()));
  }
}

export default new ProdutosPage();
