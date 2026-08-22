import Icon from "@ant-design/icons";

const SidebarOpenSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <polyline points="13 15 16 12 13 9" />
  </svg>
);

export const SidebarOpenIcon = () => {
  return <Icon component={SidebarOpenSvg} />;
};

const SidebarCloseSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <polyline points="15 15 12 12 15 9" />
  </svg>
);

export const SidebarCloseIcon = () => {
  return <Icon component={SidebarCloseSvg} />;
};
