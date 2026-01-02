
import { TRANSLATIONS } from "./translations.js";

function getCardWidth(params, numColumns = 3) {
    const defaultWidth = 495;
    const minimumWidth = 100 * numColumns;
    return Math.max(minimumWidth, parseInt(params.cardWidth) || defaultWidth);
}

function getCardHeight(params) {
    const defaultHeight = 195;
    const minimumHeight = 170;
    return Math.max(minimumHeight, parseInt(params.cardHeight) || defaultHeight);
}

// Helper for short numbers
function formatNumber(num, locale, useShort) {
    if (useShort) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    }
    return new Intl.NumberFormat(locale).format(num);
}

export function generateSVG(stats, theme, params) {
    const hideBorder = params.hideBorder === 'true';
    const borderRadius = params.borderRadius || 4.5;
    const locale = params.locale || 'en';
    const shortNumbers = params.shortNumbers === 'true';
    
    // Section visibility
    const showTotal = params.hideTotal !== 'true';
    const showCurrent = params.hideCurrent !== 'true';
    const showLongest = params.hideLongest !== 'true';
    
    const numColumns = (showTotal ? 1 : 0) + (showCurrent ? 1 : 0) + (showLongest ? 1 : 0);
    const cardWidth = getCardWidth(params, numColumns);
    const cardHeight = getCardHeight(params);
    
    const heightOffset = (cardHeight - 195) / 2;
    const columnWidth = numColumns > 0 ? cardWidth / numColumns : 0;
    
    const columnOffsets = [];
    for (let i = 0; i < numColumns; i++) {
        columnOffsets.push(columnWidth / 2 + columnWidth * i);
    }
    
    let nextCol = 0;
    const totalContributionsOffset = showTotal ? columnOffsets[nextCol++] : -999;
    const currentStreakOffset = showCurrent ? columnOffsets[nextCol++] : -999;
    const longestStreakOffset = showLongest ? columnOffsets[nextCol++] : -999;
    
    const barOffsets = [];
    for (let i = 1; i < numColumns; i++) {
        barOffsets.push(columnWidth * i);
    }

    const barHeightOffsets = [28 + heightOffset / 2, 170 + heightOffset];
    
    const totalContributionsHeightOffset = [
        48 + heightOffset,
        84 + heightOffset,
        114 + heightOffset
    ];
    
    const currentStreakHeightOffset = [
        48 + heightOffset,      
        108 + heightOffset,     
        145 + heightOffset,     
        71 + heightOffset,      
        19.5 + heightOffset     
    ];

    const longestStreakHeightOffset = [
        48 + heightOffset,
        84 + heightOffset,
        114 + heightOffset
    ];
    
    const dateFormat = params.dateFormat;

    const formatDate = (d) => {
        if (!d || d === "Present") return TRANSLATIONS[locale]?.Present || "Present";
        const date = new Date(d);

        if (dateFormat) {
             const parts = {
                Y: date.getFullYear(),
                M: date.toLocaleDateString(locale, { month: 'short' }),
                n: date.getMonth() + 1,
                m: (date.getMonth() + 1).toString().padStart(2, '0'),
                j: date.getDate(),
                d: date.getDate().toString().padStart(2, '0'),
            };
            return dateFormat.replace(/[YMmnjd]/g, match => parts[match]);
        }

        return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
    };

    const border = hideBorder ? "#0000" : theme.border;
    const labels = TRANSLATIONS[locale] || TRANSLATIONS.en;

    // Gradient Handling
    let background = theme.background;
    let defs = `
            <clipPath id='outer_rectangle'>
                <rect width='${cardWidth}' height='${cardHeight}' rx='${borderRadius}'/>
            </clipPath>
            <mask id='mask_out_ring_behind_fire'>
                <rect width='${cardWidth}' height='${cardHeight}' fill='white'/>
                <ellipse id='mask-ellipse' cx='${currentStreakOffset}' cy='32' rx='13' ry='18' fill='black'/>
            </mask>
    `;

    if (theme.background.includes(',')) {
        const parts = theme.background.split(',');
        if (parts.length >= 3) {
            const angle = parts[0];
            const colors = parts.slice(1);
            let stops = '';
            colors.forEach((color, index) => {
                const offset = Math.round((index / (colors.length - 1)) * 100);
                stops += `<stop offset='${offset}%' stop-color='${color}' />`;
            });
            defs += `
            <linearGradient id='gradient' gradientTransform='rotate(${angle})' gradientUnits='userSpaceOnUse'>
                ${stops}
            </linearGradient>
            `;
            background = "url(#gradient)";
        }
    }

    return `
    <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' 
         viewBox='0 0 ${cardWidth} ${cardHeight}' width='${cardWidth}' height='${cardHeight}'>
        <style>
            @keyframes currstreak {
                0% { font-size: 3px; opacity: 0.2; }
                80% { font-size: 34px; opacity: 1; }
                100% { font-size: 28px; opacity: 1; }
            }
            @keyframes fadein {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
        </style>
        <defs>
            ${defs}
        </defs>

        <g clip-path='url(#outer_rectangle)'>
            <rect width='${cardWidth}' height='${cardHeight}' fill='${background}' stroke='${border}'/>
            
            ${barOffsets.map(x => `<line x1='${x}' y1='${barHeightOffsets[0]}' x2='${x}' y2='${barHeightOffsets[1]}' stroke='${theme.stroke}' stroke-width='1'/>`).join('')}
            
            ${showTotal ? `
            <g transform='translate(${totalContributionsOffset}, ${totalContributionsHeightOffset[0]})'>
                <text x='0' y='32' text-anchor='middle' fill='${theme.sideNums}' font-family='Segoe UI, Ubuntu, sans-serif' font-weight='700' font-size='28px' style='opacity: 0; animation: fadein 0.5s linear forwards 0.6s'>${formatNumber(stats.totalContributions, locale, shortNumbers)}</text>
            </g>
            <g transform='translate(${totalContributionsOffset}, ${totalContributionsHeightOffset[1]})'>
                <text x='0' y='32' text-anchor='middle' fill='${theme.sideLabels}' font-family='Segoe UI, Ubuntu, sans-serif' font-weight='400' font-size='14px' style='opacity: 0; animation: fadein 0.5s linear forwards 0.7s'>${labels['Total Contributions'] || "Total Contributions"}</text>
            </g>
             <g transform='translate(${totalContributionsOffset}, ${totalContributionsHeightOffset[2]})'>
                <text x='0' y='32' text-anchor='middle' fill='${theme.dates}' font-family='Segoe UI, Ubuntu, sans-serif' font-weight='400' font-size='12px' style='opacity: 0; animation: fadein 0.5s linear forwards 0.8s'>${formatDate(stats.firstContribution)} - ${labels['Present'] || "Present"}</text>
            </g>
            ` : ''}
            
            ${showCurrent ? `
            <g transform='translate(${currentStreakOffset}, ${currentStreakHeightOffset[0]})'>
                <text x='0' y='32' text-anchor='middle' fill='${theme.currStreakNum}' font-family='Segoe UI, Ubuntu, sans-serif' font-weight='700' font-size='28px' style='animation: currstreak 0.6s linear forwards'>${formatNumber(stats.currentStreak, locale, shortNumbers)}</text>
            </g>
            <g transform='translate(${currentStreakOffset}, ${currentStreakHeightOffset[1]})'>
                <text x='0' y='32' text-anchor='middle' fill='${theme.currStreakLabel}' font-family='Segoe UI, Ubuntu, sans-serif' font-weight='700' font-size='14px' style='opacity: 0; animation: fadein 0.5s linear forwards 0.9s'>${labels['Current Streak'] || "Current Streak"}</text>
            </g>
             <g transform='translate(${currentStreakOffset}, ${currentStreakHeightOffset[2]})'>
                <text x='0' y='21' text-anchor='middle' fill='${theme.dates}' font-family='Segoe UI, Ubuntu, sans-serif' font-weight='400' font-size='12px' style='opacity: 0; animation: fadein 0.5s linear forwards 0.9s'>${formatDate(stats.currentStreakStart)} - ${formatDate(stats.currentStreakEnd)}</text>
            </g>
             <g mask='url(#mask_out_ring_behind_fire)'>
                <circle cx='${currentStreakOffset}' cy='${currentStreakHeightOffset[3]}' r='40' fill='none' stroke='${theme.ring}' stroke-width='5' style='opacity: 0; animation: fadein 0.5s linear forwards 0.4s'></circle>
             </g>
             <g transform='translate(${currentStreakOffset}, ${currentStreakHeightOffset[4]})' style='opacity: 0; animation: fadein 0.5s linear forwards 0.6s'>
                 <path d='M -12 -0.5 L 15 -0.5 L 15 23.5 L -12 23.5 L -12 -0.5 Z' fill='none'/>
                 <path d='M 1.5 0.67 C 1.5 0.67 2.24 3.32 2.24 5.47 C 2.24 7.53 0.89 9.2 -1.17 9.2 C -3.23 9.2 -4.79 7.53 -4.79 5.47 L -4.76 5.11 C -6.78 7.51 -8 10.62 -8 13.99 C -8 18.41 -4.42 22 0 22 C 4.42 22 8 18.41 8 13.99 C 8 8.6 5.41 3.79 1.5 0.67 Z M -0.29 19 C -2.07 19 -3.51 17.6 -3.51 15.86 C -3.51 14.24 -2.46 13.1 -0.7 12.74 C 1.07 12.38 2.9 11.53 3.92 10.16 C 4.31 11.45 4.51 12.81 4.51 14.2 C 4.51 16.85 2.36 19 -0.29 19 Z' fill='${theme.fire}'/>
             </g>
            ` : ''}

            ${showLongest ? `
             <g transform='translate(${longestStreakOffset}, ${longestStreakHeightOffset[0]})'>
                <text x='0' y='32' text-anchor='middle' fill='${theme.sideNums}' font-family='Segoe UI, Ubuntu, sans-serif' font-weight='700' font-size='28px' style='opacity: 0; animation: fadein 0.5s linear forwards 1.2s'>${formatNumber(stats.longestStreak, locale, shortNumbers)}</text>
            </g>
            <g transform='translate(${longestStreakOffset}, ${longestStreakHeightOffset[1]})'>
                <text x='0' y='32' text-anchor='middle' fill='${theme.sideLabels}' font-family='Segoe UI, Ubuntu, sans-serif' font-weight='400' font-size='14px' style='opacity: 0; animation: fadein 0.5s linear forwards 1.3s'>${labels['Longest Streak'] || "Longest Streak"}</text>
            </g>
             <g transform='translate(${longestStreakOffset}, ${longestStreakHeightOffset[2]})'>
                <text x='0' y='32' text-anchor='middle' fill='${theme.dates}' font-family='Segoe UI, Ubuntu, sans-serif' font-weight='400' font-size='12px' style='opacity: 0; animation: fadein 0.5s linear forwards 1.4s'>${formatDate(stats.longestStreakStart)} - ${formatDate(stats.longestStreakEnd)}</text>
            </g>
            ` : ''}

        </g>
    </svg>
    `;
}
