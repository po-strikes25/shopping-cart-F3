document.getElementById("signup-button").addEventListener("click", (event) => {
    event.preventDefault()

    const fname = document.getElementById("fname").value
    const lname = document.getElementById("lname").value
    const email = document.getElementById("email").value

    const password = document.getElementById("password").value
    const cnf_password = document.getElementById("cnf-password").value

    if (fname && lname && email && password) {
        if (cnf_password === password) {
            let user = {
                "fname": fname,
                "lname": lname,
                "email": email,
                "password": password
            }
            /* don't insert the object in "" inside JSON function */
            localStorage.setItem("user", JSON.stringify(user))

            setTimeout(() => {
                window.location.href = "../shop/shop.html"
            }, 1000)
        } else {
            alert("Error: Password Mismatch !")
        }
    } else {
        alert("Error: All fields are mandatory !")
    }
})