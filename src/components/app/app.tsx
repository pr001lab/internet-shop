import {Redirect, Route, Switch} from 'react-router-dom';
import {AppRoute, PAGINATION_FIRST_PAGE} from '../../const';
import Cart from '../../pages/cart/cart';
import Main from '../../pages/main/main';
import Page404 from '../../pages/page-404/page-404';
import Product from '../../pages/product/product';

function App(): JSX.Element {
  return (
    <Switch>
      <Redirect exact from={AppRoute.Main} to={`${AppRoute.Catalog}${PAGINATION_FIRST_PAGE}`} />
      <Route exact path={`${AppRoute.Catalog}:id`}>
        <Main />
      </Route>
      <Route exact path={`${AppRoute.Product}/:id`}>
        <Product />
      </Route>
      <Route exact path={AppRoute.Cart}>
        <Cart />
      </Route>
      <Route exact component={Page404}/>
    </Switch>
  );
}

export default App;
