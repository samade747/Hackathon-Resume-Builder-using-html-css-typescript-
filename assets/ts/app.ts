// Regex patterns for validation
const strRegex = /^[a-zA-Z\s]*$/; // Regex to match strings containing only letters and spaces
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Regex to validate email addresses, supporting various formats
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
// Regex to validate phone numbers in multiple formats
const digitRegex = /^\d+$/; // Regex to match strings containing only digits

// Select the form element from the HTML document
const mainForm = document.getElementById('cv-form') as HTMLFormElement;

// Define a set of valid types for form validation
const validType = {
    TEXT: 'text', // for text input
    TEXT_EMP: 'text_emp', // for text input with spaces allowed
    EMAIL: 'email', // for email input
    DIGIT: 'digit', // for numeric input
    PHONENO: 'phoneno', // for phone number input
    ANY: 'any', // for any type of input
} as const;

// Create a TypeScript type from the validType object
type ValidType = typeof validType[keyof typeof validType];

// Select form input elements and cast them to their specific types
const firstnameElem = mainForm.firstname as HTMLInputElement;
const middlenameElem = mainForm.middlename as HTMLInputElement;
const lastnameElem = mainForm.lastname as HTMLInputElement;
const imageElem = mainForm.image as HTMLInputElement;
const designationElem = mainForm.designation as HTMLInputElement;
const addressElem = mainForm.address as HTMLInputElement;
const emailElem = mainForm.email as HTMLInputElement;
const phonenoElem = mainForm.phoneno as HTMLInputElement;
const summaryElem = mainForm.summary as HTMLTextAreaElement;

// Select elements used for displaying values and cast them to their specific types
const nameDsp = document.getElementById('fullname_dsp') as HTMLDivElement;
const imageDsp = document.getElementById('image_dsp') as HTMLImageElement;
const phonenoDsp = document.getElementById('phoneno_dsp') as HTMLDivElement;
const emailDsp = document.getElementById('email_dsp') as HTMLDivElement;
const addressDsp = document.getElementById('address_dsp') as HTMLDivElement;
const designationDsp = document.getElementById('designation_dsp') as HTMLDivElement;
const summaryDsp = document.getElementById('summary_dsp') as HTMLDivElement;
const projectsDsp = document.getElementById('projects_dsp') as HTMLDivElement;
const achievementsDsp = document.getElementById('achievements_dsp') as HTMLDivElement;
const skillsDsp = document.getElementById('skills_dsp') as HTMLDivElement;
const educationsDsp = document.getElementById('educations_dsp') as HTMLDivElement;
const experiencesDsp = document.getElementById('experiences_dsp') as HTMLDivElement;

// Function to fetch values from multiple NodeLists and convert them to an array of objects
const fetchValues = <T extends HTMLElement>(attrs: string[], ...nodeLists: NodeListOf<T>[]): Record<string, string>[] => {
    const elemsAttrsCount = nodeLists.length; // Number of attribute lists
    const elemsDataCount = nodeLists[0].length; // Number of data elements
    const tempDataArr: Record<string, string>[] = []; // Array to store results

    // Loop through each element to extract values
    for (let i = 0; i < elemsDataCount; i++) {
        const dataObj: Record<string, string> = {}; // Temporary object to store values
        // Loop through each attribute and get the corresponding value from NodeLists
        for (let j = 0; j < elemsAttrsCount; j++) {
            dataObj[attrs[j]] = (nodeLists[j][i] as unknown as HTMLInputElement).value;
        }
        tempDataArr.push(dataObj); // Add the object to the result array
    }

    return tempDataArr; // Return the array of objects
}

// const getUserInputs = () => {
//     // achievements
//     const achievementsTitleElem = document.querySelectorAll<HTMLInputElement>('.achieve_title');
//     const achievementsDescriptionElem = document.querySelectorAll<HTMLInputElement>('.achieve_description');

