import { useState } from "react";
import { SignupCredentials } from "../components/SignupCredentials";
import { SignupProfile } from "../components/SignupProfile";
import { useSignup } from "../hooks/useSignup";
import type { Login } from "../types/Login";
import type { Signup } from "../types/Signup";

export function SignupPage() {
  const [step, setStep] = useState(1);
  const [allValues, setValues] = useState({});
  const { executeSignup } = useSignup();

  // Reuse the Login type because the first signup step contains
  // the same credentials fields as the login form.
  const nextStep = async (values: Login) => {
    setValues((prev) => ({
      ...prev,
      ...values,
    }));
    setStep(2);
  };

  const previousStep = async () => {
    setStep(1);
  };

  const finish = async (values: Signup) => {
    const finalValues = {
      ...allValues,
      ...values,
    };

    await executeSignup(finalValues);
  };

  return (
    <>
      {step === 1 && <SignupCredentials step={nextStep} />}
      {step === 2 && <SignupProfile step={previousStep} finish={finish} />}
    </>
  );
}
