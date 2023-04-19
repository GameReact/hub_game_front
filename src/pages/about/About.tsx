import React from "react";
import { Typography } from "@mui/material";
import Avatar from "@mui/joy/Avatar";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { HeaderAction } from "../../components/Header";
import { Footer } from "../../components/Footer";

const About: React.FunctionComponent = () => {
  return (
    <div>
      <HeaderAction />
      <Typography variant="h1">À propos de Game Hub</Typography>
      <Typography variant="body1">
        Nous sommes une équipe de 5 développeurs passionnés par la création de
        jeux web amusants et stimulants. Nous avons une expérience variée dans
        le développement web, allant de la conception à la mise en œuvre de
        sites web complets.
      </Typography>
      <Typography variant="body1">
        Notre entreprise fictive développe des jeux web pour tous les goûts, des
        jeux de stratégie aux jeux de rôle en passant par les jeux de sport.
        Nous sommes toujours à la recherche de nouvelles idées et de nouveaux
        défis pour offrir une expérience de jeu exceptionnelle à nos
        utilisateurs.
      </Typography>
      <Typography variant="body1">
        Nous sommes fiers de notre travail et nous nous efforçons de fournir des
        jeux de qualité supérieure, avec une attention particulière aux détails
        et à l'expérience utilisateur. Nous espérons que vous apprécierez nos
        jeux autant que nous avons apprécié les créer !
      </Typography>
      <Typography variant="h2">Notre équipe de développeurs</Typography>
      <List
        orientation="horizontal"
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.body",
          borderRadius: "sm",
          boxShadow: "sm",
          flexGrow: 0,
          mx: "auto",
          "--List-decoratorSize": "48px",
          "--ListItem-paddingY": "1rem",
        }}
      >
        <ListItem>
          <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
            <Avatar size="sm" {...stringAvatar("Léo A")} />
          </ListItemDecorator>
          Léo A
        </ListItem>
        <ListDivider inset="gutter" />
        <ListItem>
          <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
            <Avatar size="sm" {...stringAvatar("Bastien A")} />
          </ListItemDecorator>
          Bastien
        </ListItem>
        <ListDivider inset="gutter" />
        <ListItem>
          <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
            <Avatar size="sm" {...stringAvatar("Léo B")} />
          </ListItemDecorator>
          Léo B
        </ListItem>
        <ListDivider inset="gutter" />
        <ListItem>
          <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
            <Avatar size="sm" {...stringAvatar("Reda K")} />
          </ListItemDecorator>
          Reda
        </ListItem>
        <ListDivider inset="gutter" />
        <ListItem>
          <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
            <Avatar size="sm" {...stringAvatar("Mathieu J")} />
          </ListItemDecorator>
          Mathieu
        </ListItem>
      </List>
      <Footer />
    </div>
  );
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default About;
