import PortfolioPage from "modules/portfolio/pages/PortfolioPage";

const paths = {
    home: '/',
    portfolio: '/portfolio',
    analytics: '/analytics',
    nfts: '/nfts',
};

const sections = {
    home: {},
    portfolio: {
        overview: 'overview',
        history: 'history',
    },
    analytics: {},
    nfts: {},
};

const routes = {
    home: {
        path: paths.home,
        title: 'routing.home',
        component: PortfolioPage
    },
    portfolio: {
        path: paths.portfolio,
        title: 'routing.portfolio',
        component: PortfolioPage
    },
    analytics: {
        path: paths.analytics,
        title: 'routing.analytics',
        component: undefined
    },
    nfts: {
        path: paths.nfts,
        title: 'routing.nfts',
        component: undefined
    },
}
  
export {
    paths,
    sections,
    routes,
}
