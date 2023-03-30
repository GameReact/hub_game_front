import { Typography } from "@mui/material";
import CustomGrid from "../../components/CustomGrid";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";

const Home: React.FunctionComponent = () => {
  const { state } = useContext(UserContext);

  console.log(state)

  return (
    <>
      <Header />
      <Typography variant="h1">Accueil Game Hub</Typography>
      <div>
        <p>
          {state.firstname}, bienvenue sur notre site internet ! Nous sommes une équipe passionnée
          de jeux et de divertissement. Nous avons créé chaque jeu que vous
          trouverez sur notre site à la main, avec soin et attention aux
          détails. Notre objectif est de vous offrir des jeux uniques et
          amusants que vous ne trouverez nulle part ailleurs. Chaque jeu a été
          conçu pour offrir une expérience de jeu captivante et stimulante, que
          vous pourrez apprécier seul ou en compagnie d'amis et de famille. Nous
          sommes fiers de notre travail et nous espérons que vous trouverez un
          jeu qui vous plaira parmi notre sélection. N'hésitez pas à nous
          contacter si vous avez des questions ou des commentaires sur notre
          site ou nos jeux. Merci de visiter notre site et amusez-vous bien !
        </p>
      </div>
      <CustomGrid />
      <Footer />
    </>
  );
};

export default Home;
