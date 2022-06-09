import appES from "app/translations/es.js";
import appEN from "app/translations/en.js";
import portfolioES from 'modules/portfolio/translations/es';
import portfolioEN from 'modules/portfolio/translations/en';

// Export all trabslations by language and namespace

const traslations = {
    es: {
      app: appES, // Default namespace
      portfolio: portfolioES,
    },
    en: {
      app: appEN, // Default namespace
      portfolio: portfolioEN,
    },
  };

export default traslations;
