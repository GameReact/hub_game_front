import React from "react";
import { Typography } from "@mui/material";
import Avatar from "@mui/joy/Avatar";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";

// const About: React.FunctionComponent = () => {
//   return (
//     <List
//       orientation="horizontal"
//       variant="outlined"
//       sx={{
//         bgcolor: "background.body",
//         borderRadius: "sm",
//         boxShadow: "sm",
//         flexGrow: 0,
//         mx: "auto",
//         "--List-decoratorSize": "48px",
//         "--ListItem-paddingY": "1rem",
//       }}
//     >
//       <ListItem>
//         <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
//           <Avatar size="sm" src="/static/images/avatar/1.jpg" />
//         </ListItemDecorator>
//         Mabel Boyle
//       </ListItem>
//       <ListDivider inset="gutter" />
//       <ListItem>
//         <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
//           <Avatar size="sm" src="/static/images/avatar/2.jpg" />
//         </ListItemDecorator>
//         Boyd Burt
//       </ListItem>
//       <ListDivider inset="gutter" />
//       <ListItem>
//         <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
//           <Avatar size="sm" src="/static/images/avatar/3.jpg" />
//         </ListItemDecorator>
//         Adam Tris
//       </ListItem>
//     </List>
//   );
// };

const About: React.FunctionComponent = () => {
  return (
    <div>
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
            <Avatar size="sm" src="/static/images/avatar/1.jpg" />
          </ListItemDecorator>
          Léo A
        </ListItem>
        <ListDivider inset="gutter" />
        <ListItem>
          <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
            <Avatar size="sm" src="/static/images/avatar/2.jpg" />
          </ListItemDecorator>
          Bastien
        </ListItem>
        <ListDivider inset="gutter" />
        <ListItem>
          <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
            <Avatar size="sm" src="/static/images/avatar/3.jpg" />
          </ListItemDecorator>
          Léo B
        </ListItem>
        <ListDivider inset="gutter" />
        <ListItem>
          <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
            <Avatar size="sm" src="/static/images/avatar/3.jpg" />
          </ListItemDecorator>
          Reda
        </ListItem>
        <ListDivider inset="gutter" />
        <ListItem>
          <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
            <Avatar size="sm" src="/static/images/avatar/3.jpg" />
          </ListItemDecorator>
          Mathieu
        </ListItem>
      </List>
    </div>
  );
};

export default About;
