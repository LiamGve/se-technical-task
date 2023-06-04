import { Context, createContext, useContext } from "react";
import { IFavourite } from "../pages/Favourites/Favourites.interfaces";
import React from "react";
import { useUser } from "./UserContext";
import axios from 'axios';

interface IFavouritesContext {
  favourites: IFavourite[];
  refetchFavourites: () => void;
  addToFavourites: (saleId: string) => void;
  removeFromFavourites: (saleId: string) => void;
}

const defaultContext: IFavouritesContext = {
  favourites: [] as IFavourite[],
  refetchFavourites: () => {},
  addToFavourites: (_saleId) => {},
  removeFromFavourites: (_saleId) => {},
};

export const FavouritesContext: Context<IFavouritesContext> = createContext(defaultContext);

interface IFavouritesProviderProps {
  children: React.ReactNode;
}

export const FavouritesProvider: React.FC<IFavouritesProviderProps> = ({
  children,
}) => {
  const { userId } = useUser();

  /*
   * -------------------------------------------------
   *
   * Dummy favourites functionality!
   * The code below this point is for illustrative purposes only it should be replaced
   * with real API integration.
   * You may keep as much or as little of the code as you like, or refactor as you see fit.
   *
   * -------------------------------------------------
   */
  const [prevUserId, setPrevUserId] = React.useState<string>(userId);
  const [favourites, setFavourites] = React.useState<Array<IFavourite>>([]);
  const [idCounter, setIdCounter] = React.useState<number>(1);

  if (userId !== prevUserId) {
    setFavourites([]);
    setPrevUserId(userId);
  }

  const addToFavourites = React.useCallback(
    (saleId: string) => {
      setIdCounter((id) => id + 1);
      setFavourites((favourites) => [
        ...favourites,
        {
          id: idCounter,
          saleId,
          userId,
          dateCreated: new Date(),
        },
      ]);
    },
    [userId, idCounter]
  );

  const removeFromFavourites = React.useCallback(
    (saleId: string) => {
      setFavourites((favourites) =>
        favourites.filter(
          (favourite) =>
            !(favourite.saleId === saleId && favourite.userId === userId)
        )
      );
    },
    [userId]
  );

  const refetchFavourites = React.useCallback(() => {
    console.log("Pretending to refetch data");
  }, []);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        refetchFavourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  return useContext(FavouritesContext);
};
