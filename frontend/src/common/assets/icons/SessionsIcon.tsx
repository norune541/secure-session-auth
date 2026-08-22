import Icon from "@ant-design/icons";

const SessionsSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3L21 7.5L12 12L3 7.5L12 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 12L12 16.5L21 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 16.5L12 21L21 16.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SessionsIcon = () => {
  return <Icon component={SessionsSvg} />;
};
