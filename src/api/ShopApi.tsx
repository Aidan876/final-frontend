import { SearchState } from "@/pages/SearchPage";
import { Shop, ShopSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetShop = (shopId?: string) => {
  const getShopByIdRequest = async (): Promise<Shop> => {
    const response = await fetch(`${API_BASE_URL}/api/shop/${shopId}`);

    if (!response.ok) {
      throw new Error("Failed to get shop");
    }

    return response.json();
  };

  const { data: shop, isLoading } = useQuery("fetchShop", getShopByIdRequest, {
    enabled: !!shopId,
  });

  return { shop, isLoading };
};

export const useSearchShops = (searchState: SearchState, city?: string) => {
  const createSearchRequest = async (): Promise<ShopSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedFilters", searchState.selectedFilters.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/shop/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get shop");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchShops", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};
