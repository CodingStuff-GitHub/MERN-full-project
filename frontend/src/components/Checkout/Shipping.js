import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../state_management/checkout/shippingSlice";
import { Country, State } from "country-state-city";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { numberOfItemsinCart, grandTotal } = useSelector(
    (state) => state.cartStore
  );
  const [countries] = useState({
    options: Country.getAllCountries(),
    getOptionLabel: (option) => option.name,
  });
  const [allStates, setAllStates] = useState({
    options: [],
  });

  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, SetPincode] = useState("");
  const [phoneNumber, SetPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState("");

  const HandleProceedingConfirm = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      phoneNumber === "" ||
      pincode === "" ||
      countryName === "Country"
    ) {
      setMessage("Shipping Details are not correct. Please try again.");
      setMessageOpen(true);
      return false;
    }
    const data = {
      firstName,
      lastName,
      address,
      stateName,
      countryName,
      pincode,
      phoneNumber,
    };
    dispatch(saveShippingInfo(data));
    return true;
  };

  const populateStates = (isoCode) => {
    setAllStates({
      options: State.getStatesOfCountry(isoCode),
      getOptionLabel: (option) => option.name,
    });
  };

  return (
    <>
      <div className="overflow-y-hidden">
        <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
          <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
            {/* Shipping Form */}
            <div className="flex w-full  flex-col justify-start items-start">
              <p className="pt-10 text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Check out
              </p>
              <div className="mt-2">
                <Link
                  to="/cart"
                  className="text-base leading-4 underline  hover:text-gray-800 text-gray-600"
                >
                  Back to my cart
                </Link>
              </div>
              <div className="mt-12">
                <p className="text-xl font-semibold leading-5 text-gray-800">
                  Shipping Details
                </p>
              </div>{" "}
              <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                {/* First Name */}
                <input
                  required
                  className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                {/* Last Name */}
                <input
                  className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                {/* Address Name */}
                <input
                  className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                  type="text"
                  placeholder="Address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                {/* Country and City */}
                <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                  {/* Country*/}
                  <div className="relative w-full">
                    <Autocomplete
                      disablePortal
                      disableClearable
                      value={countryName.name}
                      onChange={(_event, newCountry) => {
                        setCountryName(newCountry.name);
                        setCountryCode(newCountry.isoCode);
                        populateStates(newCountry.isoCode);
                        setStateName("");
                      }}
                      {...countries}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Country" />
                      )}
                    />
                  </div>

                  {/* State*/}
                  <div className="relative w-full">
                    <Autocomplete
                      disabled={!countryCode}
                      disablePortal
                      disableClearable
                      value={stateName.name}
                      onChange={(_event, newState) => {
                        setStateName(newState.name);
                      }}
                      {...allStates}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="State" />
                      )}
                    />
                  </div>
                </div>
                {/* PinCode*/}
                <input
                  className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3   w-full"
                  type="text"
                  placeholder="Pincode"
                  onChange={(e) => {
                    SetPincode(e.target.value);
                  }}
                />
                {/* Phone Number */}
                <input
                  className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full"
                  type="text"
                  placeholder="Phone Number"
                  onChange={(e) => {
                    SetPhoneNumber(e.target.value);
                  }}
                />
              </div>
              {/* Message from server */}
              {messageOpen && message ? (
                <div
                  className=" mt-5 flex text-sm text-red-700 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">{message}</span>
                  </div>
                </div>
              ) : null}
              <button
                onClick={() => {
                  if (HandleProceedingConfirm()) {
                    navigate("/checkout/confirm");
                  }
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none focus:ring-offset-2 mt-8 text-base font-medium focus:ring-ocus:ring-gray-800 leading-4 py-4 w-full md:w-4/12 lg:w-full"
              >
                Proceed to Confirm Order
              </button>
            </div>
            {/* Order Summary */}
            <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
              <div>
                <h1 className="text-2xl font-semibold leading-6 text-gray-800">
                  Order Summary
                </h1>
              </div>
              <div className="flex mt-7 flex-col items-end w-full space-y-6">
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg leading-4 text-gray-600">Total items</p>
                  <p className="text-lg font-semibold leading-4 text-gray-600">
                    {numberOfItemsinCart}
                  </p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg leading-4 text-gray-600">
                    Total Charges
                  </p>
                  <p className="text-lg font-semibold leading-4 text-gray-600">
                    ₹{grandTotal}
                  </p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg leading-4 text-gray-600">
                    Shipping charges
                  </p>
                  <p className="text-lg font-semibold leading-4 text-gray-600">
                    FREE
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full items-center mt-32">
                <p className="text-xl font-semibold leading-4 text-gray-800">
                  Grand Total{" "}
                </p>
                <p className="text-lg font-semibold leading-4 text-gray-800">
                  ₹{grandTotal}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Shipping;
