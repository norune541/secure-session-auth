import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Typography } from "antd";
import type { AllActivityResponse } from "@repo/types";

const CARD_HEIGHT = 300;

const cardStyle = {
  height: CARD_HEIGHT,
  boxSizing: "border-box" as const,
  display: "flex",
  flexDirection: "column" as const,
  padding: 16,
  background: "#FFFFFF",
  borderRadius: 12,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
  border: "1px solid #F3F4F6",
  width: "100%",
};

const titleStyle = {
  margin: "0 0 12px 10px",
  color: "black",
  flexShrink: 0,
};

const tooltipContentStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #F3F4F6",
  borderRadius: 12,
  padding: "10px 14px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  fontSize: 12,
};

const ACTIVITY_CONFIG: Record<
  Exclude<AllActivityResponse[number]["type"], "REFRESHED">,
  { label: string; color: string }
> = {
  CREATED: { label: "Created", color: "#8956FF" },
  REVOKED: { label: "Revoked", color: "#EF4444" },
  EXPIRED: { label: "Expired", color: "#6B7280" },
  REUSE_DETECTED: { label: "Reuse Detected", color: "#F59E0B" },
  PASSWORD_UPDATED: { label: "Password Updated", color: "#10B981" },
};

export function ActivityDistributionChart({
  data,
}: {
  data: AllActivityResponse;
}) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const filteredData = data.filter((item) => item.type !== "REFRESHED");
    if (filteredData.length === 0) return [];

    const counts = filteredData.reduce(
      (acc, item) => {
        if (item.type === "REFRESHED") return acc;
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const total = filteredData.length;

    return Object.entries(counts).map(([type, count]) => {
      const activityType = type as keyof typeof ACTIVITY_CONFIG;
      const config = ACTIVITY_CONFIG[activityType];

      return {
        name: config?.label || activityType,
        value: count,
        fill: config?.color || "#9CA3AF",
        percent: ((count / total) * 100).toFixed(1),
      };
    });
  }, [data]);

  return (
    <div style={cardStyle}>
      <Typography.Title level={5} style={titleStyle}>
        Activity Breakdown
      </Typography.Title>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {chartData.length === 0 ? (
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            No activity data available
          </Typography.Text>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                isAnimationActive
                animationDuration={400}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={tooltipContentStyle}
                formatter={(value, name, item) => [
                  `${value} (${item.payload.percent}%)`,
                  name,
                ]}
              />

              <Legend
                position="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span
                    style={{
                      color: "#374151",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
