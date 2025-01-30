function loadQuiz(galop) {
    fetch('https://jadehaond.github.io/equideow.github.io/quiz/' + galop + '.json')
        .then(response => response.json())
        .then(data => {
            const quizContainer = document.getElementById('quiz-container');
            quizContainer.innerHTML = '';

            data.questions.forEach((questionData, index) => {
                const questionElement = document.createElement('p');
                questionElement.innerHTML = `<strong>${index + 1}. ${questionData.question}</strong>`;
                quizContainer.appendChild(questionElement);

                questionData.réponses.forEach((réponseData, i) => {
                    const answerId = `q${index + 1}a${i + 1}`;
                    const inputElement = document.createElement('input');
                    inputElement.type = questionData.type;
                    inputElement.id = answerId;
                    inputElement.name = `q${index + 1}`;
                    inputElement.value = réponseData.réponse;

                    const labelElement = document.createElement('label');
                    labelElement.setAttribute('for', answerId);
                    labelElement.innerHTML = réponseData.réponse;

                    quizContainer.appendChild(inputElement);
                    quizContainer.appendChild(labelElement);
                    quizContainer.appendChild(document.createElement('br'));
                });
            });

            const validateButton = document.createElement('button');
            validateButton.innerHTML = 'Valider';
            validateButton.classList.add('quiz-btn-validate');
            const validateBtnContainer = document.getElementById('quiz-validate-btn-container');
            validateBtnContainer.innerHTML = ''; // S'assurer qu'il est vide avant d'ajouter un bouton
            validateBtnContainer.appendChild(validateButton);

            validateButton.addEventListener('click', () => {
                checkAnswers(data.questions);
            });
        })
        .catch(error => console.error('Erreur lors du chargement du quiz :', error));
}

// Fonction pour vérifier les réponses
function checkAnswers(questions) {
    let correctAnswers = 0;
    let wrongAnswers = 0;

    questions.forEach((questionData, index) => {
        const selectedAnswers = document.querySelectorAll(`input[name="q${index + 1}"]:checked`);
        
        if (selectedAnswers.length === 0) {
            wrongAnswers++; // Aucune réponse sélectionnée => erreur
            return;
        }

        const selectedValues = Array.from(selectedAnswers).map(input => input.value);
        const correctValues = questionData.réponses.filter(r => r.correct).map(r => r.réponse);

        // Vérifier si toutes les bonnes réponses sont sélectionnées et uniquement celles-ci
        if (selectedValues.length === correctValues.length && selectedValues.every(val => correctValues.includes(val))) {
            correctAnswers++;
        } else {
            wrongAnswers++;
        }

         questionData.réponses.forEach((réponseData, i) => {
            const answerId = `q${index + 1}a${i + 1}`;
            const labelElement = document.querySelector(`label[for="${answerId}"]`);
            const inputElement = document.getElementById(answerId);

            if (réponseData.correct) {
                labelElement.style.color = "green";
            }

            if (inputElement.checked && !réponseData.correct) {
                labelElement.style.color = "red";
            }
        });
    });

    // Affichage du popup customisé
    const message = (wrongAnswers >= 4)
        ? `❌ Malheureusement tu as ${wrongAnswers} erreurs.\n Tu ne peux pas obtenir ton galop. Retente ta chance quand tu pourras. `
        : `✅ Félicitations ! \n Tu as ${correctAnswers} bonnes réponses. Tu obtiens ton galop`;

    showPopup(message);

    // Fonction pour afficher une popup custom
    function showPopup(message) {
        let popup = document.getElementById("custom-popup");
        let popupMessage = document.getElementById("popup-message");

        if (!popup) {
            // Création de la popup si elle n'existe pas
            popup = document.createElement("div");
            popup.id = "custom-popup";
            popup.innerHTML = `
                <div id="popup-content">
                    <p id="popup-message"></p>
                    <button id="popup-close">Fermer</button>
                </div>
            `;
            document.body.appendChild(popup);

            // Fermer la popup au clic sur le bouton
            document.getElementById("popup-close").addEventListener("click", () => {
                popup.style.display = "none";
            });
        }

        // Mettre à jour le message et afficher la popup
        popupMessage.innerHTML = message;
        popup.style.display = "block";
    }
}