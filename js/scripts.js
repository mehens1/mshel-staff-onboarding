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

  loadAll();

  $("#logoutBtn").click(function () {
    // Remove the username from localStorage
    localStorage.removeItem("user_token");
    window.location.href = "index.html";
  });
});

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
      if (data.success) {
        swal("info", data.message, "info");
        $("#nav-bioData-tab").removeClass("active");
        $("#nav-bioData").removeClass("show active");

        $("#nav-bankDetails-tab").addClass("active");
        $("#nav-bankDetails").addClass("show active");
      } else {
        swal("info", data.message, "info");
      }
    })
    .catch((error) => {
      console.error("Request failed:", error);
      // You can handle errors here, e.g., show an error message to the user.
    });
});

bankForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Handle bank details form submission here

  var bankName = $("input[name='bank']").val();
  var accountNumber = $("input[name='number']").val();
  var accountName = $("input[name='name']").val();

  if (!accountName) {
    swal("Error!", "Account Name is required!", "error");
    return;
  }
  if (!bankName) {
    swal("Error!", "Bank Name is required!", "error");
    return;
  }
  if (!accountNumber) {
    swal("Error!", "Account Number is required!", "error");
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
    name: accountName,
    bank: bankName,
    number: accountNumber,
  };

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("token", `${user_token}`);

  var settings = {
    url: "https://hr.mshelhomes.com/accounts/public/Staff/saveBank",
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data), // Convert data object to JSON string
    crossDomain: true, // Use the crossDomain property to enable CORS
  };

  fetch(settings.url, settings)
    .then((response) => response.json()) // Parse JSON response
    .then((data) => {
      if (data.success) {
        swal("info", data.message, "info");
        $("#nav-bankDetails-tab").removeClass("active");
        $("#nav-bankDetails").removeClass("show active");

        $("#nav-nextOfKin-tab").addClass("active");
        $("#nav-nextOfKin").addClass("show active");
      } else {
        swal("info", data.message, "info");
      }
    })
    .catch((error) => {
      console.error("Request failed:", error);
      // You can handle errors here, e.g., show an error message to the user.
    });

  // You can send the form data to the server using fetch or XMLHttpRequest
});

nextOfKinForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var nok_name = $("input[name='nok_name']").val();
  var nok_email = $("input[name='nok_email']").val();
  var nok_phone = $("input[name='nok_phone']").val();
  var nok_relationship = $("input[name='nok_relationship']").val();
  var nok_address = $("textarea[name='nok_address']").val();

  if (!nok_name) {
    swal("Error!", "Next of Kin Name is required!", "error");
    return;
  }
  if (!nok_phone) {
    swal("Error!", "Next of Kin Phone is required!", "error");
    return;
  }
  if (!nok_relationship) {
    swal("Error!", "Next of Kin Relationship is required!", "error");
    return;
  }
  if (!nok_address) {
    swal("Error!", "Next of Kin Address is required!", "error");
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
    name: nok_name,
    email: nok_email,
    phone: nok_phone,
    relationship: nok_relationship,
    address: nok_address,
  };

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("token", `${user_token}`);

  var settings = {
    url: "https://hr.mshelhomes.com/accounts/public/Staff/saveMyNextofkin",
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data), // Convert data object to JSON string
    crossDomain: true, // Use the crossDomain property to enable CORS
  };

  fetch(settings.url, settings)
    .then((response) => response.json()) // Parse JSON response
    .then((data) => {
      if (data.success) {
        swal("info", data.message, "info");
        // Handle next of kin form submission here
        $("#nav-nextOfKin-tab").removeClass("active");
        $("#nav-nextOfKin").removeClass("show active");

        $("#nav-educationBackground-tab").addClass("active");
        $("#nav-educationBackground").addClass("show active");
      } else {
        swal("info", data.message, "info");
      }
    })
    .catch((error) => {
      console.error("Request failed:", error);
      // You can handle errors here, e.g., show an error message to the user.
    });

  // You can send the form data to the server using fetch or XMLHttpRequest
});

educationForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting normally

  // Get and set variables to be submitted
  var level = $("input[name='level']").val();
  var certificate = document.getElementById("certificate").files[0];
  var cv = document.getElementById("cv").files[0];

  // Get file types
  var certificateFileType = $("#certificate")[0].files[0].type;
  var cvFileType = $("#cv")[0].files[0].type;

  // Validation checks
  if (!level) {
    swal("Error!", "Level of Education is required!", "error");
    return;
  }

  if (!certificate) {
    swal("Error!", "Certificate is required!", "error");
    return;
  }
  
  if (!cv) {
    swal("Error!", "CV is required!", "error");
    return;
  }

  if (certificateFileType !== "application/pdf") {
    swal("Error!", "Certificate File type must be PDF!", "error");
    return;
  }
  
  if (cvFileType !== "application/pdf") {
    swal("Error!", "CV File type must be PDF!", "error");
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

  // upload certificate now
  uploadFile(certificate);

  return;

  //
  //
  //
  //

  var data = {
    level: level,
    certificate: certificate,
    cv: cv,
  };

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "multipart/form-data");
  myHeaders.append("token", `${user_token}`);

  var settings = {
    url: "https://hr.mshelhomes.com/accounts/public/Staff/saveEductation",
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data), // Convert data object to JSON string
    crossDomain: true, // Use the crossDomain property to enable CORS
  };

  fetch(settings.url, settings)
    .then((response) => response.json()) // Parse JSON response
    .then((data) => {
      if (data.success) {
        swal("info", data.message, "info");
        console.log(data);

        // Handle education form submission here
        $("#nav-educationBackground-tab").removeClass("active");
        $("#nav-educationBackground").removeClass("show active");

        $("#nav-healthStatus-tab").addClass("active");
        $("#nav-healthStatus").addClass("show active");
      } else {
        swal("info", data.message, "info");
      }
    })
    .catch((error) => {
      console.error("Request failed:", error);
      // You can handle errors here, e.g., show an error message to the user.
    });

  // You can send the form data to the server using fetch or XMLHttpRequest
});

healthForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var hospital = $("input[name='hospital']").val();
  var date = $("input[name='dateOfTest']").val();
  var bloodGroup = $("input[name='bloodGroup']").val();
  var genotype = $("input[name='genotype']").val();
  var hiv = $("select[name='hiv']").val();
  var kidney = $("input[name='kidney']").val();
  var tuberculosis = $("input[name='tuberculosis']").val();
  var covidTest = $("input[name='covidTest']").val();

  if (!hospital) {
    swal("Error!", "Hospital of Test is required!", "error");
    return;
  }
  if (!date) {
    swal("Error!", "Date of Test is required!", "error");
    return;
  }
  if (!bloodGroup) {
    swal("Error!", "Blood Group is required!", "error");
    return;
  }
  if (!genotype) {
    swal("Error!", "Genotype is required!", "error");
    return;
  }
  if (!hiv) {
    swal("Error!", "HIV Status is required!", "error");
    return;
  }
  if (!kidney) {
    swal("Error!", "Kidney Status is required!", "error");
    return;
  }
  if (!tuberculosis) {
    swal("Error!", "Tuberculosis Status is required!", "error");
    return;
  }
  if (!covidTest) {
    swal("Error!", "Covid Status is required!", "error");
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
    hospital: hospital,
    date: date,
    bloodGroup: bloodGroup,
    genotype: genotype,
    hiv: hiv,
    kidney: kidney,
    tuberculosis: tuberculosis,
    covidTest: covidTest,
  };

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("token", `${user_token}`);

  var settings = {
    url: "https://hr.mshelhomes.com/accounts/public/Staff/saveHealth",
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data), // Convert data object to JSON string
    crossDomain: true, // Use the crossDomain property to enable CORS
  };

  fetch(settings.url, settings)
    .then((response) => response.json()) // Parse JSON response
    .then((data) => {
      console.log(data);

      if (data.success) {
        swal("info", data.message, "info");

        // Handle health status form submission here
        $("#nav-healthStatus-tab").removeClass("active");
        $("#nav-healthStatus").removeClass("show active");

        $("#nav-profile-tab").addClass("active");
        $("#nav-profile").addClass("show active");
      } else {
        swal("info", data.message, "info");
      }
    })
    .catch((error) => {
      console.error("Request failed:", error);
      // You can handle errors here, e.g., show an error message to the user.
    });

  // You can send the form data to the server using fetch or XMLHttpRequest
});

