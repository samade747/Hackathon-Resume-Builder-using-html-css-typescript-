// regex for validation
const strRegex = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form') as HTMLFormElement;
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
} as const;

type ValidType = typeof validType[keyof typeof validType];

// user inputs elements
const firstnameElem = mainForm.firstname as HTMLInputElement;
const middlenameElem = mainForm.middlename as HTMLInputElement;
const lastnameElem = mainForm.lastname as HTMLInputElement;
const imageElem = mainForm.image as HTMLInputElement;
const designationElem = mainForm.designation as HTMLInputElement;
const addressElem = mainForm.address as HTMLInputElement;
const emailElem = mainForm.email as HTMLInputElement;
const phonenoElem = mainForm.phoneno as HTMLInputElement;
const summaryElem = mainForm.summary as HTMLTextAreaElement;

// display elements
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

// first value is for the attributes and second one passes the nodelists
const fetchValues = <T extends HTMLElement>(attrs: string[], ...nodeLists: NodeListOf<T>[]): Record<string, string>[] => {
    const elemsAttrsCount = nodeLists.length;
    const elemsDataCount = nodeLists[0].length;
    const tempDataArr: Record<string, string>[] = [];

    for (let i = 0; i < elemsDataCount; i++) {
        const dataObj: Record<string, string> = {};
        for (let j = 0; j < elemsAttrsCount; j++) {
            dataObj[attrs[j]] = (nodeLists[j][i] as HTMLInputElement).value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
}

const getUserInputs = () => {
    // achievements
    const achievementsTitleElem = document.querySelectorAll<HTMLInputElement>('.achieve_title');
    const achievementsDescriptionElem = document.querySelectorAll<HTMLInputElement>('.achieve_description');

    // experiences
    const expTitleElem = document.querySelectorAll<HTMLInputElement>('.exp_title');
    const expOrganizationElem = document.querySelectorAll<HTMLInputElement>('.exp_organization');
    const expLocationElem = document.querySelectorAll<HTMLInputElement>('.exp_location');
    const expStartDateElem = document.querySelectorAll<HTMLInputElement>('.exp_start_date');
    const expEndDateElem = document.querySelectorAll<HTMLInputElement>('.exp_end_date');
    const expDescriptionElem = document.querySelectorAll<HTMLInputElement>('.exp_description');

    // education
    const eduSchoolElem = document.querySelectorAll<HTMLInputElement>('.edu_school');
    const eduDegreeElem = document.querySelectorAll<HTMLInputElement>('.edu_degree');
    const eduCityElem = document.querySelectorAll<HTMLInputElement>('.edu_city');
    const eduStartDateElem = document.querySelectorAll<HTMLInputElement>('.edu_start_date');
    const eduGraduationDateElem = document.querySelectorAll<HTMLInputElement>('.edu_graduation_date');
    const eduDescriptionElem = document.querySelectorAll<HTMLInputElement>('.edu_description');

    const projTitleElem = document.querySelectorAll<HTMLInputElement>('.proj_title');
    const projLinkElem = document.querySelectorAll<HTMLInputElement>('.proj_link');
    const projDescriptionElem = document.querySelectorAll<HTMLInputElement>('.proj_description');

    const skillElem = document.querySelectorAll<HTMLInputElement>('.skill');

    // event listeners for form validation
    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'Designation'));

    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
    expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Title')));
    expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Organization')));
    expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, "Location")));
    expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'End Date')));
    expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'End Date')));
    expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
    eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'School')));
    eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Degree')));
    eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'City')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Graduation Date')));
    eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
    projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Title')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Link')));
    projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
    skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'skill')));

    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    }
};

function validateFormData(elem: HTMLInputElement | HTMLTextAreaElement, elemType: ValidType, elemName: string) {
    if (elemType === validType.TEXT) {
        if (!strRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    if (elemType === validType.TEXT_EMP) {
        if (!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    if (elemType === validType.EMAIL) {
        if (!emailRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    if (elemType === validType.PHONENO) {
        if (!phoneRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    if (elemType === validType.ANY) {
        if (elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}

function addErrMsg(formElem: HTMLInputElement | HTMLTextAreaElement, formElemName: string) {
    const errorMsg = `${formElemName} is invalid`;
    const errorElement = formElem.nextElementSibling as HTMLSpanElement;
    errorElement.innerHTML = errorMsg;
}

function removeErrMsg(formElem: HTMLInputElement | HTMLTextAreaElement) {
    const errorElement = formElem.nextElementSibling as HTMLSpanElement;
    errorElement.innerHTML = "";
}

const showListData = (listData: Record<string, string>[], listContainer: HTMLDivElement) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        const itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        
        for (const key in listItem) {
            const subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }

        listContainer.appendChild(itemElem);
    });
}

const displayCV = (userData: any) => {
    nameDsp.innerHTML = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
}

// generate CV
const generateCV = () => {
    const userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
}

function previewImage() {
    const oFReader = new FileReader();
    oFReader.readAsDataURL(imageElem.files[0]);
    oFReader.onload = (ofEvent) => {
        imageDsp.src = (ofEvent.target as FileReader).result as string;
    }
}

// print CV
function printCV() {
    window.print();
}
