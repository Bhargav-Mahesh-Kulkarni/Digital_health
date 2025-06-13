// 🔐 Logout
function logout() {
    alert("Logged out!");
    window.location.href = "index.html";
  }
  
  // 📤 Simulate report upload
  function uploadReport() {
    const fileInput = document.getElementById("reportFile");
    if (fileInput.files.length === 0) {
      alert("Please choose a file to upload.");
      return;
    }
  
    const file = fileInput.files[0];
    alert("Uploaded: " + file.name);
    // 🔧 Later you will send this to Firebase
  }
  
  // 📷 Generate QR code with sample data
  function generateQR() {
    const patientData = "Name: John Doe\nBlood Group: B+\nAllergy: Penicillin";
    document.getElementById("qrcode").innerHTML = ""; // Clear previous
    new QRCode(document.getElementById("qrcode"), patientData);
  }
  
  // 📄 Generate PDF Health Card
  function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    doc.text("HealthVault – Digital Health Card", 10, 10);
    doc.text("Name: John Doe", 10, 20);
    doc.text("Blood Group: B+", 10, 30);
    doc.text("Allergy: Penicillin", 10, 40);
  
    doc.save("HealthCard.pdf");
  }
  