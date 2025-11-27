// Pegando elementos do HTML
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const res = document.getElementById("mensagem");
const botaoLogin = document.getElementById("botaoLogin");

botaoLogin.addEventListener("click", login);

function login() {
    var email = inputEmail.value;
    var emailFormatado = email.trim();
    var senha = inputSenha.value;
    var senhaTamanho = senha.length;
    var senhaMinuscula = senha.toLowerCase();
    var msg = '';

    // Verifica se a senha tem pelo menos 1 número
    var cont = 0;
    var numeros = '1234567890';
    var senhaTemNum = false;

    while (cont < senhaTamanho) {
        if (senha.includes(numeros[cont])) {
            senhaTemNum = true;
            break;
        }
        cont++;
    }

    // Verificações gerais
    if (emailFormatado == '' || senha == '') {
        msg = `<span style="color: red;  font-family: "Alegreya Sans", sans-serif; ">Ainda faltam campos para preencher!</span>`;
        mensagem_erro.innerHTML = msg;
    } else if (!email.includes('@gmail.com') && !email.includes('@sptech.school')) {
        msg = `<span style="color: red; font-family: "Alegreya Sans", sans-serif; ">Formato de email inválido </span>`;
        mensagem_erro.innerHTML = msg;
    } else if (senhaTamanho < 8 || senha == senhaMinuscula || senhaTemNum == false ||
        (!senha.includes('@') && !senha.includes('&') && !senha.includes('#') && !senha.includes('$') && !senha.includes('!'))) {
        msg = `<span style="color: red;  font-family: "Alegreya Sans", sans-serif; ">Senha deve ter pelo menos 1 caracter especial,<br>1 número e 1 letra maiúscula.</span>`;
        mensagem_erro.innerHTML = msg;
    } else {
        // Aqui você pode colocar a verificação contra dados salvos
        // Por enquanto vamos supor que qualquer email/senha válido funciona


    var emailVar = email;
    var senhaVar = senha;

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar,
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")
        msg = `<span style="color:  rgba(237, 9, 9, 1);  font-family: "Alegreya Sans", sans-serif;">Email ou senha não encontrado</span>`;

        mensagem_erro.innerHTML = msg;

        if (resposta.ok) {
            console.log(resposta);

            msg = `<span style="color:  rgb(10, 194, 10);  font-family: "Alegreya Sans", sans-serif;">Login realizado com sucesso!</span>`;
    
            mensagem_erro.innerHTML = msg;

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.APELIDO_USUARIO = json.apelido;
                sessionStorage.FK_USUARIO = json.fkUsuario;
                
                setTimeout(function () {
                    console.log("login realizado com sucesso!");
                    alert('O jogo ira iniciar e tempo não vai parar até completar o jogo!');
                    window.location = "jogo.html";
                }, 2000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                // finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
  }  
}