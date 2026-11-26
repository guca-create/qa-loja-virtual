# Observações e melhorias

Cada observação junta as descobertas da exploração (`docs/planejamento.md`) que têm a mesma causa.

Severidade:

- **Crítica**: expõe dado pessoal, permite cobrança errada ou bloqueia o aceite.
- **Alta**: dado errado chega ao pedido ou ao cliente.
- **Média**: regra ausente com contorno, ou API incoerente para quem integra.
- **Baixa**: visual, texto ou usabilidade sem impacto no dado.

| ID | Título | Tipo | Frente | Severidade | Automatizado |
|---|---|---|---|---|---|
| [OBS-001](OBS-001.md) | API devolve dados pessoais sem autenticação | Bug | API de conta | Crítica | Sim |
| [OBS-002](OBS-002.md) | Pagamento aceita dados de cartão inválidos e confirma o pedido | Bug | Compra | Crítica | Sim |
| [OBS-003](OBS-003.md) | Status HTTP sempre 200, mesmo em erro | Bug | API de conta | Média | Sim |
| [OBS-004](OBS-004.md) | "Recommended Items" mostra produto sem nome ("Rs. 1000") | Bug | Catálogo | Média | Sim |
| [OBS-005](OBS-005.md) | Produto inexistente é exibido como "In Stock" e com Add to cart | Bug | Catálogo | Média | Sim |
| [OBS-006](OBS-006.md) | Carrinho aceita quantidade 0 | Bug | Carrinho | Alta | Sim |
| [OBS-007](OBS-007.md) | Cadastro não oferece o Brasil como país | Regra que falta | Compra | Alta | Não |
| [OBS-008](OBS-008.md) | Nome aparece com ". " na frente no endereço do checkout | Bug | Compra | Média | Não |
| [OBS-009](OBS-009.md) | Quantidade não pode ser alterada dentro do carrinho | Regra que falta | Carrinho | Média | Não |
| [OBS-010](OBS-010.md) | Fatura é um .txt com uma frase | Regra que falta | Compra | Média | Sim |
| [OBS-011](OBS-011.md) | Sem recuperação de senha e sem área do cliente | Regra que falta | API de conta / Compra | Média | Não |
| [OBS-012](OBS-012.md) | Contrato da API inconsistente | Bug | API de conta | Baixa | Sim |
| [OBS-013](OBS-013.md) | Anúncios de terceiros interferem no carrinho e no catálogo | Risco | Carrinho / Catálogo | Média | Não |
| [OBS-014](OBS-014.md) | Conta é apagada com um clique, sem confirmação | Melhoria | API de conta | Média | Não |
| [OBS-015](OBS-015.md) | Nomes de produtos sem padrão | Melhoria | Catálogo | Baixa | Não |
| [OBS-016](OBS-016.md) | Usabilidade: lista sem quantidade e aviso de checkout sem X | Melhoria | Carrinho | Baixa | Não |
| [OBS-017](OBS-017.md) | Contact us não valida os campos | Bug | Geral | Baixa | Não |
| [OBS-018](OBS-018.md) | Grade de produtos com buracos | Bug | Catálogo | Baixa | Não |

## O que precisa voltar para o fornecedor antes do aceite

1. **OBS-001** e **OBS-002** (críticas): bloqueiam o aceite.
2. **OBS-006** e **OBS-007** (altas): corrigir antes da publicação.
3. **OBS-003**, **OBS-004**, **OBS-005**, **OBS-008** a **OBS-014**: corrigir ou decidir com o PO (perguntas P01 a P10).
4. Baixas: backlog de melhorias.
