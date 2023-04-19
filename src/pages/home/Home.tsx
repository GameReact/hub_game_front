import { HeaderAction } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { GamesLists } from "../../components/GamesList";
import { HeroText } from "../../components/Home";

const Home: React.FunctionComponent = () => {
  return (
    <>
      <HeaderAction />
      <HeroText />
      <GamesLists />
      <Footer />
    </>
  );
};

export default Home;
