creationProducts();
async function creationProducts() {
    fetch('http://localhost:3000/api/products').then(function (data) {
        return data.json();
    }).then(function (product) {
        //let product = JSON.parse(results); 
        console.table(product);
        for (let i=0; i < product.length; i++) {		
            document.getElementById('items').innerHTML += `<a href="./product.html?id=${product[i]._id}">
                <article>
                <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
                <h3 class="productName">Kanap name1</h3>
                <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
                </article>
            </a>`;
        }   
        console.log("Success");
    });
   
}