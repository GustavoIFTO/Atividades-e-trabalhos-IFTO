# Projeto de Gestão - Chopin Conservatory

Este é um exemplo simples com o objetivo de servir como base para um sistema de gestão para uma escola de música. O foco principal é otimizar a comunicação e a organização interna entre professores e alunos.

## Visão Geral

Este projeto foi desenvolvido como um trabalho acadêmico com o objetivo de demonstrar o uso de tecnologias front-end para a criação de um sistema dinâmico e interativo.

## Tecnologias Utilizadas

* HTML 5
* CSS3
* JavaScript
* LocalStorage

## Funcionalidades Implementadas

O sistema é composto por três funcionalidades principais: uma agenda de eventos, um mural de avisos e uma parte que contém todo o repertório da banda, orquestra ou coral.

### Agenda

A agenda é responsável pela comunicação e organização de eventos para os músicos e o maestro se planejarem. Nela, é possível anotar um evento que acontecerá em um dia especificado pelo administrador.

A agenda é gerada por JavaScript e é atualizada de acordo com o mês atual. Para isso, criei a função `gerarCalendario`. No início da função, o elemento `innerHTML = ''` tem o objetivo de limpar todo o conteúdo HTML que está dentro da div do calendário. Isso é importante, pois garante que quando o mês muda, uma nova agenda com o início do novo mês seja gerada.

A geração dos dias e da quantidade do mês é garantida pelas variáveis:

`const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();`
`const diasNoMes = new Date(ano, mes + 1, 0).getDate();`

A variável `primeiroDiaDoMes` retorna um número de 0 a 6 (começando por domingo até sábado). Já a variável `diasNoMes` retorna o número total de dias no mês. O nome dos dias é definido por um array composto por strings com os nomes dos dias.

Em um calendário, existem espaços vazios. Por exemplo, se o primeiro dia do mês começa em uma quarta-feira, haverá espaços vazios de domingo até terça. A parte responsável por isso é o `for` loop:

`for (let i = 0; i < primeiroDiaDoMes; i++) { calendarioDiv.appendChild(document.createElement('div')); }`

O loop irá rodar um número de vezes igual ao valor da variável `primeiroDiaDoMes`. Novamente, se um mês começar em uma quarta-feira, `primeiroDiaDoMes` será 3. Para cada repetição do loop, a linha `calendarioDiv.appendChild(document.createElement('div'));` cria uma nova div vazia e a adiciona ao calendário, criando os espaços.

Além da geração dinâmica, a agenda permite a interação do usuário. Ao clicar em uma data, o código JavaScript exibe os detalhes do evento correspondente (como horário e local) na seção "Detalhes do Evento", usando a função `mostrarDetalhesDoEvento`.

### Mural de Avisos

O mural de avisos serve para exibir informações importantes, como ensaios para concertos ou reuniões.

O mural de avisos tem uma dinâmica parecida com a agenda, onde o administrador pode publicar avisos em uma página separada. As informações são armazenadas no `localStorage` do navegador.

Para a função de salvar o aviso, criei a variável `formAviso` que encontra o elemento `<form>` com o ID `form-aviso`. Em seguida, um `if` verifica se o administrador está na página correta para que a lógica seja executada.

Em formulários, o botão do tipo `submit` recarrega a página por padrão. Para impedir esse comportamento, utilizei a função `event.preventDefault()`.

Para acessar os avisos na página principal, utilizei a mesma lógica de salvamento e carregamento. Como todas essas informações são armazenadas no `localStorage` por não ter um banco de dados, eu criei uma variável que acessa o `localStorage` e exibe as informações na tela, como na linha `const avisosSalvo = localStorage.getItem('avisosChopin');`.

Em suma, o Mural de Avisos demonstra uma funcionalidade crucial para a comunicação interna da escola. Ele é um excelente exemplo de como a lógica de salvar e carregar dados, usando o `localStorage`, permite que diferentes páginas (a de administração e a principal) se comuniquem de forma eficaz, sem a necessidade de um servidor. Isso torna a gestão de avisos um processo simples e direto para o administrador, e garante que os alunos estejam sempre atualizados com as informações mais recentes da escola.

### Local Storage

Como ainda não sei fazer um banco de dados, utilizei uma ferramenta nativa dos navegadores para assumir essa função, o `localStorage`. Essa funcionalidade armazena informações como pares de chave e valor, onde os valores são sempre do tipo **string** (texto). A grande diferença em relação a um banco de dados em um servidor é que o `localStorage` armazena as informações diretamente no computador do usuário.

Para usar essa ferramenta, adotei a seguinte lógica:

* **Para Salvar os Dados:** Como o `localStorage` só aceita texto, utilizamos a função `JSON.stringify()` para converter nossos objetos (como os detalhes de um evento) em uma string. Em seguida, usamos `localStorage.setItem('chave', valor)` para guardar a informação.

* **Para Carregar os Dados:** Para pegar a informação de volta, usamos a função `localStorage.getItem('chave')`, que retorna o texto que foi salvo. Depois, usamos `JSON.parse()` para converter esse texto de volta para um objeto que o JavaScript possa manipular.

Essa foi a abordagem que escolhi para armazenar os dados, pois ela permite que as duas páginas se comuniquem e compartilhem informações. Além disso, os dados permanecem salvos mesmo após o navegador ser fechado.

### Repertório

O conceito de repertório no meio musical é o local ou pasta onde estão guardadas todas as músicas de uma orquestra, banda ou coral.

Minha ideia inicial para o repertório era a mesma da agenda e do mural de avisos, onde o administrador poderia fazer o upload dos arquivos de áudio das músicas e partituras musicais para a página principal. No entanto, para esse recurso, notei que seria necessária uma parte backend que ainda não aprendi.

Para solucionar esse problema, criei o repertório com uma lista não ordenada onde os áudios podem ser ouvidos clicando em um `button` com o atributo `data-src`. As partituras musicais são baixadas clicando no nome da música e para fazer isso, utilizei o atributo `download` na tag `<a>`.

Utilizei JavaScript no botão de play/pause para o sistema identificar quando o usuário dá play ou pause. Além disso, o símbolo muda de `>` para `||` de acordo com a ação.

## Instruções de Uso

Para acessar a página de administração, utilize o e-mail `admin@gmail.com` e a senha `321`.
Já para a página principal, utilize o e-mail `aluno@gmail.com` e a senha `123`.

## Próximos Passos

Com o conhecimento que adquirirei ao longo do curso, posso adicionar um backend e um banco de dados, e também novas opções como matricular alunos, visualizar cada aluno e seu instrumento, uma opção de visualização das partituras musicais no navegador e a opção de desligamento do aluno.