import dev from './dev.json';
import prod from './prod.json';

export const nconf = {
    get(key) {
        switch(process.env.NODE_ENV) {
            case 'production': {
                return prod[key];
            }
            default: {
                return dev[key];
            }
        }
    }
};