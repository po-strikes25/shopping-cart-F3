const currentUserObj = JSON.parse(localStorage.getItem("currentUser"));

let categories = {};
function getRandomSize() {
    const size = ["S", "M", "L", "XL", "XXL"];
    let newSize = size.filter(() => {
        const random = Math.ceil(Math.random() * 10) % 8;
        if (random < 5) {
            return random;
        }
    })
    return newSize;
}
function getRandomColor() {
    const color = ["yellow", "green", "blue", "red", "black"];
    let newColor = color.filter(() => {
        const random = Math.ceil(Math.random() * 10) % 8;
        if (random < 5) {
            return random;
        }
    })
    return newColor;
}
function appendDataOnUI() {
    const dataContainerDiv = document.getElementsByClassName("data_container")[0];
    dataContainerDiv.innerHTML = "";
    for (let category in categories) {

        const clothsContainer = document.createElement("div");
        clothsContainer.className = "cloths_container";

        const clothsHeading = document.createElement("h1")
        clothsHeading.innerHTML = `${category}`
        clothsContainer.appendChild(clothsHeading);

        const clothsCardContainer = document.createElement("div")
        clothsCardContainer.className = "cloths_card_container"

        for (let item of categories[category]) {
            const card = document.createElement("div")
            card.className = "card"

            const productImg = document.createElement("img")
            productImg.src = item.image
            card.appendChild(productImg);

            const productDescriptionContainer = document.createElement("div");
            productDescriptionContainer.className = "product_descriptions";

            const productTitle = document.createElement("p");
            productTitle.innerText = item.title.substring(0, 50);
            productTitle.className = "product_title"
            productDescriptionContainer.appendChild(productTitle);

            const productDescription = document.createElement("p");
            productDescription.innerText = item.description.substring(0, eval(75 * 3));
            productDescription.className = "product_description"
            productDescriptionContainer.appendChild(productDescription);
            card.appendChild(productDescriptionContainer);

            const productDetails = document.createElement("div")
            productDetails.className = "product_details"

            const priceAndSize = document.createElement("div")
            priceAndSize.className = "price_size"

            const price = document.createElement("span")
            price.innerText = `$${item.price}`
            priceAndSize.appendChild(price);

            const sizeContainer = document.createElement('span')
            const randomSize = item.size;

            randomSize.map((size) => {
                sizeContainer.innerText = sizeContainer.innerText + "," + size;
            })
            sizeContainer.innerText = sizeContainer.innerText.substring(1, sizeContainer.innerText.length);
            if (sizeContainer.innerText.length < 2) {
                sizeContainer.innerText = "";
            }
            priceAndSize.appendChild(sizeContainer);
            productDetails.appendChild(priceAndSize);

            const clothsColorContainer = document.createElement("div");
            clothsColorContainer.className = "cloth_color-container"

            const colorSpanLabel = document.createElement("span")
            colorSpanLabel.innerText = "Colors : "
            clothsColorContainer.appendChild(colorSpanLabel);

            const clothsColorSpan = document.createElement("span");
            clothsColorSpan.className = "cloths_color";

            const colors = item.color;
            colors.map((color) => {
                const colorSpan = document.createElement("span");
                colorSpan.style.backgroundColor = `${color}`
                clothsColorSpan.appendChild(colorSpan);
            })
            clothsColorContainer.appendChild(clothsColorSpan);
            productDetails.appendChild(clothsColorContainer);

            const ratingContainer = document.createElement("div");
            ratingContainer.className = "rating"

            const ratingLabel = document.createElement("span")
            ratingLabel.innerText = "Rating : ";
            ratingContainer.appendChild(ratingLabel);

            const actualRating = item.rating.rate;
            const actualRatingCeilValue = Math.ceil(actualRating);
            for (let rate = 0; rate < actualRatingCeilValue - 1; rate++) {
                const starIcon = document.createElement("span");
                starIcon.className = "material-icons"
                starIcon.innerText = "star";
                ratingContainer.appendChild(starIcon);
            }

            if (actualRating < actualRatingCeilValue) {
                const starIcon = document.createElement("span");
                starIcon.className = "material-icons"
                starIcon.innerText = "star_half";
                ratingContainer.appendChild(starIcon);
            }
            const ratingValue = document.createElement("span");
            ratingValue.innerText = `${actualRating}`;
            ratingContainer.appendChild(ratingValue);

            productDetails.appendChild(ratingContainer);
            card.appendChild(productDetails);

            const addToCartButtonContainer = document.createElement("div");
            addToCartButtonContainer.className = "add_to_cart_btn-container";

            const addtoCartButton = document.createElement("button");
            addtoCartButton.innerText = "Add to cart"
            addtoCartButton.dataset.product = `${JSON.stringify(item)}`
            addToCartButtonContainer.appendChild(addtoCartButton);

            card.appendChild(addToCartButtonContainer);
            clothsCardContainer.appendChild(card);

            productImg.addEventListener("mouseover", () => {
                productImg.style.opacity = '0.111';
                productDescriptionContainer.style.visibility = 'visible';

            })
            productDescriptionContainer.addEventListener("mouseover", () => {
                productImg.style.opacity = '0.111';
                productDescriptionContainer.style.visibility = 'visible';
            })
            productImg.addEventListener("mouseout", () => {
                productImg.style.opacity = '1';
                productDescriptionContainer.style.visibility = 'hidden';
            })
            productDescriptionContainer.addEventListener("mouseout", () => {
                productImg.style.opacity = '1';
                productDescriptionContainer.style.visibility = 'hidden';
            })
            addtoCartButton.addEventListener("click", (e) => {
                const btn = e.target;
                const actualItem = JSON.parse(btn.dataset.product);
                const userCartRaw = localStorage.getItem("curretUserCart");
                const userCart = JSON.parse(userCartRaw);
                const currentUserCart = userCart[currentUserObj.email];
                currentUserCart.push(actualItem);
                userCart[currentUserObj.email] = currentUserCart;

                localStorage.setItem("curretUserCart", JSON.stringify(userCart));
            })
        }
        clothsContainer.appendChild(clothsCardContainer);
        dataContainerDiv.appendChild(clothsContainer);
        const horizontalLine = document.createElement("hr");
        dataContainerDiv.appendChild(horizontalLine);
    }
}
async function fetchData() {
    const getCategoriesFromLocal = localStorage.getItem("clothsCategory");
    if (getCategoriesFromLocal === null) {
        console.log("Wait...")
        console.log("Fetching Data from API...")
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json();

        data.map(item => {
            if (item.category in categories) {
                categories[`${item.category}`].push(item);
            } else {
                categories[`${item.category}`] = [];
                categories[`${item.category}`].push(item);
            }

        });
    } else {
        console.log("Loading data from Local Storage...")
        categories = JSON.parse(getCategoriesFromLocal);
    }
    // add radom color and size in categories
    for (let i in categories) {
        for (let j of categories[i]) {
            j["color"] = getRandomColor();
            j["size"] = getRandomSize();
        }
    }
    localStorage.setItem("clothsCategory", JSON.stringify(categories));
    appendDataOnUI();
}

