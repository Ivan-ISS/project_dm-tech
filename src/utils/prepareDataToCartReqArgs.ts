import { IGetCart, IUpdateCart } from '@/types/entityTypes';

export default function prepareDataToCartReqArgs(dataToPrepare: IGetCart[]): IUpdateCart {

    const result: IUpdateCart = { data: [] };

    for (let i = 0; i < dataToPrepare.length; i++) {
        result.data = [ ...result.data, { id: dataToPrepare[i].product.id, quantity: dataToPrepare[i].quantity } ];
    }

    return result;
}