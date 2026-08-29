import { useState } from "react";
import { SignupCredentials } from "../components/SignupCredentials";
import { SignupProfile } from "../components/SignupProfile";

export function SignupPage() {
  const [step, setStep] = useState(1);
  const [allValues, setValues] = useState({});

  const nextStep = async (values) => {
    setValues((prev) => ({
      ...prev,
      ...values,
    }));
    setStep(2);
  };

  const previousStep = async () => {
    setStep(1);
  };

  const finish = async (values) => {
    const finalValues = {
      ...allValues,
      ...values,
    };
    console.log(finalValues);
  };

  return (
    <>
      {step === 1 && <SignupCredentials step={nextStep} />}
      {step === 2 && <SignupProfile step={previousStep} finish={finish} />}
    </>
  );
}
