import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

import * as Auth from "../../utils/Auth.jsx";
function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("123");

  function handleInputEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleInputPassChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegister(password, email).catch(setMessage);
  }
  return (
    <section className="page-incoming">
      <form className="page-incoming__form" onSubmit={handleSubmit}>
        <h2 className="page-incoming__title">Регистрация</h2>
        <fieldset className="page-incoming__inputs-container">
          <input
            type="email"
            className="page-incoming__input page-incoming__input_type_email"
            placeholder="Email"
            value={email}
            onChange={handleInputEmailChange}
            required
          ></input>

          <input
            type="password"
            className="page-incoming__input page-incoming__input_type_password"
            placeholder="Пароль"
            value={password}
            onChange={handleInputPassChange}
            required
          />
        </fieldset>
        <button
          type="submit"
          className="page-incoming__submit"
          value="Зарегистрироваться"
        >
          Зарегистрироваться
        </button>
      </form>

      <Link to="sign-in" className="page-incoming__entry">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}
export default Register;
