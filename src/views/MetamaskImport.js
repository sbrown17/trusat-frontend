import React, { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useAuthState } from "../auth/auth-context";
import StepOne from "../user/components/StepOne";
import StepTwo from "../user/components/StepTwo";
import StepThree from "../user/components/StepThree";
import StepFour from "../user/components/StepFour";
import StepFive from "../user/components/StepFive";

export default function MetamaskImport() {
  const [step, setStep] = useState(1);
  const [privateKey, setPrivateKey] = useState("");
  const { authType, userAddress } = useAuthState();

  console.log(userAddress);

  useEffect(() => {
    if (authType === "metamask") {
      setStep(5);
    }
  }, [authType]);

  return userAddress ? (
    <section className="metamask-import__wrapper">
      <NavLink className="app__nav-link" to="/settings">
        <p className="metamask-import__link-to-account-text">
          Account Settings
        </p>
      </NavLink>
      <h1 className="metamask-import__main-header">Connect to MetaMask</h1>
      <StepOne step={step} setStep={setStep} />
      <StepTwo step={step} setStep={setStep} setPrivateKey={setPrivateKey} />
      <StepThree step={step} setStep={setStep} privateKey={privateKey} />
      <StepFour step={step} setStep={setStep} />
      <StepFive step={step} />
    </section>
  ) : (
    <Redirect
      to={{
        pathname: "/login"
      }}
    />
  );
}
