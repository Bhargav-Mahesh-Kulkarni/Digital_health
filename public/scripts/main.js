// Show the login modal
function openLoginModal() {
    document.getElementById("loginModal").style.display = "block";
  }
  
  // Hide the login modal
  function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
  }
  
  // Simulated login (you can replace this with Firebase later)
  function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    if (email === "" || password === "") {
      alert("Please fill both fields.");
      return;
    }
  
    alert("Login successful! Redirecting to dashboard...");
    window.location.href = "dashboard.html"; // Make sure dashboard.html exists
  }
  