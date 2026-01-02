
const CHAR_WIDTHS = {
  "a": 55, "b": 55, "c": 50, "d": 55, "e": 55, "f": 30, "g": 55, "h": 55, "i": 21, "j": 25, "k": 50, "l": 25, "m": 80, "n": 55, "o": 55, "p": 55, "q": 55, "r": 35, "s": 45, "t": 30, "u": 55, "v": 50, "w": 75, "x": 50, "y": 50, "z": 45,
  "A": 70, "B": 70, "C": 70, "D": 70, "E": 65, "F": 60, "G": 70, "H": 75, "I": 30, "J": 50, "K": 70, "L": 60, "M": 85, "N": 75, "O": 75, "P": 65, "Q": 75, "R": 70, "S": 65, "T": 60, "U": 75, "V": 65, "W": 95, "X": 65, "Y": 65, "Z": 60,
  "0": 55, "1": 45, "2": 55, "3": 55, "4": 55, "5": 55, "6": 55, "7": 55, "8": 55, "9": 55,
  "-": 30, "_": 55, " ": 30, ".": 25, ",": 25, ":": 25, ";": 25, "!": 25, "?": 55, "'": 20, "\"": 35, "(": 35, ")": 35, "[": 35, "]": 35, "{": 35, "}": 35, "@": 90, "#": 55, "$": 55, "%": 85, "^": 50, "&": 70, "*": 40, "+": 55, "=": 55, "<": 55, ">": 55, "/": 35, "\\": 35, "|": 25, "`": 30, "~": 55
};

function getTextWidth(text, size = 11) {
  let width = 0;
  for (let i = 0; i < text.length; i++) {
    width += CHAR_WIDTHS[text[i]] || 55;
  }
  return (width / 100) * (size || 11) * 8.5; // Rough approximation
}

export function generateBadge({ label, count, color, labelColor, textColor, template, icon }) {
    // Basic defaults
    label = label || "visitors";
    count = String(count);
    color = color || "#4c1";
    labelColor = labelColor || "#555";
    textColor = textColor || "#fff";
    
    // Width calculations
    const labelWidth = Math.ceil(getTextWidth(label) / 10) * 10 + 20;
    const countWidth = Math.ceil(getTextWidth(count) / 10) * 10 + 20;
    const totalWidth = labelWidth + countWidth;
    const height = 20;

    let svg = "";

    if (template === "digital") {
        // Pad count to at least 7 digits or requested length
        const displayCount = count.padStart(7, '0');
        const digitWidth = 30;
        const spacing = 4;
        const digitHeight = 35;
        const totalW = displayCount.length * (digitWidth + spacing) - spacing; // No spacing after last one
        
        let digitsSvg = "";
        for (let i = 0; i < displayCount.length; i++) {
            const x = i * (digitWidth + spacing);
            digitsSvg += `
                <g transform="translate(${x}, 0)">
                    <rect width="${digitWidth}" height="${digitHeight}" fill="black" rx="2" />
                    <text x="${digitWidth/2}" y="${digitHeight/2 + 7}" text-anchor="middle" font-family="Courier New, monospace" font-weight="bold" font-size="24" fill="#00ff00">${displayCount[i]}</text>
                </g>
            `;
        }

        svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${digitHeight}">
            ${digitsSvg}
        </svg>
        `;

    } else if (template === "flat-square") {
        svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}">
            <g shape-rendering="crispEdges">
                <rect width="${labelWidth}" height="${height}" fill="${labelColor}"/>
                <rect x="${labelWidth}" width="${countWidth}" height="${height}" fill="${color}"/>
            </g>
            <g fill="${textColor}" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="11">
                <text x="${labelWidth / 2}" y="14">${label}</text>
                <text x="${labelWidth + countWidth / 2}" y="14">${count}</text>
            </g>
        </svg>
        `;
    } else if (template === "for-the-badge") {
        const ftbHeight = 28;
        const ftbLabelWidth = labelWidth + 20;
        const ftbCountWidth = countWidth + 20;
        const ftbTotal = ftbLabelWidth + ftbCountWidth;
        svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${ftbTotal}" height="${ftbHeight}">
            <g shape-rendering="crispEdges">
                <rect width="${ftbLabelWidth}" height="${ftbHeight}" fill="${labelColor}"/>
                <rect x="${ftbLabelWidth}" width="${ftbCountWidth}" height="${ftbHeight}" fill="${color}"/>
            </g>
            <g fill="${textColor}" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="10" font-weight="bold" letter-spacing="2">
                <text x="${ftbLabelWidth / 2}" y="18" textLength="${ftbLabelWidth - 20}">${label.toUpperCase()}</text>
                <text x="${ftbLabelWidth + ftbCountWidth / 2}" y="18" textLength="${ftbCountWidth - 20}">${count}</text>
            </g>
        </svg>
        `;
    } else { // default flat/plastic
        svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}">
            <linearGradient id="b" x2="0" y2="100%">
                <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
                <stop offset="1" stop-opacity=".1"/>
            </linearGradient>
            <mask id="a">
                <rect width="${totalWidth}" height="${height}" rx="3" fill="#fff"/>
            </mask>
            <g mask="url(#a)">
                <rect width="${labelWidth}" height="${height}" fill="${labelColor}"/>
                <rect x="${labelWidth}" width="${countWidth}" height="${height}" fill="${color}"/>
                <rect width="${totalWidth}" height="${height}" fill="url(#b)"/>
            </g>
            <g fill="${textColor}" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="11">
                <text x="${labelWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${label}</text>
                <text x="${labelWidth / 2}" y="14">${label}</text>
                <text x="${labelWidth + countWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${count}</text>
                <text x="${labelWidth + countWidth / 2}" y="14">${count}</text>
            </g>
        </svg>
        `;
    }
    
    return svg;
}
