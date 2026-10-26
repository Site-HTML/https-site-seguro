java.script

const registerModal = document.getElementById("registerModal");
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

document.getElementById("registerBtn").addEventListener("click", () => {
    registerForm.reset();
    registerMessage.textContent = "";
    registerModal.showModal();
});

document.getElementById("cancelRegister").addEventListener("click", () => {
    registerModal.close();
});

const cpfInput = document.getElementById("registerCpf");

cpfInput.addEventListener("input", () => {
    let digits = cpfInput.value.replace(/\D/g, "").slice(0, 11);

    digits = digits
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2");

    cpfInput.value = digits;
});

function validCPF(value) {
    const cpf = value.replace(/\D/g, "");

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    for (let length = 9; length <= 10; length++) {
        let sum = 0;

        for (let i = 0; i < length; i++) {
            sum += Number(cpf[i]) * (length + 1 - i);
        }

        let digit = (sum * 10) % 11;
        if (digit === 10) digit = 0;

        if (digit !== Number(cpf[length])) {
            return false;
        }
    }

    return true;
}

registerForm.addEventListener("submit", event => {
    event.preventDefault();

    const cpf = cpfInput.value;
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (!validCPF(cpf)) {
        registerMessage.textContent = "Confira o CPF digitado.";
        registerMessage.style.color = "#d92d20";
        return;
    }

    if (password !== confirm) {
        registerMessage.textContent = "As senhas não são iguais.";
        registerMessage.style.color = "#d92d20";
        return;
    }

    registerMessage.textContent =
        "Validação concluída! Este é apenas um teste: nenhuma conta foi criada ou salva.";
    registerMessage.style.color = "#067647";

    // Não armazenamos nem enviamos CPF, e-mail ou senha.
});
