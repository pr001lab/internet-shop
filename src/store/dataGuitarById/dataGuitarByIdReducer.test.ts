import {StatusLoading} from '../../const';
import {makeFakeTitle, mockGuitar} from '../../utils/mocks';
import {
  loadGuitarByIdFailure,
  loadGuitarByIdRequest,
  loadGuitarByIdSuccess
} from './actions';
import {dataGiutarByIdReducer, DataType} from './dataGuitarByIdReducer';

describe('Reducer: data', () => {
  let state: DataType = {
    guitarById: null,
    guitarByIdLoading: StatusLoading.Idle,
    guitarByIdLoadingError: null,
  };
  beforeEach(() => {
    state = {
      guitarById: null,
      guitarByIdLoading: StatusLoading.Idle,
      guitarByIdLoadingError: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(dataGiutarByIdReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('data: should update status of loading', () => {
    expect(dataGiutarByIdReducer(state, loadGuitarByIdRequest()))
      .toEqual({
        ...state,
        guitarByIdLoading: StatusLoading.Loading,
      });
  });

  it('data: should update data and status of loading', () => {
    expect(dataGiutarByIdReducer(state, loadGuitarByIdSuccess(mockGuitar)))
      .toEqual({
        ...state,
        guitarById: mockGuitar,
        guitarByIdLoading: StatusLoading.Succeeded,
      });
  });

  it('data: should update error and status of loading', () => {
    const error = makeFakeTitle();

    expect(dataGiutarByIdReducer(state, loadGuitarByIdFailure(error)))
      .toEqual({
        ...state,
        guitarByIdLoading: StatusLoading.Failed,
        guitarByIdLoadingError: error,
      });
  });

});
