import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ConfigProvider, App as AntdApp } from "antd";

import { ProtectedRoute } from "./common/components/ProtectedRoutes";

import { MeLayout } from "./features/profile/pages/MeLayout";

import { MePage } from "./features/profile/pages/MePage";

import { UserPage } from "./features/profile/pages/ProfilePage";

import { SecurityProfile } from "./features/profile/pages/SecurityProfile";

import { LoginPage } from "./features/auth/pages/LoginPage";

import { SignupPage } from "./features/auth/pages/SignupPage";

import { SessionsNavigation } from "./features/sessions/pages/DashboardPage";

import { SessionsPage } from "./features/sessions/pages/SessionsPage";

import { ActivityPage } from "./features/sessions/pages/ActivityPage";

import { RevokeSessionPage } from "./features/sessions/pages/RevokeSessionPage";

import { ActivityDetailsPage } from "./features/sessions/pages/ActivityDetailsPage";

export const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#ea580c",
        colorLink: "#ea580c",
        colorLinkHover: "#c2410c",
        colorBgLayout: "#ffffff",
        borderRadius: 18,
      },

      components: {
        Layout: {
          headerBg: "#ffffff",
        },

        Button: {
          colorPrimary: "#ea580c",
          colorPrimaryHover: "#c2410c",
          colorPrimaryBorderHover: "#c2410c",
          borderRadius: 7,
        },

        Input: {
          borderRadius: 7,
          paddingBlock: 8,
          colorBgContainer: "#ffffff",
        },

        Typography: {
          colorTextHeading: "#ea580c",
        },

        Menu: {
          itemBorderRadius: 7,
          itemSelectedBg: "#fff7ed",
          itemSelectedColor: "#ea580c",
        },
      },
    }}
  >
    <AntdApp
      notification={{
        placement: "bottom",

        duration: 4,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MeLayout />}>
              <Route index element={<Navigate to="/profile" replace />} />
              <Route path="profile" element={<MePage />}>
                <Route index element={<UserPage />} />
                <Route path="security" element={<SecurityProfile />} />
              </Route>
              <Route path="sessions" element={<SessionsNavigation />}>
                <Route index element={<SessionsPage />} />
                <Route path="activity" element={<ActivityPage />} />
              </Route>
              <Route
                path="sessions/:sessionId"
                element={<RevokeSessionPage />}
              />
              <Route
                path="sessions/activity/:activityId"
                element={<ActivityDetailsPage />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AntdApp>
  </ConfigProvider>
);
