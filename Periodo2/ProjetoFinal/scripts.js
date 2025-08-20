document.addEventListener('DOMContentLoaded', () =>{
    const botaoEntrar = document.getElementById('botaoEntrar');
    const emailInput = document.getElementById('email')
    const senhaInput = document.getElementById('password')
    const loginForm = document.getElementById('login-form')

    botaoEntrar.addEventListener('click', (event) => {
        event.preventDefault(); //esse método impede de o navegador agir normalmente no caso do a com o formpois impede que a página recarregue e bagunce a url.
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        if (email === '' || senha === '' ) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (email === 'aluno@gmail.com' && senha == '123' ){
            window.location.href = 'home.html'
        }

        else if (email === 'admin@gmail.com' && senha == '321'){
            window.location = 'admin.html'
        }

        else {
            alert('Erro!! Senha ou email incorretos!')
        }
    });
});