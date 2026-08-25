import { useMediaQuery } from "react-responsive";
import { MobileLoginPage } from "./MobileLoginPage";
import { DesktopLoginPage } from "./DesktopLoginPage";

export function LoginPage() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {isMobile ? (
        <MobileLoginPage></MobileLoginPage>
      ) : (
        <DesktopLoginPage></DesktopLoginPage>
      )}
    </>
  );
}
