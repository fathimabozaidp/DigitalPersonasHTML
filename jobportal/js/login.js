debugger;
var email_LoginInput, password_LoginInput;
var email_LoginValue="", password_LoginValue="";
var logInButton;
logInButton = document.getElementById("loginButtonId");

function displayPasswordDiv(){
    debugger;
    email_LoginInput = document.getElementById("emailInputId");
    email_LoginValue = email_LoginInput.value;
    if(email_LoginValue != ""){
        document.getElementById("passwordLoginPageInputId").hidden = false;
        logInButton.disabled = false;
        logInButton.hidden = false;
        document.getElementById("emailMessageLoginPageParaId").innerHTML = "";
        document.getElementById("passwordMessageLoginPageParaId").innerHTML = "";

    }else{
       document.getElementById("passwordLoginPageInputId").hidden = true; 
    }
}
function validateUser(){
    debugger;
    email_LoginInput = document.getElementById("emailInputId");
    email_LoginValue = email_LoginInput.value;
    
    password_LoginInput = document.getElementById("passwordInputId");
    password_LoginValue = password_LoginInput.value;
    
    
    //Array from form data available in string format
    var getArrayOfUserCredentials = sessionStorage.getItem('ss_Set_arrayOfUserCredentials');
    console.log(getArrayOfUserCredentials);
    if(getArrayOfUserCredentials == null || getArrayOfUserCredentials == undefined){
        Swal.fire({
            title: "Login unsuccessfull",
            text: 'User not found',
            icon: "error",
            showConfirmButton: true,
            // timer: 1000,
            position: "top",
            background: "whitesmoke",
            // width:"400px",
            // height:"70px",
        });
    }
    else{
        //convert string to json
        getArrayOfUserCredentials = JSON.parse(getArrayOfUserCredentials);
        console.log(getArrayOfUserCredentials);

        for(var item in getArrayOfUserCredentials)
        {       
            //case1 new email - empty password 
            if(((email_LoginValue != getArrayOfUserCredentials[item].email) && (password_LoginValue == "")) || 
            ((email_LoginValue != getArrayOfUserCredentials[item].email) && (password_LoginValue != ""))){
                debugger;
                document.getElementById("passwordLoginPageInputId").hidden = true;
                document.getElementById("emailMessageLoginPageParaId").innerHTML = "User doesnot exists! Please Register from the above link";
                password_LoginInput = "";    
                logInButton.hidden = true;
                break; 
            }
            //case2 old email - empty password
            else if(((email_LoginValue == getArrayOfUserCredentials[item].email) && (password_LoginValue == ""))){
                debugger;
                document.getElementById("passwordMessageLoginPageParaId").innerHTML = "Password cannot be empty !";
                break;
            } 
            // check if input - email and password matches with payload email and password combination
            else if((email_LoginValue == getArrayOfUserCredentials[item].email) && (password_LoginValue == getArrayOfUserCredentials[item].password))
            {
                debugger;
                Swal.fire({
                    title: "Login Successful",
                    text: 'Credentials Match',
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                    position: "top",
                    background: "whitesmoke",
                    // width:"400px",
                    // height:"70px",
                });
                //write code for login success here
                document.getElementById("passwordMessageLoginPageParaId").innerHTML = "";
                window.location.href = "jobs.html"
            }
            else if((email_LoginValue == getArrayOfUserCredentials[item].email) && (password_LoginValue != getArrayOfUserCredentials[item].password))
            {
                debugger;
                Swal.fire({
                    title: "Login Failed",
                    text: "Credentials Mismatch",
                    icon: "error",
                    showConfirmButton: true,
                    // timer: 3000,
                    position: "top",
                    background: "whitesmoke",
                    confirmButtonColor :"#blue"
                    // width:"400px",
                    // height:"70px",
                });
                document.getElementById("passwordMessageLoginPageParaId").innerHTML = "";
                password_LoginInput.value = ""
                break;
            }         
        }
    }    
}
    
    

