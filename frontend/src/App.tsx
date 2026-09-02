import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";

import { ProtectedRoute } from "./common/components/ProtectedRoutes";
import { MeLayout } from "./features/profile/pages/MeLayout";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { SignupPage } from "./features/auth/pages/SignupPage";
import { UserPage } from "./features/profile/pages/ProfilePage";
import { SessionsPage } from "./features/sessions/pages/SessionsPage";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorLink: "#100068",
          colorLinkHover: "#4929ff",
          colorBgLayout: "#ffffff",
          borderRadius: 18,
        },
        components: {
          Button: {
            colorPrimary: "#100068",
            colorPrimaryHover: "#4929ff",
            colorPrimaryBorderHover: "#4929ff",
          },
          Input: {
            borderRadius: 18,
            paddingBlock: 8,
            colorBgContainer: "#f8f8f8",
          },
          Typography: {
            colorTextHeading: "#4929ff",
          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MeLayout />}>
              <Route index element={<UserPage />}></Route>
              <Route path="sessions" element={<SessionsPage />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}
