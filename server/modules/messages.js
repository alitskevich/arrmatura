import { CrudService, Hook } from '../core';

export class PrepareMessageHook extends Hook {
  handle({ data: { text }, params, params: { user: { _id: userId } } }) {
    if (!text) {
      throw new Error('A message must have a text');
    }
    return {
      data: {
        // Make sure that messages are no longer than 400 characters
        text: text.substring(0, 400),
        // Set the user id
        userId,
        // Add the current date
        createdAt: new Date().getTime()
      },
      params
    };
  }
}

export class PopulateUserHook extends Hook {
  async handle(context) {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { app, method, result, params } = context;
    // Function that adds the user to a single message object
    const addUser = async message => {
      // Get the user based on their id, pass the `params` along so
      // that we get a safe version of the user data
      const user = await app.service('users').get(message.userId, params);

      // Merge the message content to include the `user` object
      return {
        ...message,
        user
      };
    };

    // In a find method we need to process the entire page
    if (method === 'find') {
      // Map all data to include the `user` information
      context.result.data = await Promise.all(result.data.map(addUser));
    } else {
      // Otherwise just update the single result
      context.result = await addUser(result);
    }

    return context;
  }
}
