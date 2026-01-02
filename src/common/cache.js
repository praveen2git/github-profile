export const CACHE_TTL = {
    TOP_LANGS_CARD: { DEFAULT: 1800, MIN: 600, MAX: 86400 }
};

export const resolveCacheSeconds = ({ requested, def, min, max }) => {
    if (!requested) return def;
    if (requested < min) return min;
    if (requested > max) return max;
    return requested;
};

export const setCacheHeaders = (res, seconds) => {
    res.headers.set("Cache-Control", `public, max-age=${seconds}`);
};

export const setErrorCacheHeaders = (res) => {
    res.headers.set("Cache-Control", "no-store, max-age=0");
};
