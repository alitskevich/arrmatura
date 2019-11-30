import { CrudService, Hook } from '../core';

const crypto = require('crypto');
const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;


export class NewUserHook extends Hook {
  async handle(context) {
    const { data } = context;
    // This is the information we want from the user signup data
    const { email, password, githubId } = data;
    // Gravatar uses MD5 hashes from an email address (all lowercase) to get the image
    const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    // The full avatar URL
    const avatar = `https://s.gravatar.com/avatar/${hash}?s=60`;

    // Update the original data (so that people can't submit additional stuff)
    context.data = {
      email,
      password,
      githubId,
      avatar
    };

    return context;
  }
};