//     // experiences
//     const expTitleElem = document.querySelectorAll<HTMLInputElement>('.exp_title');
//     const expOrganizationElem = document.querySelectorAll<HTMLInputElement>('.exp_organization');
//     const expLocationElem = document.querySelectorAll<HTMLInputElement>('.exp_location');
//     const expStartDateElem = document.querySelectorAll<HTMLInputElement>('.exp_start_date');
//     const expEndDateElem = document.querySelectorAll<HTMLInputElement>('.exp_end_date');
//     const expDescriptionElem = document.querySelectorAll<HTMLInputElement>('.exp_description');

//     // education
//     const eduSchoolElem = document.querySelectorAll<HTMLInputElement>('.edu_school');
//     const eduDegreeElem = document.querySelectorAll<HTMLInputElement>('.edu_degree');
//     const eduCityElem = document.querySelectorAll<HTMLInputElement>('.edu_city');
//     const eduStartDateElem = document.querySelectorAll<HTMLInputElement>('.edu_start_date');
//     const eduGraduationDateElem = document.querySelectorAll<HTMLInputElement>('.edu_graduation_date');
//     const eduDescriptionElem = document.querySelectorAll<HTMLInputElement>('.edu_description');

//     const projTitleElem = document.querySelectorAll<HTMLInputElement>('.proj_title');
//     const projLinkElem = document.querySelectorAll<HTMLInputElement>('.proj_link');
//     const projDescriptionElem = document.querySelectorAll<HTMLInputElement>('.proj_description');

//     const skillElem = document.querySelectorAll<HTMLInputElement>('.skill');

//     // event listeners for form validation
//     firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'First Name'));
//     middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT_EMP, 'Middle Name'));
//     lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'Last Name'));
//     phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.PHONENO, 'Phone Number'));
//     emailElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.EMAIL, 'Email'));
//     addressElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Address'));
//     designationElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'Designation'));

//     achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Title')));
//     achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
//     expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Title')));
//     expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Organization')));
//     expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, "Location")));
//     expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'End Date')));
//     expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'End Date')));
//     expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
//     eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'School')));
//     eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Degree')));
//     eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'City')));
//     eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Start Date')));
//     eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Graduation Date')));
//     eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
//     projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Title')));
//     projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Link')));
//     projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
//     skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'skill')));

//     return {
//         firstname: firstnameElem.value,
//         middlename: middlenameElem.value,
//         lastname: lastnameElem.value,
//         designation: designationElem.value,
//         address: addressElem.value,
//         email: emailElem.value,
//         phoneno: phonenoElem.value,
//         summary: summaryElem.value,
//         achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
//         experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
//         educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
//         projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
//         skills: fetchValues(['skill'], skillElem)
//     }
// };


const getUserInputs = () => {
    // Select all input elements for achievements titles and descriptions
    const achievementsTitleElem = document.querySelectorAll<HTMLInputElement>('.achieve_title');
    const achievementsDescriptionElem = document.querySelectorAll<HTMLInputElement>('.achieve_description');

    // Select all input elements for experience details
    const expTitleElem = document.querySelectorAll<HTMLInputElement>('.exp_title');
    const expOrganizationElem = document.querySelectorAll<HTMLInputElement>('.exp_organization');
    const expLocationElem = document.querySelectorAll<HTMLInputElement>('.exp_location');
    const expStartDateElem = document.querySelectorAll<HTMLInputElement>('.exp_start_date');
    const expEndDateElem = document.querySelectorAll<HTMLInputElement>('.exp_end_date');
    const expDescriptionElem = document.querySelectorAll<HTMLInputElement>('.exp_description');

    // Select all input elements for education details
    const eduSchoolElem = document.querySelectorAll<HTMLInputElement>('.edu_school');
    const eduDegreeElem = document.querySelectorAll<HTMLInputElement>('.edu_degree');
    const eduCityElem = document.querySelectorAll<HTMLInputElement>('.edu_city');
    const eduStartDateElem = document.querySelectorAll<HTMLInputElement>('.edu_start_date');
    const eduGraduationDateElem = document.querySelectorAll<HTMLInputElement>('.edu_graduation_date');
    const eduDescriptionElem = document.querySelectorAll<HTMLInputElement>('.edu_description');

    // Select all input elements for project details
    const projTitleElem = document.querySelectorAll<HTMLInputElement>('.proj_title');
    const projLinkElem = document.querySelectorAll<HTMLInputElement>('.proj_link');
    const projDescriptionElem = document.querySelectorAll<HTMLInputElement>('.proj_description');

    // Select all input elements for skills
    const skillElem = document.querySelectorAll<HTMLInputElement>('.skill');

    // Add event listeners to form elements for validation on 'keyup' and 'blur' events
    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'Designation'));

    // Add event listeners for achievements elements
    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));

    // Add event listeners for experiences elements
    expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Title')));
    expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Organization')));
    expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, "Location")));
    expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Start Date')));
    expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'End Date')));
    expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));

    // Add event listeners for education elements
    eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'School')));
    eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Degree')));
    eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'City')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Graduation Date')));
    eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));

    // Add event listeners for project elements
    projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Title')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Link')));
    projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));

    // Add event listeners for skill elements
    skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Skill')));

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
    }
};


