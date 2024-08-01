import { IGetCart } from '@/types/entityTypes';

export default function findProductInCart(cart: IGetCart[], productId: string): IGetCart | undefined {
    return cart.find(item => item.product.id === productId);
}