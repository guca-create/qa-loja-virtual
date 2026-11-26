# Planejamento e dúvidas de negócio

Ambiente: automationexercise.com (público e compartilhado) | Navegador: Chrome 157 | Período: 25 e 26/11/2026

## 1. Descobertas da exploração

| # | Frente | O que testei | O que aconteceu | Evidência |
|---|---|---|---|---|
| D01 | Carrinho | Adicionar o mesmo produto 2 vezes pela página do produto | OK: quantidade virou 2 e total Rs. 1000 (500 x 2) | [C1-mesmo-produto-2x.png](evidencias/C1-mesmo-produto-2x.png) |
| D02 | Carrinho | Adicionar pela lista e pela página do produto | Na lista não há campo de quantidade, sempre entra 1. Na página do produto dá para escolher | [C1-lista-sem-quantidade.png](evidencias/C1-lista-sem-quantidade.png) |
| D03 | Catálogo | Rolar a lista de produtos | Cards com alturas diferentes deixam buracos na grade | [K0-grade-desalinhada.png](evidencias/K0-grade-desalinhada.png) |
| D04 | Catálogo | Contagem de marcas da lateral x API productsList | OK: as 8 marcas batem, 34 produtos no total | [K0-marcas.png](evidencias/K0-marcas.png) |
| D05 | API de conta | verifyLogin com conta já apagada (teste automatizado) | HTTP 200, mas o corpo diz responseCode 404 | [A0-status-200-com-erro-404.png](evidencias/A0-status-200-com-erro-404.png) |
| D06 | Carrinho | Alterar a quantidade dentro do carrinho | A quantidade é um botão desativado: clicar não faz nada e não há + ou -. Para reduzir, só removendo a linha inteira | [C6-quantidade-nao-editavel.png](evidencias/C6-quantidade-nao-editavel.png) |
| D07 | Carrinho | Navegar até o carrinho sem bloqueador de anúncio | Anúncio de terceiros em tela cheia cobre o carrinho, muda a URL para #google_vignette e leva para outro site | [C0-anuncio-tela-cheia-carrinho.png](evidencias/C0-anuncio-tela-cheia-carrinho.png) |
| D08 | Catálogo | Navegar pela lista sem bloqueador de anúncio | Banner e popup cobrem botões "Add to cart", e um script de anúncio transforma partes do nome do produto ("Dress", "T-Shirt") em link de propaganda. O nome muda conforme o mouse está ou não sobre o card | [K0-anuncios-cobrem-produtos.png](evidencias/K0-anuncios-cobrem-produtos.png) |
| D09 | Catálogo | Comparar os nomes em "Recommended Items" com a API | O produto 3 aparece com nome "Rs. 1000" em vez de "Sleeveless Dress" (API e lista principal mostram o nome certo). Confirmado no HTML vindo do servidor, então não é efeito de anúncio | [K0-recomendados-sem-nome.png](evidencias/K0-recomendados-sem-nome.png) |
| D10 | Catálogo | Rolar até o fim da página inicial | Faixa em branco abaixo do Copyright, provavelmente o espaço do banner de anúncio recolhido. Visual, sem impacto nos dados | [K0-faixa-branca-rodape.png](evidencias/K0-faixa-branca-rodape.png) |
| D11 | Carrinho | Clicar em "Proceed To Checkout" como visitante | Aviso exige Register / Login para finalizar. Melhoria: o aviso não tem X para fechar, e a única saída é "Continue On Cart", cujo texto não deixa claro que só fecha o aviso | [C7-checkout-exige-login.png](evidencias/C7-checkout-exige-login.png) |
| D12 | Compra | Abrir a tela de login | Não existe opção "Esqueci minha senha". Há também um anúncio "Secure Login Solutions" na tela de senha, que pode ser confundido com um recurso da loja | [P0-login-sem-recuperar-senha.png](evidencias/P0-login-sem-recuperar-senha.png) |
| D13 | Compra | Ver as opções de país no cadastro | Só 7 países. Brasil não está na lista, embora o módulo seja para o CPB | [P0-cadastro-sem-brasil.png](evidencias/P0-cadastro-sem-brasil.png) |
| D14 | API de conta | Clicar em "Delete Account" logado | A conta é apagada na hora, sem pedido de confirmação, e a exclusão é permanente | [A0-apagar-conta-sem-confirmacao.png](evidencias/A0-apagar-conta-sem-confirmacao.png) |
| D15 | Compra | Ver endereço de entrega e cobrança no checkout | O nome aparece como ". pedro" (com ponto na frente), enquanto o topo mostra "pedro". Provável causa: título (Mr/Mrs) não escolhido no cadastro | [P1-nome-com-ponto-no-endereco.png](evidencias/P1-nome-com-ponto-no-endereco.png) |
| D16 | Catálogo | Comparar a escrita dos nomes dos produtos (tela e API) | Nomes sem padrão: um todo em maiúsculas; T-shirt escrito de 4 jeitos; traço longo e espaço faltando. Pode afetar a busca | [K0-nomes-sem-padrao.png](evidencias/K0-nomes-sem-padrao.png) |
| D17 | API de conta | getUserDetailByEmail só com o e-mail, sem senha | Devolve nome, data de nascimento, endereço completo, empresa e ID interno do cliente sem nenhuma autenticação | [A3-dados-pessoais-sem-senha.png](evidencias/A3-dados-pessoais-sem-senha.png) |
| D18 | API de conta | Cabeçalhos da resposta da API | O corpo é JSON, mas o Content-Type é text/html | [A3-dados-pessoais-sem-senha.png](evidencias/A3-dados-pessoais-sem-senha.png) |
| D19 | API de conta | Comparar o que é enviado no createAccount com o que volta no getUserDetailByEmail | birth_date enviado volta como birth_day, e mobile_number não volta | [A3-dados-pessoais-sem-senha.png](evidencias/A3-dados-pessoais-sem-senha.png) |
| D20 | API de conta | createAccount com dados válidos | O cabeçalho HTTP é 200, mas o corpo diz responseCode 201. Mesmo padrão da D05 | [A2-criar-conta-status-200-corpo-201.png](evidencias/A2-criar-conta-status-200-corpo-201.png) |
| D21 | Compra | Clicar em "Logged in as <nome>" no topo | Não abre nada. Não existe área de perfil nem histórico de pedidos | [P0-sem-area-de-perfil.png](evidencias/P0-sem-area-de-perfil.png) |
| D22 | Geral | Enviar o formulário Contact us sem dados válidos | Aceita Name, Subject e Message vazios e nome só com números, e mostra "Success!" | [K0-contato-aceita-campos-vazios.png](evidencias/K0-contato-aceita-campos-vazios.png), [K0-contato-nome-numerico.png](evidencias/K0-contato-nome-numerico.png) |
| D23 | Catálogo | Abrir /product_details/9999 (ID que não existe na API) | Página "vazia" com imagem quebrada, mas com "NEW", avaliação, "In Stock" e o botão Add to cart | [K1-produto-inexistente.png](evidencias/K1-produto-inexistente.png) |
| D24 | Compra | Pagar com letras no número do cartão, CVC e validade | Pagamento aceito e pedido confirmado ("Order Placed!") | [P2-pagamento-aceita-letras.png](evidencias/P2-pagamento-aceita-letras.png) |
| D25 | Compra | Clicar em "Download Invoice" após a compra | A fatura é um .txt com uma frase só, sem itens nem número do pedido. O valor é o mesmo número da URL /payment_done/<valor> | [P3-fatura-incompleta.png](evidencias/P3-fatura-incompleta.png) |
| D26 | Carrinho | Adicionar produto com quantidade 0 pela página do produto | O site aceita e mostra "Added!" | [C2-quantidade-zero-aceita.png](evidencias/C2-quantidade-zero-aceita.png) |

