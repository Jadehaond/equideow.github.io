function loadQuiz(galop) {
    console.log("Bonjour, voici un message dans la console!");
    fetch('quiz/'+galop + '.json') // Charger le fichier JSON correspondant au galop
        .then(response => response.json())
        .then(data => {
            const quizContainer = document.getElementById('quiz-container');
            quizContainer.innerHTML = ''; // Réinitialiser le conteneur du quiz

            // Parcourir les questions du quiz
            data.questions.forEach((questionData, index) => {
                // Créer la question
                const questionElement = document.createElement('p');
                questionElement.innerHTML = `<strong>${index + 1}. ${questionData.question}</strong>`;
                quizContainer.appendChild(questionElement);

                // Parcourir les réponses
                questionData.réponses.forEach((réponseData, i) => {
                    const answerId = `q${index + 1}a${i + 1}`; // Générer un id unique pour chaque réponse

                    // Créer l'élément input et le label
                    const inputElement = document.createElement('input');
                    inputElement.type = questionData.type;  // radio ou checkbox
                    inputElement.id = answerId;             // ID unique pour chaque réponse
                    inputElement.name = `q${index + 1}`;    // Tous les inputs d'une question partagent le même name

                    const labelElement = document.createElement('label');
                    labelElement.setAttribute('for', answerId);
                    labelElement.innerHTML = réponseData.réponse;

                    // Ajouter l'élément input et label au conteneur
                    quizContainer.appendChild(inputElement);
                    quizContainer.appendChild(labelElement);
                    quizContainer.appendChild(document.createElement('br')); // Ajouter un saut de ligne
                });
            });
        })
        .catch(error => console.error('Erreur lors du chargement du quiz :', error));
}
