import { useState } from "react";
import { Stack } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { dashboardLinks } from "./Navbar.helpers";
import NavbarLink from "../NavbarLink/NavbarLink";
import { useAuth } from "../../config/authprovider";

const Navbar = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const handleLinkClick = (index, path) => {
    setActive(index);
    navigate(path);
  };

  const { localLogout } = useAuth();
  const links = dashboardLinks.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => handleLinkClick(index, link.path)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Logout" onClick={localLogout} />
      </Stack>
    </nav>
  );
};

export default Navbar;
