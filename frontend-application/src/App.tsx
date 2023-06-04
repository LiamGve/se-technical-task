import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Favourites, Home, SaleDetails, SearchResults } from "./pages";
import { MainLayout } from "./layout/MainLayout";
import { UserProvider } from "./context/UserContext";
import { FavouritesProvider } from "./context/FavouritesContext";

export const App: React.FC = () => {
  return (
    <UserProvider>
      <FavouritesProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sale/:id" element={<SaleDetails />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/favourites" element={<Favourites />} />
          </Route>
        </Routes>
      </FavouritesProvider>
    </UserProvider>
  );
};
