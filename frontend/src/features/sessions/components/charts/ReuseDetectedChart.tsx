import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Typography } from "antd";
import type { AllActivityResponse } from "@repo/types";
import { formatChartTime } from "./chartUtils";

type ChartPoint = {
  timestamp: number;
  REUSE_DETECTED: number;
  PASSWORD_UPDATED: number;
};

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

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  marginBottom: 12,
  paddingLeft: 10,
  paddingRight: 10,
  flexShrink: 0,
};

const titleStyle = {
  margin: 0,
  color: "black",
};

const totalStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: "#374151",
};

const axisTickStyle = {
  fontSize: 11,
  fill: "#9CA3AF",
};

const tooltipContentStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #F3F4F6",
  borderRadius: 12,
  padding: "10px 14px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  fontSize: 12,
};

const tooltipLabelStyle = {
  color: "#6B7280",
  fontSize: 11,
  fontWeight: 500,
  marginBottom: 6,
};

const tooltipItemStyle = {
  color: "#111827",
  fontSize: 12,
  padding: "2px 0",
};

export function SecurityChart({ data }: { data: AllActivityResponse }) {
  const chartData = useMemo(() => {
    const now = new Date();
    const currentHour = new Date(now);

    currentHour.setMinutes(0, 0, 0);

    const points: ChartPoint[] = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(currentHour);

      date.setHours(currentHour.getHours() - (23 - index));

      return {
        timestamp: date.getTime(),
        REUSE_DETECTED: 0,
        PASSWORD_UPDATED: 0,
      };
    });

    const pointsByHour = new Map(
      points.map((point) => [point.timestamp, point]),
    );

    for (const activity of data) {
      if (
        activity.type !== "REUSE_DETECTED" &&
        activity.type !== "PASSWORD_UPDATED"
      ) {
        continue;
      }

      const date = new Date(activity.createdAt);
      date.setMinutes(0, 0, 0);

      const point = pointsByHour.get(date.getTime());

      if (point) {
        point[activity.type] += 1;
      }
    }

    return points;
  }, [data]);

  const totalCount = useMemo(() => {
    return chartData.reduce(
      (acc, item) => acc + item.REUSE_DETECTED + item.PASSWORD_UPDATED,
      0,
    );
  }, [chartData]);

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <Typography.Title level={5} style={titleStyle}>
          Security Events
        </Typography.Title>
        <Typography.Text style={totalStyle}>
          {totalCount} total today
        </Typography.Text>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          width: "100%",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 8,
              right: 8,
              bottom: 0,
              left: 0,
            }}
          >
            <defs>
              <linearGradient
                id="reuse-detected-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#EC4899" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#EC4899" stopOpacity={0} />
              </linearGradient>

              <linearGradient
                id="password-updated-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#14B8A6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="timestamp"
              type="number"
              scale="time"
              domain={["dataMin", "dataMax"]}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatChartTime}
              minTickGap={30}
              tick={axisTickStyle}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              width={28}
              tick={axisTickStyle}
            />

            <Tooltip
              contentStyle={tooltipContentStyle}
              labelStyle={tooltipLabelStyle}
              itemStyle={tooltipItemStyle}
              labelFormatter={(label) =>
                new Date(Number(label)).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              }
            />

            <Area
              dataKey="REUSE_DETECTED"
              name="Reuse detected"
              type="monotone"
              stroke="#EC4899"
              strokeWidth={2}
              fill="url(#reuse-detected-gradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#EC4899",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
              isAnimationActive
              animationDuration={400}
            />

            <Area
              dataKey="PASSWORD_UPDATED"
              name="Password updated"
              type="monotone"
              stroke="#14B8A6"
              strokeWidth={2}
              fill="url(#password-updated-gradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#14B8A6",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
              isAnimationActive
              animationDuration={400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
