import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import NavBar from "./components/layout/NavBar/NavBar";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Products from "./components/Products/Products";
import Search from "./components/Search/Search";
import LoginSignup from "./components/User/LoginSignup";
import { useDispatch } from "react-redux";
import { fetchUserLoad } from "./state_management/user/userSlice";
import { useCookies } from "react-cookie";

function App() {
  const dispatch = useDispatch();
  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.token) {
      dispatch(fetchUserLoad());
    }
  }, [cookies.token, dispatch]);

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
        <Route
          path="/account"
          element={
            <>
              <NavBar />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <>Contact Page</>
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <>About Page</>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
