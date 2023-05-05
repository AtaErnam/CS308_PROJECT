import classes from "./HeaderLoginButton.module.css";

const HeaderSignupButton = ({onClick}) => {
  return (
    <button className={classes.button} onClick={onClick}> 
      <span className={classes.icon}>
        
      </span>
      <span>Signup</span>       
    </button>
  );
};

export default HeaderSignupButton;
