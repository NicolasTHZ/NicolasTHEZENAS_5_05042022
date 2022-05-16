//Récupération de l'id via les paramètres de l'url
const idProduct = new URL(window.location.href).searchParams.get("id");

//Récupération des sélecteurs pour les futurs modifications
let titleProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
let colorsProduct = document.getElementById("colors");
let imgProduct = document.querySelector(".item__img");
let img = document.createElement("img");
imgProduct.appendChild(img);

//affichage des données de ce dernier
getArticle();

function handleResponse(response) {
    console.log("Response : ");
    console.log(response);
    return response.json()
}

function handleProduct(product) {
    console.log("Product : ");
    console.log(product);
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);    
    titleProduct.innerHTML = product.name;
    priceProduct.innerHTML = product.price;
    descriptionProduct.innerHTML = product.description;
    document.title = product.name;

    for (let i=0; i < product.colors.length; i++) {
        let color = document.createElement("option");
        color.setAttribute("value", product.colors[i]);
        color.innerHTML = product.colors[i];
        colorsProduct.appendChild(color);
    }  
}

//Récupération de l'article grace a l'id
async function getArticle() {
     await fetch("http://localhost:3000/api/products/" + idProduct)
    .then(handleResponse)    
    .then(handleProduct);          
}