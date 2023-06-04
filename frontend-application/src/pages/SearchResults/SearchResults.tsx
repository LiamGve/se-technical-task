import * as React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, LoadingSpinner, SaleCard, SearchForm } from "../../components";
import { useSearch } from "../../utils/UseSearch";
import {
  LoadMoreWrapper,
  SearchResultsContainer,
  SearchResultsHeader,
} from "./SearchResults.styles";

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const query: string = params?.query ?? searchParams.get("query") ?? "";
  const { loading, error, response, fetchMore } = useSearch({
    query,
    pageSize: 12,
  });

  return (
    <div>
      <SearchResultsHeader>
        <h2>Search results for {query}</h2>
        <SearchForm />
      </SearchResultsHeader>
      {loading && <LoadingSpinner />}
      {error && <p>{error.toString()}</p>}
      {response && (
        <>
          <h4>
            Found {response?.resultCount ?? 0}{" "}
            {response?.resultCount !== 1 ? "results" : "result"}
          </h4>
          <SearchResultsContainer>
            {response?.sales?.map((s, i) => (
              <SaleCard key={i} sale={s} />
            ))}
          </SearchResultsContainer>
          {response?.sales.length < response.resultCount && (
            <LoadMoreWrapper>
              <Button onClick={fetchMore} disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </Button>
            </LoadMoreWrapper>
          )}
        </>
      )}
    </div>
  );
};
