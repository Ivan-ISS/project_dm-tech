import { IGetCart } from '@/types/entityTypes';
import { IResultValidateCart } from '@/types/dataTypes';

export default function validateCart(cart: IGetCart[], totalPrice: number): IResultValidateCart {

    const productWithWarning = cart.filter(item => item.quantity === 10);
    const productWithError = cart.filter(item => item.quantity > 10);

    const resultValidate = {
        minPrice: {
            isValid: !(totalPrice < 1),
            error: '',
        },
        maxPrice: {
            isValid: !(totalPrice > 30000),
            error: 'Максимальная цена - 30 000 ₽',
        },
        warnQuantity: {
            isWarning: !productWithWarning.length,
            warning: 'Достигнут максимум - 10 шт',
            productId: productWithWarning.map(item => item.product.id),
        },
        maxQuantity: {
            isValid: !productWithError.length,
            error: 'Превышен максимум - 10 шт',
            productId: productWithError.map(item => item.product.id),
        },
    };

    return resultValidate;
}