export const LIMIT_PAGE = 9;
export const PAGINATION_FIRST_PAGE = 1;
export const COUNT_REVIEWS = 3;

export const enum KeyboardName {
  Enter = 'Enter',
  Escape = 'Escape',
  Space = 'Space',
  Tab = 'Tab'
}

export enum APIRoute {
  Guitars = '/guitars',
  SearchGuitars = '/guitars?name_like=',
  Reviews = '/comments',
  EmbedComments = '?_embed=comments',
  Coupon = '/coupons',
}

export enum AppRoute {
  Main = '/',
  Product = '/guitars',
  Catalog = '/catalog/page_',
  Cart = '/cart',
}

export const BreadcrumbsName: {[key: string]: string} = {
  Main: 'Главная',
  Catalog: 'Каталог',
  Cart: 'Корзина',
} as const;

export enum ReviewPostField {
  GuitarId = 'guitarId',
  UserName = 'userName',
  Advantage = 'advantage',
  Disadvantage = 'disadvantage',
  Comment = 'comment',
  Rating = 'rating',
}

export enum CouponPostField {
  Coupon = 'coupon',
}

export enum StatusLoading {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export enum SortType {
  Price = 'price',
  Rating = 'rating',
}

export enum SortOrderType {
  Asc = 'asc',
  Desc = 'desc',
}

export enum SortButtonName {
  Price = 'по цене',
  Rating = 'по популярности',
  Asc = 'По возрастанию',
  Desc = 'По убыванию',
}

export enum ParamNames {
  PriceGte = 'price_gte',
  PriceLte = 'price_lte',
  Type = 'type',
  StringCount = 'stringCount',
  SortingType = '_sort',
  SortingOrder = '_order',
  StartNumberPosition = '_start',
  LimitPosition = '_limit',
}

export enum FieldNames {
  PriceMin = 'priceMin',
  PriceMax = 'priceMax',
}

export enum PaginationButton {
  Next = 'Далее',
  Back = 'Назад',
}

export const FilterDictionary: {[key: string]: string} = {
  acoustic: 'Акустические гитары',
  electric: 'Электрогитары',
  ukulele: 'Укулеле',
} as const;

export const ProductDictionary: {[key: string]: string} = {
  acoustic: 'Акустическая гитара',
  electric: 'Электрогитара',
  ukulele: 'Укулеле',
} as const;

export enum LogoComponent {
  Header = 'header',
  Footer = 'footer',
}

export enum RatingComponent {
  Review = 'review',
}
