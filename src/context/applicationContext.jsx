import React from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  // set the userData (username and token) to cookies
  const setSession = (userData) => {
    setCookie("userData", userData, {
      path: "/",
      maxAge: 900, //15minutes
    });
  };

  // get the userData (username and token) from cookies
  const getSession = () => {
    console.log(cookies)
    const userData = cookies.userData || null;
    return userData;
  };

  // remove the user data (username and token) from the cookies
  const logout = () => {
    removeCookie("userData", { path: "/" });
  };

  return (
    <AppContext.Provider
      value={{
        setSession,
        getSession,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext };
export default AppContextProvider;
