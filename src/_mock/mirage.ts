import { createServer } from 'miragejs';
import { user } from './user';
export function makeServer() {
  return createServer({
    routes() {
      this.passthrough();
      this.timing = 1000
      this.get(
        '/user',
        () => {
          return user
        }
      );
      this.get(
        '/user/:id',
        (_schema, request) => {
          return user.find(({id})=> id === request.params.id) || null
        }
      );
    },
  });
}
