import { NextResponse } from 'next/server';
import { renderTopLanguages } from "../../../cards/top-languages.js";
import { fetchTopLanguages } from "../../../fetchers/top-languages.js";
import { guardAccess } from "../../../common/access.js";
import {
  CACHE_TTL,
  resolveCacheSeconds,
  setCacheHeaders,
  setErrorCacheHeaders,
} from "../../../common/cache.js";
import {
  MissingParamError,
  retrieveSecondaryMessage,
} from "../../../common/error.js";
import { parseArray, parseBoolean } from "../../../common/ops.js";
import { renderError } from "../../../common/render.js";
import { isLocaleAvailable } from "../../../translations.js";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  
  const query = Object.fromEntries(searchParams.entries());

  const {
    username,
    hide,
    hide_title,
    hide_border,
    card_width,
    title_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    layout,
    langs_count,
    exclude_repo,
    size_weight,
    count_weight,
    custom_title,
    locale,
    border_radius,
    border_color,
    disable_animations,
    hide_progress,
    stats_format,
  } = query;

  // Mock res object for helper functions that modify headers
  const res = {
      headers: new Headers(),
      send: (body) => new NextResponse(body, { headers: res.headers, status: 200 })
  };
  res.headers.set("Content-Type", "image/svg+xml");
  
  const access = guardAccess({
    res: null, // Stub doesn't use it
    id: username,
    type: "username",
    colors: {
      title_color,
      text_color,
      bg_color,
      border_color,
      theme,
    },
  });

  if (!access.isPassed) {
    return new NextResponse(renderError({ message: "Access Denied", renderOptions: query }), { status: 403, headers: res.headers });
  }

  if (
    layout !== undefined &&
    layout !== "compact" && status !== "normal" &&
    !["compact", "normal", "donut", "donut-vertical", "pie"].includes(layout)
  ) {
     return new NextResponse(renderError({ message: "Incorrect layout input", renderOptions: query }), { headers: res.headers });
  }

  try {
    const topLangs = await fetchTopLanguages(
      username,
      parseArray(exclude_repo),
      size_weight ? parseInt(size_weight) : 1,
      count_weight ? parseInt(count_weight) : 0,
    );
    const cacheSeconds = resolveCacheSeconds({
      requested: parseInt(cache_seconds, 10),
      def: CACHE_TTL.TOP_LANGS_CARD.DEFAULT,
      min: CACHE_TTL.TOP_LANGS_CARD.MIN,
      max: CACHE_TTL.TOP_LANGS_CARD.MAX,
    });

    setCacheHeaders(res, cacheSeconds);

    const svg = renderTopLanguages(topLangs, {
        custom_title,
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        card_width: parseInt(card_width, 10),
        hide: parseArray(hide),
        title_color,
        text_color,
        bg_color,
        theme,
        layout,
        langs_count: langs_count ? parseInt(langs_count) : undefined,
        border_radius: border_radius ? parseFloat(border_radius) : undefined,
        border_color,
        locale: locale ? locale.toLowerCase() : null,
        disable_animations: parseBoolean(disable_animations),
        hide_progress: parseBoolean(hide_progress),
        stats_format,
      });

    return new NextResponse(svg, { headers: res.headers });

  } catch (err) {
    setErrorCacheHeaders(res);
    return new NextResponse(renderError({ 
        message: err.message || "An unknown error occurred",
        secondaryMessage: retrieveSecondaryMessage(err),
        renderOptions: query
    }), { headers: res.headers });
  }
};
