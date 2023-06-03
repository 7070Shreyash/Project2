import { BrowserRouter , Navigate , Routes , Route } from "react-router-dom";
import homePage from "scenes/homePage";
import firstPage from "scenes/firstPage";
import loginPage from "scenes/loginPage";
import navbar from "scenes/navbar";
import profilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";


function App() {

  const mode = useSelector((state) => state.mode) ;
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
   <div className='app'>
    <BrowserRouter>
    <ThemeProvider theme = {theme}>
      <CssBaseline/> 
      {/* to reset the css */}
      <Routes>
        <Route path = "/" element = {<homePage/>} />
        <Route path = "/login" element = {<loginPage/>} />
        <Route path="/first" element = {isAuth ? <firstPage/> : <Navigate to = "/"/>} />
        <Route path = "/first/:userId" element = {isAuth ? <profilePage/> : <Navigate to = "/"/>}/>
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
   </div>
  );
}

export default App;
