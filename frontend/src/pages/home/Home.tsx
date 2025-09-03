import Items from "../item/Items";
import Header from "./sections/Header";

const Home = () => {
  return (
    <div className=" flex flex-col gap-5">
      <Header />

      <section>
        <h2 className=" text-lg font-semibold mb-3">All Products</h2>
        <Items />
      </section>
    </div>
  );
};

export default Home;
