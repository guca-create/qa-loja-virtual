import { listarProdutos } from '../../support/api/lojaApi';
import { sortear } from '../../support/utils/produtos';
import ProdutoDetalhePage from '../../pages/ProdutoDetalhePage';
import CarrinhoPage from '../../pages/CarrinhoPage';

describe('Carrinho de visitante - remoção', { tags: ['@carrinho', '@regressao'] }, () => {
  it('remove um item, mantém o outro, a remoção persiste após recarregar e o carrinho fica vazio no fim', () => {
    listarProdutos().then((r) => {
      const [p1, p2] = sortear(r.json.products, 2);
      cy.log(`Produtos: ${p1.id} e ${p2.id}`);

      ProdutoDetalhePage.abrir(p1.id).adicionarAoCarrinho(1).continuarComprando();
      ProdutoDetalhePage.abrir(p2.id).adicionarAoCarrinho(1).irParaCarrinho();

      CarrinhoPage.el.linhas().should('have.length', 2);
      CarrinhoPage.removerProduto(p1.id);
      CarrinhoPage.el.linha(p2.id).should('be.visible');

      cy.reload();
      CarrinhoPage.el.linha(p1.id).should('not.exist');
      CarrinhoPage.el.linhas().should('have.length', 1);

      CarrinhoPage.removerProduto(p2.id);
      CarrinhoPage.el.vazio().should('be.visible').and('contain.text', 'Cart is empty');
    });
  });
});
