import {passConfirmationValidationMessage, validatePasswordConfirm} from "../../shared/validators/confirmPass.validator.js";
import { Input } from "./Input.jsx";
import {validateEmail, emailValidationMessage} from "../../shared/validators/email.validator.js";
import {validatePassword, passwordValidationMessage} from "../../shared/validators/password.validation.js";
import {validatePhone, phoneValidationMessage} from "../../shared/validators/phone.validator.js";
import {validateName, nameValidationMessage} from "../../shared/validators/name.validation.js";
import {surnameValidationMessage, validateSurname} from "../../shared/validators/surname.validator.js";
import { useRegister } from "../../shared/hooks/useRegister.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

export const Register = ({ switchAuthHandler }) => {
  const { register, isLoading } = useRegister();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: {
      value: "",
      isValid: false,
      showError: false,
    },

    surname: {
      value: "",
      isValid: false,
      showError: false,
    },

    phone: {
      value: "",
      isValid: false,
      showError: false,
    },

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
    passwordConfirm: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  const onValueChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        value,
      },
    }));
  };

  const handleValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      case "passwordConfirm":
        isValid = validatePasswordConfirm(formData.password.value, value);
        break;
      case "phone":
        isValid = validatePhone(value);
        break;
      case "name":
        isValid = validateName(value);
        break;
      case "surname":
        isValid = validateSurname(value);
        break;
      default:
        break;
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    navigate('/login')
    register(
      formData.email.value,
      formData.password.value,
      formData.name.value,
      formData.surname.value,
      formData.phone.value
    )
  };

  const isSubmitButtonDisable =
    !formData.email.isValid ||
    !formData.name.isValid ||
    !formData.surname.isValid ||
    !formData.password.isValid ||
    !formData.passwordConfirm.isValid ||
    !formData.phone.isValid;

  return (
    <div className="register-container">
      <h1 className="titulo-register">Register</h1>
      <div className="formulario">
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="container-inputs">
            <label>Name</label>
            <Input
              field="name"
              type="text"
              value={formData.name.value}
              onChangeHandler={onValueChange}
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.name.showError}
              validationMessage={nameValidationMessage}
            />
            <label>Surname</label>
            <Input
              field="surname"
              type="text"
              value={formData.surname.value}
              onChangeHandler={onValueChange}
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.surname.showError}
              validationMessage={surnameValidationMessage}
            />
            <label>Email</label>
            <Input
              field="email"
              type="email"
              value={formData.email.value}
              onChangeHandler={onValueChange}
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.email.showError}
              validationMessage={emailValidationMessage}
            />
          </div>
          <div className="container-inputs">
            <label>Phone</label>
            <Input
              field="phone"
              type='text'
              value={formData.phone.value}
              onChangeHandler={onValueChange}
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.phone.showError}
              validationMessage={phoneValidationMessage}
            />
            <label>Password</label>
            <Input
              field="password"
              type="password"
              value={formData.password.value}
              onChangeHandler={onValueChange}
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.password.showError}
              validationMessage={passwordValidationMessage}
            />
            <label>Confirm your password</label>
            <Input
              field="passwordConfirm"
              type="password"
              value={formData.passwordConfirm.value}
              onChangeHandler={onValueChange}
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.passwordConfirm.showError}
              validationMessage={passConfirmationValidationMessage}
            />
          </div>
          <div className="buttons">
            <button type="submit" className="register" disabled={isSubmitButtonDisable}>
              Register
            </button>
            <Link to='/login'>
            <button className="loginButton">
              log in
            </button>
            </Link>
            
          </div>
        </form>
      </div>
    </div>
  );
};