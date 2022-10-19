import config from './config';
import SisenseConfig from './sisense_config.json';

type ObjectKey = keyof typeof SisenseConfig;
const deploy_env = config.DEPLOY_ENV as ObjectKey;

const regionalConfig = SisenseConfig[deploy_env];

export default regionalConfig;
