import BasePage from './BasePage';

class ProdutosPage extends BasePage {
  el = {
    campoBusca: () => cy.get('#search_product'),
    botaoBusca: () => cy.get('#submit_search'),
    cards: () => cy.get('.features_items .product-image-wrapper'),
    nomes: () => cy.get('.features_items .productinfo p'),
    titulo: () => cy.get('.features_items .title'),
  };

  abrir() {
    this.visitar('/products');
    return this;
  }

  buscar(termo) {
    this.el.campoBusca().clear().type(termo);
    this.el.botaoBusca().click();
    return this;
  }

  /** Nomes dos produtos exibidos na tela, como array de texto. */
  nomesExibidos() {
    return cy.get('body').then(($body) => {
      const itens = $body.find('.features_items .productinfo p');
      return [...itens].map((el) => el.innerText.trim());
    });
  }
}

export default new ProdutosPage();
