import { Link } from "react-router-dom";
import React, { useState } from "react";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleInputEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleInputPassChange(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.handleLogin(email, password).catch(console.log);
  };

  return (
    <section className="page-incoming">
      <form onSubmit={handleSubmit} className="page-incoming__form">
        <h2 className="page-incoming__title">Вход</h2>
        <fieldset className="page-incoming__inputs-container">
          <input
          type="email"
            value={email}
            onChange={handleInputEmailChange}
            className="page-incoming__input page-incoming__input_type_email"
            placeholder="Email"
            required
          ></input>
          <input
            type="password"
            value={password}
            onChange={handleInputPassChange}
            className="page-incoming__input page-incoming__input_type_password"
            placeholder="Пароль"
            required
          ></input>
        </fieldset>
        <button type="submit" className="page-incoming__submit">
          Войти
        </button>
      </form>
    </section>
  );
}
export default Login;
