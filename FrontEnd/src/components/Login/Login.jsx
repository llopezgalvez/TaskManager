import { validateEmail, emailValidationMessage } from "../../shared/validators/email.validator.js";
import { passwordValidationMessage, validatePassword } from "../../shared/validators/password.validation.js";
import { useLogin } from "../../shared/hooks/useLogin.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Input } from './Input.jsx'
import { useState } from 'react'
import './Login.css'

export const Login = ({switchAuthHandler}) => {
  const { login, isLoading } = useLogin()
  const navigate= useNavigate()

  const [formData, setFormData] = useState(
    {
      email: {
        value: "",
        isValid: false,
        showError: false,
      },
      password: {
        value: "",
        isValid: false,
        showError: false,
      },
    }
  );
  const isSubmitButtonDisable = !formData.email.isValid ||
                                !formData.password.isValid
                                


  const onValueChange = (value, field)=>{
    setFormData((prevData)=> (
      {
          ...prevData,
          [field]: {
              ...prevData[field],
              value
          }
      }
  ))
  }

  const handleValidationOnBlur = (value, field)=>{
    let isValid = false
    switch(field){
        case 'email':
            isValid = validateEmail(value)
            break
        case 'password':
            isValid = validatePassword(value)
            break
        default:
        break
    }
    setFormData((prevData)=> (
        {
            ...prevData,
            [field]: {
                ...prevData[field],
                isValid,
                showError: !isValid
            }
        }
    ))
  }

  const handleLogin = (e)=> {
    e.preventDefault()
    navigate('/')
        login(
                formData.email.value,
                formData.password.value
        )
  }
  return (
    <div className="login-container">
      <h1 className="titulo-login">ToDoProduct</h1>
      <div className="login-content">
      <form 
        className="auth-form-login"
        onSubmit={handleLogin}
      >
        <label>Enter your email address</label>
        <Input 
          field='email'
          value={formData.email.value}
          onChangeHandler={onValueChange}
          type='text'
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.email.showError}
          validationMessage={emailValidationMessage}
        />
        <label>Enter your password</label>
        <Input 
          field='password'
          value={formData.password.value}
          onChangeHandler={onValueChange}
          type='password'
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.password.showError}
          validationMessage={passwordValidationMessage}
        />
        <div className="buttons">
        <button type="submit"
          disabled={isSubmitButtonDisable}
          className="button-log">
            Login
          </button>
          <Link to='/register'>
          <button className="register-go">
            Register
          </button>
          </Link>          
       </div>
      </form>
      </div>
    </div>
  )
}