import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";

import preview1 from "../assets/game1/preview.jpg";
import preview2 from "../assets/game2/preview.jpg";

const CustomGrid = () => {
  const games = [
    {
      name: "Distance entre des villes pays ?",
      imageUrl: preview1,
    },
    { name: "Morpion", imageUrl: preview2 },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {games.map((game, index) => (
          <Grid component="div" xs={6} key={index}>
            <Link to={"/" + game.name}>
              <img
                src={game.imageUrl}
                alt={game.name}
                style={{
                  maxWidth: "350px",
                  maxHeight: "350px",
                  width: "100%",
                  height: "100%",
                }}
              />
              <Typography variant="h6" align="center" gutterBottom>
                {game.name}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomGrid;
