
import * as messages from './messages'
import * as users from './users'

import { loadTemplates } from 'components/support.js';
import messagesTemplates from './messages.html';
import usersTemplates from './users.html';

export default [
    ...Object.values(messages),
    ...Object.values(users),
    ...loadTemplates(messagesTemplates),
    ...loadTemplates(usersTemplates)
]