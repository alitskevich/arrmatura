import { Service, Hook } from '../core';

const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth, OAuthStrategy } = require('@feathersjs/authentication-oauth');

const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;


class GitHubStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);

    return {
      ...baseData,
      email: profile.email
    };
  }
}

export class AuthService extends Service {

  init() {
    const app = this.app.web.expressApp;
    const authService = new AuthenticationService(app);

    authService.register('jwt', new JWTStrategy());
    authService.register('local', new LocalStrategy());
    authService.register('github', new GitHubStrategy());

    app.use('/authentication', authService);
    app.configure(expressOauth());

  }
};
export class AuthHook extends Hook {
  createHandler() {
    return authenticate(this.type || 'jwt')
  }
}
export class HashPasswordHook extends Hook {
  createHandler() {
    return hashPassword(this.field || 'password')
  }
}
export class ProtectPasswordHook extends Hook {
  createHandler() {
    return protect(this.field || 'password')
  }
}