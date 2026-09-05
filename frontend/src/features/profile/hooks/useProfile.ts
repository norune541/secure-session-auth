import { useState, useEffect } from "react";
import { getCurrentUserProfile } from "../api/user";
import { ClientError } from "../../../common/error/ClientError";
import { useNotificationError } from "../../../common/hooks/useNotificationError";
import type { User } from "@repo/types";

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { handleError } = useNotificationError();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setUser(await getCurrentUserProfile());
      } catch (err) {
        if (err instanceof ClientError) {
          handleError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return {
    user,
    loading,
  };
};
