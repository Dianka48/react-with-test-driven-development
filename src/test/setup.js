import { render } from "@testing-library/react";
// import AuthContextWrapper from "../state/AuthContextWrapper";
import { BrowserRouter as Router } from "react-router-dom";
import LanguageSelector from "../components/LanguageSelector";
import { Provider } from "react-redux";
import createAppStore from "../state/store";

const RootWrapper = ({ children }) => {
  return (
    // <AuthContextWrapper>
    <Provider store={createAppStore()}>
      <Router>
        {children}
        <LanguageSelector />
      </Router>
    </Provider>

    // </AuthContextWrapper>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: RootWrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
