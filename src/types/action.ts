import {Action} from 'redux';
import {AxiosInstance} from 'axios';
import {ThunkAction} from 'redux-thunk';
import {State} from '../store/root-reducer';

export type ThunkActionResult<R = Promise<void>>
  = ThunkAction<R, State, AxiosInstance, Action>;
