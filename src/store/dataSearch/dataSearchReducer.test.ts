import {StatusLoading} from '../../const';
import {
  makeFakeTitle,
  mockGuitar
} from '../../utils/mocks';
import {
} from '../../utils/utils';
import {
  loadSearchGuitarsFailure,
  loadSearchGuitarsRequest,
  loadSearchGuitarsSuccess
} from './actions';
import {dataSearchReducer, DataType} from './dataSearchReducer';


describe('Reducer: data', () => {
  let state: DataType = {
    searchGuitars: [],
    searchGuitarsLoading: StatusLoading.Idle,
    searchGuitarsLoadingError: null,
  };
  beforeEach(() => {
    state = {
      searchGuitars: [],
      searchGuitarsLoading: StatusLoading.Idle,
      searchGuitarsLoadingError: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(dataSearchReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('searchGuitars: should update status of loading', () => {
    expect(dataSearchReducer(state, loadSearchGuitarsRequest()))
      .toEqual({
        ...state,
        searchGuitarsLoading: StatusLoading.Loading,
      });
  });

  it('searchGuitars: should update data and status of loading', () => {
    expect(dataSearchReducer(state, loadSearchGuitarsSuccess([mockGuitar])))
      .toEqual({
        ...state,
        searchGuitars: [mockGuitar],
        searchGuitarsLoading: StatusLoading.Succeeded,
      });
  });

  it('searchGuitars: should update error and status of loading', () => {
    const error = makeFakeTitle();

    expect(dataSearchReducer(state, loadSearchGuitarsFailure(error)))
      .toEqual({
        ...state,
        searchGuitarsLoading: StatusLoading.Failed,
        searchGuitarsLoadingError: error,
      });
  });

});
