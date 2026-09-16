import { Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

export function DashboardPage() {
  return (
    <>
      <Menu
        style={{ border: 0, marginBottom: 20 }}

        mode="horizontal"
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
