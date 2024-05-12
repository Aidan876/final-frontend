import { Order, Shop } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyShop = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyShopRequest = async (): Promise<Shop> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/shop`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get shop");
    }
    return response.json();
  };

  const { data: shop, isLoading } = useQuery("fetchMyShop", getMyShopRequest);

  return { shop, isLoading };
};

export const useCreateMyShop = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyShopRequest = async (shopFormData: FormData): Promise<Shop> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/shop`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: shopFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create shop");
    }

    return response.json();
  };

  const {
    mutate: createShop,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyShopRequest);

  if (isSuccess) {
    toast.success("Shop created!");
  }

  if (error) {
    toast.error("Unable to update shop");
  }

  return { createShop, isLoading };
};

export const useUpdateMyShop = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateShopRequest = async (shopFormData: FormData): Promise<Shop> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/shop`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: shopFormData,
    });

    if (!response) {
      throw new Error("Failed to update shop");
    }

    return response.json();
  };

  const {
    mutate: updateShop,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateShopRequest);

  if (isSuccess) {
    toast.success("Shop Updated");
  }

  if (error) {
    toast.error("Unable to update shop");
  }

  return { updateShop, isLoading };
};

export const useGetMyShopOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyShopOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/shop/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyShopOrders",
    getMyShopOrdersRequest
  );

  return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyShopOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyShopOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/shop/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateShopStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyShopOrder);

  if (isSuccess) {
    toast.success("Order updated");
  }

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  return { updateShopStatus, isLoading };
};
