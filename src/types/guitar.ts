import {ReviewType} from './review';

export type GuitarType = {
  comments: ReviewType[],
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
}
