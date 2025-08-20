document.addEventListener('DOMContentLoaded', () => {
    //Essa função permite que os dados de home e admin sejam carregados utilizando somente uma função.
    function carregarDados() {
        const eventosSalvos = localStorage.getItem('eventosChopin');
        return {
            eventos: eventosSalvos ? JSON.parse(eventosSalvos) : {},
        };
    }

    function salvarEventos(eventos) {
        localStorage.setItem('eventosChopin', JSON.stringify(eventos));
    }

    //PÁGINA PRINCIPAL - CALENDÁRIO
    const calendarioDiv = document.getElementById('calendario');

    if (calendarioDiv) {
        const dados = carregarDados();
        const eventos = dados.eventos;

        //Essaunção serve para gerar o calendário
        function gerarCalendario(ano, mes) {
            calendarioDiv.innerHTML = '';
            
            const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();
            const diasNoMes = new Date(ano, mes + 1, 0).getDate();
            
            const nomesDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
            nomesDias.forEach(nome => {
                const diaNomeDiv = document.createElement('div');
                diaNomeDiv.textContent = nome;
                diaNomeDiv.style.fontWeight = 'bold';
                diaNomeDiv.style.color = '#1A233A';
                calendarioDiv.appendChild(diaNomeDiv);
            });

            for (let i = 0; i < primeiroDiaDoMes; i++) {
                calendarioDiv.appendChild(document.createElement('div'));
            }

            for (let dia = 1; dia <= diasNoMes; dia++) {
                const dataString = `${ano}-${(mes + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
                const diaDiv = document.createElement('div');
                diaDiv.textContent = dia;
                diaDiv.classList.add('dia');

                if (eventos[dataString]) {
                    diaDiv.classList.add('com-evento');
                }
                
                diaDiv.addEventListener('click', () => {
                    document.querySelector('.dia.selecionado')?.classList.remove('selecionado');
                    diaDiv.classList.add('selecionado');
                    mostrarDetalhesDoEvento(dataString);
                });
                calendarioDiv.appendChild(diaDiv);
            }
        }
        
        //Essa função serve para mostrar os detalhes do evento.
        function mostrarDetalhesDoEvento(data) {
            const detalhes = eventos[data];
            if (detalhes) {
                document.getElementById('data-evento').textContent = `Data: ${data}`;
                document.getElementById('horario-evento').textContent = `Horário: ${detalhes.horario}`;
                document.getElementById('local-evento').textContent = `Local: ${detalhes.local}`;
                document.getElementById('descricao-evento').textContent = `Descrição: ${detalhes.descricao}`;
            } else {
                document.getElementById('data-evento').textContent = `Data: Não há evento neste dia.`;
                document.getElementById('horario-evento').textContent = '';
                document.getElementById('local-evento').textContent = '';
                document.getElementById('descricao-evento').textContent = '';
            }
        }
        const hoje = new Date();
        gerarCalendario(hoje.getFullYear(), hoje.getMonth());
    }

    //PÁGINA DE ADMIN - SALVAR EVENTOS
    const formEvento = document.getElementById('form-evento');
    if (formEvento) {
        formEvento.addEventListener('submit', (event) => {
            event.preventDefault();

            const data = document.getElementById('evento-data').value;
            const horario = document.getElementById('evento-horario').value;
            const local = document.getElementById('evento-local').value;
            const descricao = document.getElementById('evento-descricao').value;

            const eventos = carregarDados().eventos;
            eventos[data] = {
                horario: horario,
                local: local,
                descricao: descricao
            };

            salvarEventos(eventos);
            alert('Evento salvo com sucesso!');
            formEvento.reset();
        });
    }

    //PARTE NECESSÁRIA PARA SALVAR E CARREGAR O MURAL DE AVISOS.
    const fromAviso = document.getElementById('form-aviso');
    if (fromAviso){
        fromAviso.addEventListener('submit' , (event) => {
            event.preventDefault();
            const avisoTexto = document.getElementById('aviso-texto').value;
            const avisosSalvo = localStorage.getItem('avisosChopin');
            let avisos = avisosSalvo ? JSON.parse(avisosSalvo) : [];
            avisos.unshift(avisoTexto);
            localStorage.setItem('avisosChopin', JSON.stringify(avisos));
            alert('Aviso publicado!!')
            fromAviso.reset();
        })
    }
    const conteudoMural = document.querySelector('.mural-conteudo');
    if (conteudoMural) {
        function exibirAvisos() {
            const avisosSalvo = localStorage.getItem('avisosChopin');
            const avisos = avisosSalvo ? JSON.parse(avisosSalvo) : [];
            conteudoMural.innerHTML = '';

            if (avisos.length === 0){
                conteudoMural.innerHTML = '<p>Não há avisos no momento.<p>';
                return;
            }
            const lista = document.createElement('ul');
            avisos.forEach(aviso => {
                const item = document.createElement('li');
                item.textContent = aviso;
                lista.appendChild(item);
            });
            conteudoMural.appendChild(lista);
        }
        exibirAvisos();
    }

    //REPERTÓRIO
    const listaRepertorio = document.getElementById('lista-repertorio');
    const audioPlayer = new Audio();
    let musicaAtualBtn = null;

    if (listaRepertorio) {
        listaRepertorio.addEventListener('click', (event) => {
            const btnClicado = event.target.closest('.play');
            if (btnClicado) {
                const musicaSrc = btnClicado.dataset.src;

                if (musicaAtualBtn === btnClicado && !audioPlayer.paused) {
                    audioPlayer.pause();
                    btnClicado.textContent = '>'; //Mantém o ícone enquanto estiver no play.
                } else {
                    if (musicaAtualBtn) {
                        audioPlayer.pause();
                        musicaAtualBtn.textContent = '>';
                    }
                    
                    audioPlayer.src = musicaSrc;
                    audioPlayer.play();
                    btnClicado.textContent = '||'; //Altera o ícone para o símbolo de pause.
                    musicaAtualBtn = btnClicado;
                }
            }
        });
    }
});