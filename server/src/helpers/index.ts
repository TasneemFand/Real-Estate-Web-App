// helper in authentication
// encrypt password

import crypto from 'crypto';

/**secret to your project */
const SECRET = 'TASNEEM-REST-API';


export const authentication = (salt: string, password: string): string => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

export const random = () => crypto.randomBytes(128).toString('base64');