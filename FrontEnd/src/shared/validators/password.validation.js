export const validatePassword = (password)=>{
    const regex = /^\S{6,12}$/
    return regex.test(password)
}

export const passwordValidationMessage = 'La contraseña debe tener entre 6 y 12 caracteres y no tenes espacios vacíos'