import React, { useState } from 'react';
import HeaderLoginButton from '../Layout/HeaderLoginButton';
import HeaderSignupButton from '../Layout/HeaderSignupButton';
import LoginModal from '../UI/LoginModal';
import SignupModal from '../UI/SignupModal';

const LoginSignup = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleLoginButtonClick = () => {
    setIsLoginModalOpen(true);
  }

  const handleSignupButtonClick = () => {
    setIsSignupModalOpen(true);
  }

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  }

  const handleSignupModalClose = () => {
    setIsSignupModalOpen(false);
  }

  return (
    <div>
      <HeaderLoginButton onClick={handleLoginButtonClick} />
      <HeaderSignupButton onClick={handleSignupButtonClick} />
      {isLoginModalOpen && <LoginModal onClose={handleLoginModalClose} />}
      {isSignupModalOpen && <SignupModal onClose={handleSignupModalClose} />}
    </div>
  );
}

export default LoginSignup;