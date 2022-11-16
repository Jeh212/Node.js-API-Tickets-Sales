/**
 *
 * * This is a short promise function avoiding use try catch on repositories functions
 *
 * @parms (promise)
 *
 *
 */

const handleRepo = (promise: any) =>
  promise.then((result: any) => [null, result]).catch((error: any) => [error]);

export { handleRepo };
