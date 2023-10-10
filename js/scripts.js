// Retrieve user_token
const user_token = localStorage.getItem("user_token");

// Get the form elements
const bioForm = document.querySelector("#bio-form");
const bankForm = document.querySelector("#bank-form");
const nextOfKinForm = document.querySelector("#next-of-kin-form");
const educationForm = document.querySelector("#education-form");
const healthForm = document.querySelector("#health-form");

if (!user_token) {
  window.location.href = "index.html";
}

// A $( document ).ready() block.
$(document).ready(function () {
  // console.log( "ready!" );

  // get full staff data
  loadBioData();

  $("#logoutBtn").click(function () {
    // Remove the username from localStorage
    localStorage.removeItem("user_token");
    window.location.href = "index.html";
  });
});

function loadBioData() {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("token", `${user_token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://hr.mshelhomes.com/accounts/public/Staff/getMyProile`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      var data = result.data;

      if (data.length === 0) {
        swal(
          "Info!",
          "Data is completely empty, kindly update your profile data!",
          "info"
        );
        return;
      }

      console.log(data);
    })
    .catch((error) => console.log("error: ", error));
}

// Add event listeners for form submissions
bioForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Handle bio data form submission here

  var surName = $("input[name='surname']").val();
  var firstName = $("input[name='firstName']").val();
  var otherNames = $("input[name='otherNames']").val();
  var gender = $("select[name='gender']").val();
  var stateOfOrigin = $("input[name='state_of_origin']").val();
  var religion = $("select[name='religion']").val();
  var nationality = $("select[name='nationality']").val();
  var dob = $("input[name='dob']").val();
  var phone = $("input[name='phone']").val();
  var email = $("input[name='email']").val();
  var maritalStatus = $("select[name='maritalStatus']").val();
  var residentialAddress = $("textarea[name='residentialAddress']").val();
  var permanentAddress = $("textarea[name='permanentAddress']").val();
  var nsitf = $("input[name='nsitf']").val();

  if (!surName) {
    swal("Error!", "Surname is required!", "error");
    return;
  }
  if (!firstName) {
    swal("Error!", "Firstname is required!", "error");
    return;
  }
  if (!gender) {
    swal("Error!", "Gender is required!", "error");
    return;
  }
  if (!stateOfOrigin) {
    swal("Error!", "State of Origin is required!", "error");
    return;
  }
  if (!religion) {
    swal("Error!", "Religion is required!", "error");
    return;
  }
  if (!nationality) {
    swal("Error!", "Nationality is required!", "error");
    return;
  }
  if (!dob) {
    swal("Error!", "Date of Birth is required!", "error");
    return;
  }
  if (!phone) {
    swal("Error!", "Phone Number is required!", "error");
    return;
  }
  if (!email) {
    swal("Error!", "Email address is required!", "error");
    return;
  }
  if (!residentialAddress) {
    swal("Error!", "Residential Address is required!", "error");
    return;
  }
  if (!permanentAddress) {
    swal("Error!", "Permanent Address is required!", "error");
    return;
  }

  swal({
    title: "Processing",
    text: "Submitting Data...",
    icon: "info",
    closeOnClickOutside: false,
    closeOnEsc: false,
    button: false,
  });

  var data = {
    surname: surName,
    firstName: firstName,
    otherNames: otherNames,
    gender: gender,
    state: stateOfOrigin,
    religion: religion,
    nationality: nationality,
    dob: dob,
    phone: phone,
    email: email,
    nsitf: nsitf,
    maritalStatus: maritalStatus,
    residentialAddress: residentialAddress,
    permanentAddress: permanentAddress,
  };

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("token", `${user_token}`);

  var settings = {
    url: "https://hr.mshelhomes.com/accounts/public/Staff/saveMyProfile",
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data), // Convert data object to JSON string
    crossDomain: true, // Use the crossDomain property to enable CORS
  };

  fetch(settings.url, settings)
    .then((response) => response.json()) // Parse JSON response
    .then((data) => {
      swal("info", data.message, "info");
    })
    .catch((error) => {
      console.error("Request failed:", error);
      // You can handle errors here, e.g., show an error message to the user.
    });

  return;

  $("#nav-bioData-tab").removeClass("active");
  $("#nav-bioData").removeClass("show active");

  $("#nav-bankDetails-tab").addClass("active");
  $("#nav-bankDetails").addClass("show active");
  // You can send the form data to the server using fetch or XMLHttpRequest
});

bankForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Handle bank details form submission here

  $("#nav-bankDetails-tab").removeClass("active");
  $("#nav-bankDetails").removeClass("show active");

  $("#nav-nextOfKin-tab").addClass("active");
  $("#nav-nextOfKin").addClass("show active");
  // You can send the form data to the server using fetch or XMLHttpRequest
});

nextOfKinForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Handle next of kin form submission here
  $("#nav-nextOfKin-tab").removeClass("active");
  $("#nav-nextOfKin").removeClass("show active");

  $("#nav-educationBackground-tab").addClass("active");
  $("#nav-educationBackground").addClass("show active");
  // You can send the form data to the server using fetch or XMLHttpRequest
});

educationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Handle education form submission here
  $("#nav-educationBackground-tab").removeClass("active");
  $("#nav-educationBackground").removeClass("show active");

  $("#nav-healthStatus-tab").addClass("active");
  $("#nav-healthStatus").addClass("show active");
  // You can send the form data to the server using fetch or XMLHttpRequest
});

healthForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Handle health status form submission here
  $("#nav-healthStatus-tab").removeClass("active");
  $("#nav-healthStatus").removeClass("show active");

  $("#nav-profile-tab").addClass("active");
  $("#nav-profile").addClass("show active");
  // You can send the form data to the server using fetch or XMLHttpRequest
});
