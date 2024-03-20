var companyName, jobTitle, jobExperience, jobLocation;
var getRegisterPayload;
getRegisterPayload = JSON.parse(sessionStorage.getItem('ss_Set_RegisterPayload'));
var jobAppliedPayload={};
var get_ArrayOfJobsApplied = sessionStorage.getItem('ss_Set_ArrayOfJobsApplied');
var locationInput, locationInputValue="";
var jobName="";
//User Icon in header
function displayUserProfileDetails(){
    debugger;
    Swal.fire({
        title: "User Details",
        // text: 'user \r detils'
        text: `User name : ${getRegisterPayload.fullName}  User email : ${getRegisterPayload.email}\n Mobile: ${getRegisterPayload.mobileNumber}` ,
    });
}
//Apply Button Clicked
function createJobsAppliedTable(buttonId,companyNameId, jobTitleId, jobExperienceId, jobLocationId){
    debugger;
    companyName = document.getElementById(companyNameId).innerText;
    jobTitle = document.getElementById(jobTitleId).innerText;
    jobExperience = document.getElementById(jobExperienceId).innerText;
    jobLocation = document.getElementById(jobLocationId).innerText;
    
    jobAppliedPayload = {
        "companyName" : companyName,
        "jobTitle": jobTitle,
        "jobExperience": jobExperience,
        "jobLocation": jobLocation
    }
    if(get_ArrayOfJobsApplied == null || get_ArrayOfJobsApplied == undefined){
        get_ArrayOfJobsApplied = [];
        get_ArrayOfJobsApplied.push(jobAppliedPayload);
    }else{
        get_ArrayOfJobsApplied = JSON.parse(get_ArrayOfJobsApplied);
        get_ArrayOfJobsApplied.push(jobAppliedPayload);
    }     
    sessionStorage.setItem('ss_Set_ArrayOfJobsApplied',JSON.stringify(get_ArrayOfJobsApplied));
    document.getElementById(buttonId).innerText = "Applied";
    document.getElementById(buttonId).disabled = true;
} 

function searchJobByLocation()
{
    debugger;
    locationInput = document.getElementById("searchJobLocationInputId");
    var filter = locationInput.value.toUpperCase();

    var allRowsOfJobsDiv = document.getElementsByClassName("jobRows");

    for(i=0; i<allRowsOfJobsDiv.length; i++){
        var jobLocations = document.getElementsByClassName("jobLocation");
        if(jobLocations){
            jobName = jobLocations[i].innerHTML;
            if(jobName.toUpperCase().indexOf(filter) > -1){
                allRowsOfJobsDiv[i].style.display = ""
            }else{
                allRowsOfJobsDiv[i].style.display = "none"
            }
        }
    }
}