import { Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

export function SessionsNavigation() {
  return (
    <>
      <Menu
        mode="horizontal"
        style={{
          marginTop: 6,
          marginLeft: 25,
          marginBottom: 15,
        }}
        defaultSelectedKeys={["sessions"]}
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
