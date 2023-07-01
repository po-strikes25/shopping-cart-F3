const ammount = document.getElementById("total_ammount").innerText;
let order_id = "";
const user = JSON.parse(localStorage.getItem("currentUser"))
const userName = user.name;
const userEmail = user.userEmail;
const userMobile = user.userMobile;

const btn = document.getElementById("checkout_button_container");

btn.addEventListener("click", async (e) => {

    e.preventDefault();
    if (ammount == 0) {
        alert("add item in cart for payment");
    } else {
        const alluserCart = JSON.parse(localStorage.getItem("curretUserCart"));
        alluserCart[currentUserEmail] = [];
        localStorage.setItem("curretUserCart", JSON.stringify(alluserCart));
        loadCartUI();
        loadSummary();
        document.getElementById("total_ammount").innerText = 0;
        alert("your order has been placed! Thankyou for shopping with us")
        window.location.href = "../cart/cart.html";

    }
})