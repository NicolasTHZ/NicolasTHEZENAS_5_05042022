let productLocalStorage = JSON.parse(localStorage.getItem("cart"));
console.log(productLocalStorage);

//import all product Identification into an array
let productId = [];
for (let i = 0; i < productLocalStorage.length; i++) {
    productId[i] = productLocalStorage[i].idKanap;
}
console.log(productId);

//fetching all products
let fetchProduct = async () => {
    return fetch("http://localhost:3000/api/products/") // <-- Added return
      .then(response => {
        return response.json();
      })
      .then((promise) => {console.log(promise); return promise;})
}

let fetchId = async (id) => {
    return fetch("http://localhost:3000/api/products/" + id) // <-- Added return
      .then(response => {
        return response.json();
      })
      .then((promise) => {console.log(promise); return promise;})
}

//fetch product object currently in the cart into productList
let productList = async () => {
    let promise = await fetchProduct();
    console.log(promise);
    let productList = {};
    for(let i = 0; i < promise.length; i++) {
        if(productId[i] === promise[i._id]) {
            productList[i] = promise[i];
        }
    }
    console.log(productList);
    return productList;
}

productList();

//fetch product object currently in the cart into productList


fetchProduct();
// const fetchProduct = async () => {
//     await fetch("http://localhost:3000/api/products/")
//     .then((res) => res.json())
//     .then((promise) => {
//         product = promise;
//         console.log(product)
//     });
// };






// for (let i = 0; i < productId.length; i++) {
//     fetch('http://localhost:3000/api/products/' + productId[i])
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//     throw new Error('Request failed!');
//     }), networkError => console.log(networkError.message)
//     .then((promise) => {product = promise});
// }
async function getTotals(){

    // Récupération du total des quantités
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,
    totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }
    
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;

    // Récupération du prix total
    
    totalPrice = 0;
    for (var i = 0; i < myLength; ++i) {
        let prod = await fetchId(productLocalStorage[i].idKanap);
        console.log(prod);
        totalPrice += (elemsQtt[i].valueAsNumber * prod.price);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}



async function displayCart (){
if (!productLocalStorage) {

    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !";
    sectionCart.style.display = "none";

} else {

    for (let i=0; i < productLocalStorage.length; i++) {
        let item = productLocalStorage[i];
        let pr = await productList();
        console.log(pr);
        let prod = await fetchId(productLocalStorage[i].idKanap);
        console.log(prod);
        document.getElementById('cart__items').innerHTML += `<article class="cart__item" data-id="${productId[i]}" data-color="${productLocalStorage[i].colorKanap}">
            <div class="cart__item__img">
            <img src="${prod.imageUrl}" alt="${prod.altTxtl}">
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${prod.name}</h2>
                <p>${productLocalStorage[i].colorKanap}</p>
                <p>${prod.price}€</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productLocalStorage[i].qtyKanap}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
            </div>
        </article>`;
        

        // let article = e.element.nearest('article');


        // Création de la balise "article" et insertion dans la section
        // let productArticle = document.createElement("article");
        // document.querySelector("#cart__items").appendChild(productArticle);
        // productArticle.className = "cart__item";
        // productArticle.setAttribute("data-id", productLocalStorage[i].idKanap);

        // // Insertion de l'élément "div" pour l'image produit
        // let productDivImg = document.createElement("div");
        // productArticle.appendChild(productDivImg);
        // productDivImg.className = "cart__item__img";

        // // Insertion de l'image
        // let productImg = document.createElement("img");
        // productDivImg.appendChild(productImg);
        // productImg.src = productLocalStorage[i].imgKanap;
        // // productImg.alt = productLocalStorage.altImgProduit;
        
        // // Insertion de l'élément "div" pour la description produit
        // let productItemContent = document.createElement("div");
        // productArticle.appendChild(productItemContent);
        // productItemContent.className = "cart__item__content";

        // // Insertion de l'élément "div"
        // let productItemContentTitlePrice = document.createElement("div");
        // productItemContent.appendChild(productItemContentTitlePrice);
        // productItemContentTitlePrice.className = "cart__item__content__titlePrice";
        
        // // Insertion du titre h2
        // let productTitle = document.createElement("h2");
        // productItemContentTitlePrice.appendChild(productTitle);
        // productTitle.innerHTML = productLocalStorage[i].nameKanap;

        // // Insertion de la couleur
        // let productColor = document.createElement("p");
        // productTitle.appendChild(productColor);
        // productColor.innerHTML = productLocalStorage[i].colorKanap;
        // productColor.style.fontSize = "20px";

        // // Insertion du prix
        // let productPrice = document.createElement("p");
        // productItemContentTitlePrice.appendChild(productPrice);
        // productPrice.innerHTML = productLocalStorage[i].priceKanap + " €";

        // // Insertion de l'élément "div"
        // let productItemContentSettings = document.createElement("div");
        // productItemContent.appendChild(productItemContentSettings);
        // productItemContentSettings.className = "cart__item__content__settings";

        // // Insertion de l'élément "div"
        // let productItemContentSettingsQuantity = document.createElement("div");
        // productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        // productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        
        // // Insertion de "Qté : "
        // let productQty = document.createElement("p");
        // productItemContentSettingsQuantity.appendChild(productQty);
        // productQty.innerHTML = "Qté : ";

        // // Insertion de la quantité
        // let productQuantity = document.createElement("input");
        // productItemContentSettingsQuantity.appendChild(productQuantity);
        // productQuantity.value = productLocalStorage[i].qtyKanap;
        // productQuantity.className = "itemQuantity";
        // productQuantity.setAttribute("type", "number");
        // productQuantity.setAttribute("min", "1");
        // productQuantity.setAttribute("max", "100");
        // productQuantity.setAttribute("name", "itemQuantity");

        // // Insertion de l'élément "div"
        // let productItemContentSettingsDelete = document.createElement("div");
        // productItemContentSettings.appendChild(productItemContentSettingsDelete);
        // productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        // Insertion de "p" supprimer
        // let productSupprimer = document.createElement("p");
        // productItemContentSettingsDelete.appendChild(productSupprimer);
        // productSupprimer.className = "deleteItem";
        // productSupprimer.innerHTML = "Supprimer";
        // productSupprimer.addEventListener("click", (e) => {
        //     e.preventDefault;
            
        //     

        //     // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
        //     let deleteId = productLocalStorage[i].idKanap;
        //     let deleteColor = productLocalStorage[i].colorKanap;

        //     // filtrer l'élément cliqué par le bouton supprimer
        //     productLocalStorage = productLocalStorage.filter( elt => elt.idKanap !== deleteId || elt.colorKanap !== deleteColor);

        //     // envoyer les nouvelles données dans le localStorage
        //     localStorage.setItem('cart', JSON.stringify(productLocalStorage));               

        //     // avertir de la suppression et recharger la page
            
        //     //Si pas de produits dans le local storage on affiche que le panier est vide
        //     if (productLocalStorage.length === 0) {
        //         localStorage.clear();
        //     }
        //     //Refresh rapide de la page
        //     location.reload();
        // });
    }
    getTotals();
    modifyQtt();
    deleteArticle();
}
}

