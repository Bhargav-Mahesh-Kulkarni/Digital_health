// Load saved profile from localStorage when page opens
window.onload = function () {
  const saved = localStorage.getItem("patientProfile");
  if (saved) {
    const profile = JSON.parse(saved);
    document.getElementById("patientName").value = profile.name || "";
    document.getElementById("patientAge").value = profile.age || "";
    document.getElementById("patientGender").value = profile.gender || "";
    document.getElementById("patientBlood").value = profile.blood || "";
    document.getElementById("patientAllergy").value = profile.allergy || "";
    document.getElementById("patientEmergency").value = profile.emergency || "";
  }
};

// Save profile
function saveProfile() {
  const profile = {
    name: document.getElementById("patientName").value,
    age: document.getElementById("patientAge").value,
    gender: document.getElementById("patientGender").value,
    blood: document.getElementById("patientBlood").value,
    allergy: document.getElementById("patientAllergy").value,
    emergency: document.getElementById("patientEmergency").value,
  };

  localStorage.setItem("patientProfile", JSON.stringify(profile));
  alert("Profile saved successfully!");
}

// Simulate report upload
function uploadReport() {
  const fileInput = document.getElementById("reportFile");
  if (fileInput.files.length === 0) {
    alert("Please choose a file to upload.");
    return;
  }

  const file = fileInput.files[0];
  alert("Uploaded: " + file.name);
}

// Generate QR Code
function generateQR() {
  const profile = JSON.parse(localStorage.getItem("patientProfile"));
  if (!profile) {
    alert("Please save your profile first.");
    return;
  }

  const patientData = `
  Name: ${profile.name}
  Blood Group: ${profile.blood}
  Allergy: ${profile.allergy}
  Emergency Contact: ${profile.emergency}
  `;

  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), patientData.trim());
}

// Generate PDF Health Card
function generatePDF() {
  const profile = JSON.parse(localStorage.getItem("patientProfile"));
  if (!profile) {
    alert("Please save your profile first.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("HealthVault – Digital Health Card", 10, 10);
  doc.text(`Name: ${profile.name}`, 10, 20);
  doc.text(`Blood Group: ${profile.blood}`, 10, 30);
  doc.text(`Allergy: ${profile.allergy}`, 10, 40);
  doc.text(`Emergency Contact: ${profile.emergency}`, 10, 50);

  doc.save("HealthCard.pdf");
}

// Logout
function logout() {
  alert("Logged out!");
  window.location.href = "index.html";
}
