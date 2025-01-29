function loadQuiz(galop) {
    fetch('https://jadehaond.github.io/equideow.github.io/quiz/'+galop + '.json') // Charger le fichier JSON correspondant au galop
    
        .then(response => response.json())
        .then(data => {
            const quizContainer = document.getElementById('quiz-container');
            quizContainer.innerHTML = ''; // Réinitialiser le conteneur du quiz
            
            let correctAnswers = 0; // Variable pour compter les bonnes réponses
            let totalQuestions = data.questions.length;

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

       // Ajouter le bouton Valider
       const validateButton = document.createElement('button');
       validateButton.innerHTML = 'Valider';
       validateButton.classList.add('quiz-btn-validate');

       // Cibler le div spécifique pour le bouton et ajouter le bouton à ce div
       const validateBtnContainer = document.getElementById('quiz-validate-btn-container');
       validateBtnContainer.appendChild(validateButton);

       quizContainer.appendChild(validateButton);

       // Gestionnaire d'événements pour le bouton "Valider"
       validateButton.addEventListener('click', () => {
           let wrongAnswers = 0;

           // Parcourir chaque question pour vérifier les réponses
           data.questions.forEach((questionData, index) => {
               const selectedAnswer = document.querySelector(`input[name="q${index + 1}"]:checked`);
               
               // Si aucune réponse n'est sélectionnée
               if (selectedAnswer) {
                // Récupérer la réponse qui a été sélectionnée
                const selectedAnswerValue = selectedAnswer.value;
    
                // Trouver la réponse correcte dans les réponses de la question
                const correctAnswer = questionData.réponses.find(r => r.correct === true);
    
                // Vérifier si la réponse sélectionnée est correcte
                if (selectedAnswerValue === correctAnswer.réponse) {
                    correctAnswers++;
                } else {
                    wrongAnswers++;
                }
               } else {
                wrongAnswers++; // Si aucune réponse sélectionnée, considérer comme fausse
               }
           });

           // Afficher le résultat
           if (wrongAnswers >= 4) {
               alert("Perdu ! Tu as " + wrongAnswers + " erreurs.");
           } else {
               alert("Gagné ! Tu as " + correctAnswers + " bonnes réponses.");
           }
       });
   })
   .catch(error => console.error('Erreur lors du chargement du quiz :', error));
}
