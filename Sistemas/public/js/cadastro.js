

function cadastrar() {
  console.log('FUNFA CARAMBA');

  var nome = input_nome.value;
  var nomeFormatado = nome.trim();
  var apelidos = input_apelidos.value;
  var email = input_email.value;
  var emailFormatado = email.trim();
  var senha = input_senha.value;
  var senhaCon = input_senha2.value;
  var senhaTamanho = senha.length;
  var senhaMinuscula = senha.toLowerCase();
  var msg = '';

  var cont = 0;
  var numeros = '1234567890';
  var senhaTemNum = false;

  while (cont < senhaTamanho) {
    if (senha.includes(numeros[cont])) {
      senhaTemNum = true;
      break;
    } else {
      msg = `<span style="color: red; font-weight: bold;"> *Senha não atende todos requisitos </span>`;
    }
    cont++;
  }

  if (nomeFormatado == '' || emailFormatado == '' || senha == '' || senhaCon == '' || apelidos == '') {
    
    msg = `<span style="color: red;">Ainda faltam campos para preencher!</span>`;
    mensagem_erro.innerHTML = msg;
    cardErro.style.display = "block";
  } else if (!email.includes('@gmail.com') && !email.includes('@sptech.school')) {
    console.log('email formatado errado')
    
    msg = `<span style="color: red;">Formato de email inválido </span>`;
    mensagem_erro.innerHTML = msg;
    cardErro.style.display = "block";
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA')
  } else if (senhaTamanho < 6 || senha == senhaMinuscula || senhaTemNum == false ||
    (!senha.includes('@') && !senha.includes('&') && !senha.includes('#') && !senha.includes('$') && !senha.includes('!'))) {
    
    msg = `<span style="color: red;"> Senha deve ter pelo menos 8 caractéres, 1 caracter especial, 1 número e 1 letra maiuscula.</span>`;
    mensagem_erro.innerHTML = msg;
    cardErro.style.display = "block";
  } else if (apelidos.length < 3 || apelidos.length > 15) {
    
    msg = `<span style="color: red;"> Apelido dever ser pelo menos até 3  e no maximo 15 caracteres.</span>`;
    mensagem_erro.innerHTML = msg;
    cardErro.style.display = "block";    
  } else if (senhaCon != senha) {
    
    msg = `<span style="color: red;"> Confirmação de senha inválida.</span>`;
    mensagem_erro.innerHTML = msg;
    cardErro.style.display = "block";
  } else {
    
    msg = `<span style="color: rgb(10, 194, 10);">Cadastro Realizado com sucesso!</span>`;
    console.log('BBBBBBBBBBBBBBBBBBB')
        mensagem_erro.innerHTML = msg;

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome;
    var emailVar = email;
    var apelidoVar = apelidos;
    var senhaVar = senha;
    var confirmacaoSenhaVar = senhaCon;

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
        apelidoServer: apelidoVar,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
        console.log('FUNFA nao neh desgraça')
        if (resposta.ok) {

          console.log('FUNFA NÃO?')

          console.log('FUNFA')
          setTimeout(() => {
            window.location = "login.html";
          }, 2000);

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
      });

    return false;

  }
}

document.getElementById("cadastrar").addEventListener("click", cadastrar);