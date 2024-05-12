import homeImage from "../assets/home.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-blue-600">
          Order The Latest Clothes Today!
        </h1>
        <span className="text-xl">Buy the best brands here!</span>
        <SearchBar
          placeHolder="Search by City to find Local Store"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={homeImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-4xl">
            Welcome To My Ecommerce Clothing Shop!
          </span>
          <span className="text-3xl">
            Please shop arround and take a look at our high quality clothes from
            top brands arround the world!
          </span>
          <span className="text-2xl">Guaranteed this day delivery!</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