displayCart();





function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k= 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = productLocalStorage[k].qtyKanap;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            const resultFind = productLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.qtyKanap = qttModifValue;
            productLocalStorage[k].qtyKanap = resultFind.qtyKanap;

            localStorage.setItem("cart", JSON.stringify(productLocalStorage));
        
            getTotals();
        })
    }
}


function deleteArticle() {
    let deleteItems = document.querySelectorAll(".deleteItem");

    for (let k= 0; k < deleteItems.length; k++){
        deleteItems[k].addEventListener("click" , (event) => {
            event.preventDefault();
            console.log("Je clique sur le bouton supprimer");

            let article = event.target.closest("article");
            article.remove();
            let idFindIndex = article.getAttribute("data-id");
            let colorFindIndex = article.getAttribute("data-color");
            console.log(idFindIndex);
            console.log("Id : " + article.getAttribute("data-id"));

            // filtrer l'élément cliqué par le bouton supprimer
            productLocalStorage = productLocalStorage.filter( elt => elt.idKanap !== idFindIndex || elt.colorKanap !== colorFindIndex);

            // envoyer les nouvelles données dans le localStorage
            localStorage.setItem('cart', JSON.stringify(productLocalStorage));   

            console.log("Color : " + article.getAttribute("data-color"));
            getTotals();
        }) 
    }
}


//Instauration formulaire avec regex
function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modification du prénom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification du prénom
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification du prénom
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification du prénom
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }
getForm();

function postForm() {
    const order = document.getElementById('order');
    order.addEventListener('click', (event) => {
    event.preventDefault();
  
    // je récupère les données du formulaire dans un objet
    const contact = {
      firstName : document.getElementById('firstName').value,
      lastName : document.getElementById('lastName').value,
      address : document.getElementById('address').value,
      city : document.getElementById('city').value,
      email : document.getElementById('email').value
    }

    //Construction d'un array d'id depuis le local storage
    let products = [];
    for (let i = 0; i<productLocalStorage.length;i++) {
        products.push(productLocalStorage[i].idKanap);
    }
    console.log(products);
  
    // je mets les valeurs du formulaire et les produits sélectionnés
    // dans un objet...
    const sendFormData = {
      contact,
      products,
    }
  
    // j'envoie le formulaire + localStorage (sendFormData) 
    // ... que j'envoie au serveur
  
    const options = {
      method: 'POST',
      body: JSON.stringify(sendFormData),
      headers: { 
        'Content-Type': 'application/json',
      }
    };
  
    fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
        localStorage.setItem('orderId', data.orderId);
        document.location.href = 'confirmation.html?id='+ data.orderId;
      });
  
  }); // fin eventListener postForm
  } // fin envoi du formulaire postForm
  postForm();