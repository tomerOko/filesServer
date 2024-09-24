import { ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { mainTheme } from "./common/theme/theme";
import { HomePage } from "./flows/home/homePage";
import { LandingPage } from "./flows/landing/landing";
import { NavigatorPage } from "./flows/signup/page/navigatorPage";

const App = () => {
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<NavigatorPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
