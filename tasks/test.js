

        











        var name, age, mobile, email;
        var employee;
        var submitButton = document.getElementById("button_Submit");
        submitButton.addEventListener("click", employee);
        function employee(){
            var transferData = readData();
            insertData(transferData);
            reset();
        }
        function readData(){  
            employee = {};         
            name = document.getElementById("input_Name").value;
            age = document.getElementById("input_Age").value;
            mobile = document.getElementById("input_Mobile").value;
            email = document.getElementById("input_EMail").value;
            return employee;
        }
        function insertData(){

        }
        function resetFormData(){
            document.getElementById("input_Name").value = "";
            document.getElementById("input_Age").value = "";
            document.getElementById("input_Mobile").value = "";
            document.getElementById("input_EMail").value = "";
        }

        // var array1 = [1,2,3,4,5,6,3,4,5,2,9];    
        // debugger;
        // var repeated = [];
        //     arrayOfObjects.forEach((value, index, array) => {
        //     if (array.indexOf(value, index + 1) !== -1 && repeated.indexOf(value) === -1) {
        //         repeated.push(value);
        //     }
        // });
        // var duplicates = arrayOfObjects.filter((value,index)=>{
        //     arrayOfObjects.indexOf(value) != index
        // });

        //         var duplicateArray = [];
// var arrobj=[...arrayOfObjects];
//         for(var i=0; i<arrayOfObjects.length; i++){
//             var duplicateObject = {};

//             var objectName = arrayOfObjects[i].name;
            
//             arrobj.splice(0,i+2);
//             arrobj.forEach((item, index)=>{
//                 var duplicateName = item.name;
//                 if(objectName === duplicateName){
//                     duplicateObject.name = item.name;
//                     duplicateObject.index = i;
//                     duplicateArray.push(duplicateObject);
//                 }
//             })
//         }
