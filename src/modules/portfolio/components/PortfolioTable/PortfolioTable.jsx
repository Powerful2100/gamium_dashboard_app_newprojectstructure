import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './PortfolioTable.module.scss';
import PortfolioModel from '../../models/PortfolioModel';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  portfolio: PropTypes.instanceOf(PortfolioModel).isRequired,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const PortfolioTable = ({ className, id, portfolio }) => {
  const portfolioTableClassNames = classnames(styles.PortfolioTable, className);

  return (
    <div
      className={ portfolioTableClassNames }
      id={ id }
    >
      { Object.entries(portfolio).map(([label, value]) => (
        <div key={ `$row-${label}`}>
          <span>{ `${String(label)}: ` }</span>
          <span>{ String(value).substring(0, 100) }</span>
        </div>
      ))}
    </div>
  );
};

PortfolioTable.propTypes = propTypes;
PortfolioTable.defaultProps = defaultProps;

export default PortfolioTable;
