const { default: axios } = require('axios'),

Lame= require("@suldashi/lame"),
Speaker= require("speaker"),
Axios= require("axios")

console.log('Hello!')
const source = axios.CancelToken.source()
const controller = new AbortController(),
speaker= new Speaker()

async function main() {
    axios
        .get('https://d131.rndfnk.com/ard/dlf/03/mp3/128/stream.mp3?aggregator=web&sid=2AFuQzQKAKDssCPuzHD88zPpPOM&token=-Ut3h2q1JB-ADNoYIxkZnDPTqMi1_I4u1Qmd8V4YOjQ&tvf=SXBNup919hZkMTMxLnJuZGZuay5jb20',
         { signal: controller.signal, responseType: 'stream'})
        .then((resp) => {
            resp.data
        .pipe(new Lame.Decoder())
        .pipe(speaker)
        })
        .catch((e) => {
            console.log('errs', e)
        })
    await new Promise((r) => setTimeout(r, 5000))
    console.log('cancel')
    
    controller.abort()
}

main()