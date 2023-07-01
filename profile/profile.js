const usersDetails = JSON.parse(localStorage.getItem("user"));
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const firstName = document.getElementById("profile_input_firstname");
const lastName = document.getElementById("profile_input_lastname");

document.getElementById("user-logout").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../index.html"
    localStorage.removeItem("currentUser");
})
document.getElementById("profile_saveinfo_btn").addEventListener("click", (e) => {
    e.preventDefault();
    const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;
    usersDetails[0].map((user) => {
        if (user.email === currentUser.email) {
            user.name = `${firstNameValue} ${lastNameValue}`
        }
    })
    localStorage.setItem("user", JSON.stringify(usersDetails))
})

document.getElementById("profile_change_password_btn").addEventListener("click", (e) => {
    e.preventDefault();

    const oldPassword = document.getElementById("profile_input_old_password").value;
    const newPassword = document.getElementById("profile_input_new_password").value;
    const confirmNewPassword = document.getElementById("profile_input_cofirm_password").value;

    if (newPassword !== confirmNewPassword) {
        alert("Confirm Password does not match")
        return;
    }

    let isPasswordUpdated = false;
    usersDetails[0].map((user) => {
        if (user.password === oldPassword) {
            user.password = newPassword;
            currentUser.password = newPassword;
            localStorage.setItem("user", JSON.stringify(usersDetails))
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            isPasswordUpdated = true;
        }
    })
    if (!isPasswordUpdated) {
        alert("Old password is wrong!");
    }
})

const currentUserRaw = localStorage.getItem("currentUser");

if (currentUserRaw === null) {
    window.location.href = "../index.html";
} else {
    const [name, last] = currentUser.name.split(" ");
    firstName.value = name;
    firstName.style.fontWeight = "Bold";
    lastName.value = last;
    lastName.style.fontWeight = "Bold";
}


const linkTag = document.querySelectorAll(".navbar_right_container a");
for (let i = 1; i < 3; i++) {
    linkTag[i].removeAttribute("href");
}