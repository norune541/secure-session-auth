import type { AllActivityResponse } from "@repo/types";

export type ChartPoint = {
  timestamp: number;
  count: number;
};

export function createActivityChartData(
  data: AllActivityResponse,
  activityType: string,
): ChartPoint[] {
  const now = new Date();
  const currentHour = new Date(now);

  currentHour.setMinutes(0, 0, 0);

  const points = Array.from({ length: 24 }, (_, index) => {
    const date = new Date(currentHour);

    date.setHours(currentHour.getHours() - (23 - index));

    return {
      timestamp: date.getTime(),
      count: 0,
    };
  });

  const pointsByHour = new Map(points.map((point) => [point.timestamp, point]));

  for (const activity of data) {
    if (activity.type !== activityType) {
      continue;
    }

    const date = new Date(activity.createdAt);
    date.setMinutes(0, 0, 0);

    const point = pointsByHour.get(date.getTime());

    if (point) {
      point.count += 1;
    }
  }

  return points;
}

export function formatChartTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
