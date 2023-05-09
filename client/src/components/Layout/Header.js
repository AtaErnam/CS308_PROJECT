import { Fragment } from "react";
import electroImage from "../../assets/electro-su.png";
import classes from "./header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import HeaderLoginButton from "./HeaderLoginButton";
import { Link } from "react-router-dom";


const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <HeaderLoginButton onClick={props.onShowLogin} />
        <Link to="/">
        <h1> Electro-SU </h1>
        </Link>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={electroImage} alt="ai_image" />
      </div>
    </Fragment>
  );
};
export default Header;
