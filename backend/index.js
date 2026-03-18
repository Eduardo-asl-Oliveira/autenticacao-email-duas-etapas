const nodemailer = require('nodemailer'); 
const express = require('express');
const cors = require('cors');

const app = express(); 

app.use(express.json()); 
app.use(cors());  

const memoria = new Map();

// ROTA 1: Envia o codigo
app.post('/enviar-codigo', async (req, resp) => { // CORREÇÃO: Adicionado a /
    const emailDigitado = req.body.email;

    // CORREÇÃO: Adicionado o ! (Se NÃO for válido, dá erro)
    if(!validacaoEmail(emailDigitado)){ 
        return resp.status(400).json({erro: "Formato de email invalido!"}); 
    }

    try{
        // CORREÇÃO: Removido o 'input' antigo. Passamos a String direto
        const resultado  = await dispararEmail(emailDigitado);

        setTimeout(() => {
            memoria.delete(emailDigitado); // CORREÇÃO: Usando a String
            console.log("tempo expirado");
        }, 1000*60*10) ;

        memoria.set(emailDigitado, resultado.codigo); // CORREÇÃO: Usando a String

        return resp.status(200).json({mensagem:"Codigo enviado com sucesso!", link:resultado.url});
       
    }catch(error){
        return resp.status(500).json({erro: "Falha ao enviar o email"}); // CORREÇÃO: resp em vez de resizeBy
    }
});

// ROTA 2: Validar o codigo digitado e o email
app.post('/validar-codigo', (req, res) => { // CORREÇÃO: validar com L

    const emailDigitado = req.body.email;
    const codigoDigitado = req.body.codigo; // CORREÇÃO: body em vez de bodu

    const codigoSalvo = memoria.get(emailDigitado);

    if(codigoSalvo == codigoDigitado){
        memoria.delete(emailDigitado);
        return res.status(200).json({sucesso: true, mensagem: "Codigo validado"});
    }else{
        return res.status(401).json({erro: false, mensagem: "codigo incorreto"});
    }
});

// FUNCOES AUXILIARES
function geradorCodigos(){
    return Math.floor(100000 + Math.random() * 900000);
}

function validacaoEmail(emailDigitado){
    const divisao = emailDigitado.split("@");
    if(divisao.length != 2) return false;
    const antes = divisao[0];
    const depois = divisao[1];

    if(antes != "" && (depois.includes('.com') || 
                        depois.includes('.com.br') || 
                        depois.includes('.net') || 
                        depois.includes('.edu') ||
                        depois.includes('gmail.com') ||
                        depois.includes('hotmail.com'))) return true;
    
    return false;
}

async function dispararEmail(emailDestino) {
    let contaTeste = await nodemailer.createTestAccount();
    let trasportador = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: contaTeste.user,
            pass: contaTeste.pass,
        }
    });

    console.log(`Mandando o codigo para ${emailDestino}...`);
    const codigo = geradorCodigos();

    let info = await trasportador.sendMail({
        from: "Sistema de seguranca",
        to: emailDestino,
        subject: "Seu codigo de verificacao:",
        text: String(codigo)
    });

    console.log("email enviado com sucesso!");
    console.log("🔗 CLIQUE AQUI: %s", nodemailer.getTestMessageUrl(info));

    return {codigo: codigo, url: nodemailer.getTestMessageUrl(info)};
}

// LIGA O SERVIDOR EXPRESS
const PORTA = 8080;
app.listen(PORTA, () => {
    console.log(`servidor rodando na porta ${PORTA}`);
});