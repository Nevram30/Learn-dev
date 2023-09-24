import CardVideo from "./components/CardVideo";
import MainFooter from "./components/MainFooter";

const Home = () => {
  return (
    <main>
      <div className="box p-10">
        <div>
          <CardVideo />
        </div>
        <div>
          <MainFooter />
        </div>
      </div>
    </main>
  );
};

export default Home;