// redirecting user if user is not logged in
const currentUser = localStorage.getItem("currentUser");
if (currentUser === null) {
    window.location.href = "../index.html";
}
// fiter from search bar

function searchCategory(searchString) {
    for (let category in categories) {
        const newCategory = categories[category].filter((item) => {
            if (item.title.includes(searchString)) {
                return item;
            }
        })
        categories[category] = newCategory;
    }
    appendDataOnUI();
}

document.getElementById("search_product").addEventListener("keyup", (event) => {
    event.preventDefault();
    const searchString = event.target.value;
    filterData(searchString)
})
// filter data based on filter buttons
const filterButtons = document.getElementsByClassName("filter_btn");

for (let button = 0; button < filterButtons.length; button++) {
    filterButtons[button].addEventListener("click", (e) => {
        for (let button = 0; button < filterButtons.length; button++) {
            filterButtons[button].classList.remove("filter_btn_active");
        }
        const filterbutton = e.target;
        filterbutton.classList.add("filter_btn_active");
        const dataFromLocal = JSON.parse(localStorage.getItem("clothsCategory"));
        if (filterbutton.dataset.category === "no_filter") {
            categories = { ...dataFromLocal };
            appendDataOnUI();
            return;
        }
        for (let category in dataFromLocal) {
            if (category == (filterbutton.dataset.category)) {
                categories = {
                    category: dataFromLocal[`${category}`]
                }
            }
        }
        appendDataOnUI();
    })
}

//side filter
const filterData = (searchString) => {
    for (let category in categories) {
        const newCategory = categories[category].filter((item) => {
            if (item.title.includes(searchString)) {
                return item;
            }
        })
        categories[category] = newCategory;
    }
    appendDataOnUI();
}
const colorFilter = document.querySelectorAll(".colors_filter input");
const sizeFilter = document.querySelectorAll(".sizes_filter input");
const priceFilter = document.querySelectorAll(".price_filter input");
const filterbtns = document.querySelectorAll(".filter_btns buttons");
for (let i = 0; i < colorFilter.length; i++) {
    colorFilter[i].addEventListener("change", (event) => {

    });
}
for (let i = 0; i < colorFilter.length; i++) {
    colorFilter[i].addEventListener("click", () => {
        if (colorFilter[i].checked) {
        }
    })
}

const linkTag = document.querySelectorAll(".navbar_right_container a");
for (let i = 1; i < 3; i++) {
    linkTag[i].removeAttribute("href");
}
//load shop screen
fetchData();