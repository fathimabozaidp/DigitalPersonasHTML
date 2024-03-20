var table;
table = document.getElementById('tableId');
var get_ArrayOfJobsApplied = sessionStorage.getItem('ss_Set_ArrayOfJobsApplied')
debugger;
if((get_ArrayOfJobsApplied == undefined || get_ArrayOfJobsApplied == null || get_ArrayOfJobsApplied == "[]")){
    swal.fire(
        {
          icon: "error",
          title: "Oops...",
          text : `No Jobs Applied`,
          position: "center",
          background: "whitesmoke",
          width:"400px",
        });
}else if(get_ArrayOfJobsApplied){
    table.hidden = false;
    get_ArrayOfJobsApplied = JSON.parse(get_ArrayOfJobsApplied);

    for(var i in get_ArrayOfJobsApplied){
        var tableRowOfAppliedJobs =`<tr id=${i}>
                                        <td id="row{i}_CompanyName">${get_ArrayOfJobsApplied[i].companyName}</td>
                                        <td id="row{i}_JobTitle">${get_ArrayOfJobsApplied[i].jobTitle}</td>
                                        <td id="row{i}_JobExperience">${get_ArrayOfJobsApplied[i].jobExperience}</td>
                                        <td id="row{i}_JobLocation">${get_ArrayOfJobsApplied[i].jobLocation}</td>
                                    </tr>`;
        table.innerHTML += tableRowOfAppliedJobs;
    }
}

