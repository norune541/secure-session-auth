import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Empty, Flex, Grid, Modal, Select, Table, Tag, Typography } from "antd";

import { DeviceIcon } from "../items/DeviceIcon";
import { PanelDeviceIcon } from "../items/PanelDeviceIcon";
import { RevokeSessionModal } from "../items/RevokeSessionModal";

import type { AllSessionsResponse } from "@repo/types";

import "./SessionsList.css";

const { Title, Text } = Typography;

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

function FilterIcon({
  size = 16,
  color = "#6B7280",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

interface SessionsListProps {
  content: AllSessionsResponse;
}

export function SessionsList({ content }: SessionsListProps) {
  const navigate = useNavigate();
  const { md } = Grid.useBreakpoint();

  const isDesktop = Boolean(md);

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [selectedDevice, setSelectedDevice] = useState<string>("ALL");

  const availableDevices = useMemo(() => {
    const devicesSet = new Set(content.sessions.map((s) => s.device));
    const uniqueDevices = Array.from(devicesSet).map((device) => ({
      label: device,
      value: device,
    }));

    return [{ label: "All devices", value: "ALL" }, ...uniqueDevices];
  }, [content.sessions]);

  const sessions = useMemo(() => {
    return [...content.sessions]
      .filter(
        (session) =>
          selectedDevice === "ALL" || session.device === selectedDevice,
      )
      .sort((first, second) => {
        const firstIsCurrent = first.id === content.currentSession;
        const secondIsCurrent = second.id === content.currentSession;

        return Number(secondIsCurrent) - Number(firstIsCurrent);
      })
      .map((session) => ({
        ...session,
        updatedAtLabel: dateFormatter.format(new Date(session.updatedAt)),
        isCurrent: session.id === content.currentSession,
      }));
  }, [content.sessions, content.currentSession, selectedDevice]);

  const selectedSession = sessions.find(
    (session) => session.id === selectedSessionId,
  );

  function handleSessionClick(sessionId: string) {
    if (!isDesktop) {
      navigate(`/sessions/${sessionId}`);
      return;
    }

    setSelectedSessionId(sessionId);
  }

  function closeSessionDetails() {
    setSelectedSessionId(null);
  }

  const columns = [
    {
      title: "DEVICE",
      dataIndex: "device",
      key: "device",
      render: (text: string, record: (typeof sessions)[number]) => (
        <Flex align="center" gap={12}>
          <span className="sessions-list__device-icon">
            <DeviceIcon device={text} size={28} />
          </span>
          <Flex align="center" gap={8} wrap="wrap">
            <Text className="sessions-list__device-name">{text}</Text>
            {record.isCurrent && (
              <Tag className="sessions-list__current-tag">Current</Tag>
            )}
          </Flex>
        </Flex>
      ),
    },
    {
      title: "LOCATION",
      dataIndex: "ip",
      key: "ip",
      render: (ip: string) => (
        <Text type="secondary" className="sessions-list__location">
          {ip || "Unknown"}
        </Text>
      ),
    },
    {
      title: "LAST ACTIVE",
      dataIndex: "updatedAtLabel",
      key: "updatedAtLabel",
      render: (label: string) => (
        <Text type="secondary" className="sessions-list__last-active">
          {label}
        </Text>
      ),
    },
    {
      title: "STATUS",
      key: "status",
      render: (_: unknown, record: (typeof sessions)[number]) => (
        <Tag
          className={`sessions-list__status-tag ${
            record.revoked
              ? "sessions-list__status-tag--revoked"
              : "sessions-list__status-tag--active"
          }`}
        >
          {record.revoked ? "Revoked" : "Active"}
        </Tag>
      ),
    },
  ];

  return (
    <main className="sessions-page">
      <section className="sessions-list" aria-label="Active sessions">
        <div className="sessions-list__panel">
          <div
            className="sessions-list__panel-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <Flex align="center" gap={14}>
              <div className="sessions-list__panel-icon-wrapper">
                <PanelDeviceIcon />
              </div>
              <Flex vertical gap={2}>
                <Title
                  level={4}
                  className="sessions-list__title"
                  style={{ margin: 0 }}
                >
                  Active sessions
                </Title>
                <Text type="secondary" className="sessions-list__description">
                  Devices currently logged in to your account. Revoke any
                  session you don't recognize.
                </Text>
              </Flex>
            </Flex>

            <Flex align="center" gap={8}>
              <FilterIcon size={16} color="#9CA3AF" />
              <Select
                value={selectedDevice}
                style={{ width: 190, borderRadius: 7 }}
                onChange={(value) => setSelectedDevice(value)}
                options={availableDevices}
              />
            </Flex>
          </div>

          {/* Desktop Table View */}
          {isDesktop ? (
            <Table
              dataSource={sessions}
              columns={columns}
              rowKey="id"
              pagination={false}
              className="sessions-list__table"
              locale={{
                emptyText: (
                  <Empty
                    description="No active sessions"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                ),
              }}
              onRow={(record) => ({
                onClick: () => handleSessionClick(record.id),
                className: "sessions-list__row",
              })}
            />
          ) : (
            /* Mobile Card List View */
            <div className="sessions-mobile-list">
              {sessions.length === 0 ? (
                <div className="sessions-mobile-empty">
                  <Empty
                    description="No active sessions"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                </div>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    className="sessions-mobile-card"
                    onClick={() => handleSessionClick(session.id)}
                  >
                    <Flex align="flex-start" justify="space-between" gap={12}>
                      <Flex align="flex-start" gap={12}>
                        <span className="sessions-list__device-icon">
                          <DeviceIcon device={session.device} size={28} />
                        </span>
                        <Flex vertical gap={2}>
                          <Flex align="center" gap={8} wrap="wrap">
                            <Text className="sessions-list__device-name">
                              {session.device}
                            </Text>
                            {session.isCurrent && (
                              <Tag className="sessions-list__current-tag">
                                Current
                              </Tag>
                            )}
                          </Flex>
                          <Text
                            type="secondary"
                            className="sessions-list__location"
                          >
                            {session.ip || "Unknown"}
                          </Text>
                          <Text
                            type="secondary"
                            className="sessions-list__last-active"
                            style={{ marginTop: 4 }}
                          >
                            Last active: {session.updatedAtLabel}
                          </Text>
                        </Flex>
                      </Flex>
                      <Tag
                        className={`sessions-list__status-tag ${
                          session.revoked
                            ? "sessions-list__status-tag--revoked"
                            : "sessions-list__status-tag--active"
                        }`}
                      >
                        {session.revoked ? "Revoked" : "Active"}
                      </Tag>
                    </Flex>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <Modal
        open={Boolean(selectedSession)}
        title="Session details"
        footer={null}
        centered
        destroyOnHidden
        onCancel={closeSessionDetails}
        className="sessions-list__modal"
      >
        {selectedSession && (
          <RevokeSessionModal
            session={selectedSession}
            isCurrentSession={selectedSession.isCurrent}
          />
        )}
      </Modal>
    </main>
  );
}
