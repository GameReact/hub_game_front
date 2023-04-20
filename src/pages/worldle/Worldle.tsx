import { Footer } from "../../components/Footer";
import { HeaderAction } from "../../components/Header";
import WorldleGame from "../../components/worldle/WorldleGame";

const Worldle: React.FunctionComponent = () => {
  return (
    <>
      <HeaderAction />
      <WorldleGame />
      <Footer />
    </>
  );
};

export default Worldle;
