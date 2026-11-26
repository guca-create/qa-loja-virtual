import { requisitar } from '../../support/api/lojaApi';

/**
 * Data-driven: cada linha é um caso (método, endpoint, parâmetros) e o código esperado.
 * Os códigos esperados vêm da documentação oficial da API (api_list), não de uma suposição.
 * Técnica: tabela de decisão (método x parâmetros x resultado).
 */
const CASOS = [
  { id: 'API-01', metodo: 'GET', rota: 'productsList', esperado: 200 },
  { id: 'API-02', metodo: 'POST', rota: 'productsList', esperado: 405 },
  { id: 'API-03', metodo: 'GET', rota: 'brandsList', esperado: 200 },
  { id: 'API-04', metodo: 'PUT', rota: 'brandsList', esperado: 405 },
  { id: 'API-05', metodo: 'POST', rota: 'searchProduct', form: { search_product: 'top' }, esperado: 200 },
  { id: 'API-06', metodo: 'POST', rota: 'searchProduct', esperado: 400 },
  { id: 'API-07', metodo: 'POST', rota: 'verifyLogin', form: { password: 'qualquer' }, esperado: 400 },
  { id: 'API-08', metodo: 'DELETE', rota: 'verifyLogin', esperado: 405 },
  { id: 'API-09', metodo: 'POST', rota: 'verifyLogin', form: { email: 'qa_inexistente_000@example.com', password: 'x' }, esperado: 404 },
  { id: 'API-10', metodo: 'GET', rota: 'getUserDetailByEmail', qs: { email: 'qa_inexistente_000@example.com' }, esperado: 404 },
];

describe('API - código e mensagem no corpo', { tags: ['@api', '@regressao'] }, () => {
  CASOS.forEach(({ id, metodo, rota, form, qs, esperado }) => {
    it(`${id} ${metodo} ${rota}: corpo traz responseCode ${esperado} e uma mensagem`, () => {
      requisitar(metodo, rota, { form, qs }).then((r) => {
        expect(r.json, 'corpo é JSON válido').to.be.an('object');
        expect(r.json.responseCode).to.eq(esperado);
        if (esperado !== 200) expect(r.json.message, 'mensagem de erro').to.be.a('string').and.not.be.empty;
      });
    });
  });
});

describe('[FALHA ESPERADA][OBS-003] API - status HTTP deve refletir o resultado', { tags: ['@api', '@bug-conhecido'] }, () => {
  CASOS.filter((c) => c.esperado !== 200).forEach(({ id, metodo, rota, form, qs, esperado }) => {
    it(`${id} ${metodo} ${rota}: status HTTP deve ser ${esperado}, igual ao corpo`, () => {
      requisitar(metodo, rota, { form, qs }).then((r) => {
        expect(r.status, `HTTP (corpo diz ${r.json && r.json.responseCode})`).to.eq(esperado);
      });
    });
  });
});
