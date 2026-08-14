import type { RequestHandler } from 'express';

export function asyncHandler<
  Params,
  ResBody,
  ReqBody,
  ReqQuery,
  Locals extends Record<string, unknown>,
>(
  handler: RequestHandler<Params, ResBody, ReqBody, ReqQuery, Locals>,
): RequestHandler<Params, ResBody, ReqBody, ReqQuery, Locals> {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
