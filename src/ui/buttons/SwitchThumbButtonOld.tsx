import React from "react";
import { Switch, rem, useMantineTheme } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

interface SwitchThumbButtonProps {
  active: boolean;
  onClick: () => void;
}

const SwitchThumbButton: React.FC<SwitchThumbButtonProps> = ({
  active,
  onClick,
}) => {
  const theme = useMantineTheme();

  return (
    <Switch
      checked={active}
      onChange={onClick}
      color={active ? "teal" : "red"}
      size="md"
      thumbIcon={
        active ? (
          <IconCheck
            style={{ width: rem(12), height: rem(12), cursor: "pointer" }}
            color={theme.colors.teal[6]}
            stroke={3}
          />
        ) : (
          <IconX
            style={{ width: rem(12), height: rem(12), cursor: "pointer" }}
            color={theme.colors.red[6]}
            stroke={3}
          />
        )
      }
    />
  );
};

export default SwitchThumbButton;
