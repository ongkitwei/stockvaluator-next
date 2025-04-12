import { FaStar } from "react-icons/fa6";

const FavouritesButton = ({
  handleFavouritesButton,
  favouritesButtonColor,
}) => {
  return (
    <div className="hover:cursor-pointer" onClick={handleFavouritesButton}>
      <FaStar size={40} color={favouritesButtonColor} />
    </div>
  );
};

export default FavouritesButton;
