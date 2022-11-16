import { PrismaClient } from "@prisma/client";

const ormClient = new PrismaClient({
  errorFormat: "pretty",
  log: [
    { level: "warn", emit: "event" },
    { level: "info", emit: "event" },
    { level: "error", emit: "event" },
  ],
});

async function main() {
  /*
   * * Conect to Prisma Client
   */
  await ormClient.$connect();
}

/*
 * * The main().catch closes the connection
 */
main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    ormClient.$disconnect;
  });

export { ormClient };
