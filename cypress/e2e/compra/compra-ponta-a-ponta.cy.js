import { listarProdutos } from '../../support/api/lojaApi';
import { criarUsuario } from '../../support/factories/usuarioFactory';
import { precoParaNumero, sortear } from '../../support/utils/produtos';
import LoginPage from '../../pages/LoginPage';
import ProdutoDetalhePage from '../../pages/ProdutoDetalhePage';
import CarrinhoPage from '../../pages/CarrinhoPage';
import CheckoutPage from '../../pages/CheckoutPage';
import PagamentoPage, { CARTAO_VALIDO } from '../../pages/PagamentoPage';

describe('Compra de ponta a ponta', { tags: ['@compra', '@smoke'] }, () => {
  it('conta criada pela API entra pela tela, compra 2 produtos e o resultado confere', () => {
    const usuario = criarUsuario();
    cy.criarContaViaApi(usuario);

    listarProdutos().then((r) => {
      const produtos = sortear(r.json.products, 2);
      const totalEsperado = produtos.reduce((soma, p) => soma + precoParaNumero(p.price), 0);
      cy.log(`Produtos: ${produtos.map((p) => p.id).join(', ')} | total esperado: ${totalEsperado}`);

      // Entra pela tela com a conta criada na API
      LoginPage.entrar(usuario);
      LoginPage.usuarioLogado().should('contain.text', usuario.name);

      // Monta o carrinho
      ProdutoDetalhePage.abrir(produtos[0].id).adicionarAoCarrinho(1).continuarComprando();
      ProdutoDetalhePage.abrir(produtos[1].id).adicionarAoCarrinho(1).irParaCarrinho();
      CarrinhoPage.el.linhas().should('have.length', 2);
      CarrinhoPage.irParaCheckout();

      // Checkout: endereço igual ao cadastrado na API e total igual à soma dos preços da API
      CheckoutPage.el.enderecoEntrega()
        .should('contain.text', `${usuario.firstname} ${usuario.lastname}`)
        .and('contain.text', usuario.address1)
        .and('contain.text', usuario.city)
        .and('contain.text', usuario.zipcode)
        .and('contain.text', usuario.country);
      CheckoutPage.el.totalGeral().invoke('text').then(precoParaNumero).should('eq', totalEsperado);

      // Pagamento e confirmação
      CheckoutPage.fazerPedido();
      PagamentoPage.pagar(CARTAO_VALIDO);
      PagamentoPage.el.pedidoConfirmado().should('be.visible');

      // A fatura deve trazer o mesmo total
      PagamentoPage.el.baixarFatura().invoke('attr', 'href').then((href) => {
        cy.request(href).its('body').should('include', String(totalEsperado));
      });

      // Depois da compra, o carrinho fica vazio
      CarrinhoPage.abrir();
      CarrinhoPage.el.vazio().should('be.visible');
    });
  });
});
