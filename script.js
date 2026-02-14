let inputTexto = document.querySelector(".input-texto");
let traducaoTexto = document.querySelector(".traducao");
let idioma = document.querySelector("#idioma");

async function traduzir() {
    if (!inputTexto.value.trim()) return;

    let texto = encodeURIComponent(inputTexto.value);
    let langpair = idioma.value;

    let endereco = `https://api.mymemory.translated.net/get?q=${texto}&langpair=${langpair}`;

    let resposta = await fetch(endereco);
    let dados = await resposta.json();

    traducaoTexto.textContent = dados.responseData.translatedText;
}

function ouvirVoz() {
    if (!("webkitSpeechRecognition" in window)) {
        alert("Reconhecimento de voz não suportado neste navegador");
        return;
    }

    let reconhecimentoVoz = new webkitSpeechRecognition();
    reconhecimentoVoz.lang = "pt-BR";

    reconhecimentoVoz.onresult = function (event) {
        let textoTranscricao = event.results[0][0].transcript;
        inputTexto.value = textoTranscricao;
        traduzir();
    };

    reconhecimentoVoz.start();
}
