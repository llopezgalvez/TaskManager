import logo from "../assets/img/Icono.png";

export const Logo = ({ text }) => {
  return (
    <div className="auth-form-logo-container">
      <img src={logo} alt="Escudo" />
      <span>&nbsp;&nbsp;{text}</span>
    </div>
  );
};
