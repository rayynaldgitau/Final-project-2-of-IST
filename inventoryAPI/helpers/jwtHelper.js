const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
     signAccessToken: (UserId, userRole) => {
          return new Promise((resolve, reject) => {
               const payload = { UserId, role: userRole };
               const secret = process.env.ACCESS_TOKEN_SECRET;
               if (!secret) {
                    console.error('ACCESS_TOKEN_SECRET is not defined');
                    return reject(createError.InternalServerError('Internal server error'));
               }
               const options = {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1h',
                    issuer: 'RayInventories.com',
                    audience: UserId.toString(),
               };
               JWT.sign(payload, secret, options, (error, token) => {
                    if (error) {
                         console.log(error.message);
                         return reject(createError.InternalServerError());
                    }
                    resolve(token);
               });
          });
     },

     verifyAccessToken: (req, res, next) => {
          if (!req.headers['authorization']) return next(createError.Unauthorized('No authorization token provided'));
          const authHeader = req.headers['authorization'];
          const bearerToken = authHeader.split(' ');
          const token = bearerToken[1];

          JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
               if (err) {
                    if (err.name === 'JsonWebTokenError') {
                         return next(createError.Unauthorized());
                    } else {
                         return next(createError.Unauthorized(err.message));
                    }
               }
               req.payload = payload;
               next();
          });
     },

     signRefreshToken: (UserId) => {
          return new Promise((resolve, reject) => {
               const payload = { UserId };
               const secret = process.env.REFRESH_TOKEN_SECRET;
               if (!secret) {
                    console.error('REFRESH_TOKEN_SECRET is not defined');
                    return reject(createError.InternalServerError('Internal server error'));
               }
               const options = {
                    expiresIn: '1y',
                    issuer: 'RayInventories.com',
                    audience: UserId.toString(),
               };
               JWT.sign(payload, secret, options, (err, token) => {
                    if (err) {
                         console.log(err.message);
                         return reject(createError.InternalServerError());
                    }
                    resolve(token);
               });
          });
     },

     verifyRefreshToken: (refreshToken) => {
          return new Promise((resolve, reject) => {
               JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                    if (err) return reject(createError.Unauthorized());
                    const userId = payload.aud;
                    resolve(userId.toString());
               });
          });
     },

     // Uncomment and implement this middleware if role-based access is needed
     // restrict: (...allowedRoles) => {
     //     return (req, res, next) => {
     //         const userRole = req.payload.role;
     //         if (!userRole || !allowedRoles.includes(userRole)) {
     //             return next(createError.Forbidden('Sorry!! you do not have permission to perform this action.'));
     //         }
     //         next();
     //     };
     // }
};
