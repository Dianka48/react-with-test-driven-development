import { Link } from "react-router-dom";
import logo from "../assets/hoaxify.png";
import { useTranslation } from "react-i18next";
// import { AuthContext } from "../state/AuthContextWrapper";
// import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../api/apiCalls";
import { logoutSuccess } from "../state/authActions";

const NavBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // const auth = useContext(AuthContext);
  const auth = useSelector((store) => store);

  const onClickLogout = async (event) => {
    event.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log("error");
    }

    dispatch(logoutSuccess());
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-light shadow-small">
      <div className="container">
        <Link className="navbar-brand" to="/" title="Home">
          <img src={logo} alt="Hoaxify logo" width="60" />
          Hoaxify
        </Link>
        <ul className="navbar-nav">
          {!auth.isLoggedIn && (
            <>
              <Link className="nav-link" to="/signup">
                {t("signUp")}
              </Link>
              <Link className="nav-link" to="/login">
                {t("login")}
              </Link>
            </>
          )}
          {auth.isLoggedIn && (
            <>
              <Link className="nav-link" to={`/user/${auth.id}`}>
                My Profile
              </Link>
              <a href="/" className="nav-link" onClick={onClickLogout}>
                Logout
              </a>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
