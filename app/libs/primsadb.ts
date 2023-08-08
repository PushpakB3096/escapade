import { PrismaClient } from '@prisma/client';
import { IS_PRODUCTION } from '../global/constants';

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

// in local env, hot reloading can cause multiple instances of PrismaClient to be created.
if (!IS_PRODUCTION) {
  globalThis.prisma = client;
}

export default client;
