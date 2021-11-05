//On récupère le formulaire html et on déclare les variables
const form = document.querySelector(".form-quizz");
let tableResults = []; //let car le tableau sera réassigner au fur et à mesure, et vide car  il sera rempli seront les résultats
const responses = ["c", "a", "d", "b", "c"]; //bonnes réponses du quizz, servira de conparatif
const emojis = ["✔️", "✨", "👀", "😭"];
const resultTitle = document.querySelector(".resultats h2");
const resultNote = document.querySelector(".note");
const resultHelp = document.querySelector(".aide");
const allQuestions = document.querySelectorAll(".question-block");
let verifTable = [];

//On ajoute l'écouteur d'événement au submit du formulaire
form.addEventListener("submit", (e) => {
  //la méthode addEventListener permet d'utiliser l'objet e pour ses caractéristiques d'événements (ici submit)
  e.preventDefault(); //permet de ne pas refresh la page au submit du formulaire

  for (i = 1; i < 6; i++) {
    //on itère autant de fois qu'il y a de questions. On commence à 1 car le quizz commence avec q1.
    tableResults.push(
      document.querySelector(`input[name="q${i}"]:checked`).value
    );
  } //push = on ajoute au tableau de résultats. on fait une concaténation avec `${}`. on récupère que les valeurs d'inputs avec l'attribut :checked

  verifFunc(tableResults); //fonction créée après, tableResults remplace arrResults
  tableResults = []; //on réinitialise le tableau entre chaque submit
});

//Fonction pour comparer le tableau des réponses cochées et des bonnes réponses (tableResults-appelé avec la fonction plus haut- et responses)
function verifFunc(arrResults) {
  for (let a = 0; a < 5; a++) {
    if (arrResults[a] === responses[a]) {
      verifTable.push(true);
    } else {
      verifTable.push(false);
    }
  }
  showResults(verifTable); //fonction créée après, verifTable remplace tabCheck
  colorFunc(verifTable); //fonction créée après, verifTable remplace tabBooleans
  verifTable = []; //on réinitialise le tableau
}

//Fonction pour afficher le texte selon le score
function showResults(tabCheck) {
  const nbWrongs = tabCheck.filter((el) => el !== true).length;
  switch (nbWrongs) {
    case 0:
      resultTitle.innerText = `Bravo, c'est un sans faute ! ${emojis[0]}`;
      resultHelp.innerText = "";
      resultNote.innerText = "5/5";
      break;
    case 1:
      resultTitle.innerText = `Vous y êtes presque ! ${emojis[1]}`;
      resultHelp.innerText =
        "Retentez une autre réponse dans la case rouge, puis re-validez !";
      resultNote.innerText = "4/5";
      break;
    case 2:
      resultTitle.innerText = `Encore un effort ! ${emojis[2]}`;
      resultHelp.innerText =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      resultNote.innerText = "3/5";
      break;
    case 3:
      resultTitle.innerText = `Cherchez encore un peu... ${emojis[2]}`;
      resultHelp.innerText =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      resultNote.innerText = "2/5";
      break;
    case 4:
      resultTitle.innerText = `Vous donnez votre langue aux chats ? ${emojis[2]}`;
      resultHelp.innerText =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      resultNote.innerText = "1/5";
      break;
    case 5:
      resultTitle.innerText = `Vous n'aimez pas vraiment les chats n'est-ce pas ? ${emojis[3]}`;
      resultHelp.innerText =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      resultNote.innerText = "0/5";
      break;
    default:
      "Oups, une erreur est survenue !";
  }
}

//Fonction pour changer la couleur de la div question-block (récupérée avec allQuestions) selon les réponses (le true ou false du tableau appelé plus haut)
function colorFunc(tabBooleans) {
  for (let i = 0; i < tabBooleans.length; i++) {
    if (tabBooleans[i] === true) {
      allQuestions[i].style.background = "lightgreen";
    } else {
      allQuestions[i].style.background = "#ffb8b8";
      allQuestions[i].classList.add("echec");
      setTimeout(() => {
        allQuestions[i].classList.remove("echec");
      }, 500);
    }
  }
}

//Permet de retirer la couleur rouge quand on retente une réponse = meilleur UX
allQuestions.forEach((item) => {
  item.addEventListener("click", () => {
    item.style.background = "white";
  });
});
