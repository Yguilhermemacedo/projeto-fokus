// alert('Para melhor experiência, coloque fone de ouvido.')
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true;
// Colocando evento de música com JavaScript, após clicar no botão da página 'música'
musicaFocoInput.addEventListener('change', () => {
    if(musica.pause){
        musica.play()
    } else{
        musica.paused()
    }
})

// Colocando evento de click nos botões acima
focoBt.addEventListener('click', () =>{
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
   alterarContexto('descanso-longo')
   longoBt.classList.add('active')
})

function alterarContexto (contexto){
    // Adicionando a classe = 'active', usando o elemento classList, e o efeito para remove-la de acordo com o contexto de temporizador.
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