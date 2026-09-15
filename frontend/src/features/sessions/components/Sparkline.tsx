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
import type { AllActivityResponse } from "@repo/types";

type ActivityType =
  "CREATED" | "REVOKED" | "EXPIRED" | "REUSE_DETECTED" | "PASSWORD_UPDATED";

type ChartPoint = {
  timestamp: number;
} & Record<ActivityType, number>;

const ACTIVITY_TYPES: ActivityType[] = [
  "CREATED",
  "REVOKED",
  "EXPIRED",
  "REUSE_DETECTED",
  "PASSWORD_UPDATED",
];

const ACTIVITY_CONFIG: Record<
  ActivityType,
  {
    name: string;
    color: string;
  }
> = {
  CREATED: {
    name: "Created",
    color: "#8956FF",
  },
  REVOKED: {
    name: "Revoked",
    color: "#EF4444",
  },
  EXPIRED: {
    name: "Expired",
    color: "#F59E0B",
  },
  REUSE_DETECTED: {
    name: "Reuse detected",
    color: "#EC4899",
  },
  PASSWORD_UPDATED: {
    name: "Password updated",
    color: "#14B8A6",
  },
};

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatTooltipTime(timestamp: number) {
  return new Date(timestamp).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function createEmptyPoint(timestamp: number): ChartPoint {
  return {
    timestamp,
    CREATED: 0,
    REVOKED: 0,
    EXPIRED: 0,
    REUSE_DETECTED: 0,
    PASSWORD_UPDATED: 0,
  };
}

function TooltipContent({
  active,
  label,
  payload,
}: {
  active?: boolean;
  label?: number | string;
  payload?: Array<{
    dataKey?: string | number;
    value?: number;
  }>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const items = payload
    .filter(
      (item) =>
        typeof item.dataKey === "string" &&
        ACTIVITY_TYPES.includes(item.dataKey as ActivityType) &&
        typeof item.value === "number" &&
        item.value > 0,
    )
    .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        minWidth: 180,
        padding: "10px 12px",
        border: "1px solid #E5E7EB",
        borderRadius: 10,
        background: "#FFFFFF",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div
        style={{
          marginBottom: 8,
          paddingBottom: 8,
          borderBottom: "1px solid #F3F4F6",
          color: "#6B7280",
          fontSize: 12,
        }}
      >
        {formatTooltipTime(Number(label))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {items.map((item) => {
          const type = item.dataKey as ActivityType;
          const config = ACTIVITY_CONFIG[type];

          return (
            <div
              key={type}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: config.color,
                  }}
                />

                <span
                  style={{
                    color: "#374151",
                    fontSize: 12,
                  }}
                >
                  {config.name}
                </span>
              </div>

              <span
                style={{
                  color: "#111827",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Sparkline({ data }: { data: AllActivityResponse }) {
  const { chartData, visibleTypes } = useMemo(() => {
    const now = new Date();

    const currentHour = new Date(now);
    currentHour.setMinutes(0, 0, 0);

    const points = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(currentHour);

      date.setHours(currentHour.getHours() - (23 - index));

      return createEmptyPoint(date.getTime());
    });

    const pointsByHour = new Map(
      points.map((point) => [point.timestamp, point]),
    );

    for (const activity of data) {
      if (activity.type === "REFRESHED") {
        continue;
      }

      if (!ACTIVITY_TYPES.includes(activity.type as ActivityType)) {
        continue;
      }

      const date = new Date(activity.createdAt);

      date.setMinutes(0, 0, 0);

      const point = pointsByHour.get(date.getTime());

      if (!point) {
        continue;
      }

      const type = activity.type as ActivityType;

      point[type] += 1;
    }

    const visibleTypes = ACTIVITY_TYPES.filter((type) =>
      points.some((point) => point[type] > 0),
    );

    return {
      chartData: points,
      visibleTypes,
    };
  }, [data]);

  return (
    <div
      style={{
        width: "100%",
        height: 180,
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
            {visibleTypes.map((type) => {
              const color = ACTIVITY_CONFIG[type].color;

              return (
                <linearGradient
                  key={type}
                  id={`${type}-gradient`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={0.25} />

                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              );
            })}
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
            tickFormatter={formatTime}
            minTickGap={30}
            tick={{
              fontSize: 11,
              fill: "#9CA3AF",
            }}
          />

          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            width={28}
            tick={{
              fontSize: 11,
              fill: "#9CA3AF",
            }}
          />

          <Tooltip
            content={<TooltipContent />}
            cursor={{
              stroke: "#D1D5DB",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />

          {visibleTypes.map((type) => {
            const { name, color } = ACTIVITY_CONFIG[type];

            return (
              <Area
                key={type}
                dataKey={type}
                name={name}
                type="monotone"
                stroke={color}
                strokeWidth={2}
                fill={`url(#${type}-gradient)`}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: color,
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
                isAnimationActive
                animationDuration={400}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
