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
    // showSuccess(dateSaisie);
    return false
  } else {
    return true
  }
}
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
// le userName ne doit pas contenir : root, afpa et deus
// Les noms et prénoms ne pourront pas contenir de chiffres et devront avoir une taille minimale de 3 caractères et un max de 15.
// Le mot de passe a huit caractères ou plus. Et il doit contenir 1 caractère minuscule, 1 caractère majuscule, 1 chiffre et au moins un caractère spécial dans cet ensemble ( !@#$%^&*).



// je récapitule les fonctions que j'ai déjas en place :
// fonction qui vérifie si la valeur d'un input est vide :
// function isRequired()
// fonction de vérification de taille :
// function isBetween()
// fonction qui interdit les mots "root", "afpa", "deus" et qui n'autorise que la saisie de lettre :
// function isNameValid()
// fonction qui permette d'afficher les erreurs en rouge :
// function showError()
// fonction qui permette d'afficher l'element valide en vert :
// function showSuccess()
// fonction pour valider l'email :
// function isValidEmail(email)
// fonction pour valider l'age :
// function checkAge()
// il faut mettre un écouteur d'évenement sur chaque input pour checker si c'est bon
// Sélection des éléments d'entrée
// const userNameInput = document.querySelector("#userName");
// const nomInput = document.querySelector("#name");
// const prenomInput = document.querySelector("#firstname");
// const passwordInput = document.querySelector("#password");
// const emailInput = document.querySelector('#email');
// const ageInput = document.querySelector('#dob');

// form.addEventListener('input', function(e) {
//   const target = e.target;
//   if (target === userNameInput) {
//     if (!isRequired(userNameInput.value)) {
//       alert('Le nom d\'utilisateur est requis.');
//     } else if (!isBetween(nom.value.length, 3, 15)) {
//       alert('Le nom d\'utilisateur doit avoir une longueur minimale de 3 caractères et maximale de 15 caractères.');
//   } else if (!isNameValid(userNameInput.value)) {
//       alert('Le nom d\'utilisateur ne peut pas contenir "root", "afpa" ou "deus" et doit uniquement contenir des lettres.');
//     }
// }
// if (target === nomInput) {
//     if (!isRequired(nomInput.value)) {
//       alert('votre Nom est requis.')
//     } else if (!isBetween(nom.value.length, 3, 15)) {
//       alert('Votre Nom doit avoir une longueur minimale de 3 caractères et maximale de 15 caractères.');
//     } else if (!isNameValid(nomInput.value)) {
//       alert('Votre Nom ne peut pas contenir "root", "afpa" ou "deus" et doit uniquement contenir des lettres.')
//     }
// }
// if (target ===prenomInput) {
//   if (prenomInput.length < 3 || prenomInput.length > 15) {
//   alert(
//     "Le prénom doit avoir une longueur minimale de 3 caractères et maximale de 15 caractères."
//   );
// }
// }
// if (target === emailInput) {
//   isValidEmail();
// }

// });

// Ajout d'un écouteur d'événement 'input' à chaque champ
// userNameInput.addEventListener("input", () => {
  // const userName = userNameInput.value.toLowerCase(); // Convertir en minuscules pour vérifier sans distinction de cas

  // Vérifier si le userName contient les valeurs interdites
  // if (
    // userName.includes("root") ||
    // userName.includes("afpa") ||
    // userName.includes("deus")
  // ) {
    // alert(
      // 'Le nom d\'utilisateur ne peut pas contenir "root", "afpa" ou "deus"'
    // );
  // }
// });

// nomInput.addEventListener("input", () => {
  // const nom = nomInput.value;

  // Vérifier si le nom a une longueur valide
  // if (nom.length < 3 || nom.length > 15) {
    // alert(
      // "Le nom doit avoir une longueur minimale de 3 caractères et maximale de 15 caractères."
    // );
  // }
// });

// prenomInput.addEventListener("input", () => {
  // const prenom = prenomInput.value;

  // Vérifier si le prénom a une longueur valide
  // if (prenom.length < 3 || prenom.length > 15) {
    // alert(
      // "Le prénom doit avoir une longueur minimale de 3 caractères et maximale de 15 caractères."
    // );
  // }
// });

// passwordInput.addEventListener("input", () => {
  // const password = passwordInput.value;

  // Vérifier si le mot de passe répond aux critères requis
  // const passwordRegex =
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  // if (!passwordRegex.test(password)) {
    // alert(
      // "Le mot de passe doit avoir au moins 8 caractères, au moins une minuscule, une majuscule, un chiffre et un caractère spécial parmi !@#$%^&*"
    // );
  // }
// });
