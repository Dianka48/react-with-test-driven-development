import SignUpPage from "./pages/SignUpPage";
import LanguageSelector from "./components/LanguageSelector";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import NavBar from "./components/NavBar";
import { Route } from "react-router-dom";
import ActivationPage from "./pages/ActivationPage";

function App() {
  return (
    <>
      <NavBar />
      <div className="container pt-3">
        <Route path="/" exact component={HomePage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
        {/* <Route path="/login">
          <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
        </Route> */}
        <Route path="/user/:id" component={UserPage} />
        <Route path="/activate/:token" component={ActivationPage} />
        <LanguageSelector text="text prop is set" />
      </div>
    </>
  );
}

export default App;
