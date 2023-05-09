import LoginIcon from "../Login/LoginIcon";
import { Link } from "react-router-dom";
import classes from "./HeaderLoginButton.module.css";

const HeaderLoginButton = ({onClick}) => {
  return (
    <Link to="/login">
    <button className={classes.button} onClick={onClick}> 
      <span className={classes.icon}>
        <LoginIcon />
      </span>
      <span>Login</span> 
      {/* <span className={classes.badge}>3</span> */}
    </button>
    </Link>
  );
};

export default HeaderLoginButton;
