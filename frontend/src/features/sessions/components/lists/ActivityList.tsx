import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Empty,
  Flex,
  Grid,
  Layout,
  Modal,
  Select,
  Table,
  Typography,
} from "antd";

import { DeviceIcon } from "../items/DeviceIcon";
import { formatActivityType } from "../items/formatActivityType";
import { CreatedChart } from "../charts/CreatedChart";
import { RevokedChart } from "../charts/RevokedChart";
import { SecurityChart } from "../charts/ReuseDetectedChart";
import { ActivityDistributionChart } from "../charts/ActivityDistributionChart";
import { ActivityDetails } from "../items/ActivityDetails";

import type { AllActivityResponse } from "@repo/types";

import "./ActivityList.css";

const { Content } = Layout;
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

export function ActivityList({ content }: { content: AllActivityResponse }) {
  const navigate = useNavigate();
  const { md } = Grid.useBreakpoint();
  const isDesktop = Boolean(md);

  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null,
  );
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const availableTypes = useMemo(() => {
    const typesSet = new Set(
      content.filter((a) => a.type !== "REFRESHED").map((a) => a.type),
    );
    const uniqueTypes = Array.from(typesSet).map((type) => ({
      label: formatActivityType(type),
      value: type,
    }));

    return [{ label: "All activities", value: "ALL" }, ...uniqueTypes];
  }, [content]);

  const items = useMemo(() => {
    return content
      .filter((a) => a.type !== "REFRESHED")
      .filter((a) =>
        selectedType && selectedType !== "ALL" ? a.type === selectedType : true,
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .map((a) => ({
        key: a.id,
        activityId: a.id,
        sessionId: a.sessionId,
        device: a.session.device,
        createdAt: dateFormatter.format(new Date(a.createdAt)),
        type: a.type,
        activity: a,
      }));
  }, [content, selectedType]);

  const selectedActivity = useMemo(() => {
    return items.find((item) => item.activityId === selectedActivityId)
      ?.activity;
  }, [items, selectedActivityId]);

  function handleActivityClick(activityId: string) {
    if (!isDesktop) {
      navigate(`/sessions/activity/${activityId}`);
      return;
    }

    setSelectedActivityId(activityId);
  }

  function handleCloseModal() {
    setSelectedActivityId(null);
  }

  const columns = [
    {
      title: "ACTIVITY",
      dataIndex: "type",
      key: "type",
      render: (
        type: (typeof items)[number]["type"],
        record: (typeof items)[number],
      ) => (
        <Flex align="center" gap={12}>
          <span className="activity-list__device-icon">
            <DeviceIcon device={record.device} size={28} />
          </span>
          <Flex vertical gap={2}>
            <Text className="activity-list__device-name">
              {formatActivityType(type)}
            </Text>
            <Text type="secondary" className="activity-list__location">
              {record.device}
            </Text>
          </Flex>
        </Flex>
      ),
    },
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <Text type="secondary" className="activity-list__last-active">
          {createdAt}
        </Text>
      ),
    },
  ];

  return (
    <Content className="activity-page">
      <header style={{ marginBottom: 24, marginLeft: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Title level={2} className="activity-page__title">
            Activities
          </Title>
          <Text type="secondary">
            View the history of sessions and actions associated with your
            account.
          </Text>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "repeat(2, 1fr)" : "1fr",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <CreatedChart data={content} />
        <RevokedChart data={content} />
        <SecurityChart data={content} />
        <ActivityDistributionChart data={content} />
      </div>

      <section className="activity-list" aria-label="Activity history">
        <div className="activity-list__panel">
          <div
            className="activity-list__panel-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <Flex align="center" gap={14}>
              <div className="activity-list__panel-icon-wrapper">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8V12L15 15"
                    stroke="#EA580C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="#EA580C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Flex vertical gap={2}>
                <Title
                  level={4}
                  className="activity-list__title"
                  style={{ margin: 0 }}
                >
                  Activity log
                </Title>
                <Text type="secondary" className="activity-list__description">
                  Complete audit trail of security events and actions.
                </Text>
              </Flex>
            </Flex>

            <Flex align="center" gap={8}>
              <FilterIcon size={16} color="#9CA3AF" />
              <Select
                value={selectedType}
                style={{ width: 190, borderRadius: 7 }}

                onChange={(value) => setSelectedType(value)}
                options={availableTypes}
              />
            </Flex>
          </div>

          {/* Desktop Table View */}
          {isDesktop ? (
            <Table
              dataSource={items}
              columns={columns}
              rowKey="key"
              pagination={false}
              scroll={{ y: 300 }}
              className="activity-list__table"
              locale={{
                emptyText: (
                  <Empty
                    description="No activities found"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                ),
              }}
              onRow={(record) => ({
                onClick: () => handleActivityClick(record.activityId),
                className: "activity-list__row",
              })}
            />
          ) : (
            /* Mobile Card List View */
            <div className="activity-mobile-list">
              {items.length === 0 ? (
                <div className="activity-mobile-empty">
                  <Empty
                    description="No activities found"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.key}
                    className="activity-mobile-card"
                    onClick={() => handleActivityClick(item.activityId)}
                  >
                    <Flex align="flex-start" gap={12}>
                      <span className="activity-list__device-icon">
                        <DeviceIcon device={item.device} size={28} />
                      </span>
                      <Flex vertical gap={4} style={{ width: "100%" }}>
                        <Text className="activity-list__device-name">
                          {formatActivityType(item.type)}
                        </Text>
                        <Text
                          type="secondary"
                          className="activity-list__location"
                        >
                          {item.device}
                        </Text>
                        <Text
                          type="secondary"
                          className="activity-list__last-active"
                          style={{ marginTop: 4 }}
                        >
                          {item.createdAt}
                        </Text>
                      </Flex>
                    </Flex>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <Modal
        open={Boolean(selectedActivity)}
        title="Activity details"
        footer={null}
        centered
        destroyOnHidden
        onCancel={handleCloseModal}
      >
        {selectedActivity && <ActivityDetails activity={selectedActivity} />}
      </Modal>
    </Content>
  );
}
