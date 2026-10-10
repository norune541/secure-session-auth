import { Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./MePage.css";

export function MePage() {
  const location = useLocation();

  const selectedKey =
    location.pathname === "/profile/security" ? "security" : "personal";

  return (
    <div className="me-page">
      <div className="me-page__header" />

      <div className="me-page__card">
        <Menu
          mode="horizontal"
          className="me-page__menu"
          selectedKeys={[selectedKey]}
          items={[
            {
              label: <Link to="/profile">Personal Information</Link>,
              key: "personal",
            },
            {
              label: <Link to="/profile/security">Security</Link>,
              key: "security",
            },
          ]}
        />

        <div className="me-page__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
