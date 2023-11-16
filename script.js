// alert('Para melhor experiência, coloque fone de ouvido.')
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const audioTempoIniciado = new Audio('/sons/play.wav')
const audioTempoPausado = new  Audio('/sons/pause.mp3')
const audioTempoFinalizado = new Audio('/sons/beep.mp3')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')


let tempoDecorridoEmSegundos = 1500;
let intervaloId;
musica.loop = true;
// Colocando evento de música com JavaScript, após clicar no botão da página 'música'
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else{
        musica.paused()
    }
})

// Colocando evento de click nos botões acima
focoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
   alterarContexto('descanso-longo')
   longoBt.classList.add('active')
})

function alterarContexto (contexto){
    // Adicionando a classe = 'active', usando o elemento classList, e o efeito para remove-la de acordo com o contexto de temporizador.
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    // Colocando texto para cada sessão após usar o botão
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            
            break;
        
            case "descanso-curto":
                titulo.innerHTML = `Que tal dar uma respirada? <br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;

            case "descanso-longo":
                titulo.innerHTML = `Hora de voltar á superfície.<br>
                <strong class="app__title-strong">Faça uma pasua longa.</strong>`

        default:
            break;
    }
}

const contagemRgressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo Finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        audioTempoPausado.play()
        zerar()
        return
    }
    audioTempoIniciado.play()
    intervaloId = setInterval(contagemRgressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', '/imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId =null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleDateString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()