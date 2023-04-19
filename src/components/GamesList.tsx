import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
} from "@mantine/core";
import { Link } from "react-router-dom";
import preview1 from "../assets/game1/preview.jpg";
import preview2 from "../assets/game2/preview.jpg";

const mockdata = [
  {
    title: "Jeux du morpion",
    image: preview1,
    creator: "Par Bastien",
    link: "/games/1",
  },
  {
    title: "Worldle",
    image: preview2,
    creator: "Par Reda",
    link: "/games/worldle",
  },
];

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },
  link: {
    display: "block",
    lineHeight: 1,
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

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

export function GamesLists() {
  const { classes } = useStyles();

  const cards = mockdata.map((article) => (
    <Link to={article.link} className={classes.link}>
      <Card
        key={article.title}
        p="md"
        radius="md"
        component="a"
        className={classes.card}
      >
        <AspectRatio ratio={1920 / 1080}>
          <Image src={article.image} />
        </AspectRatio>
        <Text
          color="dimmed"
          size="xs"
          transform="uppercase"
          weight={700}
          mt="md"
        >
          {article.creator}
        </Text>
        <Text className={classes.title} mt={5}>
          {article.title}
        </Text>
      </Card>
    </Link>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}
