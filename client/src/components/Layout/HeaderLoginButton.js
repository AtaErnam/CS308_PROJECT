import LoginIcon from "../Login/LoginIcon";
import classes from "./HeaderLoginButton.module.css";

const HeaderLoginButton = ({onClick}) => {
  return (
    <button className={classes.button} onClick={onClick}> 
      <span className={classes.icon}>
        <LoginIcon />
      </span>
      <span>Login</span> 
      {/* <span className={classes.badge}>3</span> */}
    </button>
  );
};

export default HeaderLoginButton;
