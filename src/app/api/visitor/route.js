
import { NextResponse } from 'next/server';
import { generateBadge } from "../../../visitor/badge";
import { incrementCount } from "../../../visitor/db";
import { THEMES } from "../../../visitor/themes";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || searchParams.get('username') || 'unknown';
    
    // Increment visit count
    const count = await incrementCount(page);

    // Get style parameters
    const label = searchParams.get('label') || 'visitors';
    const color = searchParams.get('color') || '4c1';
    const labelColor = searchParams.get('labelColor') || '555';
    const textColor = searchParams.get('textColor') || 'fff';
    const template = searchParams.get('template') || 'flat';

    // Normalize colors (add # if missing)
    const normalizeColor = (c) => c.startsWith('#') ? c : `#${c}`;

    const svg = generateBadge({
        label,
        count,
        color: normalizeColor(color),
        labelColor: normalizeColor(labelColor),
        textColor: normalizeColor(textColor),
        template
    });

    return new NextResponse(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'no-store, max-age=0, must-revalidate'
        }
    });
}
