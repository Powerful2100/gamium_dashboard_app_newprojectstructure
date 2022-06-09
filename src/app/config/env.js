const NODE_ENV = process.NODE_ENV;

const NODE_ENVS = {
    DEV: 'development',
    PROD: 'production',
}

const env = {
    DEBUG: NODE_ENV === NODE_ENVS.DEV,
};

export default env;
