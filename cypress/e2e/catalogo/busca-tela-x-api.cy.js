import { buscarProduto } from '../../support/api/lojaApi';
import ProdutosPage from '../../pages/ProdutosPage';

/**
 * Data-driven: a mesma comparação tela x API para vários termos.
 * Os termos são entradas do teste. Os resultados esperados vêm da API, nunca fixos.
 * Técnica: partição de equivalência (termo com resultados, sem resultados,
 * maiúsculas, variações de escrita e marca/categoria).
 */
const TERMOS = ['top', 'TOP', 'tshirt', 't-shirt', 'jean', 'dress', 'Polo', 'Women', 'termo-que-nao-existe-qa'];

describe('Busca - tela x API', { tags: ['@catalogo', '@regressao'] }, () => {
  TERMOS.forEach((termo) => {
    it(`"${termo}": a tela mostra os mesmos produtos que a API devolve`, () => {
      buscarProduto(termo).then((r) => {
        expect(r.json.responseCode).to.eq(200);
        const nomesApi = r.json.products.map((p) => p.name.trim()).sort();
        cy.log(`API: ${nomesApi.length} resultado(s)`);

        ProdutosPage.abrir().buscar(termo).nomesExibidos().then((nomesTela) => {
          expect(nomesTela.sort(), `busca "${termo}"`).to.deep.eq(nomesApi);
        });
      });
    });
  });
});
