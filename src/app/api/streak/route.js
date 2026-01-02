import { NextResponse } from 'next/server';
import { THEMES } from "../../../streak/themes.js";
import { fetchContributionData, calculateStreak } from "../../../streak/fetcher.js";
import { generateSVG } from "../../../streak/card.js";

// ==========================================
// ROUTE HANDLER
// ==========================================

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const themeName = searchParams.get('theme') || 'default';
  
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  // Params
  const hideBorder = searchParams.get('hide_border');
  const borderRadius = searchParams.get('border_radius');
  const cardWidth = searchParams.get('card_width');
  const cardHeight = searchParams.get('card_height');
  const shortNumbers = searchParams.get('short_numbers');
  const locale = searchParams.get('locale');
  const hideTotal = searchParams.get('hide_total_contributions');
  const hideCurrent = searchParams.get('hide_current_streak');
  const hideLongest = searchParams.get('hide_longest_streak');
  const dateFormat = searchParams.get('date_format');

  const excludeDaysParam = searchParams.get('exclude_days');
  const excludeDays = excludeDaysParam ? excludeDaysParam.split(',') : [];

  try {
     const contributions = await fetchContributionData(username);
     const stats = calculateStreak(contributions, excludeDays);
     
     // Clone theme to avoid mutating const
     const baseTheme = THEMES[themeName] || THEMES.default;
     const theme = { ...baseTheme };
     
     // Override colors if present in query params
     Object.keys(theme).forEach(key => {
        const val = searchParams.get(key);
        if (val) {
             theme[key] = val.startsWith('#') || /^[0-9a-fA-F]{3,8}$/.test(val) ? (val.startsWith('#') ? val : `#${val}`) : val;
        }
     });

     const svg = generateSVG(stats, theme, {
         hideBorder,
         borderRadius,
         cardWidth,
         cardHeight,
         shortNumbers,
         locale,
         hideTotal,
         hideCurrent,
         hideLongest,
         dateFormat
     });

     return new NextResponse(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'no-store, max-age=0',
        }
     });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate streak stats', details: error.message }, { status: 500 });
  }
}
