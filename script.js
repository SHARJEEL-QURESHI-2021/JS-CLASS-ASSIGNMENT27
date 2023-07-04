function saveFormData() {
    var selectCity = document.getElementById("selectCity").value;
    var selectCourse = document.getElementById("selectCourse").value;
    var fullName = document.getElementById("fullName").value;
    var fatherName = document.getElementById("fatherName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var cnic = document.getElementById("cnic").value;
    var fatherCnic = document.getElementById("fatherCnic").value;
    var dateOfBirth = document.getElementById("dateOfBirth").value;
    var selectGender = document.getElementById("selectGender").value;
  
    var formData = {
      selectCity: selectCity,
      selectCourse: selectCourse,
      fullName: fullName,
      fatherName: fatherName,
      email: email,
      phone: phone,
      cnic: cnic,
      fatherCnic: fatherCnic,
      dateOfBirth: dateOfBirth,
      selectGender: selectGender
    };
    if (document.getElementById("selectCity").value != "" &&
      document.getElementById("selectCourse").value != "" &&
      document.getElementById("fullName").value != "" &&
      document.getElementById("email").value != "" &&
      document.getElementById("phone").value != "" &&
      document.getElementById("cnic").value != "" &&
      document.getElementById("fatherCnic").value != "" &&
      document.getElementById("dateOfBirth").value != "" &&
      document.getElementById("selectGender").value != ""){
      var formSubmissions = JSON.parse(localStorage.getItem("formSubmissions")) || [];
  
    formSubmissions.push(formData);
  
    localStorage.setItem("formSubmissions", JSON.stringify(formSubmissions));
  
    Swal.fire({
      title: `Data Entered!`,
      text: `See from Preview Tab`,
      icon: 'success',
      confirmButtonText: 'OK'
    });}
    else{
      Swal.fire({
        title: `Data Not Entered Correctly!`,
        text: `Please Fill All The Inputs`,
        icon: 'error',
        confirmButtonText: 'Back'
      });
    }
  
    document.getElementById("selectCity").value = ""
    document.getElementById("selectCourse").value = ""
    document.getElementById("fullName").value = ""
    document.getElementById("fatherName").value = ""
    document.getElementById("email").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("cnic").value = ""
    document.getElementById("fatherCnic").value = ""
    document.getElementById("dateOfBirth").value = ""
    document.getElementById("selectGender").value = ""
  }
  function showPreview() {
    var formSubmissions = JSON.parse(localStorage.getItem("formSubmissions"));
  
    document.getElementById("previewContainer").style.display = "block";
    document.getElementById("container").style.display = "none";
  
    var previewTable = document.getElementById("previewTable");
    previewTable.innerHTML = "";
  
    var headerRow = document.createElement("tr");
    var headers = [
      "Select City",
      "Select Course",
      "Full Name",
      "Father Name",
      "Email",
      "Phone",
      "CNIC",
      "Father's CNIC",
      "Date of Birth",
      "Select Gender",
      "Actions"
    ];
    headers.forEach(function (header) {
      var th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    previewTable.appendChild(headerRow);
  
    formSubmissions.forEach(function (formData, index) {
      var row = document.createElement("tr");
      for (var key in formData) {
        if (formData.hasOwnProperty(key)) {
          var cell = document.createElement("td");
          cell.textContent = formData[key];
          row.appendChild(cell);
        }
      }
  
      // Add event listener to each cell within the row
      Array.from(row.cells).forEach(function (cell) {
        cell.addEventListener("click", function () {
          displayStudentInfo(formData);
        });
      });
  
      previewTable.appendChild(row);
      var removeButton = document.createElement("button");
      removeButton.textContent = "Remove Entry";
      removeButton.setAttribute("data-index", index);
      removeButton.addEventListener("click", removeEntry);
      var actionCell = document.createElement("td");
      actionCell.appendChild(removeButton);
      row.appendChild(actionCell);
  
      previewTable.appendChild(row);
      row.addEventListener("click", function () {
        displayStudentInfo(formData);
      });
    });
  }
  
  
  
  function removeEntry(event) {
    event.stopPropagation(); // Stop event propagation to prevent the displayStudentInfo() function from executing
  
    var index = this.getAttribute("data-index");
    var formSubmissions = JSON.parse(localStorage.getItem("formSubmissions"));
  
    formSubmissions.splice(index, 1);
  
    localStorage.setItem("formSubmissions", JSON.stringify(formSubmissions));
  
    showPreview();
  }
  
  
  function hidePreview() {
    document.getElementById("container").style.display = "block";
    document.getElementById("previewContainer").style.display = "none";
  }
  
  function searchByCity() {
    var city = document.getElementById("searchCity").value.toLowerCase();
    var formSubmissions = JSON.parse(localStorage.getItem("formSubmissions"));
    var filteredSubmissions = formSubmissions.filter(function (formData) {
      return formData.selectCity.toLowerCase() === city;
    });
    displayFilteredSubmissions(filteredSubmissions);
  }
  
  function searchByName() {
    var name = document.getElementById("searchName").value.toLowerCase();
    var formSubmissions = JSON.parse(localStorage.getItem("formSubmissions"));
    var filteredSubmissions = formSubmissions.filter(function (formData) {
      return formData.fullName.toLowerCase().includes(name);
    });
    displayFilteredSubmissions(filteredSubmissions);
  }
  
  function searchByCourse() {
    var course = document.getElementById("searchCourse").value.toLowerCase();
    var formSubmissions = JSON.parse(localStorage.getItem("formSubmissions"));
    var filteredSubmissions = formSubmissions.filter(function (formData) {
      return formData.selectCourse.toLowerCase() === course;
    });
    displayFilteredSubmissions(filteredSubmissions);
  }
  
  function displayFilteredSubmissions(filteredSubmissions) {
    var previewTable = document.getElementById("previewTable");
    previewTable.innerHTML = "";
  
    var headerRow = document.createElement("tr");
    var headers = [
      "Select City",
      "Select Course",
      "Full Name",
      "Father Name",
      "Email",
      "Phone",
      "CNIC",
      "Father's CNIC",
      "Date of Birth",
      "Select Gender",
      "Actions"
    ];
    headers.forEach(function (header) {
      var th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    previewTable.appendChild(headerRow);
  
    filteredSubmissions.forEach(function (formData, index) {
      var row = document.createElement("tr");
      for (var key in formData) {
        if (formData.hasOwnProperty(key)) {
          var cell = document.createElement("td");
          cell.textContent = formData[key];
          row.appendChild(cell);
        }
      }
  
      var removeButton = document.createElement("button");
      removeButton.textContent = "Remove Entry";
      removeButton.setAttribute("data-index", index);
      removeButton.addEventListener("click", removeEntry);
      var actionCell = document.createElement("td");
      actionCell.appendChild(removeButton);
      row.appendChild(actionCell);
  
      previewTable.appendChild(row);
    });
  }
  function displayStudentInfo(formData) {
    Swal.fire({
      title: "Student Information",
      html: `<b>Name:</b> ${formData.fullName}<br>
             <b>Course:</b> ${formData.selectCourse}<br>
             <b>CNIC:</b> ${formData.cnic}`,
      icon: "info",
      confirmButtonText: "OK"
    });
  }