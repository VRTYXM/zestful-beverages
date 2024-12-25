import { CartItem } from '../redux/slices/cartSlice';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => {
    return sum + obj.priceForPack * obj.count;
  }, 0);
};
