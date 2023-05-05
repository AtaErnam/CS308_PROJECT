import { Fragment } from "react";
import electroImage from '../../assets/electro-su.png';
import classes from './header.module.css';
import HeaderCartButton from "./HeaderCartButton";
import HeaderLoginButton from "./HeaderLoginButton";
import HeaderSignupButton from "./HeaderSignupButton";


const Header = (props) => {
  return <Fragment>
    <header className={classes.header}>
       
        
        <HeaderLoginButton onClick={props.onShowLogin}/>
        <HeaderSignupButton onClick={props.onShowSignup}/>
        <h1> Electro-SU </h1>
        <HeaderCartButton onClick={props.onShowCart}/>
    </header>
    <div className={classes['main-image']}>
        <img src={electroImage} alt="ai_image"/>
    </div>

  </Fragment>
};
export default Header;
