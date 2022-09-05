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
import Account from "./components/User/Account";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import ResetPassword from "./components/User/ResetPassword";
import ForgotPassword from "./components/User/ForgotPassword";
import SetNewPassword from "./components/User/SetNewPassword";
import Cart from "./components/Cart/Cart";
import ProgressSteps from "./components/layout/ProgressSteps/ProgressSteps";
import Shipping from "./components/Checkout/Shipping";
import Confirm from "./components/Checkout/Confirm";
import Contact from "./components/Contact/Contact";
import Payment from "./components/Checkout/Payment";

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
          path="/contact"
          element={
            <>
              <NavBar />
              <Contact />
              <Footer />
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
        <Route
          path="/forgot"
          element={
            <>
              <ForgotPassword />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Cart />
            </>
          }
        />
        <Route
          path="/setNewPassword/:token"
          element={
            <>
              <SetNewPassword />
            </>
          }
        />
        <Route path="/account" element={<ProtectedRoute />}>
          <Route
            path="/account"
            element={
              <>
                <NavBar />
                <Account />
                <Footer />
              </>
            }
          />
          <Route
            path="/account/update"
            element={
              <>
                <NavBar />
                <UpdateProfile />
                <Footer />
              </>
            }
          />
          <Route
            path="/account/resetPassword"
            element={
              <>
                <NavBar />
                <ResetPassword />
                <Footer />
              </>
            }
          />
        </Route>
        <Route
          path="/checkout"
          element={<ProtectedRoute redirectTo={"checkout/shipping"} />}
        >
          <Route
            path="/checkout/shipping"
            element={
              <>
                <NavBar />
                <ProgressSteps index={0} />
                <Shipping />
                <Footer />
              </>
            }
          />
          <Route
            path="/checkout/confirm"
            element={
              <>
                <NavBar />
                <ProgressSteps index={1} />
                <Confirm />
                <Footer />
              </>
            }
          />
          <Route
            path="/checkout/payment"
            element={
              <>
                <NavBar />
                <ProgressSteps index={2} />
                <Payment />
                <Footer />
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
