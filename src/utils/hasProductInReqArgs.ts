import { IUpdateCart } from '@/types/entityTypes';

export default function hasProductInReqArgs(cart: IUpdateCart, productId: string): boolean {
    return cart.data.some((item) => item.id === productId);
}