// Function to validate form data based on the type and name of the form element
function validateFormData(elem: HTMLInputElement | HTMLTextAreaElement, elemType: ValidType, elemName: string) {
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
function addErrMsg(formElem: HTMLInputElement | HTMLTextAreaElement, formElemName: string) {
    const errorMsg = `${formElemName} is invalid`; // Create an error message string
    const errorElement = formElem.nextElementSibling as HTMLSpanElement; // Find the next sibling element (assumed to be a span) for the error message
    errorElement.innerHTML = errorMsg; // Set the error message text
}

// Function to remove the error message from the form element
function removeErrMsg(formElem: HTMLInputElement | HTMLTextAreaElement) {
    const errorElement = formElem.nextElementSibling as HTMLSpanElement; // Find the next sibling element (assumed to be a span) for the error message
    errorElement.innerHTML = ""; // Clear the error message text
}

// Function to display a list of data items in a container
const showListData = (listData: Record<string, string>[], listContainer: HTMLDivElement) => {
    listContainer.innerHTML = ""; // Clear the container content before adding new items
    listData.forEach(listItem => {
        const itemElem = document.createElement('div'); // Create a new div for each list item
        itemElem.classList.add('preview-item'); // Add a class to the div
        
        // Loop through each key in the list item object
        for (const key in listItem) {
            const subItemElem = document.createElement('span'); // Create a new span for each key value
            subItemElem.classList.add('preview-item-val'); // Add a class to the span
            subItemElem.innerHTML = `${listItem[key]}`; // Set the text to the value of the key
            itemElem.appendChild(subItemElem); // Append the span to the item div
        }

        listContainer.appendChild(itemElem); // Append the item div to the container
    });
}

// Function to display the user's CV on the page
const displayCV = (userData: any) => {
    // Set the innerHTML of various display elements with user data
    nameDsp.innerHTML = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
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
}

// Function to generate the CV by collecting user inputs and displaying the CV
const generateCV = () => {
    const userData = getUserInputs(); // Get user inputs from the form
    displayCV(userData); // Display the CV with the collected data
    console.log(userData); // Log the user data to the console for debugging
}

// Function to preview an image selected by the user
function previewImage() {
    // Check if the file input contains files
    if (imageElem.files && imageElem.files.length > 0) {
        const oFReader = new FileReader(); // Create a new FileReader instance
        
        // Read the first file as a data URL (base64 encoded image)
        oFReader.readAsDataURL(imageElem.files[0]);
        
        // Set the image source when the file reading is complete
        oFReader.onload = (ofEvent) => {
            // Ensure the result is a string (base64 encoded image data)
            if (typeof (ofEvent.target as FileReader).result === 'string') {
                imageDsp.src = (ofEvent.target as FileReader).result as string; // Set the image source to the result
            }
        };
    } else {
        // Handle the case where no file is selected
        console.error('No file selected or file input element is not available.'); // Log an error to the console
    }
}

// Function to print the CV
function printCV() {
    window.print(); // Trigger the print dialog to print the page
}
