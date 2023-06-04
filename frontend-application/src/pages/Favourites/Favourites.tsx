import { useEffect } from "react";
import { LoadingSpinner, SaleCard } from "../../components";
import { useUser } from "../../context/UserContext";
import { useSearch } from "../../utils/UseSearch";
import { SearchResultsContainer } from "../SearchResults/SearchResults.styles";
import { useFavourites } from "../../context/FavouritesContext";

export const Favourites = () => {
  const { isLoggedIn } = useUser();
  const { favourites, refetchFavourites } = useFavourites();

  useEffect(() => refetchFavourites(), [refetchFavourites]);

  const {
    response: saleData,
    loading: saleLoading,
    error: saleError,
  } = useSearch({
    saleIds: favourites.map((fav) => fav.saleId),
    pageSize: 20,
    skip: favourites.length === 0,
  });

  if (!isLoggedIn) {
    return <p>You need to log in to see your favourites.</p>;
  }
  if (saleLoading) {
    return <LoadingSpinner />;
  }
  if (saleError) {
    return <p>{saleError.toString()}</p>;
  }

  return (
    <>
      <h1>Your Favourites</h1>
      <h2>You have {saleData?.resultCount} favourites</h2>
      <SearchResultsContainer>
        {saleData?.sales?.map((s, i) => (
          <SaleCard key={i} sale={s} />
        ))}
      </SearchResultsContainer>
    </>
  );
};
