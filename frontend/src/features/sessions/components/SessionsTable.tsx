import { Table, Tag, Button } from "antd";
import { useRevokeSession } from "../hooks/useRevokeSession";
import type { AllSessionsResponse } from "@repo/types";

export function SessionsTable({ content }: { content: AllSessionsResponse }) {
  const { loadingId, handleRevoke } = useRevokeSession();
  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const unsortedDataSource = content.sessions.map((s) => ({
    key: s.id,
    device: s.device,
    status: "Active",
    created: formatter.format(new Date(s.createdAt)),
    updated: formatter.format(new Date(s.updatedAt)),
    expires: formatter.format(new Date(s.expiresAt)),
    current: s.id === content.currentSession,
    revoke:
      s.id === content.currentSession ? null : (
        <Button
          onClick={() => handleRevoke(s.id)}
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
