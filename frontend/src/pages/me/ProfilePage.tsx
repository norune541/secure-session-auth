import { useState, useEffect } from "react";
import { message, Skeleton } from "antd";

import { getCurrentUserProfile } from "../../api/user";
import { ProfileComponent } from "../../common/components/profileComponent";
import { ClientError } from "../../common/error/ClientError";
import type { User } from "@repo/types";

export function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiMessage, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setUser(await getCurrentUserProfile());
      } catch (err) {
        if (err instanceof ClientError) {
          apiMessage.open({
            type: "error",
            content: err.message,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [apiMessage]);

  return (
    <>
      {contextHolder}
      {loading ? <Skeleton /> : user && <ProfileComponent content={user} />}
    </>
  );
}