As descobertas com a mesma causa foram consolidadas em observações formais em [`observacoes/`](observacoes/README.md).

## 2. Riscos por frente (em ordem de prioridade)

### Ordem das frentes e por quê

1. **API de conta**: é onde está o dado pessoal. Um erro aqui expõe clientes e gera risco legal (LGPD) para o CPB, e não tem como desfazer depois do vazamento.
2. **Compra de ponta a ponta**: é onde entra dinheiro. Erro aqui gera cobrança errada, pedido sem pagamento e reclamação.
3. **Carrinho de visitante**: alimenta o valor do pedido. Erro de quantidade ou total vira cobrança errada na frente 4.
4. **Catálogo e busca**: erro aqui confunde o cliente, mas raramente gera prejuízo direto. O pedido usa o preço do carrinho, não o da vitrine.

### Frente 1: carrinho de visitante
1. Quantidade inválida aceita (0, negativa) levando a total errado no pedido (**confirmado**, D26).
2. Total da linha diferente de preço x quantidade (testado, OK para 1, 2, 5 e 10 unidades).
3. Remoção que não persiste ou deixa item "fantasma" (testado, OK).
4. Cliente não consegue corrigir a quantidade no carrinho e desiste (**confirmado**, D06).

### Frente 2: catálogo e busca
1. Tela e API mostrando produtos, nomes ou preços diferentes (**confirmado** nos Recommended Items, D09).
2. Busca da tela e da API com resultados diferentes para o mesmo termo (coberto pelo teste data-driven).
3. Produto inexistente acessível e "comprável" (**confirmado**, D23).
4. Nomes sem padrão prejudicando a busca (**confirmado**, D16).

### Frente 3: API de conta
1. Dado pessoal acessível sem autenticação (**confirmado**, D17: o mais grave do projeto).
2. Status HTTP que não reflete o resultado e engana integrações (**confirmado**, D05 e D20).
3. Contas duplicadas ou exclusão indevida (testado, OK: duplicidade e senha errada são recusadas).
4. Contrato inconsistente entre envio e consulta (**confirmado**, D18 e D19).

