import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './PortfolioPage.module.scss';
import { PortfolioProvider } from '../../contexts/portfolioContext';
import { PortfolioOverview } from '../../components';


const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const PortfolioPage = ({ className, id }) => {
  const { t } = useTranslation(['portfolio']);

  const portfolioPageClassNames = classnames(styles.PortfolioPage, className);

  return (
    <div
      className={ portfolioPageClassNames }
      id={ id }
    >
      <PortfolioProvider>
        <h1>
          {t('page.title')}
        </h1>
        <PortfolioOverview />
      </PortfolioProvider>
    </div>
  );
};

PortfolioPage.propTypes = propTypes;
PortfolioPage.defaultProps = defaultProps;

export default PortfolioPage;
