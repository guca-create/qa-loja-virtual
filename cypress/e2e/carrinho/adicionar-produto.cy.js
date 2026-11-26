import { listarProdutos } from '../../support/api/lojaApi';
import { precoParaNumero, sortear } from '../../support/utils/produtos';
import ProdutoDetalhePage from '../../pages/ProdutoDetalhePage';
import CarrinhoPage from '../../pages/CarrinhoPage';

describe('Carrinho de visitante', { tags: ['@carrinho', '@smoke'] }, () => {
  it('adiciona um produto e mostra nome, preço, quantidade e total iguais aos da API', () => {
    listarProdutos().then((r) => {
      const [produto] = sortear(r.json.products);
      const preco = precoParaNumero(produto.price);
      cy.log(`Produto sorteado: ${produto.id} - ${produto.name} (${produto.price})`);

      ProdutoDetalhePage.abrir(produto.id).adicionarAoCarrinho(1).irParaCarrinho();

      CarrinhoPage.el.nome(produto.id).should('have.text', produto.name);
      CarrinhoPage.el.preco(produto.id).invoke('text').then(precoParaNumero).should('eq', preco);
      CarrinhoPage.el.quantidade(produto.id).should('have.text', '1');
      CarrinhoPage.el.total(produto.id).invoke('text').then(precoParaNumero).should('eq', preco);
    });
  });
});
