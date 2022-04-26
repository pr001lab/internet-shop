import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Route, Router, Switch} from 'react-router-dom';
import {LogoComponent} from '../../const';
import Logo from './logo';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const logoAltText = 'Логотип';
    render(
      <Router history={history}>
        <Logo logoComponent={LogoComponent.Header} />
      </Router>,
    );

    expect(screen.getByAltText(new RegExp(logoAltText, 'i')))
      .toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root when user clicked to link', () => {
    history.push('/fake');
    const headingrMainPage = 'Main page';

    render(
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <h1>{headingrMainPage}</h1>
          </Route>
          <Route>
            <Logo logoComponent={LogoComponent.Header} />
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.queryByText(new RegExp(headingrMainPage, 'i')))
      .not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(new RegExp(headingrMainPage, 'i')))
      .toBeInTheDocument();
  });
});
