let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/;
const stateAbbreviations = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
let form = null;
let successMsg = null;
function initValidation(successId){
    form = document.getElementById("myForm");
    let inputs = document.querySelectorAll("input");
    for (input of inputs){
        input.addEventListener("change", inputChanged);
    }
    form.addEventListener("submit", submitForm);

}
function inputChanged(ev){
    let el = ev.currentTarget;
    validateForm();
    el.classlist.add("was-validated");
    
}
function submitForm(ev){
    let form = ev.currentTarget;
    ev.preventDefault();
    ev.stopPropagation();
    validateForm();

    if(!form.checkValidity()){
        //todo if form is invalid, set 'was-validated' class on all inputs to show errors.
        for(input in inputs){
            input.classlist.add("was-validated");
        }
    }
    else{
        document.getElementById("myForm").classList.remove("not-hidden");
        document.getElementById("myForm").classList.add("hidden");
        document.getElementById("success-message").classList.add("not-hidden-success-message");
        console.log("here");
        document.getElementById("success-message").classList.remove("hidden");
        document.getElementById("success-message").classList.add("success-message");
        let millisToWait = 3000;
        setTimeout(function(){
            document.getElementById("success-message").classList.remove("success-message");
            document.getElementById("success-message").classList.remove("not-hidden-success-message");
            document.getElementById("success-message").classList.add("hidden");
        }, millisToWait);


    }
}

function validateForm(){
    checkRequired("firstName", "First Name is Required");
    checkRequired("lastName", "Last Name is Required");
    checkRequired("address", "Address is Required");
    checkRequired("city", "City is Required");
    if(checkRequired("state", "State is Required")){
        validateState("state", "Not a valid State, enter two digit code e.g., UT");
    }
    if(checkRequired("zip", "Zip Code is Required")){
        checkFormat("zip", `malformed zip-code, please use either "#####" or "#####-####" format.`, zipCodeRegex);
    }
    if(checkRequired("cellPhone", "Phone is required")){
        checkFormat("cellPhone", "Phone format is bad", phoneRegex)
    }
    let checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    let checkedBox = false;
    for(let j = 0; j < checkBoxes.length; j++){
        if(checkBoxes[i].checked){
            checkBox = true;
            break;
        }
    }
    if(!checkedBox){
        document.getElementById("checkBoxErrorMsg").innerText = "You must select at least one!";

    }
    else{
        document.getElementById("checkBoxErrorMsg").innerText = "";
    }
}
function checkRequired(id, message){
    let el = document.getElementById(id);
    let valid = false;
    let type = el.type;
    switch(type) {
        case 'text':
            //check if input has a value, set valid to true if so, false if not. 
            if(el.value !== null){
                valid = true;
            }
            break;
    }
        setElementValidity(id, valid, message);
        return valid;
}

function validateState(id, msg){
    let el = document.getElementById(id);
    let valid = false;
    let state = el.value.toUpperCase();
    if(!stateAbbreviations.includes(state)){
        valid = false;
    }
    else{
        valid = true;
    }
    setElementValidity(id, valid, msg);

}
function checkFormat(id, msg, regex){
    let valid = false;
    if(regex.exec(document.getElementById(id).value)){
        valid = true;
    }
    else{
        valid = false;
    }
    setElementValidity(id, valid, msg);
    return valid;
}
function setElementValidity(id, valid, message){
    let el = document.getElementById(id);
    if(valid){
        el.setCustomValidity('');
        if(el.classList.contains("invalid")){
            el.classList.remove("invalid");
        }
        el.classList.add("valid")
    }
    else{
        el.setCustomValidity(message);
        if(el.classList.contains("valid")){
            el.classList.remove("valid");
        }
        el.classList.add(valid);
        //EDIT insert or remove message in error div for element. 

    }
}
