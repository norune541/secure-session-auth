import { useState } from "react";
import { Table, Tag, Button } from "antd";

import { revokeSession } from "../api/revokeSession";
import { ClientError } from "../../../common/error/ClientError";
import { useNotificationError } from "../../../common/hooks/useNotificationError";
import type { AllSessionsResponse } from "@repo/types";

export function SessionsComponent({
  content,
}: {
  content: AllSessionsResponse;
}) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { handleError } = useNotificationError();

  const handleRevoke = async (userId: string, sessionId: string) => {
    setLoadingId(sessionId);
    try {
      await revokeSession(userId, sessionId);
    } catch (err) {
      if (err instanceof ClientError) {
        handleError(err);
      }
    } finally {
      setLoadingId(null);

      window.location.reload();
    }
  };

  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const unsortedDataSource = content.sessions.map((s, index) => ({
    key: index,
    device: s.device,
    status: s.revoked ? "Inactive" : "Active",
    created: formatter.format(new Date(s.createdAt)),
    updated: formatter.format(new Date(s.updatedAt)),
    expires: formatter.format(new Date(s.expiresAt)),
    current: content.currentSession === s.id,
    revoke:
      content.currentSession === s.id || s.revoked === true ? null : (
        <Button
          onClick={() => handleRevoke(s.userId, s.id)}
          loading={loadingId === s.id}
          style={{ width: "max-content" }}
        >
          Terminate
        </Button>
      ),
  }));

  const dataSource = [...unsortedDataSource].sort(
    (a, b) => Number(b.current) - Number(a.current),
  );
  const columns = [
    {
      title: "Device",
      dataIndex: "device",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) =>
        status === "Active" ? (
          <Tag color="green">{status}</Tag>
        ) : (
          <Tag color="red">{status}</Tag>
        ),
    },
    {
      title: "Created at",
      dataIndex: "created",
    },
    {
      title: "Last used at",
      dataIndex: "updated",
    },
    {
      title: "Expires at",
      dataIndex: "expires",
    },
    {
      title: "Current session",
      dataIndex: "current",
      render: (current) =>
        current ? <Tag color="green">This device</Tag> : null,
    },
    {
      title: "Revoke",
      dataIndex: "revoke",
    },
  ];

  return (
    <Table
      pagination={{ defaultPageSize: 5 }}
      dataSource={dataSource}
      columns={columns}
    />
  );
}
