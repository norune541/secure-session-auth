import Icon from "@ant-design/icons";

const CompanySvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 21V5C4 4.448 4.448 4 5 4H15C15.552 4 16 4.448 16 5V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 9H19C19.552 9 20 9.448 20 10V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 8H10M8 12H10M8 16H10M12 8H14M12 12H14M12 16H14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M3 21H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CompanyIcon = () => {
  return <Icon component={CompanySvg} />;
};
