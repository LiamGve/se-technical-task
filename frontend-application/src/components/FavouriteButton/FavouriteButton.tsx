import { Button } from "..";
import { useFavourites } from "../../context/FavouritesContext";
import { useUser } from "../../context/UserContext";

interface IFavouriteButtonProps {
  saleId?: string;
}

export const FavouriteButton: React.FC<IFavouriteButtonProps> = ({
  saleId,
}) => {
  const { isLoggedIn } = useUser();
  const {
    favourites,
    refetchFavourites,
    addToFavourites,
    removeFromFavourites,
  } = useFavourites();
  const isFavourite: boolean = !!favourites.find((f) => f.saleId === saleId);

  const handleAddToFavourites: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!saleId) {
      return;
    }
    if (isFavourite) {
      removeFromFavourites(saleId);
    } else {
      addToFavourites(saleId);
    }
    refetchFavourites();
  };

  if (!isLoggedIn || !saleId) {
    return null;
  }
  return (
    <Button onClick={handleAddToFavourites}>
      {isFavourite ? "Remove from favourites" : "Add to favourites"}
    </Button>
  );
};
