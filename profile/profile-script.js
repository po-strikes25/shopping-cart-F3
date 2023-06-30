const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
let user = JSON.parse(localStorage.getItem("user"))

window.onload = (event) => {
    /* for inputs value AND NOT textContent */
    fname.value = user.fname
    lname.value = user.lname
}

document.getElementById("save-info").addEventListener("click", (event) => {
    if (user.fname !== fname.value) {
        user.fname = fname.value
        localStorage.setItem("user", JSON.stringify(user))
    }

    if (user.lname !== lname.value) {
        user.lname = lname.value
        localStorage.setItem("user", JSON.stringify(user))
    }

    alert("Changes have been saved !")

})

document.getElementById("change-pswrd").addEventListener("click", (event) => {
    const old_password = document.getElementById("old-password").value
    const new_password = document.getElementById("new-password").value
    const cnf_password = document.getElementById("cnf-password").value


    let user = JSON.parse(localStorage.getItem("user"))
    if (user.password !== old_password) {
        alert("Old Password is incorrect")
    } else {
        if (new_password !== cnf_password) {
            alert("Password Mismatch !")
        } else {
            user.password = new_password
            localStorage.setItem("user", JSON.stringify(user))
            alert("Password changed successfully !")
        }
    }
})

document.getElementById("logout-button").addEventListener("click", (event) => {
    alert("You are being logged out !")
    setTimeout(() => {
        window.location.href = "../index.html"
    }, 1000)
})

