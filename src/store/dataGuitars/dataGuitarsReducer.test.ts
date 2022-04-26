import {StatusLoading} from '../../const';
import {
  makeFakeCount,
  makeFakeTitle,
  mockGuitar
} from '../../utils/mocks';
import {
  getGuitarsDataReducer,
  getGuitarTypeListWithStrings
} from '../../utils/utils';
import {
  loadGuitarsFailure,
  loadGuitarsRequest,
  loadGuitarsSuccess
} from './actions';
import {dataGiutarsReducer, DataType} from './dataGuitarsReducer';


describe('Reducer: data', () => {
  let state: DataType = {
    guitars: [],
    guitarsCount: 0,
    guitarsPriceMin: '',
    guitarsPriceMax: '',
    guitarTypeListWithStrings: null,
    guitarsLoading: StatusLoading.Idle,
    guitarsLoadingError: null,
  };
  beforeEach(() => {
    state = {
      guitars: [],
      guitarsCount: 0,
      guitarsPriceMin: '',
      guitarsPriceMax: '',
      guitarTypeListWithStrings: null,
      guitarsLoading: StatusLoading.Idle,
      guitarsLoadingError: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(dataGiutarsReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('data: should update status of loading', () => {
    expect(dataGiutarsReducer(state, loadGuitarsRequest()))
      .toEqual({
        ...state,
        guitarsLoading: StatusLoading.Loading,
      });
  });

  it('data: should update data and status of loading', () => {
    const guitarsCount = makeFakeCount();
    const guitarTypeListWithStrings = getGuitarTypeListWithStrings([mockGuitar]);
    const {priceMinData, priceMaxData} = getGuitarsDataReducer([mockGuitar]);

    expect(dataGiutarsReducer(state, loadGuitarsSuccess([mockGuitar], guitarsCount)))
      .toEqual({
        ...state,
        guitars: [mockGuitar],
        guitarsPriceMin: String(priceMinData),
        guitarsPriceMax: String(priceMaxData),
        guitarTypeListWithStrings,
        guitarsCount,
        guitarsLoading: StatusLoading.Succeeded,
      });
  });

  it('data: should update error and status of loading', () => {
    const error = makeFakeTitle();

    expect(dataGiutarsReducer(state, loadGuitarsFailure(error)))
      .toEqual({
        ...state,
        guitarsLoading: StatusLoading.Failed,
        guitarsLoadingError: error,
      });
  });

});
