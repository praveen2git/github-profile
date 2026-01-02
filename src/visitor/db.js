
import { createClient } from '@vercel/kv';

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = (url && token) ? createClient({
    url: url,
    token: token
}) : null;

export async function incrementCount(key) {
    if (!redis) {
        console.warn("Vercel KV/Upstash Redis credentials are not configured.");
        return 0; // Or handle error appropriately
    }

    try {
        const val = await redis.incr(`visitor:${key}`);
        return val;
    } catch (e) {
        console.error("Vercel KV error:", e);
        return 0;
    }
}

export async function getCount(key) {
    if (!redis) {
        return 0;
    }

    try {
        const val = await redis.get(`visitor:${key}`);
        return val || 0;
    } catch (e) {
        console.error("Vercel KV error:", e);
        return 0;
    }
}
