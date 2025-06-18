const cards = document.querySelectorAll('.memory-card');

let temCartaVirada = false;
let primeiraCarta, segundaCarta;
let bloqueio = false;

function virarCarta() {
    if (bloqueio) return;
    if (this === primeiraCarta) return;

    this.classList.add('flip')

    if (!temCartaVirada){
        temCartaVirada = true;
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;

    verificacaoMatematica();
}

function verificacaoMatematica() {
    if (primeiraCarta.dataset.framework === segundaCarta.dataset.framework){
        desabilitarCartas();
        return;
    }

    desvirarCartad();
}

function desabilitarCartas(){
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);

    resetar();
}

function desvirarCartad(){
    bloqueio = true;
    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');
        resetar();
    }, 1500);
}

function resetar() {
    [temCartaVirada, bloqueio] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

(function embaralhar(){
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    })
})();

cards.forEach(card => card.addEventListener('click', virarCarta));