import { useRef } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ActivityChartData {
  timestamp: string;
  created: number;
  revoked: number;
}

const data: ActivityChartData[] = [
  { timestamp: "07:00", created: 1, revoked: 0 },
  { timestamp: "08:00", created: 3, revoked: 1 },
  { timestamp: "09:00", created: 5, revoked: 0 },
  { timestamp: "10:00", created: 2, revoked: 1 },
  { timestamp: "11:00", created: 4, revoked: 0 },
  { timestamp: "12:00", created: 7, revoked: 1 },
];

export function Sparkline() {
  const chartRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "150px",
        minWidth: 0,
        outline: "none",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="createdGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8956FF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8956FF" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="revokedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#e5e7eb" vertical={false} />

          <XAxis
            dataKey="timestamp"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "#9ca3af",
            }}
          />

          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            width={30}
            tick={{
              fontSize: 12,
              fill: "#9ca3af",
            }}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="created"
            name="Created"
            stroke="#8956FF"
            strokeWidth={2}
            fill="url(#createdGradient)"
            dot={false}
            activeDot={false}
          />

          <Area
            type="monotone"
            dataKey="revoked"
            name="Revoked"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#revokedGradient)"
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
