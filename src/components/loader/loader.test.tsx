import {Router} from 'react-router-dom';
import {screen, render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import Loader from './loader';

const history = createMemoryHistory();

describe('Component: Loader', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Loader />
      </Router>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
