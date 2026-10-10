import { Grid } from "antd";

export function PanelDeviceIcon() {
  const { md } = Grid.useBreakpoint();
  const isDesktop = Boolean(md);

  if (!isDesktop) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="7"
          y="2"
          width="10"
          height="20"
          rx="2"
          stroke="#EA580C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 18H13"
          stroke="#EA580C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="3"
        width="20"
        height="13"
        rx="2"
        stroke="#EA580C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 19H18"
        stroke="#EA580C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16V19"
        stroke="#EA580C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
