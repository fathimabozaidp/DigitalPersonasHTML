debugger;
var universityRegExp=/^[A-Za-z\s]+$/;
var percentageRegExp = /^[0-9]$/;
var getRegisterPayload;
var welcomeNotePara;
var qualificationChoosen;
var universityInput, universityValue = "";
var startingYearInput, startingYearValue = "";
var endingYearInput, endingYearValue = "";
var percentageInput, percentageValue = "";
var educationPayload = {}, userProfilePayload = {};
var arrayOfUserProfile = [];

//getting register payload from register page
getRegisterPayload = JSON.parse(sessionStorage.getItem('ss_Set_RegisterPayload'));
console.log(getRegisterPayload);

welcomeNotePara = document.getElementById("welcomeNoteParaId");
welcomeNotePara.innerHTML += getRegisterPayload.fullName.split(" ").shift().split("")[0].toUpperCase()+getRegisterPayload.fullName.split(" ").shift().slice(1);

//getting all buttons
doctoratePhdButton = document.getElementById('doctorate_PhdButtonId');
mastersPostGraduationButton  = document.getElementById('masters_PostGraduationButtonId');
graduationDiplomaButton = document.getElementById('graduation_DiplomaButtonId');
twelvethButton  = document.getElementById('twelvethButtonId');
tenthButton = document.getElementById('tenthButtonId');
belowTenthButton = document.getElementById('belowTenthButtonId');
saveContinueButton = document.getElementById('saveContinueButton');
// debugger;
    var date = new Date();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var year = date.getFullYear();
    if(month<10)
    month='0'+month.toString();
    if(day<10)
    day='0'+day.toString();
    var today = year+'-'+month+'-'+day; 
    document.getElementById('startingDateId').setAttribute("max", today);
    document.getElementById('endingDateId').setAttribute("max", today);

    //identifies which button is clicked in qualification
   
function showNextDiv(elementId, divId){    
    // clickedDiv = document.getElementById(divId);
    if(divId == 'qualificationFormContainerDiv'){
        if(elementId == 'graduation_DiplomaButtonId'){ 
            debugger;
            qualificationChoosen = document.getElementById(elementId).innerText;          
            graduationDiplomaButton.style.borderColor = "blue";
            //display graduation div
            document.getElementById('courseFormContainerDiv').hidden = false;      
        }
    }
    else if(divId == 'courseFormContainerDiv'){
        courseChoosen = document.getElementById("courseSelectId");
        if(courseChoosen.value == 'B.Tech/B.E.'){
            courseChoosen.style.borderColor = "blue";
            document.getElementById("specializationFormContainerDiv").hidden = false;
        }
    }
    else if(divId == 'specializationFormContainerDiv'){
        specializationChoosen = document.getElementById("specializationSelectId");
        courseChoosen.style.borderColor = "blue";
        document.getElementById("universityFormContainerDiv").hidden = false;
        document.getElementById("startingYearFormContainerDiv").hidden = false;
        document.getElementById("endingYearFormContainerDiv").hidden = false;
        document.getElementById("percentageOutOfHundredFormContainerDiv").hidden = false;
    }
}

function validateCourse(){
    debugger;
    courseChoosen = document.getElementById("courseSelectId");
    if(courseChoosen.value != ""){
        courseChoosen.style.borderColor = "green";
    }else{
        courseChoosen.style.borderColor = "red";
    }
}
function validateSpecialization(){
    debugger;
    specializationChoosen = document.getElementById("specializationSelectId");
    if(specializationChoosen.value != ""){
        specializationChoosen.style.borderColor = "green";
    }else{
        specializationChoosen.style.borderColor = "red";
    }
}
function validateUniversity(){
    debugger;
    universityInput = document.getElementById("universityInputId");
    universityValue = universityInput.value;
    if(universityValue != "" || universityValue.match(universityRegExp)){
        universityInput.style.borderColor = "green";
        validateAll();
    }else{
        universityInput.style.borderColor = "red";
        validateAll();
    }
}
function validateStartingYear(){
    debugger;
    startingYearInput = document.getElementById("startingDateId");
    startingYearValue = startingYearInput.value;
    if(startingYearValue != ""){
        startingYearInput.style.borderColor = "green";
        validateAll();
    }else{
        startingYearInput.style.borderColor = "red";
        validateAll();
    }
}
function validateEndingYear(){
    debugger;
    endingYearInput = document.getElementById("endingDateId");
    endingYearValue = endingYearInput.value;
    if(endingYearValue != ""){
        endingYearInput.style.borderColor = "green";
        validateAll();
    }else{
        endingYearInput.style.borderColor = "red";
        validateAll();
    }              
}
function validatePercentage(){
    debugger;
    percentageInput = document.getElementById("percentageInputId");
    percentageValue = percentageInput.value;
    if(percentageValue != "" || percentageValue.match(percentageRegExp)){
        percentageInput.style.borderColor = "green";
        validateAll();
    }else{
        percentageInput.style.borderColor = "red";
        validateAll();
    }
}
function validateAll(){
    if((universityValue != "" || universityValue.match(universityRegExp)) && startingYearValue != "" && endingYearValue != ""
        &&(percentageValue != "" || percentageValue.match(percentageRegExp))){
            saveContinueButton.disabled = false;
    }else{
        saveContinueButton.disabled = true;
    } 
}

function saveCompleteDetails(){
    educationPayload = {
        "qualification" : qualificationChoosen,
        "course": courseChoosen.value,
        "specialiazation": specializationChoosen.value,
        "university": universityValue,
        "startingYear": startingYearValue,
        "endingYear": endingYearValue,
        "percentage": percentageValue
    }
    console.log(educationPayload);

    //merging payloads register payload with education payload
    userProfilePayload ={
        ... getRegisterPayload,
        ... educationPayload
    }

    arrayOfUserProfile.push(userProfilePayload);

    //user registered successfully message 
    Swal.fire({
        title: "Registration Success!",
        text: 'Explore Jobs now!',
        icon: "success",
        showConfirmButton: true,
        position: "top",
        background: "whitesmoke",
        confirmButtonText: "OK"
        }).then((result) => {
      if (result.isConfirmed) {
            window.location.href = 'jobs.html'
      }
    });
}