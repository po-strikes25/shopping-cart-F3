function generateAccessToken() {
    var token = ""
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var length = 16;

    /* generating random number */
    for (let i = 0; i <= length; i++) {
        var random_num = Math.floor(Math.random() * chars.length);
        token += chars.substring(random_num, random_num + 1);
    }
    return token
}

document.getElementById("login-button").addEventListener("click", (event) => {
    event.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    let user = JSON.parse(localStorage.getItem("user"))

    if (user !== undefined) {
        if (email && password) {
            if (user.email === email && user.password === password) {
                user.accessToken = generateAccessToken()
                localStorage.setItem("user", JSON.stringify("user"))
                setTimeout(() => {
                    window.location.href = "../shop/shop.html"
                }, 1000)
            } else {
                alert("Email or Password is incorrect !")
            }
        } else {
            alert("Error: All fields are mandatory !")
        }
    } else {
        alert("This email is not linked to any MeShop account. Please signup !")
    }
})