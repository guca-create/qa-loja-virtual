# Uso de IA

Registro feito durante o desafio. Escreva com suas palavras.

## Ferramentas e etapas

| Ferramenta | Etapas |
|---|---|
| Claude (claude.ai) | Estrutura do projeto Cypress, cliente da API, primeiros testes, roteiro de exploração, organização das descobertas e marcação das evidências |

## Instruções / skills / agentes que usei

- Pedi que a IA sempre devolvesse cada evidência marcada (vermelho para problema, verde para OK) junto com a linha pronta para o planejamento, para manter o padrão e não perder nenhuma descoberta.

## O que a IA errou ou não previu, e como percebi

| Quando | O que aconteceu | Como percebi | O que fiz |
|---|---|---|---|
| Setup | A IA não previu que o npm 11 bloqueia o download do Cypress | O `npm install` mostrou o aviso `install-scripts` | Rodei `npx cypress install` |
| Setup | A instalação do Cypress travou em "Unzipping 0%" no Windows | Fiquei vários minutos sem progresso | Baixei o Cypress pelo `curl` e extraí com `tar`. A solução foi documentada no README |
| Exploração | A IA sugeriu dois padrões diferentes de nome para as evidências | Notei a diferença entre OBS-001 e C1/K0 | Pedi um padrão único: código do teste + descrição |
| Exploração | A IA considerou irrelevante a falta de um X para fechar o aviso de checkout do visitante | Discordei: o usuário precisa de uma saída clara para fechar o aviso e continuar na mesma tela | Registrei como melhoria de usabilidade (D11) e pedi para refazer a evidência |

## O que revisei ou reescrevi antes de entregar
| Revisão | A estrutura inicial do código apresentava oportunidades de melhoria em organização, legibilidade e eficiência | Analisei toda a estrutura do código-fonte, identificando pontos de otimização, redundâncias e oportunidades de refatoração | Revisei e reestruturei o código, implementando melhorias de organização, padronização e otimização, aprimorando a legibilidade, a performance, a manutenibilidade e a escalabilidade do projeto |
