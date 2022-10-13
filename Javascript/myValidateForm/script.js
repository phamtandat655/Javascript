const username = document.querySelector('#Username')
const email = document.querySelector('#Email')
const password = document.querySelector('#Password')
const confirmPassword = document.querySelector('#Confirm-password')
const form = document.querySelector('form')

function showError(input, message) {
    input.parentElement.classList.add('error')
    input.parentElement.querySelector('small').innerText = message;
}

function showSuccess(input) {
    input.parentElement.classList.remove('error')
    input.parentElement.querySelector('small').innerText = '';
}

function checkEmptyError(listInput) {
    let check = false;
    listInput.forEach(input => {
        input.value = input.value.trim()
        if(!input.value){
            showError(input , "Vui long nhap noi dung!")
            check= true;
        } else {
            showSuccess(input)
        }
    });
    return check
}

function checkEmailError (input) {
    const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    input.value = input.value.trim()
    let isEmailError = !regex.test(input.value)
    if(regex.test(input.value)) {
        showSuccess(input)
    }else {
        showError(input, 'Email Invalid')
    }
    return isEmailError;
}

function checkLengthError (input , min , max ) {
    input.value = input.value.trim()
    
    if(input.value.length < min) {
        showError(input , `Truong nay phai dai hon ${min} ky tu`)
        return true
    }
    if (input.value.length > max) {
        showError(input , `Truong nay phai ngan hon ${max} ky tu`)
        return true
    } 
    // else{
    //     showSuccess(input)
    // }
    return false
}

function checkConfirmPassword(password , confirmPassword) {
    let isConfirmPasswordError = false
    if(password.value != confirmPassword.value) {
        showError(confirmPassword , 'Mat khau xac nhan khong dung')
        isConfirmPasswordError=true
    } else {
        showSuccess(confirmPassword)
    }

    return isConfirmPasswordError
}

form.addEventListener('submit' , function(e) {
    e.preventDefault();

    let isEmptyError = checkEmptyError([username , email , password , confirmPassword])
    let isEmailError = checkEmailError(email)
    let isLengthOfUsernameError = checkLengthError(username , 1 , 30)
    let isLengthOfPasswordError = checkLengthError(password , 1 , 30)
    let isConfirmPasswordError = checkConfirmPassword(password , confirmPassword)

    if(!isEmptyError || !isEmailError || !isLengthOfUsernameError || !isLengthOfPasswordError || !isConfirmPasswordError) {
        // do nothing
    } else {
        // do something
    }
})