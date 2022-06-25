import { createServer } from 'miragejs';
export function makeServer() {
  return createServer({
    routes() {
      this.passthrough();
      this.timing = 1000
      this.get(
        '/user/:id',
        () => {
          return {
            id:1,
            name: "boss"
          }
        }
      );
    },
  });
}
