import { createStyles, Container, Group, Anchor, rem } from "@mantine/core";
import { MantineLogo } from "@mantine/ds";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();

  const links = [
    { link: "/games/tictactoe", label: "Jeux Tic Tac Toe" },
    { link: "/games/worldle", label: "Jeux Worldle" },
    { link: "/stats", label: "Statistique du site" },
    { link: "/contact", label: "Contact" },
  ];

  const items = links.map((link) => (
    <Anchor<"a">
      color="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
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
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
