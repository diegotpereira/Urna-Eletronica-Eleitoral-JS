let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')

let etapaAtual = 0
let numero = ''
let votoBranco = false
let votos = []

function comecarEtapa() {

    let etapa = etapas[etapaAtual]

    let numeroHtml = ''
    numero = ''
    votoBranco = false

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'

        } else {
            numeroHtml += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none'

    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml

}

function atualizaInterface() {
    // console.log("Atualizando interface");
    // console.log(numero);
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true

        } else {
            return false
        }
    })

    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = ' block'
        aviso.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`

        let fotosHtml = ''

        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small">
                                <img src="img/${candidato.fotos[i].url}" alt="" /> ${candidato.fotos[i].legenda}
                              </div>`
            } else {
                fotosHtml += `<div class="d-1-image">
                            <img src="img/${candidato.fotos[i].url}" alt="" /> ${candidato.fotos[i].legenda}
                        </div>`
            }
        }
        lateral.innerHTML = fotosHtml

    } else {
        seuVotoPara.style.display = ' block'
        aviso.style.display = 'block'
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`
    }
    // console.log("Candidato", candidato);
}

function clicou(n) {
    // alert("Clicou em " + n)
    let elNumero = document.querySelector('.numero.pisca')

    if (elNumero != null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca')

        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca')

        } else {
            atualizaInterface()
        }
    }
}

function branco() {
    // alert("Clicou em branco!")
    // if (numero === '') {
    numero = ''
    votoBranco = true

    seuVotoPara.style.display = ' block'
    aviso.style.display = 'block'
    numeros.innerHTML = ''
    descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`
    lateral.innerHTML = ''

    // } else {
    //     alert("Para votar em branco não pode ter digitado nenhum número.")
    // }
}

function corrige() {
    // alert("Clicou em corrige!")
    comecarEtapa()
}

function confirma() {
    // alert("Clicou em confirma!")
    let etapa = etapas[etapaAtual]

    let votoConfirma = false

    if (votoBranco === true) {
        // console.log("Confirma como BRANCO...");
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
        votoConfirma = true

    } else if (numero.length === etapa.numeros) {
        votoConfirma = true
            // console.log("Confirma como " + numero);
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if (votoConfirma) {
        etapaAtual++
        if (etapas[etapaAtual] != undefined) {
            comecarEtapa()

        } else {
            // console.log("FIM!");
            document.querySelector('.tela').innerHTML = `<div class="aviso--gigante pisca">FIM</div>`
            console.log(votos);
        }
    }
}

comecarEtapa()