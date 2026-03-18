import { useState, useEffect } from "react";
import './App.css';



function App(){

  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [link, setLink] = useState('');
  const [mensagemRota2, setMensagemRota2] = useState('');

  

  const chamaRota1 = async () => {
      //o fetch tem 3 partes, o tipo de requisicao que esta fazendo: method: "get,post,update,delete"
      // os cabecalhos que guardam algumas informacoes: headers{  'Content-Type':'aplications/json'}, ou seja, quero receber em formato json
      // e o compo, qie é o dado em si: body> JSON.stringify({nomeDaChave: variavelDoEstado}) transforma o objeto js em uma informacao para a internet
      const resposta = await fetch("http://localhost:8080/enviar-codigo",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
      });

      //resposta do backend
      const dados = await resposta.json(); 
      console.log(dados);
      setLink(dados.link);
  }

  const chamaRota2 = async () => {

      const resposta = await fetch("http://localhost:8080/validar-codigo", {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({email:email, codigo:codigo})
      });

      const dados = await resposta.json();

      if(dados.sucesso === true){
        setMensagemRota2("Email valido!");
      }else{
        setMensagemRota2 ("Codigo incorreto, email invalido!");
      }
  }

  return (

    <div className="container">

      <h1>Sistema de segurança</h1>
      <p>Digite seu email:</p>

      <div>
        <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
        
        />
        
      </div>

      <div>
      < button onClick={chamaRota1}>verificar</button>
      </div>

      {link !== '' && (
        <div style={{ marginTop: '20px' }}>
            <p> E-mail teste enviado! Clique abaixo para ver o código:</p>
            <a href={link} target="_blank" rel="noreferrer">
                🔗 Abrir Caixa de Entrada
            </a>
        </div>
      )}

      <p>insira o codigo:</p>
      <input
        type="text"
        placeholder="000000"
        value={codigo}
        onChange={(evento) => setCodigo(evento.target.value)}
      />
      <button onClick={chamaRota2}>Verificar codigo</button>

      {mensagemRota2 !== '' && (
          <h3 style={{ color: 'blue' }}>{mensagemRota2}</h3>
      )}

    </div>

  );
}export default App;