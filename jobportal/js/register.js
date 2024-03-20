//regular expressions
var fullNameRegExp = /^[A-Za-z\s]+$/;
var emailRegExp = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
var mobileRegExp = /^([+]\d{2})?\d{10}$/;
var cityRegExp =  /^[\bA-za-z]+$/;
// [6-9]{1}[[0-9].{9}

var fullNameInput, fullNameValue = "";
var emailInput, emailValue = "";
var passwordInput, passwordValue = "";
var mobileInput, mobileValue = "";
var resumeInput, resumeValue = "";
var currentCityInput, currentCityValue = "";
var checkboxInput, checkboxValue;
var registerButton;
var credentialsPayload = {};
var registerPayload = {};
var experiencedDiv, freshersDiv, resumeDiv, currentCityDiv;
var arrayOfUserCredentials = [];
registerButton = document.getElementById("registerButtonId");

//Array from form data available in string format
 var getArrayOfUserCredentials = sessionStorage.getItem('ss_Set_arrayOfUserCredentials');
console.log(getArrayOfUserCredentials);

//convert string to json
getArrayOfUserCredentials = JSON.parse(getArrayOfUserCredentials);
console.log(getArrayOfUserCredentials);

//reading form values and validating them 
function validateFullName(){
    fullNameInput = document.getElementById("fullNameInputId");
    fullNameValue = fullNameInput.value;
    if(fullNameValue.match(fullNameRegExp)){
        fullNameInput.style.borderColor = "Green";
        validateAll();
    }
    else{
        fullNameInput.style.borderColor = "Red";
        validateAll();
    }
}
function validateEmail(){
    emailInput =  document.getElementById("emailAddressInputId");
    emailValue = emailInput.value;
    for(var item in getArrayOfUserCredentials){
        if(emailValue == getArrayOfUserCredentials[item].email){
           //user already exists 
            document.getElementById("emailRegisterPageParaId").innerHTML = "User already exists! Please login or use different email";
            validateAll();
            break;
        }else{
            document.getElementById("emailRegisterPageParaId").innerHTML = "";
            if(emailValue.match(emailRegExp)){
                emailInput.style.borderColor = "Green";
                validateAll();
            }else{
                emailInput.style.borderColor = "Red";
                validateAll();
            }
        }
    }     
}
function validatePassword(){
    passwordInput =  document.getElementById("passwordInputId");
    passwordValue = passwordInput.value;
     if(passwordValue.match(passwordRegExp)){
        passwordInput.style.borderColor = "Green";
        validateAll();
    }else{
        passwordInput.style.borderColor = "Red";
        validateAll();
    }
}

function validateMobileNumber(){
    mobileInput =  document.getElementById("mobileNumberInputId");
    mobileValue = mobileInput.value;
    // for(var item in getArrayOfUserCredentials){
        // if(mobileValue == getArrayOfUserCredentials[item].mobileNumber){
        //    //user already exists 
        //    document.getElementById("mobileRegisterPageParaId").innerHTML = "Mobile already exists! Please login or use different mobile";
        //    break;
        // }else{
            if(mobileValue.match(mobileRegExp)){
                mobileInput.style.borderColor = "Green";
                validateAll();
            }else{
                mobileInput.style.borderColor = "Red";
                validateAll();
            }
        // }
    // }
    
}
function validateCheckbox(){
    debugger;
    checkboxInput = document.getElementById("checkboxInputId");
    if(checkboxInput.checked == true){
        checkboxValue = checkboxInput.value;
        validateAll();
    }else{
        checkboxValue = "";
        registerButton.disabled = true;
        validateAll();
    }
    // if(checkboxValue == ""){
    //     alert("Please tick the checkbox");
    //     validateAll();
    // }else{
    //     validateAll();
    // }
}

