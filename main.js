// Je dois créer mes variables
const form = document.querySelector("#signup");
// ci-dessous la créations de variables spécifique aux formulaires,pas besion de querySelevtor car
//  le "document.forms" étant prévus pour aller chercher dans le DOM les elements par leur nom.
const usernameEl = document.forms.formValidate.username;
const nameEl = document.forms.formValidate.name;
const firstNameEl = document.forms.formValidate.firstname;
const emailEl = document.forms.formValidate.email;
const dobEl = document.forms.formValidate.dob;
const passEl = document.forms.formValidate.password;
const confEl = document.forms.formValidate["confirm-password"]; // ya un tréma donc on met des crochets et simples guillemets
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
    return false;
  } else {
    return true;
  }
}
// fonction pour valider le password (by pierre car le regex = PFOUUUU !)
function isPasswordValid(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return re.test(password);
}

// pour le fonctionnement même du code il faut faire des fonctions fléchées qui commencent par la création
// d'une constante et qui vont utiliser les fonctions "simples" qui ont été précédement réalisées.
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
  } else if (!isNameValid(username)) {
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
const checkAge = () => {
  let valid = false;
  if (!isRequired(dob.value)) {
    showError(dobEl, "vous devez fournir un age");
  } else if (verifAge(dobEl)) {
    showError(dobEl, "vous n'avez pas l'age");
  } else {
    showSuccess(dobEl);
    valid = true;
  }
  return valid;
};

const checkFirstname = () => {
  let valid = false;
  if (!isRequired(firstNameEl.value)) {
    showError(firstNameEl, "ne peut être vide");
  } else if (!isNameValid(firstNameEl.value)) {
    showError(firstNameEl, "vous devez respecter un format precis");
  } else {
    showSuccess(firstNameEl);
    valid = true;
  }
  return valid;
};
// Je dois mettre en place un ecouteur d'évenement sur le submit de ma forme qui doit empecher la soumission du formulaire au serveur afin de pouvoir emettre les erreurs coté front sans rechargement de la page
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let nameOk = checkName(),
    userNameOk = checkUserName(),
    ageOk = checkAge(),
    firstnameOk = checkFirstname(),
    emailOk = checkEmail(),
    passOk = checkPassword(),
    confPassOk = checkConfPass(),
    sexOk = checkSex();
  let formIsValid =
    nameOk &&
    userNameOk &&
    ageOk &&
    firstnameOk &&
    emailOk &&
    passOk &&
    confPassOk &&
    sexOk;

  if (formIsValid) {
    console.log("tout est bon pour envoi");
  }
});
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isValidEmail(email)) {
    showError(emailEl, "email invalide");
  } else {
    showSuccess(emailEl, "email valide");
    valid = true;
  }
  return valid;
};
// isPasswordValid
const checkPassword = () => {
  let valid = false;
  const passW = passEl.value.trim();
  if (!isRequired(passW)) {
    showError(passEl, "Le mot de passe ne peut être vide");
  } else if (!isPasswordValid(passW)) {
    showError(
      passEl,
      " Le mot de passe doit comprendre au moins une majuscule un chiffre et un caratére spécial situé dans cette liste : (!@#$%^&*)"
    );
  } else {
    showSuccess(passEl, "password ok");
    valid = true;
  }
  return valid;
};
const checkConfPass = () => {
  let valid = false;
  const confPass = confEl.value.trim();
  const passW = passEl.value.trim();
  if (!isRequired(confPass)) {
    showError(confEl, "La confirmation du mot de passe ne peut être vide");
  } else if (!isPasswordValid(confPass)) {
    showError(
      confEl,
      " Le mot de passe doit comprendre au moins une majuscule un chiffre et un caratére spécial situé dans cette liste : (!@#$%^&*)"
    );
  } else if (confPass !== passW) {
    showError(confEl, "N'est pas identique au mot de passe");
  } else {
    showSuccess(confEl, "password ok");
    valid = true;
  }
  return valid;
};
const checkSex = () => {
  let valid = false;
  const quelSex = sexEl.value;
  if (!isRequired(quelSex)) {
    showError(sexEl, "Vous devez choisir");
  } else {
    showSuccess(sexEl);
    valid = true;
  }
  return valid;
};
// bon maintenant il fait faire en sorte que des que l'utilisateur commence à taper quelque chose sur le formulaire
// il change de couleur en fonction des validations mises en places: un addEvenListener sur le formulaire (form)
// et qui déclenche les vérifs toutes les 1/2 secondes, pour ça ce sera "debounce" donc en premier,
// mise en place de la fonction fléchée "debounce"
const debounce = (jss, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      jss.apply(null, args);
    }, delay);
  };
};
// ensuite l'addEventListener
form.addEventListener('input', 
debounce(function(e) {
  switch(e.target.id) {
    case "username":
      checkUserName();
      break;
    case "name":
      checkName();
      break;
    case "firstname":
      checkFirstname();
      break;
    case "email":
      checkEmail();
      break;
    case "dob":
      checkAge();
      break
    case "password":
      checkPassword();
      break;
    case "confirm-password":
      checkConfPass();
      break;
    case "sex":
      checkSex();
      break;
  }
})
)