# Evidências

Prints da exploração manual. Cada imagem está ligada a uma descoberta em [`../planejamento.md`](../planejamento.md) e, quando virou defeito, a uma observação em [`../observacoes/`](../observacoes/README.md).

## Padrão de nomes

`<frente><número>-<descrição-curta>.png`

| Letra | Frente |
|---|---|
| **C** | Carrinho de visitante |
| **K** | Catálogo e busca |
| **A** | API de conta |
| **P** | Compra de ponta a ponta (login, cadastro, checkout, pagamento e fatura) |

- **Número:** o teste daquela frente na ordem em que foi executado na exploração (ex.: `C2` = segundo teste do carrinho, quantidade 0).
- **Número 0:** achado da exploração livre, fora da lista de testes planejados (ex.: `K0-nomes-sem-padrao.png`).
- **Descrição:** o que a imagem prova, em poucas palavras.

O número de observação (OBS-001, OBS-002...) não entra no nome da imagem: ele foi atribuído só no fim, ao consolidar as descobertas. Uma mesma imagem pode servir a mais de uma descoberta (ex.: `A3-dados-pessoais-sem-senha.png` comprova a D17, a D18 e a D19).

## Cores das marcações

| Cor | Significado |
|---|---|
| **Vermelho** | Problema (bug, regra que falta, risco ou melhoria) |
| **Verde** | Resultado OK que prova uma regra crítica (ex.: total do carrinho certo) |
| **Azul** | Comportamento relevante, sem ser defeito (ex.: checkout exige login) |
| **Laranja** | Problema secundário na mesma imagem de um problema principal |

Resultados positivos só ganham print quando provam algo crítico. Os demais ficam comprovados pela automação (ver `DECISOES.md`).

## Outros cuidados

- Dados que pareciam pessoais foram **borrados** antes da publicação, mesmo sendo fictícios.
- Evidências de API são prints do `curl -i`, que mostram o status HTTP, os cabeçalhos e o corpo da resposta.
- Quando a prova é o código HTML, ele está como trecho de texto dentro da própria observação (ex.: OBS-004).
