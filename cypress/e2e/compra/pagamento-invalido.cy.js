import { listarProdutos } from '../../support/api/lojaApi';
import { criarUsuario } from '../../support/factories/usuarioFactory';
import { sortear } from '../../support/utils/produtos';
import LoginPage from '../../pages/LoginPage';
import ProdutoDetalhePage from '../../pages/ProdutoDetalhePage';
import CarrinhoPage from '../../pages/CarrinhoPage';
import CheckoutPage from '../../pages/CheckoutPage';
import PagamentoPage from '../../pages/PagamentoPage';

/**
 * Data-driven: cartões inválidos, um tipo de erro por linha.
 * Técnica: partição de equivalência (classes inválidas) e valor limite (mês 13, ano passado).
 */
const CARTOES_INVALIDOS = [
  { caso: 'número com letras', cartao: { nome: 'QA', numero: 'ABCDEFGHIJKLMNOP', cvc: '123', mes: '12', ano: '2030' } },
  { caso: 'CVC com letras', cartao: { nome: 'QA', numero: '4111111111111111', cvc: 'ABC', mes: '12', ano: '2030' } },
  { caso: 'mês 13', cartao: { nome: 'QA', numero: '4111111111111111', cvc: '123', mes: '13', ano: '2030' } },
  { caso: 'cartão vencido (ano 2000)', cartao: { nome: 'QA', numero: '4111111111111111', cvc: '123', mes: '12', ano: '2000' } },
];

describe('[FALHA ESPERADA][OBS-002] Pagamento - dados de cartão inválidos', { tags: ['@compra', '@bug-conhecido'] }, () => {
  CARTOES_INVALIDOS.forEach(({ caso, cartao }) => {
    it(`não confirma o pedido com ${caso}`, () => {
      const usuario = criarUsuario();
      cy.criarContaViaApi(usuario);
      listarProdutos().then((r) => {
        const [produto] = sortear(r.json.products);
        LoginPage.entrar(usuario);
        ProdutoDetalhePage.abrir(produto.id).adicionarAoCarrinho(1).irParaCarrinho();
        CarrinhoPage.irParaCheckout();
        CheckoutPage.fazerPedido();
        PagamentoPage.pagar(cartao);
        PagamentoPage.el.pedidoConfirmado().should('not.exist');
        cy.url().should('not.include', '/payment_done');
      });
    });
  });
});
