import { default as DEV_CONF } from './dev.json';
import { default as PROD_CONF } from './prod.json';

export const nconf = {
  get(key) {
    const ENV = process.env.NODE_ENV;

    switch (ENV) {
      case 'production': {
        return Object.getOwnPropertyDescriptor(PROD_CONF, key)?.value || '';
      }
      default: {
        return Object.getOwnPropertyDescriptor(DEV_CONF, key)?.value || '';
      }
    }
  }
}