import { useState } from "react";
import { SignupCredentials } from "../components/SignupCredentials";
import { SignupProfile } from "../components/SignupProfile";

export function SignupPage() {
  const [step, setStep] = useState(1);

  const nextStep = async () => {
    setStep(2);
  };

  const previousStep = async () => {
    setStep(1);
  };

  return (
    <>
      {step === 1 && <SignupCredentials step={nextStep} />}
      {step === 2 && <SignupProfile step={previousStep} />}
    </>
  );
}
