// script.js - hanya 1 file JS untuk seluruh project
document.addEventListener("DOMContentLoaded", () => {
  // isi tahun footer
  const yearEls = document.querySelectorAll("#year");
  yearEls.forEach(e => e.textContent = new Date().getFullYear());

  // Welcoming speech: minta nama user (atau bisa ambil dari input form)
  // Hanya jika elemen tersedia di halaman
  const namePlaceholder = document.getElementById("name-placeholder");
  if (namePlaceholder) {
    const stored = sessionStorage.getItem("visitorName");
    if (stored) {
      namePlaceholder.textContent = stored;
    } else {
      const name = prompt("Please enter your name:");
      if (name && name.trim()) {
        namePlaceholder.textContent = name.trim();
        sessionStorage.setItem("visitorName", name.trim());
      } else {
        namePlaceholder.textContent = "Guest";
      }
    }
  }

  // Form validation & show submitted values in HTML
const form = document.getElementById("message-form");
const result = document.getElementById("form-result");
if (form && result) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameValue = document.getElementById("name").value.trim();
    const emailValue = document.getElementById("email").value.trim();
    const genderValue = document.getElementById("gender").value.trim();
    const messageValue = document.getElementById("message").value.trim();

    if (!nameValue || !emailValue || !genderValue || !messageValue) {
      alert("Please fill in all fields.");
      return;
    }

    // simple email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      alert("Please enter a valid email address.");
      return;
    }

    // waktu real-time
    const now = new Date();
    const formattedTime = now.toLocaleString();

    // Tampilkan hasil submit di HTML
    result.innerHTML = `
      <h3>Form Submitted</h3>
      <p><strong>Name:</strong> ${escapeHtml(nameValue)}</p>
      <p><strong>Email:</strong> ${escapeHtml(emailValue)}</p>
      <p><strong>Gender:</strong> ${escapeHtml(genderValue)}</p>
      <p><strong>Message:</strong> ${escapeHtml(messageValue)}</p>
      <p><em>Submitted at: ${formattedTime}</em></p>
    `;
    form.reset();
  });
}


  // small helper to prevent injection in display
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    })[m]);
  }
});