function uploadFile(file) {
  swal({
    title: "Processing",
    text: "Uploading Document...",
    icon: "info",
    closeOnClickOutside: false,
    closeOnEsc: false,
    button: false,
  });

  var formData = new FormData();
  formData.append("file", file);

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("token", `${user_token}`);

  var settings = {
    url: "https://hr.mshelhomes.com/accounts/public/Staff/uploadDocumentStaff",
    method: "POST",
    headers: myHeaders,
    body: formData,
    crossDomain: true, // Use the crossDomain property to enable CORS
  };

  fetch(settings.url, settings)
    .then((response) => response.json()) // Parse JSON response
    .then((data) => {
      console.log("data anan");
      console.log(data);

      swal({
        title: "Success",
        text: "Successful...",
        icon: "success",
        button: true,
      });

      if (data.success) {
        console.log(data.message);
      } else {
        swal("info", data.message, "info");
      }
    })
    .catch((error) => {
      console.error("Request failed:", error);
      // You can handle errors here, e.g., show an error message to the user.
    });
}

function loadAll() {
  // get full staff data
  loadBioData();
  loadBankData();
  loadNOKData();
  loadHealthData();
}

// load all data
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

      if (data.length > 0) {
        $("#preview_fullName").text(
          data[0].surname + " " + data[0].firstName + " " + data[0].otherNames
        );
        $("#preview_gender").text(data[0].gender);
        $("#preview_state_of_origin").text(data[0].state);
        $("#preview_religion").text(data[0].religion);
        $("#preview_nationality").text(data[0].nationality);

        var date = new Date(data[0].DOB);
        var formattedDate = date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        $("#preview_dob").text(formattedDate);
        $("#preview_phone").text(data[0].phone);
        $("#preview_email").text(data[0].email);
        $("#preview_marital_status").text(data[0].maritalStatus);
        $("#preview_residential_address").text(data[0].residentialAddress);
        $("#preview_permanent_address").text(data[0].permanentAddress);
      }
    })
    .catch((error) => console.log("error: ", error));
}

// load all bank data
function loadBankData() {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("token", `${user_token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://hr.mshelhomes.com/accounts/public/Staff/getBank`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      var data = result.data;

      if (data.length > 0) {
        $("#preview_bank_name").text(data[0].bank);
        $("#preview_account_number").text(data[0].accountnumber);
        $("#preview_account_name").text(data[0].accountName);
      }
    })
    .catch((error) => console.log("error: ", error));
}

// load all nok data
function loadNOKData() {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("token", `${user_token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://hr.mshelhomes.com/accounts/public/Staff/getMyNextofKin`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      var data = result.data;

      if (data.length > 0) {
        $("#preview_nok_name").text(data[0].name);
        $("#preview_nok_email").text(data[0].email);
        $("#preview_nok_phone").text(data[0].phone);
        $("#preview_nok_relationship").text(data[0].relationship);
        $("#preview_nok_address").text(data[0].residentialAddress);
      }
    })
    .catch((error) => console.log("error: ", error));
}

// load all health status
function loadHealthData() {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("token", `${user_token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://hr.mshelhomes.com/accounts/public/Staff/getHealth`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      var data = result.data;

      if (data.length > 0) {
        $("#preview_hospital").text(data[0].hospitalName);

        var dateOfTest = new Date(data[0].testDate);
        var readDate = dateOfTest.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        $("#preview_date_of_birth").text(readDate);
        $("#preview_blood_group").text(data[0].bloodGroup);
        $("#preview_genotype").text(data[0].genotype);
        $("#preview_hiv").text(data[0].hivstatus);
        $("#preview_tuberculosis").text(data[0].tuberculosis);
        $("#preview_kidney").text(data[0].kidneyFunction);
        $("#preview_covid").text(data[0].covidTest);
      }
    })
    .catch((error) => console.log("error: ", error));
}
