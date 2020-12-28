
import { NextFunction, Request, Response } from "express";
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from "@shared/errors/AppError";

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'midleware',
  points: 5,
  duration: 1,
})

export default async function raterLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429)
  }
}
