import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react";

import "./navigation.styles.scss";
import { ReactComponent as NavLogo } from "../../assets/crown.svg";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <NavLogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            bajs
          </Link>
          <Link className="nav-link" to="/auth">
            Sign In
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
