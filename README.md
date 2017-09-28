<img src="https://avatars1.githubusercontent.com/u/3846050?v=4&s=200" width="127px" height="127px" align="left"/>

# Pilot

A próxima versão da Dashboard Pagar.me

<br>

[![Join the chat at https://gitter.im/pagarme/react-event-components](https://badges.gitter.im/pagarme/pilot.svg)](https://gitter.im/pagarme/pilot?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<br>


Pilot é o codinome da nova dashboard do Pagar.me. O produto foi criado
a partir de feedbacks dos usuários, para que eles possam ter uma
experiência cada vez mais transparente de sua operação financeira no
Pagar.me, e consigam focar no seu negócio!

A home do Pilot entrega aos clientes um panorama da sua operação: é
possível visualizar volume total de transações, índice de chargeback,
taxa de crescimento, etc. Além disso, são disponibilizados alguns
indicadores específicos que fazem sentido para diferentes tipos de
operação.

O Pilot ainda está **em fase de desenvolvimento**! Para mais
informações sobre o estado do Pilot, acompanhe a Timeline do
projeto, manteremos ela atualizada a cada trimestre com
informações sobre o estado funcional do projeto!

## Timeline do projeto

### Q3 2017

Criamos o projeto no Github. Integramos a equipe de UI no Git de forma a
termos os assets do projeto disponíveis dentro do mesmo repositório (modelo
de monorepo). Organizamos as [milestones de desenvolvimento][milestones]
no Github, criamos um [styleguide de React][react-styleguide] para o
projeto.

<details>
<summary>Ver Q2 2017, Q1 2017, Q4 2016</summary>

### Q2 2017

A equipe de UX conduziu os esforços para desenhar protótipos baseados
no feedback dos clientes, executar testes de usabilidade e adaptar os
protótipos conforme o feedback.

A equipe de UI iniciou o design de uma biblioteca de componentes básicos
de interface, incluindo botões, inputs, cards, etc. Essa biblioteca será
usada para desenvolver as telas baseadas nos protótipos.

### Q1 2017

Formamos uma equipe de UX para trabalhar na experiência do usuário.
Esta equipe está desde janeiro compreendendo as dores dos usuários da
[nossa dashboard atual][dashboard-pagarme] e anotando cada detalhe.

### Q4 2016

Nossa equipe começou a pensar em uma próxima versão da nossa dashboard,
peça fundamental para empoderar o lojista a tomar decisões de negócio.

Com o crescimento do Pagar.me em 2016, e consequentemente a entrada de
novos clientes, precisavamos mergulhar de cabeça no dia-a-dia deles para
dar a luz a um novo conceito de dashboard, que fosse totalmente centrada
na operação do nosso cliente.

</details>

### Próximos passos

Este projeto é bem novo pra gente, assim como o modelo de desenvolvimento
open source também. Temos uma equipe de pessoas trabalhando no escritório
com dedicação exclusiva no projeto, mas queremos compartilhar a experiência
de desenvolver um projeto de front-end do mundo real nessa modalidade,
recebendo e dando contribuições para a comunidade.

Nossa inspiração para desenvolver o projeto desta maneira são empresas
como o [Gitlab][gitlab-handbook], que vem cada vez mais se aproximando
da comunidade para gerar produtos que escutam o usuário, aceitam sua
contribuição e crescem cada vez para melhor.

## Trabalhando neste repositório

A ideia deste repositório é ser um monorepo que agrega todos os projetos
necessários para o desenvolvimento do nosso front-end. Eventualmente
pacotes alojados aqui podem ser splitados para repositórios, conforme
faça sentido. Adotamos o modelo de monorepo para não ter o overhead de
gestão de dependências no início do projeto.

### Stack

A stack foi escolhida baseada em o que empresas como Facebook, AirBnb,
e New York Times estão usando para construir suas experiências. Também foi
levado em consideração a simplicidade, curva de aprendizado e requisitos
como fácil distribuição e entrega progressiva.

Tendo isso em vista, fomos de React. A estrutura do projeto foi iniciada
rapidamente usando o `create-react-app` e [adaptada][css-modules-commit]
para incluir [CSS modules][css-modules] e o [Storybook][storybook].

**CSS Modules** foi habilitar para criar escopo no CSS. Assim podemos
distribuir todos os componentes de UI como um pacote separado (a lá
Material Design), tornando o desenvolvimento de outros projetos usando
React muito mais simples.

**React Storybook** foi selecionado para permitir o desenvolvimento de
componentes independentemente da existência de telas que os usam, e
também para criar um catálogo de componentes.

### Rodando

Entre na pasta `webapp`. Lá você encontrará o README do webapp e poderá
descobrir como rodar o projeto em seu computador.

### Contribuindo

Quer contribuir? Não sabe como começar? Que tal começar criando uma issue?
Explique seu background e com o que gostaria de ajudar. Você também pode
estar interessado em trabalhar conosco, se esse for o caso, envie um e-mail
para code@pagar.me.

## Licensing

See [LICENSES](LICENSES.md).

---

[milestones]: https://github.com/pagarme/pilot/milestones
[dashboard-pagarme]: https://dashboard.pagar.me
[react-styleguide]: https://github.com/pagarme/react-style-guide
[gitlab-handbook]: https://about.gitlab.com/handbook/
[css-modules]: https://github.com/css-modules/css-modules
[storybook]: https://github.com/storybooks/storybook
[css-modules-commit]: https://github.com/pagarme/pilot/pull/178/commits
