// Je dois créer mes variables
const form = document.querySelector("#signup");
// ci-dessous la créations de variables spécifique aux formulaires,pas besion de querySelevtor car
//  le "document.forms" étant prévus pour aller chercher dans le DOM les elements par leur nom.
const usernameEl = document.forms.formValidate.username;
const nameEl = document.forms.formValidate.name;
const firstNameEl = document.forms.formValidate.firstname;
const emailEl = document.forms.formValidate.email;
const dobEl = document.forms.formValidate.dob;
const  passEl = document.forms.formValidate.password;
const confEl = document.forms.formValidate['confirm-password'];// ya un tréma donc on met des crochets et simples guillemets
const sexEl = document.forms.formValidate.sex;
// J'ai besoin d'une fonction qui vérifie si la valeur d'un input est vide
function isRequired(elementValue) {
  if (elementValue == "") {
    return false;
  } else {
    return true;
  }
}
// J'ai besoin d'une fonction de vérification de taille
function isBetween(length, min, max) {
  if (length < min || length > max) {
    return false;
  } else {
    return true;
  }
}
// J'ai besoin d'une fonction qui interdit les mots "root", "afpa", "deus" et qui n'autorise que la saisie de lettre
function isNameValid(elementValue) {
  const re = new RegExp("^(?!.*\\b(afpa|root|deus)\\b)[a-zA-Z]+$");
  return re.test(elementValue);
}
// J'ai besoin d'une fonction qui permette d'afficher les erreurs en rouge
function showError(input, message) {
  const formField = input.parentElement;
  formField.classList.remove("success"); // class css
  formField.classList.add("error"); // class css
  const errorEl = formField.querySelector("small");
  errorEl.textContent = message;
}
// J'ai besoin d'une fonction qui permette d'afficher l'element valide en vert
function showSuccess(input) {
  const formField = input.parentElement;
  formField.classList.remove("error"); // class css
  formField.classList.add("success"); // class css
  const errorEl = formField.querySelector("small");
  errorEl.textContent = "";
}
// fonction pour valider l'email
function isValidEmail(email) {
  const regex =
    /^(?!root@afpa\.fr|afpa@afpa\.com|deus@afpa\.org)(?!.*@yopmail\.com$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
// fonction pour valider l'age
function verifAge(element) {
  const dateSaisie = element.value; // je crée une constante qui capture l'age saisi dans le input "#dob"
  let bd = new Date(dateSaisie); //le crée une let qui est la conversion de la date saisie(dateSaisie) en objet que javascript comprend (new Date)
  let twentyOneDb = new Date(); //création d'une let qui correspond à la date actuelle(de l'ordi) = new Date
  twentyOneDb.setFullYear(twentyOneDb.getFullYear() - 21); //produit la date actuelle(twentyOneDb) arrondie à l'année et y applique l'opération:
  // twentyOneDb je prend et j'arrondi à l'année(.getFullYear()) et j'y fait moins 21 ;;resultat une année de ref.
  if (bd <= twentyOneDb) {
    return false
  } else {
    return true
  }
}

// pour le fonctionnement même du code il faut faire des fonctions fléchées qui commencent par la création 
// d'une constante et qui vont utiliser les fonctions simples qui ont été précédement réalisées.
const checkUserName = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const username = usernameEl.value.trim(); // permet de supprimer les espaces
  if (!isRequired(username)) {
    showError(usernameEl, "Le nom d'utilisateur ne peut pas être vide");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Le nom d'utilisateur doit avoir entre ${min} et ${max} caractères.`
    );
  } else if (!isNameValid(usernameEl)) {
    showError(
      usernameEl,
      `Le nom d'utilisateur ne doit contenir que des lettres.`
    );
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
};
const checkAge = () => {
  let valid = false
  if(!isRequired(dobEl.value)){
    showError(dobEl, "vous devez fournir un age")
  }else if(!verifAge(dobEl)){
    showError(dobEl, "vous n'avez pas l'age")
  }else {
    showSuccess(dobEl)
    valid = true
  }
  return valid
}
const checkName = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const name = nameEl.value.trim(); // permet de supprimer les espaces
  if (!isRequired(name)) {
    showError(nameEl, "Le nom d'utilisateur ne peut pas être vide");
  } else if (!isBetween(name.length, min, max)) {
    showError(
      nameEl,
      `Le nom d'utilisateur doit avoir entre ${min} et ${max} caractères.`
    );
  } else {
    showSuccess(nameEl);
    valid = true;
  }
  return valid;
};

const checkFirstname = () => {
  let valid = false
  if(!isRequired(firstNameEl.value)){
    showError(firstNameEl, "ne peut être vide")
  }else if(!isNameValid(firstNameEl.value)){
    showError(firstNameEl, "vous devez respecter un format precis")
  }else{
    showSuccess(firstNameEl)
    valid = true
  }
  return valid
}
// Je dois mettre en place un ecouteur d'évenement sur le submit de ma forme qui doit empecher la soumission du formulaire au serveur afin de pouvoir emettre les erreurs coté front sans rechargement de la page
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let nameOk = checkName(),
  userNameOk = checkUserName(),
  ageOk = checkAge(),
  firstnameOk = checkFirstname();

let formIsValid = nameOk && userNameOk && ageOk && firstnameOk;

if(formIsValid){
  console.log('tout est bon pour envoi')
}


});
