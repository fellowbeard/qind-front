import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'


const LandingPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignOut, setShowSignOut] = useState(false);
  const handleClick = () => {
    setShowSignUp(true)
    setShowSignIn(false)
  };
  const signOutButton = () => {
    setShowSignIn(false)
    setShowSignOut(true)
  }
  const signOut = () => {
    console.log("sign out")
    setShowSignOut(false)
    setShowSignIn(true)
    window.localStorage.removeItem('token')
  }
  console.log(showSignUp)
  return (
    <div>
      <h1>Welcome to Qind</h1>
      { showSignIn && <SignIn event={handleClick} event2={signOutButton} />}
      { showSignUp && <SignUp event2={signOutButton} event3={setShowSignUp} />}
      { showSignOut && <button onClick={signOut} type="button">Sign Out</button>}
    </div>
  )
}

export default LandingPage