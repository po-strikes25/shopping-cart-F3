const currentUser = localStorage.getItem("currentUser");
if (currentUser === null) {
    window.location.href = "../index.html";
}
const currentUserObject = JSON.parse(currentUser);
const currentUserEmail = currentUserObject.email;
const currentUserCart = localStorage.getItem("curretUserCart");
const cartCardContainer = document.getElementById("cart_card_container");
function loadCartUI() {
    const userCart = (JSON.parse(localStorage.getItem("curretUserCart")))[currentUserEmail];
    userCart.map((item) => {
        const cartCard = document.createElement("div");
        cartCard.className = "cart_card";

        const productImg = document.createElement("img")
        productImg.src = item.image;
        cartCard.appendChild(productImg);

        const cartCardDetails = document.createElement("div")
        cartCardDetails.className = "cart_details"

        const cartProductTitle = document.createElement("div")
        cartProductTitle.className = "cart_product_title"

        const titleLabelSpan = document.createElement("span")
        titleLabelSpan.innerText = "Title : "
        cartProductTitle.appendChild(titleLabelSpan);

        const titleActualValue = document.createElement("span")
        titleActualValue.innerText = `${item.title}`
        titleActualValue.innerText = titleActualValue.innerText.substring(0, 50)
        cartProductTitle.appendChild(titleActualValue);

        cartCardDetails.appendChild(cartProductTitle);

        const cartProductPrice = document.createElement("div");
        cartProductPrice.className = "cart_product_price"

        const priceLabelSpan = document.createElement("span")
        priceLabelSpan.innerText = "Price : "
        cartProductPrice.appendChild(priceLabelSpan);

        const actualPriceSpan = document.createElement("span")
        actualPriceSpan.innerText = `$${item.price}`
        cartProductPrice.appendChild(actualPriceSpan);

        cartCardDetails.appendChild(cartProductPrice);
        cartCard.appendChild(cartCardDetails)

        const removeFromCartButtonContainer = document.createElement("div")
        removeFromCartButtonContainer.className = "remove_from_cart_btn-container"

        const removeFromCartButton = document.createElement("button")
        removeFromCartButton.innerText = "Remove From Cart"
        removeFromCartButton.dataset.product = `${JSON.stringify(item)}`
        removeFromCartButtonContainer.appendChild(removeFromCartButton);

        cartCard.appendChild(removeFromCartButtonContainer);
        cartCardContainer.appendChild(cartCard);
        removeFromCartButton.addEventListener("click", (e) => {
            const btn = e.target;
            const actualItem = JSON.parse(btn.dataset.product);
            let userCart = (JSON.parse(localStorage.getItem("curretUserCart")))[currentUserEmail];
            // if id match remove 
            let removeItemIndex = -1;
            userCart.map((element, index) => {
                if (element.id === actualItem.id) {
                    removeItemIndex = index;
                }
            })
            if (removeItemIndex > -1) {
                userCart.splice(removeItemIndex, 1);
                const currentUserCartObject = JSON.parse(currentUserCart)
                currentUserCartObject[currentUserEmail] = userCart;
                localStorage.setItem("curretUserCart", JSON.stringify(currentUserCartObject))
                window.location.href = "../cart/cart.html";
            }
        })
    })
}

function loadSummary() {
    const cartItem = JSON.parse(localStorage.getItem("curretUserCart"))

    const listItems = document.getElementsByClassName("list_items")[0];

    const total = cartItem[currentUserEmail].reduce((sum, item, index) => {
        const itemContainer = document.createElement("div");
        itemContainer.className = "item";

        const itemName = document.createElement("span")
        itemName.innerText = `${index + 1}.  ${item.title}`
        itemName.style.display = "inline-block";
        itemName.style.width = "120px";
        itemName.style.overflow = "hidden";
        itemContainer.appendChild(itemName);

        const itemPrice = document.createElement("span")
        itemPrice.innerText = `$${item.price}`
        itemContainer.appendChild(itemPrice);

        listItems.appendChild(itemContainer);
        return sum + item.price;
    }, 0)
    document.getElementById("total_ammount").innerText = total;
}
cartCardContainer.innerHTML = '';

if (((JSON.parse(currentUserCart))[currentUserEmail]).length > 0) {
    loadCartUI();
    loadSummary();
} else {
    // update cart as no item and summary will be 0
    const emptyCart = document.createElement("img")
    emptyCart.src = '../images/empty-cart.jpg';
    emptyCart.style.width = "100%"
    emptyCart.style.height = "470px"
    cartCardContainer.appendChild(emptyCart);
}

const linkTag = document.querySelectorAll(".navbar_right_container a");
for (let i = 1; i < 3; i++) {
    linkTag[i].removeAttribute("href");
}
