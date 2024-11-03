export const validatePasswordConfirm = (pass, confirmPass)=>{
    return pass === confirmPass
}

export const passConfirmationValidationMessage = 'La contraseña no coincide'