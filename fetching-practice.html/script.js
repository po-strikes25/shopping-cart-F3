/* no (.value) required here */
let items_container = document.querySelector(".items-container")

let shopping_item = document.createElement("div")
shopping_item.id = "shopping-item"

// function renderItem(item_data) {
/* appending image */
// let item_img_div = document.createElement("div")
// item_img_div.id = "item-img"

// let item_image = document.createElement("img")
// item_image.id = "item-image"
// item_image.src = item_data.image

// item_img_div.appendChild(item_image)

// /* appending item-details */
// let item_details_div = document.createElement("div")
// item_details_div.id = "item-details"

// let dollar_size = document.createElement("div")
// dollar_size.id = "dollar-size"

// let price_p = document.createElement("p")
// price_p.id = "price"
// price_p.textContent = `$ ${item_data.price}`

// let size_p = document.createElement("p")
// size_p.id = "size"
// size_p.textContent = "S, M, L"

// dollar_size.appendChild(price_p)
// dollar_size.appendChild(size_p)

// /* appending title */
// let title_title = document.createElement("div")
// title_title.id = "title"
// /* not working */
// title_title.textContent = item_data.title

// /* appending colors */
// let colors = document.createElement("div")
// colors.id = "color"

// let img_purple = document.createElement("img")
// img_purple.src = "../images/purple-moon.png"

// let img_yellow = document.createElement("img")
// img_yellow.src = "../images/yellow-moon.png"

// let img_green = document.createElement("img")
// img_green.src = "../images/green-moon.png"
// colors.textContent = `Colors : `

// colors.append(img_purple)
// colors.append(img_yellow)
// colors.append(img_green)

// /* appending rating */
// let rating_rating = document.createElement("div")
// rating_rating.id = "rating"
// rating_rating.value = `Rating : ${item_data.rating.rate}`

// item_details_div.appendChild(dollar_size)
// item_details_div.appendChild(title_title)
// item_details_div.appendChild(colors)
// item_details_div.appendChild(rating_rating)

// shopping_item.appendChild(item_img_div)
// shopping_item.appendChild(item_details_div)

// items_container.appendChild(shopping_item)
// } 

/* recreating the div container dynamically */
function renderItem(item_data) {
    /* upon hopping item hover : 
    let desc = document.createElement("div")
    desc.textContent = item_data.description */

    items_container.innerHTML += `
    <div id="shopping-item">
        <div id="item-img">
            <img id="item-image" src="${item_data.image}" alt="item-img">
        </div>
        <div id="item-details">
            <div id="dollar-size">
                <p id="price"></p>
                <p id="size">S, M, L</p>
            </div>
            <div id="title">Title: </div>
            <div id="color">Colors :
                <img src="../images/purple-moon.png" alt="">
                <img src="../images/yellow-moon.png" alt="">
                <img src="../images/green-moon.png" alt="">
            </div>
            <div id="rating">Rating :
                <img src="../images/rating.png" alt="">
                <img src="../images/rating.png" alt="">
                <img src="../images/rating.png" alt="">
            </div>
        </div>
        <div id="add-to-cart">
            <button id="add-to-cart-button">Add To Cart</button>
        </div>
    </div>`
}

fetch("https://fakestoreapi.com/products")
    .then((data) => data.json())
    .then((data) => {
        for (let i in data) {
            if (i <= 4) {
                renderItem(data[i])
            }
        }
    })
