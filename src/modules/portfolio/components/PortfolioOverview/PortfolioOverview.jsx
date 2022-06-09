import React from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import { Button, Form } from 'react-bootstrap';

import styles from './PortfolioOverview.module.scss';
import PortfolioTable from '../PortfolioTable';
import usePortfolioContext from '../../contexts/portfolioContext';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const PortfolioOverview = ({ className, id }) => {
  const { 
    portfolio, chainId, address, error, loading, 
    fetchPortfolio, setChainId, setAddress 
  } = usePortfolioContext();

  const chainIdSelectorHandler = event => setChainId(Number(event.target.value));

  const addressControlHandler = event => setAddress(event.target.value);

  const portfolioOverviewClassNames = classnames(styles.PortfolioOverview, className);

  return (
    <div
      className={ portfolioOverviewClassNames }
      id={ id }
    >
      <h2>PortfolioOverview component</h2>
      <Form className={ styles.PortfolioForm }>
        <Form.Select 
          aria-label="chain ID selector"
          value={ chainId }
          onChange={ chainIdSelectorHandler }
        >
          <option>Select chain ID</option>
          <option value="1">1</option>
          <option value="56">56</option>
        </Form.Select>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text" 
            placeholder="Enter wallet address"
            value={ address }
            onChange={ addressControlHandler }
          />
        </Form.Group>
        <Button onClick={ fetchPortfolio } variant="primary" type="button">
          Fetch portfolio
        </Button>
      </Form>
      <div>
        { error && 'ERROR'}
        { loading && 'LOADING'}
        { !!portfolio && <PortfolioTable portfolio={ portfolio }/> }
      </div>
    </div>
  );
};

PortfolioOverview.propTypes = propTypes;
PortfolioOverview.defaultProps = defaultProps;

export default PortfolioOverview;
