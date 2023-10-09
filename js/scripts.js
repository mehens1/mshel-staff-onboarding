
// Retrieve user_token
const user_token = localStorage.getItem("user_token");

if(!user_token){
  window.location.href = "index.html";
}

// A $( document ).ready() block.
$( document ).ready(function() {
  // console.log( "ready!" );

  // get full staff data
  loadBioData();






  $('#logoutBtn').click(function() {

    // Remove the username from localStorage
    localStorage.removeItem("user_token");
    window.location.href = "signin.html";                
  });
});

function loadBioData(){

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("token", `${user_token}`);
        
  var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  };

  fetch(`https://hr.mshelhomes.com/accounts/public/Staff/getMyProile`, requestOptions)
    .then(response => response.json())
    .then(result => {

      var data = result.data;

      if(data.length === 0){

        swal("Info!", "Data is completely empty, kindly update your profile data!", "info");
        return;

      }
      
      console.log("result");
      console.log(data.length);

    })
    .catch(error => console.log('error: ', error));

}

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

  if(!surName){
    swal("Error!", "Surname is required!", "error")
    return;
  }
  if(!firstName){
    swal("Error!", "Firstname is required!", "error")
    return;
  }
  if(!gender){
    swal("Error!", "Gender is required!", "error")
    return;
  }
  if(!stateOfOrigin){
    swal("Error!", "State of Origin is required!", "error")
    return;
  }
  if(!religion){
    swal("Error!", "Religion is required!", "error")
    return;
  }
  if(!nationality){
    swal("Error!", "Nationality is required!", "error")
    return;
  }
  if(!dob){
    swal("Error!", "Date of Birth is required!", "error")
    return;
  }
  if(!phone){
    swal("Error!", "Phone Number is required!", "error")
    return;
  }
  if(!email){
    swal("Error!", "Email address is required!", "error")
    return;
  }
  if(!residentialAddress){
    swal("Error!", "Residential Address is required!", "error")
    return;
  }
  if(!permanentAddress){
    swal("Error!", "Permanent Address is required!", "error")
    return;
  }

  swal({
    title: "Processing",
    text: "Submitting Data...",
    icon: "info",
    closeOnClickOutside: false,
    closeOnEsc: false,
    button: false
  });

  var form = new FormData();
  form.append("surname", surName);
  form.append("firstName", firstName);
  form.append("otherNames", otherNames);
  form.append("gender", gender);
  form.append("state", stateOfOrigin);
  form.append("religion", religion);
  form.append("nationality", nationality);
  form.append("dob", dob);
  form.append("phone", phone);
  form.append("email", email);
  form.append("nsitf", nsitf);
  form.append("maritalStatus", maritalStatus);
  form.append("residentialAddress", residentialAddress);
  form.append("permanentAddress", permanentAddress);

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("token", `${user_token}`);

  var settings = {
    "url": "https://hr.mshelhomes.com/accounts/public/Staff/saveMyProfile",
    "method": "POST",
    "headers": myHeaders,
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
  };

  $.ajax(settings)
  .done(function (response) {
    var res = JSON.parse(response);
    swal("info", "Done", "info");
    console.log(res);
  })
  .fail(function (jqXHR, textStatus, errorThrown) {
    console.error("Request failed:", textStatus, errorThrown);
    // You can handle errors here, e.g., show an error message to the user.
  });


  // $.ajax(settings).done(function (response) {
  //   var res = JSON.parse(response);

  //   swal("info", "Done", "info");
  //   // swal("info", res, "info");
  //   console.log(res);
  // });

  return

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
