import SearchField from "../../../components/ui/SearchField";
import Tag from "../../../components/ui/Tag";

const Header = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className=" text-2xl font-semibold">Home</h3>
      <div>
        <SearchField />
      </div>
      <div className=" flex gap-3">
        <Tag onClick={() => console.log("The tag is focused")} name="Status" />
        <Tag name="Category" />
        <Tag name="Name" />
      </div>
    </div>
  );
};

export default Header;
