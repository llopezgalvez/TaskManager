export const validateSurname = (surname)=>{
    const regex = /^[a-z A-Z]*$/
    return regex.test(surname)
}

export const surnameValidationMessage = 'Apellido  invalido ingrese solo letras'