import {FormEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {AppRoute, KeyboardName, StatusLoading} from '../../const';
import {loadSearchGuitarsSuccess} from '../../store/dataSearch/actions';
import {fetchSearchGuitarsAction} from '../../store/dataSearch/api-actions';
import {selectSearchGuitars, selectSearchGuitarsLoading} from '../../store/dataSearch/selectors';

function FormSearch(): JSX.Element {
  const refDivSearch = useRef<HTMLDivElement>(null);
  const searchGuitarsLoading = useSelector(selectSearchGuitarsLoading);
  const [search, setSearch] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isSearchGuitars, setIsSearchGuitars] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const searchGuitars = useSelector(selectSearchGuitars);

  useEffect(() => {
    if (search === '') {
      setIsSearchGuitars(true);
    }
    if (search !== '') {
      setIsSearchGuitars(false);
    }
  }, [search, searchGuitars.length]);

  useEffect(() => {
    function handleClickOutside(evt: any) {
      if (refDivSearch.current && !refDivSearch.current.contains(evt.target)) {
        setIsFocus(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refDivSearch]);

  useEffect(() => {
    if(search !== ''){
      dispatch(fetchSearchGuitarsAction(search));
    }

    return (() => {
      dispatch(loadSearchGuitarsSuccess([]));
    });
  }, [dispatch, search]);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(fetchSearchGuitarsAction(search));
  };

  const openCardProduct = (id: number) => {
    history.push(`${AppRoute.Product}/${id}`);
  };

  const handleKeyDown = (key: KeyboardEvent, index: number, id?: number) => {
    if (id !== undefined && (key.code === KeyboardName.Enter || key.code === KeyboardName.Space)) {
      key.preventDefault();
      openCardProduct(id);
    }

    if (key.code === KeyboardName.Tab && searchGuitars.length - 1 === index) {
      setIsFocus(false);
    }

    if (key.code === KeyboardName.Tab && searchGuitars.length === 0) {
      setIsFocus(false);
    }
  };

  return (
    <div ref={refDivSearch} className="form-search">
      <form
        className="form-search__form"
        onSubmit={handleFormSubmit}
      >
        <button className="form-search__submit" type="submit">
          <svg
            className="form-search__icon"
            width="14"
            height="15"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-search" />
          </svg>
          <span className="visually-hidden">
            Начать поиск
          </span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          value={search}
          onFocus={() => setIsFocus(true)}
          onChange={(evt) => setSearch(evt.target.value)}
          onKeyDown={(key: KeyboardEvent) => handleKeyDown(key, searchGuitars.length)}
          data-testid="textbox"
        />
        <label className="visually-hidden" htmlFor="search">
          Поиск
        </label>
      </form>
      {isFocus && searchGuitars.length > 0 && (
        <ul className="form-search__select-list" style={{zIndex: 1}}>
          {searchGuitars.map(({id, name}, index: number) => (
            <li
              key={id}
              className="form-search__select-item"
              tabIndex={0}
              onClick={() => openCardProduct(id)}
              onKeyDown={(key: KeyboardEvent) => handleKeyDown(key, index, id)}
              data-testid={id}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
      {isFocus && !isSearchGuitars && (
        <ul className="form-search__select-list">
          <li className="form-search__select-item">
            {[StatusLoading.Idle, StatusLoading.Loading].includes(searchGuitarsLoading)
              ? 'Идет поиск...'
              : 'Ничего не найдено'}
          </li>
        </ul>
      )}
    </div>
  );
}

export default FormSearch;
