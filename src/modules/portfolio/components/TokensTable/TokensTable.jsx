import { React } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';

import usePortfolioContext from '../../contexts/portfolioContext';

import styles from './TokensTable.module.scss';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const TokensTable = ({ className, id }) => {
  const tokensTableClassNames = classnames(styles.TokensTable, className);
  const { portfolio, setPortfolio, fetchPortfolio } = usePortfolioContext();

  return (
    <div
      className={ tokensTableClassNames }
      id={ id }
    >
      TokensTable component
    </div>
  );
};

TokensTable.propTypes = propTypes;
TokensTable.defaultProps = defaultProps;

export default TokensTable;
