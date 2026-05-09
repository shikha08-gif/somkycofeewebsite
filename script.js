let isLoginMode = true;
let isLoggedIn = false;
let currentUser = "";

// INIT
window.addEventListener("load", function () {
  const isUserLogged = localStorage.getItem("currentLoggedInUser");

  if (!isUserLogged) {
    openLoginModal();
  } else {
    currentUser = isUserLogged;
    isLoggedIn = true;
    updateLoginButton();
  }

  // EVENTS
  document.querySelector(".login-btn").addEventListener("click", openLoginModal);
  document.querySelector(".close-btn").addEventListener("click", closeLoginModal);

  document.getElementById("authForm").addEventListener("submit", handleAuth);

  const vacancyForm = document.querySelector(".vacancy-form");
  if (vacancyForm) {
    vacancyForm.addEventListener("submit", submitForm);
  }
});

// MODAL
function openLoginModal() {
  document.getElementById("loginModal").classList.remove("hidden");
}

function closeLoginModal() {
  if (!isLoggedIn) return;
  document.getElementById("loginModal").classList.add("hidden");
}

// SWITCH MODE
function toggleAuthMode() {
  isLoginMode = !isLoginMode;

  const confirm = document.getElementById("authConfirm");
  const title = document.getElementById("authTitle");
  const btn = document.getElementById("authBtn");

  if (isLoginMode) {
    title.innerText = "☕ Login";
    btn.innerText = "Login Now";
    confirm.classList.add("hidden");
  } else {
    title.innerText = "✨ Register";
    btn.innerText = "Create Account";
    confirm.classList.remove("hidden");
  }
}

// LOGIN BUTTON UPDATE
function updateLoginButton() {
  const btn = document.querySelector(".login-btn");

  btn.innerText = "👤 " + currentUser;

  btn.onclick = function () {
    if (confirm("Logout?")) {
      localStorage.removeItem("currentLoggedInUser");
      location.reload();
    }
  };
}

// AUTH
function handleAuth(e) {
  e.preventDefault();

  const username = document.getElementById("authUsername").value.trim();
  const password = document.getElementById("authPassword").value;
  const confirmPass = document.getElementById("authConfirm").value;
  const msg = document.getElementById("authMsg");

  if (isLoginMode) {
    const user = JSON.parse(localStorage.getItem(username));

    if (user && user.password === password) {
      msg.innerText = "✓ Login Successful";
      msg.style.color = "green";

      localStorage.setItem("currentLoggedInUser", username);
      currentUser = username;
      isLoggedIn = true;

      setTimeout(() => {
        updateLoginButton();
        closeLoginModal();
        alert("Welcome " + username);
      }, 800);
    } else {
      msg.innerText = "✗ Invalid Login";
      msg.style.color = "red";
    }
  } else {
    if (password !== confirmPass) {
      msg.innerText = "✗ Password mismatch";
      msg.style.color = "red";
      return;
    }

    localStorage.setItem(username, JSON.stringify({ password }));

    msg.innerText = "✓ Registered!";
    msg.style.color = "green";

    setTimeout(() => toggleAuthMode(), 1000);
  }
}

// FORGOT PASSWORD
function forgotPassword() {
  const username = prompt("Enter username:");

  const user = JSON.parse(localStorage.getItem(username));

  if (user) {
    alert("Password: " + user.password);
  } else {
    alert("User not found!");
  }
}

// VACANCY FORM
function submitForm(e) {
  e.preventDefault();

  if (!isLoggedIn) {
    alert("⚠️ Please login first!");
    openLoginModal();
    return;
  }

  alert("✅ Application Submitted!");

  e.target.reset();
}

// CART
function addToCart(product) {
  alert(product + " added 🛒");
}