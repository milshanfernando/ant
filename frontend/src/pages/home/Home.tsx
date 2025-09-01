import CreateForm from "../../components/item/CreateForm";
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
      <section>
        <div className=" mt-3">
          <CreateForm />
        </div>
      </section>
    </div>
  );
};

export default Home;
