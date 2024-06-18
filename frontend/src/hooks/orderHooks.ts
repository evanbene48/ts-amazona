import { useMutation, useQuery } from '@tanstack/react-query';
import { OrderType } from '../types/OrderType';
import apiClient from '../apiClient';
import { CartItem, ShippingAddress } from '../types/CartType';

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['orders', id],
    queryFn: async () =>
      (await apiClient.get<OrderType>(`api/orders/${id}`)).data,
  });

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: {
      orderItems: CartItem[];
      shippingAddress: ShippingAddress;
      paymentMethod: string;
      itemsPrice: number;
      shippingPrice: number;
      taxPrice: number;
      totalPrice: number;
    }) =>
      (
        await apiClient.post<{ message: string; order: OrderType }>(
          `api/orders`,
          order
        )
      ).data,

    // (
    //  await apiClient.post<{ message: string; order: Order }>(
    //   `api/orders`,
    //   order
    //  )
  });
