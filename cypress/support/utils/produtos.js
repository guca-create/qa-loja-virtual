/** "Rs. 1.500" ou "Rs. 1500" -> 1500 */
export const precoParaNumero = (texto) => Number(String(texto).replace(/\D/g, ''));

/** Sorteia n itens distintos. O teste registra (cy.log) o que foi sorteado, para reproduzir uma falha. */
export const sortear = (lista, n = 1) =>
  [...lista].sort(() => Math.random() - 0.5).slice(0, n);
