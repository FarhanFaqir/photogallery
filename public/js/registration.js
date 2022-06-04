
    // function to validate inputs
    function validate(){
        var username = document.getElementById("username").value;
        /* username checks */
        // first letter of username must be an Alphabet
        if(!username[0].match(/[a-z]/i)){
            document.getElementById("errorspan").innerHTML = "Username Must Start with an Alphabet";
            return false;
        }
        // length of username must be 3 or more characters
        else if(username.length < 3){
            document.getElementById("errorspan").innerHTML = "Username must contain 3 or more alphanumeric characters";
            return false;
        }else{
            document.getElementById("errorspan").innerHTML = "";
        }

        /* password and confirm password checks */
        var password = document.getElementById("password").value;
        var confirmpassword = document.getElementById("confirmpassword").value;
        
        
        // match password with regex
        if(!password.match("^(?=.*[A-Z])(?=.*[0-9])(?=.*[/*-+!@#$^&*])(?=.{8,})")){
            document.getElementById("errorspan").innerHTML = "Password must be 8 characters long,contains at least "
            + "1 upper case letter AND 1 number and 1 of the following special characters ( / * - + ! @"+
            " # $ ^ & * ) that is 8 or more characters";
            return false;
        }else if(password !== confirmpassword){
            document.getElementById("errorspan").innerHTML = "Password and Confrim Password must be same";
            return false;
        }else{
            document.getElementById("errorspan").innerHTML = "";
        }

        /* password and confirm password checks */
        if(!document.getElementById('yesradio').checked && !document.getElementById('noradio').checked) {
            // if none of the radio buttons is checked
            document.getElementById("errorspan").innerHTML = "Please Select if your age is 13 years";
            return false;
        }else if(document.getElementById('noradio').checked) {
            // if no is selected 
            document.getElementById("errorspan").innerHTML = "Your must be older than 13 years in order to continue";
            return false;
        }else{
            document.getElementById("errorspan").innerHTML = "";
        }

        /* if code is here it means every validation checks out */
        // Show alert that registration completed Successfully and return true
        alert('Registration Completed Successfuly');
        return true;
    }


    function reset(){
        location.reload();
    }
