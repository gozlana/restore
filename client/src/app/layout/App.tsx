import { useState } from "react";
import { CssBaseline, Box, Container, createTheme, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function App() {
 
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: (paletteType === 'light') ? '#121212' : '#eaeaea'
      }
    }
  });

  const toggleDarkMode = () => {
     setDarkMode(!darkMode);
  }

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode
            ? 'radial-gradient(circle, #1e3aBa, #111B27)'
            : 'radial-gradient(circle, #baecf9, #f0f9ff)',
          py: 4
        }}
      >
        <Container maxWidth='xl' sx={{ mt: 13 }}>
         <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
