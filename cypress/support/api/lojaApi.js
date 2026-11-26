/**
 * Cliente da API da loja. Um método por endpoint.
 *
 * Observações importantes sobre esta API:
 * - O corpo vem como JSON, mas o Content-Type é text/html, então o Cypress entrega uma string.
 *   `lerJson` converte, e o texto original fica em `corpoBruto`.
 * - Os parâmetros são enviados como formulário (form-urlencoded), não como JSON.
 * - failOnStatusCode: false, porque os testes negativos precisam inspecionar o erro.
 */
const base = () => Cypress.env('apiUrl');

function lerJson(corpo) {
  if (corpo && typeof corpo === 'object') return corpo;
  try {
    return JSON.parse(corpo);
  } catch (e) {
    return null;
  }
}

export function requisitar(method, rota, { form, qs } = {}) {
  const opcoes = { method, url: `${base()}/${rota}`, failOnStatusCode: false };
  if (form) Object.assign(opcoes, { form: true, body: form });
  if (qs) opcoes.qs = qs;

  return cy.request(opcoes).then((resp) => ({
    status: resp.status,
    headers: resp.headers,
    corpoBruto: resp.body,
    json: lerJson(resp.body),
  }));
}

export const listarProdutos = (method = 'GET') => requisitar(method, 'productsList');

export const listarMarcas = (method = 'GET') => requisitar(method, 'brandsList');

export const buscarProduto = (termo, method = 'POST') =>
  requisitar(method, 'searchProduct', termo === undefined ? {} : { form: { search_product: termo } });

export const verificarLogin = (credenciais, method = 'POST') =>
  requisitar(method, 'verifyLogin', { form: credenciais });

export const criarConta = (usuario) => requisitar('POST', 'createAccount', { form: usuario });

export const atualizarConta = (usuario) => requisitar('PUT', 'updateAccount', { form: usuario });

export const apagarConta = ({ email, password }) =>
  requisitar('DELETE', 'deleteAccount', { form: { email, password } });

export const detalheUsuario = (email) =>
  requisitar('GET', 'getUserDetailByEmail', email === undefined ? {} : { qs: { email } });
