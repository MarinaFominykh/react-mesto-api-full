import logo from "../../images/logo.svg";
import { Switch, Route, Link } from "react-router-dom";

function Header({ email, handleSignOut }) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Лого" />
      <div className="header__incoming">
        <p className="header__incoming-email">{email}</p>
        <Switch>
          <Route path="/sign-in">
            <Link to="sign-up" style={{ textDecoration: "none" }}>
              <p className="header__incoming-text">Регистрация</p>
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link to="sign-in" style={{ textDecoration: "none" }}>
              <p className="header__incoming-text">Войти</p>
            </Link>
          </Route>
          <Route path="/">
            <p onClick={handleSignOut} className="header__incoming-text">
              Выйти
            </p>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
