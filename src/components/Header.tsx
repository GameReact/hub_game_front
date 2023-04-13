import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme: any) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    display: "none",
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(12)} ${rem(18)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

export function HeaderAction() {
  const links = [
    {
      link: "/",
      label: "Accueil",
    },
    {
      link: "",
      label: "Jeux",
      links: [
        {
          link: "/games/1",
          label: "TicTacToe",
        },
        {
          link: "/games/2",
          label: "Distance entre des villes pays ?",
        },
      ],
    },
    {
      link: "/about",
      label: "A propos",
    },
    {
      link: "/stats",
      label: "Statistique",
    },
    {
      link: "/profil",
      label: "Profil",
    },
    {
      link: "/contact",
      label: "Contact",
    },
  ];

  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Link to={item.link} className={classes.link}>
        <Menu.Item key={item.link}>{item.label}</Menu.Item>
      </Link>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <Link to={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={rem(12)} stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} to={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <img
            src={require("../assets/logo.png")}
            alt="logo"
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              width: "100%",
              height: "100%",
            }}
          />
        </Group>
        <Group className={classes.links}>{items}</Group>
        <Button radius="xl" h={30}>
          Se déconnecter
        </Button>
      </Container>
    </Header>
  );
}
