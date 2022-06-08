import { React } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';

import styles from './PortfolioPage.module.scss';
import { PortfolioProvider } from '../../contexts/portfolioContext';
import { TokensTable } from '../../components';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const PortfolioPage = ({ className, id }) => {
  const portfolioPageClassNames = classnames(styles.PortfolioPage, className);

  return (
    <div
      className={ portfolioPageClassNames }
      id={ id }
    >
      <PortfolioProvider>
        PortfolioPage component
        <TokensTable />
      </PortfolioProvider>
    </div>
  );
};

PortfolioPage.propTypes = propTypes;
PortfolioPage.defaultProps = defaultProps;

export default PortfolioPage;
