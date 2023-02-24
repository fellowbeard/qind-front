import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'


const LandingPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const handleClick = () => {
    setShowSignUp(true)
    setShowSignIn(false)
  };
  console.log(showSignUp)
  return (
    <div>
      <h1>Welcome to Qind</h1>
      { showSignIn && <SignIn event={handleClick} />}
      { showSignUp && <SignUp />}
    </div>
  )
}

export default LandingPage