import BasePage from './BasePage';

class HomePage extends BasePage {
  el = {
    nomesRecomendados: () => cy.get('.recommended_items .productinfo p'),
    marcas: () => cy.get('.brands-name li a'),
  };

  abrir() {
    this.visitar('/');
    return this;
  }

  /** Nomes dos itens recomendados, inclusive os escondidos no carrossel (lê o texto do HTML). */
  nomesRecomendados() {
    return this.el.nomesRecomendados().then(($p) => $p.toArray().map((el) => el.textContent.trim()));
  }

  /** Marcas da lateral como { nome: quantidade }. Ex.: { Polo: 6 } */
  contagemDeMarcas() {
    return this.el.marcas().then(($a) => {
      const mapa = {};
      $a.toArray().forEach((a) => {
        const qtd = Number((a.querySelector('span') || {}).textContent.replace(/\D/g, ''));
        const nome = a.getAttribute('href').split('/').pop();
        mapa[decodeURIComponent(nome)] = qtd;
      });
      return mapa;
    });
  }
}

export default new HomePage();
