import { Skeleton } from "antd";
import { ProfileComponent } from "../components/ProfileComponent";
import { useProfile } from "../hooks/useCurrentUser";

export function UserPage() {
  const { user, loading } = useProfile();
  return loading ? <Skeleton /> : user && <ProfileComponent content={user} />;
}
