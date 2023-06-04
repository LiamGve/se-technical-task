import { DocumentNode, gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { IBasicSale } from "./Sale.interface";

export interface ISearchResponse {
  resultCount: number;
  sales: Array<IBasicSale>;
}

interface IUseSearch {
  response: ISearchResponse | null;
  loading: boolean;
  error: any;
  fetchMore: () => void;
}

interface IUseSearchProps {
  query?: string;
  saleIds?: string[];
  pageSize?: number;
  skip?: boolean;
}

const DEFAULT_PAGE_SIZE: number = 10;

interface ISearchQueryVariables {
  query: string;
  offset: number;
  limit: number;
  saleIds?: string[];
}

const SEARCH_QUERY: DocumentNode = gql`
  query search($query: String, $limit: Int, $offset: Int, $saleIds: [String]) {
    saleSearch(query: $query, travelTypes: "HOTEL_ONLY", saleIds: $saleIds) {
      resultCount
      sales(limit: $limit, offset: $offset) {
        id
        editorial {
          title
          destinationName
        }
        photos {
          url
        }
      }
    }
  }
`;

export const useSearch: (props: IUseSearchProps) => IUseSearch = ({
  query = "",
  saleIds,
  pageSize = DEFAULT_PAGE_SIZE,
  skip = false,
}) => {
  const [offset, setOffset] = useState<number>(0);
  const [currentQuery, setCurrentQuery] = useState<string>(query);

  if (query !== currentQuery) {
    setOffset(0);
    setCurrentQuery(query);
  }

  const variables: ISearchQueryVariables = {
    query,
    offset: 0,
    limit: pageSize,
  };

  if (saleIds?.length) {
    variables.saleIds = saleIds;
  }

  const { data, loading, error, fetchMore } = useQuery(SEARCH_QUERY, {
    variables,
    skip,
  });

  return {
    response: data?.saleSearch,
    loading,
    error,
    fetchMore: () => {
      fetchMore({
        variables: {
          query,
          offset: offset + pageSize,
          limit: pageSize,
        },
      });
      setOffset((v) => v + pageSize);
    },
  };
};
