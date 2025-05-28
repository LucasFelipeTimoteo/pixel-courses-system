import { MongooseService } from '../../../../../src/services/database/mongoose/mongooseService';

let connectionPromise: Promise<typeof import('mongoose')> | null = null;

export function getTestConnection() {
  if (!connectionPromise) {
    connectionPromise = new MongooseService('test_users').connect();
  }
  return connectionPromise;
}
