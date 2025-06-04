$(document).ready(function() {
    // Ativa o Datepicker no input
    $("#datepicker").datepicker({
        dateFormat: "dd-mm-yy",  // Formato de data
        minDate: new Date(2023, 5, 1), // 1 de junho de 2023
        maxDate: new Date(2023, 5, 30), // 30 de junho de 2023
        beforeShowDay: function(date) {
            var specialDate = new Date(2023, 5, 29);
            var cssClass = "";
            if (date.getDate() === specialDate.getDate() && date.getMonth() === specialDate.getMonth()) {
                cssClass = "highlight";
            }
            return [true, cssClass];
        }
    });
});

function nextQuestion(questionId, answerId) {
    const answer = document.getElementById(questionId).value.trim().toLowerCase();
    const correctAnswers = {
        q1: "elementos", // Coloque a resposta certa aqui
        q2: "praia",                  // Coloque a resposta certa aqui
    };

    // Se for a primeira ou segunda pergunta
    if (correctAnswers[questionId] && answer === correctAnswers[questionId].toLowerCase()) {
        document.getElementById(questionId).parentElement.style.display = 'none';
        let nextNumber = parseInt(answerId.replace('answer','')) + 1;
        let nextQuestion = document.getElementById('question' + nextNumber);
        if (nextQuestion) {
            nextQuestion.style.display = 'block';
        }
    } else if (correctAnswers[questionId]) {
        alert("Resposta errada! Vamos recomeçar.");
        restartQuiz();
    }
}

// Função para checar a data escolhida
function checkDate() {
    var selectedDate = $("#datepicker").val();
    var correctDate = "29-06-2023"; // Altere para o dia correto
    var heart = document.getElementById("heart");

    if (selectedDate === correctDate) {
        // Mostra o coração e segue para a senha
        heart.style.display = "inline";
        setTimeout(function() {
            document.getElementById('question3').style.display = 'none';
            document.getElementById('passwordSection').style.display = 'block';
            heart.style.display = "none";
            $("#datepicker").css("background-color", "#ff69b4");
        }, 1000);
    } else {
        alert("Data errada! Vamos recomeçar.");
        restartQuiz();
    }
}

function validatePassword() {
    const password = document.getElementById('password').value.trim();
    if (password === "posto puppi") {
        document.getElementById('passwordSection').style.display = 'none';
        document.getElementById('surprise').style.display = 'block';
    } else {
        alert("Senha incorreta, tente novamente!");
    }
}

function restartQuiz() {
    document.getElementById('question1').style.display = 'block';
    document.getElementById('question2').style.display = 'none';
    document.getElementById('question3').style.display = 'none';
    document.getElementById('passwordSection').style.display = 'none';
    document.getElementById('surprise').style.display = 'none';
    document.getElementById('q1').value = '';
    document.getElementById('q2').value = '';
    $("#datepicker").val('');
    $("#datepicker").css("background-color", "");
    document.getElementById('password').value = '';
    document.getElementById("heart").style.display = "none";
}
