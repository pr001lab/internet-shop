import {MouseEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CartAddModal from '../../components/cart-add-modal/cart-add-modal';
import CartSuccessModal from '../../components/cart-success-modal/cart-success-modal';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import ProductDetails from '../../components/product-details/product-details';
import ProductReviews from '../../components/product-reviews/product-reviews';
import {AppRoute, PAGINATION_FIRST_PAGE, StatusLoading} from '../../const';
import {loadGuitarByIdFailure} from '../../store/dataGuitarById/actions';
import {fetchGuitarByIdAction} from '../../store/dataGuitarById/api-actions';
import {selectGuitarById, selectGuitarByIdLoading, selectGuitarByIdLoadingError} from '../../store/dataGuitarById/selectors';
import {BreadcrumbType} from '../../types/breadcrumb';
import Page404 from '../page-404/page-404';

function Product() : JSX.Element {
  const dispatch = useDispatch();
  const {id} = useParams <{id: string}>();
  const guitar = useSelector(selectGuitarById);
  const guitarLoading = useSelector(selectGuitarByIdLoading);
  const guitarByIdLoadingError = useSelector(selectGuitarByIdLoadingError);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isSuccessModalOpened, setIsSuccessModalOpened] = useState(false);

  const handleKeyDown = (key: KeyboardEvent) => {
    if (key.code === 'Escape') {
      setIsModalOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    document.title = 'Товар — Guitar-shop';
  }, []);

  useEffect(() => {
    dispatch(fetchGuitarByIdAction(String(id)));
  }, [dispatch, id]);

  useEffect(() => () => {
    dispatch(loadGuitarByIdFailure(null));
  }, [dispatch]);

  if (guitarByIdLoadingError) {
    return <Page404 />;
  }

  if ([StatusLoading.Idle, StatusLoading.Loading]
    .includes(guitarLoading) || guitar === null) {
    return (
      <Loader />
    );
  }

  const Breadcrumb: BreadcrumbType = {
    Main: {
      link: AppRoute.Main,
    },
    Catalog: {
      link: `${AppRoute.Catalog}${PAGINATION_FIRST_PAGE}`,
    },
    [guitar.name]: {
      link: undefined,
    },
  } as const;

  const handleModalOpenedLinkClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setIsModalOpened(true);
  };

  const handleAddCartClose = () => {
    setIsModalOpened(false);
  };

  const handleSuccessModalOpened = () => {
    setIsSuccessModalOpened(true);
  };

  const handleSucccessModalClose = () => {
    setIsSuccessModalOpened(false);
  };

  return (
    <>
      <div className="wrapper">
        <Header/>
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">
              {guitar.name}
            </h1>
            <Breadcrumbs breadcrumb={Breadcrumb} />
            <ProductDetails
              guitar={guitar}
              onModalOpenedLinkClick={handleModalOpenedLinkClick}
            />
            <ProductReviews />
          </div>
        </main>
        <Footer/>
      </div>
      {isModalOpened && (
        <CartAddModal
          guitar={guitar}
          onSuccessModalOpen={handleSuccessModalOpened}
          onCloseBtn={handleAddCartClose}
        />
      )}
      {isSuccessModalOpened && (
        <CartSuccessModal
          onCloseBtn={handleSucccessModalClose}
        />
      )}
    </>

  );
}

export default Product;
