import { Skeleton } from "antd";
import { ProfileComponent } from "../components/ProfileComponent";
import { useProfile } from "../hooks/useProfile";

export function UserPage() {
  const { user, loading, contextHolder } = useProfile();
  return (
    <>
      {contextHolder}
      {loading ? <Skeleton /> : user && <ProfileComponent content={user} />}
    </>
  );
}
