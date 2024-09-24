import { ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { mainTheme } from "./common/theme/theme";
import { HomePage } from "./flows/home/homePage";
import { LandingPage } from "./flows/landing/landing";

const App = () => {
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
