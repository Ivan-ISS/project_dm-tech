import { IGetCart } from '@/types/entityTypes';

export default function hasProductInCart(cart: IGetCart[], productId: string): boolean {
    return cart.some(item => item.product.id === productId);
}