import ReactLoaderSpiner from 'react-loader-spinner';
import {loadersDisplayType, LoaderType} from '../../types/loader';
import styles from './loader.module.css';

const loadersSize: loadersDisplayType = {
  'type': LoaderType.Oval,
  'color': 'black',
  'height': '250px',
  'width': '250px',
};

function Loader(): JSX.Element {
  return (
    <div
      className={styles.loader}
      data-testid="loader"
    >
      <ReactLoaderSpiner
        type={loadersSize['type']}
        color={loadersSize['color']}
        height={loadersSize['height']}
        width={loadersSize['width']}
      />
    </div>
  );
}

export default Loader;
