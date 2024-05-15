import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { ProductType } from '../types/ProductType'

//use and Query from 'useGetProductsQuery'
// is static dan mesti digunakan di depan dan blkg
//sedangkan 'GetProducts' nya dinamis
// atau bebas
export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => {
        // const res = await (await (apiClient.get<ProductType[]>(`api/products`))).data
        const res = await apiClient.get<ProductType[]>(`api/products`)
        const data = res.data
        return data
    },
  })

//queryKey adalah ?
