import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.componet";
import { ReactComponent as NavLogo } from "../../assets/crown.svg";

import { userContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import {NavigationContainer, NavLinks, NavLink, LogoConatiner} from  "./navigation.styles";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown";

const Navigation = () => {
  const { currentUser } = useContext(userContext);
  const { isCartOpen } = useContext(CartContext);

//   const signOutHandler = async () => {
//     await signOutUser;
//     //  setCurrentUser(null)
//   };
  return (
    <Fragment>
      <NavigationContainer>
        <LogoConatiner to="/">
          <NavLogo />
        </LogoConatiner>
        <NavLinks>
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">
              Sign In
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
