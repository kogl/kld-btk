import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.componet";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown";

// import { userContext } from "../../context/user.context";
// import { CartContext } from "../../context/cart.context";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";

import { ReactComponent as NavLogo } from "../../assets/crown.svg";
// import { signOutUser } from "../../utils/firebase/firebase.utils";

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoConatiner,
} from "./navigation.styles";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  //   const signOutHandler = async () => {
  //     await signOutUser;
  //     //  setCurrentUser(null)
  //   };


  const signOutUser = () => dispatch(signOutStart())
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
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign In</NavLink>
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
