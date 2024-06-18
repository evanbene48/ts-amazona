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

export const useGetPaypalClientIdQuery = () =>
  useQuery({
    queryKey: ['paypal-clientId'],
    queryFn: async () =>
      (await apiClient.get<{ clientId: string }>(`/api/keys/paypal`)).data,
  });

export const usePayOrderMutation = () =>
  useMutation({
    mutationFn: async (details: { orderId: string }) =>
      (
        await apiClient.put<{ message: string; order: OrderType }>(
          `api/orders/${details.orderId}/pay`,
          details
        )
      ).data,
  });
