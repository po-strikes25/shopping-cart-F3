document.getElementById("login").addEventListener("click", () => {
    window.location.href = "./login/login.html"
})

document.getElementById("signup").addEventListener("click", () => {
    window.location.href = "./signup/signup.html"
})

const currentUser = localStorage.getItem("currentUser");

if (currentUser !== null) {
    window.location.href = "./index.html";
}