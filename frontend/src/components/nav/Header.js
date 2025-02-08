import { CircleUserRound } from "lucide-react";
import Category from "../Category";
import SearchLoc from "./Search";

const Header = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  setCenter,
  setSelectedPlace,
}) => {
  return (
    <div className="bg-transparent fixed top-0 z-50 w-full px-20">
      <section className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto py-2">
       
        <div className="flex items-center gap-4">
        <SearchLoc onPlaceSelect={setSelectedPlace} setCenter={setCenter} />
          <Category
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>


        {/* <MapControl position={ControlPosition.TOP}>
          <div className="border-2 border-black flex items-center px-1 rounded-md">
            <SearchLoc onPlaceSelect={setSelectedPlace} setCenter={setCenter} />
          </div>
        </MapControl> from the doc but doesn't work if used oustide */} 
        <div className="flex items-center">
          <a href="/login">
            <button className="bg-primary rounded-full">
              <CircleUserRound size={40} color="white" />
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Header;