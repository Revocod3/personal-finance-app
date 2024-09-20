import { Text, Tooltip, UnstyledButton, rem } from "@mantine/core";
import classes from "./NavbarLink.module.css";

const NavbarLink = (props) => {
  const { icon: Icon, label, active, onClick } = props;
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        <Text hiddenFrom="sm" fw={700} className={classes.linkLabel}>
          {label}
        </Text>
      </UnstyledButton>
    </Tooltip>
  );
};

export default NavbarLink;
