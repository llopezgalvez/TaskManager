export const validateName = (name)=>{
    const regex = /^[a-z A-Z]*$/
    return regex.test(name)
}

export const nameValidationMessage = 'Nombre invalido ingrese solo letras'