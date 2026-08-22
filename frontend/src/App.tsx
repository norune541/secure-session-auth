import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";

import { ProtectedRoute } from "./common/components/ProtectedRoutes";
import { MeLayout } from "./pages/me/MeLayout";
import { LoginPage } from "./pages/login/LoginPage";
import { UserPage } from "./pages/me/ProfilePage";
import { SessionsPage } from "./pages/me/SessionsPage";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorLink: "#100068",
          colorLinkHover: "#4929ff",
          colorBgLayout: "#f0f0f0",
        },
        components: {
          Button: {
            colorPrimary: "#100068",
            colorPrimaryHover: "#4929ff",
            colorPrimaryBorderHover: "#4929ff",
          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
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
