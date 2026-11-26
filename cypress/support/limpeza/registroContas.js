/**
 * Registro das contas criadas na execução (roda no processo Node do Cypress).
 * Toda conta é registrada ANTES de ser criada, para que a limpeza funcione
 * mesmo se o teste falhar no meio.
 */
const pendentes = new Map();

module.exports = {
  registrar({ email, password }) {
    pendentes.set(email, password);
    return null;
  },
  remover(email) {
    pendentes.delete(email);
    return null;
  },
  listar() {
    return [...pendentes].map(([email, password]) => ({ email, password }));
  },
  async limparTudo(apiUrl) {
    for (const [email, password] of pendentes) {
      try {
        await fetch(`${apiUrl}/deleteAccount`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ email, password }),
        });
        console.log(`[limpeza] conta removida no fim da execução: ${email}`);
      } catch (e) {
        console.warn(`[limpeza] falha ao remover ${email}: ${e.message}`);
      }
    }
    pendentes.clear();
  },
};
