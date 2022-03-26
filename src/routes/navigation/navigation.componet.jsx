import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as NavLogo } from "../../assets/crown.svg";
import { userContext } from "../../context/user.context";

import { signOutUser } from '../../utils/firebase/firebase.utils'

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  // console.log('du aer user:',currentUser);

	const signOutHandler = async ()=>{
		 await signOutUser
		 setCurrentUser(null)

	}	
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <NavLogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}> SIGN OUT</span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign In
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
