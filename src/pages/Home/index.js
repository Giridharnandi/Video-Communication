import React, { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import './ind.css';
import Terms from "./Terms"



const HomePage = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const handleJoinRoom = useCallback(() => {
    navigate(`/room/${value}`)
  }, [navigate, value]);
  const glop = "<GlopLink />";

  const [randomNumber, setRandomNumber] = useState(null);

  const handleGenerateRandomNumber = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomCode = "";
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters.charAt(randomIndex);
  }
  setRandomNumber(randomCode);
  };

  const handleCopyRandomNumber = async () => {
    if (randomNumber !== null) {
      try {
        await navigator.clipboard.writeText(randomNumber.toString());
        alert("Secure Code copied to clipboard: " + randomNumber);
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    }
  };
  const [showTerms, setShowTerms] = useState(false);
  

  

  return (
    <div className="input__container">
      <h2 onClick={() => window.location.href = "https://gloplink.netlify.app"} className="gloplink__home">{glop}</h2>
      <label className="input__label">Room code</label>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter/Create Room code"
        required
      />
      <p className="input__description">What do you want to call your Room?</p>
      <div style={{display: "flex", gap: "2px"}}>
      <button onClick={handleJoinRoom} className="button">Join</button>
      <button id="generateButton" onClick={handleGenerateRandomNumber} className="button">Generate Secure Code</button>
      </div>
      <p className="input__description" style={{fontSize: "12px"}}>Generated Secure Code: <span id="randomNumber"  onClick={handleCopyRandomNumber} style={{cursor: "pointer"}} className="span_terms">{randomNumber}</span></p>
      
      <p>
    <label for="termsCheckbox">
      <input type="checkbox" id="termsCheckbox" required />
      Yes, I agree to the <span onClick={() => setShowTerms(true)} className="span_terms">terms and conditions.</span>
    </label>
  </p>
  {showTerms && <Terms onClose={() => setShowTerms(false)} />}



    </div>
  );
};

export default HomePage;

