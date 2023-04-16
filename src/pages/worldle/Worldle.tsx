import Footer from "../../components/Footer";
import Header from "../../components/Header";
import WorldleGame from "../../components/worldle/WorldleGame";

const Worldle: React.FunctionComponent = () => {
    return (
        <>
            <Header />

            <WorldleGame/>

            <Footer />
        </>
    );
};

export default Worldle;
