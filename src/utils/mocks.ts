import {datatype, name} from 'faker';
import {ProductWithQuantity} from '../store/dataCart/dataCartReducer';
import {GuitarType} from '../types/guitar';
import {ReviewPostType, ReviewType} from '../types/review';

export const makeFakeTitle = (): string => name.title();
export const makeFakeCount = (): number => datatype.number({
  'min': 0,
  'max': 50,
});

export const mockReview: ReviewType = {
  id: 'a7c267d0-a72d-41bd-8b8e-e7f67800d58a-mockReview',
  userName: 'Саша',
  advantage: 'Хорошо. Очень хорошо.',
  disadvantage: 'Плохо. Очень плохо.',
  comment: 'Неплохо, но дорого.',
  rating: 3,
  createAt: '2021-10-28T12:32:16.934Z',
  guitarId: 1,
};

export const mockReview2: ReviewType = {
  id: 'a7c267d0-a72d-41bd-8b8e-e7f67800d58a-mockReview2',
  userName: 'Саша',
  advantage: 'Хорошо. Очень хорошо.',
  disadvantage: 'Плохо. Очень плохо.',
  comment: 'Неплохо, но дорого.',
  rating: 3,
  createAt: '2021-10-28T12:32:16.934Z',
  guitarId: 1,
};

export const mockReview3: ReviewType = {
  id: 'a7c267d0-a72d-41bd-8b8e-e7f67800d58a-mockReview3',
  userName: 'Саша',
  advantage: 'Хорошо. Очень хорошо.',
  disadvantage: 'Плохо. Очень плохо.',
  comment: 'Неплохо, но дорого.',
  rating: 3,
  createAt: '2021-10-28T12:32:16.934Z',
  guitarId: 1,
};

export const mockReview4: ReviewType = {
  id: 'a7c267d0-a72d-41bd-8b8e-e7f67800d58a-mockReview4',
  userName: 'Саша',
  advantage: 'Хорошо. Очень хорошо.',
  disadvantage: 'Плохо. Очень плохо.',
  comment: 'Неплохо, но дорого.',
  rating: 3,
  createAt: '2021-10-28T12:32:16.934Z',
  guitarId: 1,
};

export const mockReviewPost: ReviewPostType = {
  userName: 'Саша',
  advantage: 'Хорошо. Очень хорошо.',
  disadvantage: 'Плохо. Очень плохо.',
  comment: 'Неплохо, но дорого.',
  rating: 3,
  guitarId: 1,
};

export const mockGuitar: GuitarType = {
  comments: [mockReview, mockReview2, mockReview3, mockReview4],
  id: 1,
  name: 'Честер Bass',
  vendorCode: 'SO757575',
  type: 'electric',
  description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
  previewImg: 'img/guitar-1.jpg',
  stringCount: 7,
  rating: 4,
  price: 17500,
};

export const mockGuitarWithQuantity: ProductWithQuantity = {
  quantity: 1,
  comments: [mockReview, mockReview2, mockReview3, mockReview4],
  id: 1,
  name: 'Честер Bass',
  vendorCode: 'SO757575',
  type: 'electric',
  description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
  previewImg: 'img/guitar-1.jpg',
  stringCount: 7,
  rating: 4,
  price: 17500,
};

export const mockCouponValue = 25;

export const mockCouponPost = {
  coupon: 'light-333',
};
