import { listarProdutos } from '../../support/api/lojaApi';
import { precoParaNumero, sortear } from '../../support/utils/produtos';
import ProdutoDetalhePage from '../../pages/ProdutoDetalhePage';
import CarrinhoPage from '../../pages/CarrinhoPage';

/**
 * Data-driven: a mesma regra (total = preço x quantidade) com várias quantidades.
 * Técnica: partição de equivalência + valor limite (1 é o menor valor válido).
 */
const QUANTIDADES_VALIDAS = [1, 2, 5, 10];

describe('Carrinho de visitante - quantidade e total', { tags: ['@carrinho', '@regressao'] }, () => {
  let produto;

  beforeEach(() => {
    listarProdutos().then((r) => {
      [produto] = sortear(r.json.products);
      cy.log(`Produto sorteado: ${produto.id} - ${produto.name} (${produto.price})`);
    });
  });

  QUANTIDADES_VALIDAS.forEach((qtd) => {
    it(`quantidade ${qtd}: carrinho mostra ${qtd} unidade(s) e total = preço x ${qtd}`, () => {
      const preco = precoParaNumero(produto.price);

      ProdutoDetalhePage.abrir(produto.id).adicionarAoCarrinho(qtd).irParaCarrinho();

      CarrinhoPage.el.quantidade(produto.id).should('have.text', String(qtd));
      CarrinhoPage.el.total(produto.id).invoke('text').then(precoParaNumero).should('eq', preco * qtd);
    });
  });

  it('[FALHA ESPERADA][OBS-006] quantidade 0 não deve mostrar confirmação de adição', { tags: ['@bug-conhecido'] }, () => {
    cy.intercept(/add_to_cart/).as('adicionar');
    ProdutoDetalhePage.abrir(produto.id);
    ProdutoDetalhePage.el.quantidade().clear().type('0');
    ProdutoDetalhePage.el.botaoAdicionar().click();

    // Espera a resposta do servidor antes de conferir: o aviso só aparece depois dela.
    cy.wait('@adicionar');
    ProdutoDetalhePage.el.modal().should('not.be.visible');
  });

  it('[FALHA ESPERADA][OBS-006] quantidade 0 não deve colocar o produto no carrinho', { tags: ['@bug-conhecido'] }, () => {
    cy.intercept(/add_to_cart/).as('adicionar');
    ProdutoDetalhePage.abrir(produto.id);
    ProdutoDetalhePage.el.quantidade().clear().type('0');
    ProdutoDetalhePage.el.botaoAdicionar().click();
    cy.wait('@adicionar');

    CarrinhoPage.abrir();
    CarrinhoPage.el.linha(produto.id).should('not.exist');
  });
});
