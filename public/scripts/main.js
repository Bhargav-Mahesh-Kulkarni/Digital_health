// Open/close modals
function openRegisterModal() {
  document.getElementById("registerModal").style.display = "flex";
}
function closeRegisterModal() {
  document.getElementById("registerModal").style.display = "none";
}
function openLoginModal() {
  document.getElementById("loginModal").style.display = "flex";
}
function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none";
}

// Register function (Temporary logic for now)
function register() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  if (!name || !email || !password) {
    alert("Please fill all registration fields.");
    return;
  }

  // Simulate registration success
  alert("Registration successful! Now you can log in.");
  closeRegisterModal();
  openLoginModal();
}

// Login function (fake login for now)
function login() {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPassword").value;

  if (!email || !pass) {
    alert("Please fill both login fields.");
    return;
  }

  // Simulate login success
  alert("Login successful! Redirecting to dashboard...");
  window.location.href = "dashboard.html";
}

  