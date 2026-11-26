import BasePage from './BasePage';

class ProdutoDetalhePage extends BasePage {
  el = {
    nome: () => cy.get('.product-information h2'),
    preco: () => cy.get('.product-information span span'),
    quantidade: () => cy.get('#quantity'),
    botaoAdicionar: () => cy.get('button.cart'),
    modal: () => cy.get('#cartModal'),
    verCarrinho: () => cy.get('#cartModal a[href="/view_cart"]'),
    continuarComprando: () => cy.get('#cartModal .close-modal'),
  };

  abrir(idProduto) {
    this.visitar(`/product_details/${idProduto}`);
    return this;
  }

  adicionarAoCarrinho(quantidade = 1) {
    this.el.quantidade().clear().type(String(quantidade));
    this.el.botaoAdicionar().click();
    this.el.modal().should('be.visible');
    return this;
  }

  irParaCarrinho() {
    this.el.verCarrinho().click();
  }

  continuarComprando() {
    this.el.continuarComprando().click();
    this.el.modal().should('not.be.visible');
    return this;
  }
}

export default new ProdutoDetalhePage();