function displayResumeUpload(){
    debugger
    resumeDiv = document.getElementById("resumeUploadDivId");
    currentCityDiv = document.getElementById("currentCityDivId");
    if(resumeDiv.hidden){
        resumeDiv.hidden = false;
        currentCityDiv.hidden = true;        
    }
    // else{
    //     resumeDiv.hidden = true;
    //     currentCityDiv.hidden = true;
    // }
}
function displayCurrentCity(){
    resumeDiv = document.getElementById("resumeUploadDivId");
    currentCityDiv = document.getElementById("currentCityDivId");
    if(currentCityDiv.hidden){
        currentCityDiv.hidden = false;
        resumeDiv.hidden = true;
        // currentCityInput.value = ""
    }
    // }else{
    //     currentCityDiv.hidden = true;
    //     resumeDiv.hidden = true;
    // }
}
function validateResume(){
    resumeInput = document.getElementById("filesInputId");
    resumeValue = resumeInput.value;
    if(resumeValue != ""){
        resumeInput.style.borderColor = "green";
        validateAll();
    }else{
        resumeInput.style.borderColor = "red";
        validateAll();
    }
}
function validateCurrentCity(){
    currentCityInput = document.getElementById("currentCityInputId");
    currentCityValue = currentCityInput.value;
    if(currentCityValue.match(cityRegExp)){
        currentCityInput.style.borderColor = "green";
        validateAll();
    }
    else{
        currentCityInput.style.borderColor = "red";
        validateAll();
    }
}
function validateAll(){
    debugger;
    // if getArrayOfuserCredentials is empty i.e., first time register
    if(getArrayOfUserCredentials == null){
        if(fullNameValue.match(fullNameRegExp) && emailValue.match(emailRegExp) && passwordValue.match(passwordRegExp)
        && mobileValue.match(mobileRegExp) && !checkboxValue == "" && (resumeValue != "" || currentCityValue.match(cityRegExp)))
        {
            //enable register button
            registerButton.disabled = false;     
            return;  
        }
        else
        {
            registerButton.disabled = true;
            return;
        }
    }
    //getArrayOfUserCredentials have more than 1 payload
    else if(getArrayOfUserCredentials){
        getArrayOfUserCredentials = JSON.parse(getArrayOfUserCredentials);
        for(var item in getArrayOfUserCredentials){
            //registering with new email id
            if(fullNameValue.match(fullNameRegExp) && (emailValue.match(emailRegExp) && emailValue != getArrayOfUserCredentials[item].email) && passwordValue.match(passwordRegExp)
            && mobileValue.match(mobileRegExp) && !checkboxValue == "" && (resumeValue != "" || currentCityValue.match(cityRegExp)))
            {
                //enable register button
                registerButton.disabled = false; 
                break;      
            }
            //same email-id used(duplicate email id registration)
            else
            {
                registerButton.disabled = true;
                break;
                // document.getElementById("emailRegisterPageParaId").innerHTML = "User already exists"
            }
        }  

    }

//    
      
}

function saveRegisterDetails(){
    debugger;
    //store form data in payload
    credentialsPayload = {
        "email" : emailValue,
        "password" : passwordValue
    }
    registerPayload = {
        "fullName" : fullNameValue,
        "email" : emailValue,
        "password" : passwordValue,
        "mobileNumber" : mobileValue,
        "resume" : resumeValue,
        "currentCity" : currentCityValue
    }

    arrayOfUserCredentials.push(credentialsPayload);

    //now set this payload in session storage
    sessionStorage.setItem('ss_Set_CredentialsPayload',JSON.stringify(credentialsPayload));
    console.log(credentialsPayload);
    sessionStorage.setItem('ss_Set_RegisterPayload',JSON.stringify(registerPayload));
    console.log(registerPayload);
    sessionStorage.setItem('ss_Set_arrayOfUserCredentials',JSON.stringify(arrayOfUserCredentials));
    console.log(arrayOfUserCredentials);

    window.location.href = 'education.html';    
}