import { Center, Group, Table, Text, UnstyledButton, rem } from "@mantine/core";
import classes from "./Th.module.css";
import { IconChevronUp, IconSelector } from "@tabler/icons-react";
import { IconChevronDown } from "@tabler/icons-react";

const Th = (props) => {
  const { children, reversed, sorted, onSort } = props;

  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;

  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
};

export default Th;
