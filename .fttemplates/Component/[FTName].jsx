import { React } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';

import styles from './[FTName].module.scss';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const [FTName] = ({ className, id }) => {
  const <FTName | camelcase>ClassNames = classnames(styles.[FTName], className);

  return (
    <div
      className={ <FTName | camelcase>ClassNames }
      id={ id }
    >
      [FTName] component
    </div>
  );
};

[FTName].propTypes = propTypes;
[FTName].defaultProps = defaultProps;

export default [FTName];
