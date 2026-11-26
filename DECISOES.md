# Decisões

## O que priorizei e por quê

Ordenei as frentes pelo tamanho do prejuízo de um defeito: **API de conta** (dado pessoal, LGPD), **compra** (dinheiro), **carrinho** (valor do pedido) e **catálogo** (informação). O detalhamento está em `docs/planejamento.md`, seção 2.

Na automação, priorizei:

1. **Fluxos que o cliente não pode perder:** compra de ponta a ponta e ciclo de vida da conta. São o smoke.
2. **Comparações tela x API**, porque o desafio pede que as duas "contem a mesma história" e porque a API serve de oráculo: nenhum valor esperado fica escrito no teste.
3. **Regras com muitas entradas**, como quantidade, termos de busca, combinações de método e cartões inválidos. Viraram testes data-driven: uma regra, várias linhas.
4. **Um teste de falha esperada para cada defeito automatizável** (OBS-001 a 006 e 012), para que a pipeline avise quando o fornecedor corrigir.

**Política de evidências:** todo defeito tem print marcado (vermelho). Resultado positivo só ganha print quando prova uma regra crítica (verde, ex.: total do carrinho e marcas). Os demais positivos ficam provados pela automação, que roda de novo a qualquer momento.

## O que ficou de fora e por quê

- **Contato, newsletter, vídeos e avaliações de produto:** fora das 4 frentes do escopo. Um defeito do Contact us foi registrado (OBS-017) porque apareceu, mas não foi aprofundado.
- **Ataques (força bruta, injeção, muitas requisições):** o ambiente é público, de terceiros e compartilhado. Registrei o risco, mas não ataquei.
- **Visual e anúncios na automação:** dependem de terceiros e mudam a cada carregamento. Ficaram manuais e documentados (OBS-013, OBS-018).
- **Regras que dependem do PO** (quantidade no carrinho, exclusão com confirmação, Brasil, fatura): ficaram manuais até a resposta das perguntas P01 a P11. Automatizar agora seria inventar a regra.
- **Cadastro pela tela:** a criação de contas é feita pela API, como o desafio pede. O formulário da tela só foi explorado manualmente.

## Dados e isolamento em ambiente compartilhado

- **Dados únicos:** cada conta é criada pela factory com nome `QA_<autor>_<id>` e e-mail `qa_<autor>_<id>@example.com`, onde o id combina data/hora, contador e número aleatório. Duas execuções simultâneas nunca usam o mesmo e-mail.
- **Nada fixo do ambiente:** produtos, preços e contagens vêm da API a cada execução. Se outra pessoa (ou o fornecedor) mudar o catálogo, os testes acompanham.
- **Sessão própria por teste:** `testIsolation` ligado. Cada teste começa sem cookies, sem storage e com o carrinho vazio, e cria a própria conta quando precisa.
- **Limpeza garantida, em três camadas:**
  1. A conta é registrada **antes** de ser criada (se a criação falhar no meio, ainda tentamos apagar).
  2. Um `afterEach` global apaga as contas registradas. Ele roda **mesmo quando o teste falha**.
  3. O evento `after:run` apaga o que sobrar se o processo morrer antes do `afterEach`.
- **Só mexemos no que criamos:** nenhum teste altera ou apaga contas que não foram criadas por ele.
- **Anúncios bloqueados** (`blockHosts`): eles mudam a cada carregamento, cobrem botões e alteram textos. Isso é registrado como risco do produto, mas não pode derrubar testes de regra de negócio.

## Como organizar para outras telas e várias equipes

- **Camadas separadas e reaproveitáveis:** `pages/` (uma classe por tela), `support/api/` (um método por endpoint), `support/factories/` (dados) e `support/limpeza/`. Uma nova tela ganha um Page Object e reaproveita API, factories e limpeza.
- **Pacote compartilhado:** cliente de API, comandos (`criarContaViaApi`), limpeza e geradores de dados viram uma biblioteca interna versionada (ex.: `@cpb/qa-core`), que cada equipe importa. Cada equipe mantém só seus Page Objects e specs.
- **Contrato de seletores:** pedir aos desenvolvedores atributos `data-qa` estáveis (este site já usa em parte). Isso reduz manutenção mais que qualquer outra prática.
- **Tags padronizadas:** `@smoke`, `@regressao`, `@bug-conhecido` e uma por frente (`@carrinho`, `@api`...). Cada equipe roda só o que é seu.
- **Convenções escritas no README:** nomes, prefixo de dados, falha esperada e proibição de espera fixa. Revisão de PR checa essas regras.

## Pipeline

### Quando rodam

| Momento | O que roda | Tempo alvo |
|---|---|---|
| Pull request | `@smoke` (compra, ciclo da conta, catálogo x API, estrutura) | menos de 5 min |
| Diariamente (dias úteis, 6h) e antes de cada entrega do fornecedor | Regressão completa, sem `@bug-conhecido` | menos de 20 min |
| Diariamente, em job separado | `@bug-conhecido` | informativo |

Arquivo: `.github/workflows/cypress.yml`.

### O que bloqueia

- **Smoke falhando bloqueia o merge.** Compra e dados de conta não podem quebrar.
- **Regressão falhando bloqueia o aceite** da entrega do fornecedor até análise.
- **`@bug-conhecido` não bloqueia.** Quando um desses testes **passa**, é sinal de que o defeito foi corrigido: o teste perde a tag e entra na regressão.

### Teste instável

- **Prevenção:** sem espera fixa (esperamos elementos e respostas), dados únicos, sessão isolada e anúncios bloqueados. Essas foram as causas de instabilidade encontradas na exploração.
- **Uma nova tentativa automática** (`retries.runMode: 1`) só para absorver oscilações do ambiente público. Um teste que só passa na segunda tentativa é registrado.
- **Quarentena:** teste que oscila 2 vezes na semana ganha a tag `@instavel`, sai da execução que bloqueia e vira uma tarefa com responsável e prazo. Ele não pode ficar mais de uma sprint em quarentena: ou é corrigido ou é removido.
- **Evidências:** prints de falha são publicados como artefato da execução, para analisar sem precisar reproduzir.
