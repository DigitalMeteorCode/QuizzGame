//On récupère le formulaire html et on déclare la variable du tableau de résultats
const form = document.querySelector('.form-quizz');
let tableResults = [];//let car le tableau sera réassigner au fur et à mesure, et vide car  il sera rempli seront les résultats

//On ajoute l'écouteur d'événement au submit du formulaire
form.addEventListener('submit', (e) => { //la méthode addEventListener permet d'utiliser l'objet e pour ses caractéristiques d'événements (ici submit)
    e.preventDefault();//permet de ne pas refresh la page au submit du formulaire

    for(i=1; i<6; i++) {//on itère autant de fois qu'il y a de questions. On commence à 1 car le quizz commence avec q1.
        tableResults.push(document.querySelector(`input[name="q${i}"]:checked`).value)
    }//push = on ajoute au tableau de résultats. on fait une concaténation avec `${}`. on récupère que les valeurs d'inputs avec l'attribut :checked
    console.log(tableResults);
    tableResults = [];//on réinitialise le tableau entre chaque submit
})