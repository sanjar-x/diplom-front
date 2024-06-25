import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";

interface ComponentWithChildren {
  children: ReactNode;
  title: string;
  buttonName: string;
}

export const DynamicModal = ({
  children,
  title,
  buttonName,
}: ComponentWithChildren) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
        centered
        size={"80%"}
      >
        {children}
      </Modal>

      <Button onClick={open}>{buttonName}</Button>
    </>
  );
};