### Frente 4: compra de ponta a ponta
1. Pedido confirmado sem pagamento válido (**confirmado**, D24).
2. Total do checkout ou da fatura diferente da soma dos itens (coberto pelo teste de ponta a ponta).
3. Endereço de entrega errado (**confirmado** parcialmente: nome com ". " na D15 e Brasil ausente na D13).
4. Cliente sem comprovante nem histórico para conferir a compra (**confirmado**, D21 e D25).

## 3. Perguntas ao PO / dev

| # | Pergunta | Se a resposta for A, meu teste... | Se for B, meu teste... |
|---|---|---|---|
| P01 | A lista de produtos deve permitir escolher a quantidade, ou a adição rápida de 1 unidade é intencional? | Intencional: vira premissa e o teste só confere que entra 1 unidade | Não intencional: vira melhoria para o fornecedor e um cenário de quantidade pela lista |
| P02 | O cliente deve poder alterar a quantidade dentro do carrinho? | Sim: vira defeito para o fornecedor e cenário de aumentar/diminuir | Não: vira premissa, e o teste cobre só remover e adicionar de novo |
| P03 | O módulo entregue ao CPB terá anúncios de terceiros? | Sim: vira risco alto e testo carrinho e checkout com anúncios ligados | Não: o fornecedor remove os anúncios, e a automação continua bloqueando-os por estabilidade |
| P04 | O carrinho montado como visitante deve ser mantido depois do login? | Sim: testo que os mesmos itens e quantidades continuam após entrar | Não: vira premissa, e o cliente precisa ser avisado de que perderá o carrinho |
| P05 | A recuperação de senha faz parte do escopo deste módulo? | Sim: vira defeito e cenários de recuperação (e-mail válido, inválido, link expirado) | Não: vira premissa e risco registrado |
| P06 | Quais países o módulo deve atender? O Brasil é obrigatório? | Inclui Brasil: vira defeito alto, e testo CEP brasileiro (8 dígitos) e estados | Lista atual intencional: vira premissa, com risco de endereço errado |
| P07 | A exclusão de conta deve pedir confirmação (ou senha) antes de apagar? | Sim: vira defeito e cenário de cancelar a exclusão | Não: vira premissa, e o teste só confere que a conta deixa de existir |
| P08 | Quem pode consultar os dados de um cliente pela API, e com qual autenticação? | Só o titular ou o CPB, com token: defeito crítico, e testo sem token e com token de outro usuário | Consulta aberta intencional: risco crítico de LGPD para o PO decidir antes do aceite |
| P09 | O módulo deve ter área do cliente com dados cadastrais e histórico de pedidos? | Sim: regra que falta, e testo editar dados e ver o pedido após a compra | Não: a conferência da compra fica só na tela "Order Placed" e na fatura |
| P10 | O pagamento será processado por um gateway real ou a tela é a única validação? | Gateway real: testo a integração e as recusas (inválido, sem saldo, expirado) | Só a tela: defeito crítico, e todos os formatos inválidos viram cenários negativos |
| P11 | Qual quantidade máxima por item o carrinho deve aceitar? | Existe limite (ex.: estoque): testo o limite e o limite + 1 | Sem limite: vira premissa e testo um valor alto para checar o total |

## 4. Premissas adotadas (onde faltou regra)

| # | Premissa | Por que adotei | Como afeta os testes |
|---|---|---|---|
| PR01 | A API é a fonte da verdade do catálogo (nomes, preços, marcas) | É o dado cadastrado; a tela só exibe | Todo valor esperado nos testes de tela vem da API, nunca fixo |
| PR02 | Quantidade mínima por item é 1 | Quantidade 0 ou negativa não tem sentido em um pedido | Testes com 1, 2, 5 e 10 passam; 0 é falha esperada (OBS-006) |
| PR03 | O status HTTP deve refletir o resultado (convenção REST) | É o que clientes e ferramentas de monitoramento usam | Status x corpo vira teste de falha esperada (OBS-003) |
| PR04 | Dado pessoal só é acessível com autenticação do titular | LGPD e contexto do CPB | Consulta sem autenticação é falha esperada (OBS-001) |
| PR05 | Cartão: número com 13 a 19 dígitos, CVC com 3 ou 4, validade futura | Padrões das bandeiras de cartão | Cada classe inválida vira um caso data-driven (OBS-002) |
| PR06 | Anúncios não fazem parte do módulo avaliado | O fornecedor entrega a loja, não a publicidade do site de demonstração | Anúncios são bloqueados na automação e registrados como risco (OBS-013) |
| PR07 | Preços são inteiros em rúpias ("Rs. N") | Todos os 34 produtos seguem esse formato na API | O teste de estrutura valida o formato e o cálculo de totais usa inteiros |
| PR08 | O carrinho de visitante não precisa sobreviver ao login | Sem regra; o site exige login só no checkout | Fora da automação até a resposta da P04 |
