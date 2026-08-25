import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCurrentUserProfile } from "../../features/profile/api/user";
import { ClientError } from "../error/ClientError";

export function ProtectedRoute() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(true);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const checkAuthorization = async () => {
      try {
        await getCurrentUserProfile();
      } catch (err) {
        if (err instanceof ClientError) {
          if (err.type === "JWT_MALFORMED" || err.type === "API_ERROR")
            localStorage.removeItem("accessToken");
          setIsAuthorized(false);
        }
      }
    };
    checkAuthorization();
  }, [navigate, token]);

  if (!isAuthorized) {
    navigate("/login");
  }

  return <Outlet></Outlet>;
}
