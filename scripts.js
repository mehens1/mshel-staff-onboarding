// Get the form elements
const bioForm = document.querySelector("#bio-form");
const bankForm = document.querySelector("#bank-form");
const nextOfKinForm = document.querySelector("#next-of-kin-form");
const educationForm = document.querySelector("#education-form");
const healthForm = document.querySelector("#health-form");

// Add event listeners for form submissions
bioForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Handle bio data form submission here
  console.log("Bio Data Form Submitted");
  // You can send the form data to the server using fetch or XMLHttpRequest
});

bankForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Handle bank details form submission here
  console.log("Bank Details Form Submitted");
  // You can send the form data to the server using fetch or XMLHttpRequest
});

nextOfKinForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Handle next of kin form submission here
  console.log("Next of Kin Form Submitted");
  // You can send the form data to the server using fetch or XMLHttpRequest
});

educationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Handle education form submission here
  console.log("Education Form Submitted");
  // You can send the form data to the server using fetch or XMLHttpRequest
});

healthForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Handle health status form submission here
  console.log("Health Status Form Submitted");
  // You can send the form data to the server using fetch or XMLHttpRequest
});
