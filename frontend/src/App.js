import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import NavBar from "./components/layout/NavBar/NavBar";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Products from "./components/Products/Products";
import Search from "./components/Search/Search";
import LoginSignup from "./components/User/LoginSignup";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={
            <>
              <NavBar />
              <ProductDetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <NavBar />
              <Products />
              <Footer />
            </>
          }
        />
        <Route
          path="/search"
          element={
            <>
              <NavBar />
              <Search />
              <Footer />
            </>
          }
        />
        <Route
          path="/sign"
          element={
            <>
              <LoginSignup />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
