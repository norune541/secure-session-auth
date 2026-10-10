import { Flex } from "antd";
import { PasswordSection } from "../components/PasswordSection";
import { DangerZoneSection } from "../components/DangerZoneSection";

export function SecurityProfile() {
  return (
    <div
      className="security-profile"
      style={{ maxWidth: 680, paddingBottom: 20 }}
    >
      <Flex vertical gap={24}>
        <PasswordSection />
        <DangerZoneSection />
      </Flex>
    </div>
  );
}
