export const validatePhone = (phone)=>{
    const regex = /^[0-9]*$/
    return regex.test(phone)
}

export const phoneValidationMessage = 'Número de telefono inválido, mínimo 8 máximo 15 caracteres numericos. No se aceptan espacios'