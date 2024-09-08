"use strict";
// Regex patterns for validation
var strRegex = /^[a-zA-Z\s]*$/; // Regex to match strings containing only letters and spaces
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Regex to validate email addresses, supporting various formats
var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
// Regex to validate phone numbers in multiple formats
var digitRegex = /^\d+$/; // Regex to match strings containing only digits
// Select the form element from the HTML document
var mainForm = document.getElementById('cv-form');
// Define a set of valid types for form validation
var validType = {
    TEXT: 'text', // for text input
    TEXT_EMP: 'text_emp', // for text input with spaces allowed
    EMAIL: 'email', // for email input
    DIGIT: 'digit', // for numeric input
    PHONENO: 'phoneno', // for phone number input
    ANY: 'any', // for any type of input
};
// Select form input elements and cast them to their specific types
var firstnameElem = mainForm.firstname;
var middlenameElem = mainForm.middlename;
var lastnameElem = mainForm.lastname;
var imageElem = mainForm.image;
var designationElem = mainForm.designation;
var addressElem = mainForm.address;
var emailElem = mainForm.email;
var phonenoElem = mainForm.phoneno;
var summaryElem = mainForm.summary;
// Select elements used for displaying values and cast them to their specific types
var nameDsp = document.getElementById('fullname_dsp');
var imageDsp = document.getElementById('image_dsp');
var phonenoDsp = document.getElementById('phoneno_dsp');
var emailDsp = document.getElementById('email_dsp');
var addressDsp = document.getElementById('address_dsp');
var designationDsp = document.getElementById('designation_dsp');
var summaryDsp = document.getElementById('summary_dsp');
var projectsDsp = document.getElementById('projects_dsp');
var achievementsDsp = document.getElementById('achievements_dsp');
var skillsDsp = document.getElementById('skills_dsp');
var educationsDsp = document.getElementById('educations_dsp');
var experiencesDsp = document.getElementById('experiences_dsp');
// Function to fetch values from multiple NodeLists and convert them to an array of objects
var fetchValues = function (attrs) {
    var nodeLists = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        nodeLists[_i - 1] = arguments[_i];
    }
    var elemsAttrsCount = nodeLists.length; // Number of attribute lists
    var elemsDataCount = nodeLists[0].length; // Number of data elements
    var tempDataArr = []; // Array to store results
    // Loop through each element to extract values
    for (var i = 0; i < elemsDataCount; i++) {
        var dataObj = {}; // Temporary object to store values
        // Loop through each attribute and get the corresponding value from NodeLists
        for (var j = 0; j < elemsAttrsCount; j++) {
            dataObj[attrs[j]] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj); // Add the object to the result array
    }
    return tempDataArr; // Return the array of objects
};
var getUserInputs = function () {
    // Select all input elements for achievements titles and descriptions
    var achievementsTitleElem = document.querySelectorAll('.achieve_title');
    var achievementsDescriptionElem = document.querySelectorAll('.achieve_description');
    // Select all input elements for experience details
    var expTitleElem = document.querySelectorAll('.exp_title');
    var expOrganizationElem = document.querySelectorAll('.exp_organization');
    var expLocationElem = document.querySelectorAll('.exp_location');
    var expStartDateElem = document.querySelectorAll('.exp_start_date');
    var expEndDateElem = document.querySelectorAll('.exp_end_date');
    var expDescriptionElem = document.querySelectorAll('.exp_description');
    // Select all input elements for education details
    var eduSchoolElem = document.querySelectorAll('.edu_school');
    var eduDegreeElem = document.querySelectorAll('.edu_degree');
    var eduCityElem = document.querySelectorAll('.edu_city');
    var eduStartDateElem = document.querySelectorAll('.edu_start_date');
    var eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date');
    var eduDescriptionElem = document.querySelectorAll('.edu_description');
    // Select all input elements for project details
    var projTitleElem = document.querySelectorAll('.proj_title');
    var projLinkElem = document.querySelectorAll('.proj_link');
    var projDescriptionElem = document.querySelectorAll('.proj_description');
    // Select all input elements for skills
    var skillElem = document.querySelectorAll('.skill');
    // Add event listeners to form elements for validation on 'keyup' and 'blur' events
    firstnameElem.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.TEXT, 'First Name'); });
    middlenameElem.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'); });
    lastnameElem.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.TEXT, 'Last Name'); });
    phonenoElem.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.PHONENO, 'Phone Number'); });
    emailElem.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.EMAIL, 'Email'); });
    addressElem.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'Address'); });
    designationElem.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.TEXT, 'Designation'); });
    // Add event listeners for achievements elements
    achievementsTitleElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'Title'); }); });
    achievementsDescriptionElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'Description'); }); });
    // Add event listeners for experiences elements
    expTitleElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'Title'); }); });
    expOrganizationElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'Organization'); }); });
    expLocationElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, "Location"); }); });
    expStartDateElem.forEach(function (item) { return item.addEventListener('blur', function (e) { return validateFormData(e.target, validType.ANY, 'Start Date'); }); });
    expEndDateElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'End Date'); }); });
    expDescriptionElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'Description'); }); });
    // Add event listeners for education elements
    eduSchoolElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'School'); }); });
    eduDegreeElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'Degree'); }); });
    eduCityElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'City'); }); });
    eduStartDateElem.forEach(function (item) { return item.addEventListener('blur', function (e) { return validateFormData(e.target, validType.ANY, 'Start Date'); }); });
    eduGraduationDateElem.forEach(function (item) { return item.addEventListener('blur', function (e) { return validateFormData(e.target, validType.ANY, 'Graduation Date'); }); });
    eduDescriptionElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'Description'); }); });
    // Add event listeners for project elements
    projTitleElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'Title'); }); });
    projLinkElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'Link'); }); });
    projDescriptionElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'Description'); }); });
    // Add event listeners for skill elements
    skillElem.forEach(function (item) { return item.addEventListener('keyup', function (e) { return validateFormData(e.target, validType.ANY, 'Skill'); }); });
    // Return an object containing all form values
    return {
        firstname: firstnameElem.value, // Value of the first name input
        middlename: middlenameElem.value, // Value of the middle name input
        lastname: lastnameElem.value, // Value of the last name input
        designation: designationElem.value, // Value of the designation input
        address: addressElem.value, // Value of the address input
        email: emailElem.value, // Value of the email input
        phoneno: phonenoElem.value, // Value of the phone number input
        summary: summaryElem.value, // Value of the summary textarea
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem), // Fetch achievements data
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem), // Fetch experiences data
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem), // Fetch education data
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem), // Fetch project data
        skills: fetchValues(['skill'], skillElem) // Fetch skills data
    };
};
// Function to validate form data based on the type and name of the form element
function validateFormData(elem, elemType, elemName) {
    // Check if the element type is 'text'
    if (elemType === validType.TEXT) {
        // Check if the value is not only letters or if it's empty
        if (!strRegex.test(elem.value) || elem.value.trim().length === 0)
            addErrMsg(elem, elemName); // Add an error message if validation fails
        else
            removeErrMsg(elem); // Remove the error message if validation passes
    }
    // Check if the element type is 'text_emp' (text with optional empty)
    if (elemType === validType.TEXT_EMP) {
        // Check if the value is not only letters (can be empty)
        if (!strRegex.test(elem.value))
            addErrMsg(elem, elemName); // Add an error message if validation fails
        else
            removeErrMsg(elem); // Remove the error message if validation passes
    }
    // Check if the element type is 'email'
    if (elemType === validType.EMAIL) {
        // Check if the value is a valid email format or if it's empty
        if (!emailRegex.test(elem.value) || elem.value.trim().length === 0)
            addErrMsg(elem, elemName); // Add an error message if validation fails
        else
            removeErrMsg(elem); // Remove the error message if validation passes
    }
    // Check if the element type is 'phoneno' (phone number)
    if (elemType === validType.PHONENO) {
        // Check if the value matches phone number format or if it's empty
        if (!phoneRegex.test(elem.value) || elem.value.trim().length === 0)
            addErrMsg(elem, elemName); // Add an error message if validation fails
        else
            removeErrMsg(elem); // Remove the error message if validation passes
    }
    // Check if the element type is 'any' (for general validation)
    if (elemType === validType.ANY) {
        // Check if the value is not empty
        if (elem.value.trim().length === 0)
            addErrMsg(elem, elemName); // Add an error message if validation fails
        else
            removeErrMsg(elem); // Remove the error message if validation passes
    }
}
// Function to add an error message next to the form element
function addErrMsg(formElem, formElemName) {
    var errorMsg = "".concat(formElemName, " is invalid"); // Create an error message string
    var errorElement = formElem.nextElementSibling; // Find the next sibling element (assumed to be a span) for the error message
    errorElement.innerHTML = errorMsg; // Set the error message text
}
// Function to remove the error message from the form element
function removeErrMsg(formElem) {
    var errorElement = formElem.nextElementSibling; // Find the next sibling element (assumed to be a span) for the error message
    errorElement.innerHTML = ""; // Clear the error message text
}
// Function to display a list of data items in a container
var showListData = function (listData, listContainer) {
    listContainer.innerHTML = ""; // Clear the container content before adding new items
    listData.forEach(function (listItem) {
        var itemElem = document.createElement('div'); // Create a new div for each list item
        itemElem.classList.add('preview-item'); // Add a class to the div
        // Loop through each key in the list item object
        for (var key in listItem) {
            var subItemElem = document.createElement('span'); // Create a new span for each key value
            subItemElem.classList.add('preview-item-val'); // Add a class to the span
            subItemElem.innerHTML = "".concat(listItem[key]); // Set the text to the value of the key
            itemElem.appendChild(subItemElem); // Append the span to the item div
        }
        listContainer.appendChild(itemElem); // Append the item div to the container
    });
};
// Function to display the user's CV on the page
var displayCV = function (userData) {
    // Set the innerHTML of various display elements with user data
    nameDsp.innerHTML = "".concat(userData.firstname, " ").concat(userData.middlename, " ").concat(userData.lastname);
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    // Use the showListData function to display lists of projects, achievements, skills, educations, and experiences
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
};
// Function to generate the CV by collecting user inputs and displaying the CV
var generateCV = function () {
    var userData = getUserInputs(); // Get user inputs from the form
    displayCV(userData); // Display the CV with the collected data
    console.log(userData); // Log the user data to the console for debugging
};
// Function to preview an image selected by the user
function previewImage() {
    // Check if the file input contains files
    if (imageElem.files && imageElem.files.length > 0) {
        var oFReader = new FileReader(); // Create a new FileReader instance
        // Read the first file as a data URL (base64 encoded image)
        oFReader.readAsDataURL(imageElem.files[0]);
        // Set the image source when the file reading is complete
        oFReader.onload = function (ofEvent) {
            // Ensure the result is a string (base64 encoded image data)
            if (typeof ofEvent.target.result === 'string') {
                imageDsp.src = ofEvent.target.result; // Set the image source to the result
            }
        };
    }
    else {
        // Handle the case where no file is selected
        console.error('No file selected or file input element is not available.'); // Log an error to the console
    }
}
// Function to print the CV
function printCV() {
    window.print(); // Trigger the print dialog to print the page
}
