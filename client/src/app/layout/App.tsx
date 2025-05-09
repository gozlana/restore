import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { CssBaseline, Box, Container, createTheme, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
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

  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, []);

  // const addProduct = () => {
  //   setProducts(prevState => [...prevState,
  //   { 
  //     id: prevState.length + 1,
  //     name: 'Product' + (prevState.length + 1), 
  //     price: (prevState.length * 100) + 100,
  //     quantityInStock: 34,
  //     description: 'test',
  //     pictureUrl: 'https://picsum.photo/200',
  //     type: 'test',
  //     brand: 'test'
  //   }])
  // };

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
          <Catalog products={products} />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
