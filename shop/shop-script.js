/* dynamic rendering code */
let clothing_items;
let mens_items = []
let womens_items = []
let jewellery_items = []
let electronics_items = []
/*  
    childNodes contains all nodes, 
    including text nodes consisting entirely of whitespace, 
    while children is a collection of just the child nodes that are elements;
*/
let filter_buttons = [...document.getElementById("filter-container").children]

let shopping_item = document.createElement("div")
shopping_item.id = "shopping-item"

let mens_container = document.getElementById("mens-container")
let womens_container = document.getElementById("womens-container")
let jewellery_container = document.getElementById("jewellery-container")
let electronics_container = document.getElementById("electronics-container")

function generateColors(object) {
    object.colors = ["red", "blue", "black"]
}

function generateSizes(object) {
    object.sizes = ["s", "l", "m", "xl"]
}

function renderItem(item_data) {
    for (let i in item_data) {
        clothing_items.innerHTML += `
    <div id="shopping-item">
        <div id="item-img">
            <img id="item-image" src="${item_data[i].image}" alt="item-img">
        </div>
        <div id="item-details">
            <div id="dollar-size">
                <p id="price">$ ${item_data[i].price}</p>
                <p id="size">S, M, L</p>
            </div>
            <div id="title">${item_data[i].title}</div>
            <div id="color">Colors :
                <img src="../images/purple-moon.png" alt="">
                <img src="../images/yellow-moon.png" alt="">
                <img src="../images/green-moon.png" alt="">
            </div>
            <div id="rating">Rating : 
                <img src="../images/rating.png" alt="">
                <img src="../images/rating.png" alt="">
                <img src="../images/rating.png" alt="">
                ${item_data[i].rating.rate}
            </div>
        </div>
        <div id="add-to-cart">
            <button id="add-to-cart-button">Add To Cart</button>
        </div>
    </div>`
    }
}

/* IIFE not working */
function renderAll() {
    /* simulate these */
    clothing_items = document.querySelector(".mens-container > .clothing-items")
    renderItem(mens_items)

    clothing_items = document.querySelector(".womens-container > .clothing-items")
    renderItem(womens_items)

    clothing_items = document.querySelector(".jewellery-container > .clothing-items")
    renderItem(jewellery_items)

    clothing_items = document.querySelector(".electronics-container > .clothing-items")
    renderItem(electronics_items)
}

/* add to cart */
document.getElementById("add-to-cart-button").addEventListener("click", (event) => {

})

fetch('https://fakestoreapi.com/products')

    /*
        json() is asynchronous and returns 
        a Promise object that resolves to a js object;
        
        JSON. parse() is synchronous can parse 
        a string to (a) js object(s);

        (data) is in json format;
    */
    .then((dataJson) => dataJson.json())
    /*
        data is an object of the below format:

        Response {
            type: 'cors', 
            url: 'https://fakestoreapi.com/products/1', 
            redirected: false, 
            status: 200, 
            ok: true, …
        }
        
        body: ReadableStream
        bodyUsed: false
        headers: Headers {
            Headers [[Prototype]]
        }
        ok: true
        redirected: false
        status: 200
        statusText: ""
        type: "cors"
        url: "https://fakestoreapi.com/products/1"
        [[Prototype]]: Response
    */

    /* 
        for..in
        forEach()
        map() 
    */
    .then((data) => {

        for (let i = 0; i < 4; i++) {
            data[i].colors = generateColors(data[i])
            data[i].sizes = generateSizes(data[i])

            mens_items.push(data[i])
        }

        for (let i = 14; i <= 19; i++) {
            data[i].colors = generateColors(data[i])
            data[i].sizes = generateSizes(data[i])

            womens_items.push(data[i])
        }

        for (let i = 4; i <= 7; i++) {
            data[i].colors = generateColors(data[i])
            data[i].sizes = generateSizes(data[i])

            jewellery_items.push(data[i])
        }

        for (let i = 8; i <= 13; i++) {
            data[i].colors = generateColors(data[i])
            data[i].sizes = generateSizes(data[i])

            electronics_items.push(data[i])
        }

        filter_buttons.forEach((button) => {
            /* control re-rendering upon reclick */
            button.addEventListener("click", () => {
                if (button.innerText === "Mens") {
                    /* querySelectorAll returns a static list of nodes */
                    clothing_items = document.querySelector(".mens-container > .clothing-items")

                    /* hide other divs */

                    renderItem(mens_items)
                } else if (button.innerText === "Womens") {
                    clothing_items = document.querySelector(".womens-container > .clothing-items")
                    renderItem(womens_items)
                } else if (button.innerText === "Jewellery") {
                    clothing_items = document.querySelector(".jewellery-container > .clothing-items")
                    renderItem(jewellery_items)
                } else if (button.innerText === "Electronics") {
                    clothing_items = document.querySelector(".electronics-container > .clothing-items")
                    renderItem(electronics_items)
                }
            })
        })
        renderAll()
    })

