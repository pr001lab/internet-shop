import {combineReducers} from 'redux';
import {dataCartReducer} from './dataCart/dataCartReducer';
import {dataCouponPostReducer} from './dataCouponPost/dataCouponPostReducer';
import {dataGiutarByIdReducer} from './dataGuitarById/dataGuitarByIdReducer';
import {dataGiutarsReducer} from './dataGuitars/dataGuitarsReducer';
import {dataReviewPostReducer} from './dataReviewPost/dataReviewPostReducer';
import {dataReviewsReducer} from './dataReviews/dataReviewsReducer';
import {dataSearchReducer} from './dataSearch/dataSearchReducer';

export enum NameSpace {
  DataGuitars = 'DATAGUITARS',
  DataSearch = 'DATASEARCH',
  DataGuitarById = 'DATAGUITARBYID',
  DataReviews = 'DATAREVIEWS',
  DataReviewPost = 'DATAREVIEWPOST',
  DataCart = 'DATACART',
  DataCouponPost = 'DATACOUPONPOST',
}

export const rootReducer = combineReducers({
  [NameSpace.DataGuitars]: dataGiutarsReducer,
  [NameSpace.DataSearch]: dataSearchReducer,
  [NameSpace.DataGuitarById]: dataGiutarByIdReducer,
  [NameSpace.DataReviews]: dataReviewsReducer,
  [NameSpace.DataReviewPost]: dataReviewPostReducer,
  [NameSpace.DataCart]: dataCartReducer,
  [NameSpace.DataCouponPost]: dataCouponPostReducer,
});

export type State = ReturnType<typeof rootReducer>;
