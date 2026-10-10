import { Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

export function SessionsNavigation() {
  const location = useLocation();

  const selectedKey =
    location.pathname === "/sessions/activity" ? "activity" : "sessions";

  return (
    <>
      <Menu
        mode="horizontal"
        className="sessions-navigation"
        style={{
          margin: "30px 0 15px 25px",
        }}
        selectedKeys={[selectedKey]}
        items={[
          {
            label: <Link to="/sessions">Sessions</Link>,
            key: "sessions",
          },
          {
            label: <Link to="/sessions/activity">Activity logs</Link>,
            key: "activity",
          },
        ]}
      />

      <Outlet />
    </>
  );
}
