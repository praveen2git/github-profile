import { NextResponse } from 'next/server';

// ==========================================
// 1. THEMES
// ==========================================
const THEMES = {
   "default": { "background": "#FFFEFE", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#FB8C00", "fire": "#FB8C00", "currStreakNum": "#151515", "sideNums": "#151515", "currStreakLabel": "#FB8C00", "sideLabels": "#151515", "dates": "#464646", "excludeDaysLabel": "#464646" },
   "dark": { "background": "#151515", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#FB8C00", "fire": "#FB8C00", "currStreakNum": "#FEFEFE", "sideNums": "#FEFEFE", "currStreakLabel": "#FB8C00", "sideLabels": "#FEFEFE", "dates": "#9E9E9E", "excludeDaysLabel": "#9E9E9E" },
   "highcontrast": { "background": "#000000", "border": "#BEBEBE", "stroke": "#BEBEBE", "ring": "#FB8C00", "fire": "#FB8C00", "currStreakNum": "#FFFFFF", "sideNums": "#FFFFFF", "currStreakLabel": "#FB8C00", "sideLabels": "#FFFFFF", "dates": "#C5C5C5", "excludeDaysLabel": "#C5C5C5" },
   "transparent": { "background": "#0000", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#006AFF", "fire": "#006AFF", "currStreakNum": "#0579C3", "sideNums": "#006AFF", "currStreakLabel": "#0579C3", "sideLabels": "#006AFF", "dates": "#417E87", "excludeDaysLabel": "#417E87" },
   "radical": { "background": "#141321", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#FE428E", "fire": "#FE428E", "currStreakNum": "#F8D847", "sideNums": "#FE428E", "currStreakLabel": "#F8D847", "sideLabels": "#FE428E", "dates": "#A9FEF7", "excludeDaysLabel": "#A9FEF7" },
   "merko": { "background": "#0A0F0B", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#ABD200", "fire": "#ABD200", "currStreakNum": "#B7D364", "sideNums": "#ABD200", "currStreakLabel": "#B7D364", "sideLabels": "#ABD200", "dates": "#68B587", "excludeDaysLabel": "#68B587" },
   "gruvbox": { "background": "#282828", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#FABD2F", "fire": "#FABD2F", "currStreakNum": "#FE8019", "sideNums": "#FABD2F", "currStreakLabel": "#FE8019", "sideLabels": "#FABD2F", "dates": "#8EC07C", "excludeDaysLabel": "#8EC07C" },
   "gruvbox-duo": { "background": "#0000", "border": "#A8A8A8", "stroke": "#A8A8A8", "ring": "#FABD2F", "fire": "#FABD2F", "currStreakNum": "#FE8019", "sideNums": "#FABD2F", "currStreakLabel": "#FE8019", "sideLabels": "#FABD2F", "dates": "#8EC07C", "excludeDaysLabel": "#8EC07C" },
   "tokyonight": { "background": "#1A1B27", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#70A5FD", "fire": "#70A5FD", "currStreakNum": "#BF91F3", "sideNums": "#70A5FD", "currStreakLabel": "#BF91F3", "sideLabels": "#70A5FD", "dates": "#38BDAE", "excludeDaysLabel": "#38BDAE" },
   "tokyonight-duo": { "background": "#0000", "border": "#A8A8A8", "stroke": "#A8A8A8", "ring": "#70A5FD", "fire": "#70A5FD", "currStreakNum": "#BF91F3", "sideNums": "#70A5FD", "currStreakLabel": "#BF91F3", "sideLabels": "#70A5FD", "dates": "#38BDAE", "excludeDaysLabel": "#38BDAE" },
   "onedark": { "background": "#282C34", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#E4BF7A", "fire": "#E4BF7A", "currStreakNum": "#8EB573", "sideNums": "#E4BF7A", "currStreakLabel": "#8EB573", "sideLabels": "#E4BF7A", "dates": "#DF6D74", "excludeDaysLabel": "#DF6D74" },
   "onedark-duo": { "background": "#0000", "border": "#A8A8A8", "stroke": "#A8A8A8", "ring": "#E4BF7A", "fire": "#E4BF7A", "currStreakNum": "#8EB573", "sideNums": "#E4BF7A", "currStreakLabel": "#8EB573", "sideLabels": "#E4BF7A", "dates": "#DF6D74", "excludeDaysLabel": "#DF6D74" },
   "cobalt": { "background": "#0000", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#E683D9", "fire": "#E683D9", "currStreakNum": "#0480EF", "sideNums": "#E683D9", "currStreakLabel": "#0480EF", "sideLabels": "#E683D9", "dates": "#75EEB2", "excludeDaysLabel": "#75EEB2" },
   "synthwave": { "background": "#2B213A", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#E2E9EC", "fire": "#E2E9EC", "currStreakNum": "#EF8539", "sideNums": "#E2E9EC", "currStreakLabel": "#EF8539", "sideLabels": "#E2E9EC", "dates": "#E5289E", "excludeDaysLabel": "#E5289E" },
   "dracula": { "background": "#282A36", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#FF6E96", "fire": "#FF6E96", "currStreakNum": "#79DAFA", "sideNums": "#FF6E96", "currStreakLabel": "#79DAFA", "sideLabels": "#FF6E96", "dates": "#F8F8F2", "excludeDaysLabel": "#F8F8F2" },
   "prussian": { "background": "#172F45", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#BDDFFF", "fire": "#BDDFFF", "currStreakNum": "#38A0FF", "sideNums": "#BDDFFF", "currStreakLabel": "#38A0FF", "sideLabels": "#BDDFFF", "dates": "#6E93B5", "excludeDaysLabel": "#6E93B5" },
   "monokai": { "background": "#272822", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#EB1F6A", "fire": "#EB1F6A", "currStreakNum": "#E28905", "sideNums": "#EB1F6A", "currStreakLabel": "#E28905", "sideLabels": "#EB1F6A", "dates": "#F1F1EB", "excludeDaysLabel": "#F1F1EB" },
   "vue": { "background": "#FFFEFE", "border": "#A8A8A8", "stroke": "#A8A8A8", "ring": "#41B883", "fire": "#41B883", "currStreakNum": "#41B883", "sideNums": "#41B883", "currStreakLabel": "#41B883", "sideLabels": "#41B883", "dates": "#273849", "excludeDaysLabel": "#273849" },
   "vue-dark": { "background": "#273849", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#41B883", "fire": "#41B883", "currStreakNum": "#41B883", "sideNums": "#41B883", "currStreakLabel": "#41B883", "sideLabels": "#41B883", "dates": "#FFFEFE", "excludeDaysLabel": "#FFFEFE" },
   "shades-of-purple": { "background": "#2D2B55", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#FAD000", "fire": "#FAD000", "currStreakNum": "#B362FF", "sideNums": "#FAD000", "currStreakLabel": "#B362FF", "sideLabels": "#FAD000", "dates": "#A599E9", "excludeDaysLabel": "#A599E9" },
   "nightowl": { "background": "#011627", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#C792EA", "fire": "#C792EA", "currStreakNum": "#FFEB95", "sideNums": "#C792EA", "currStreakLabel": "#FFEB95", "sideLabels": "#C792EA", "dates": "#7FDBCA", "excludeDaysLabel": "#7FDBCA" },
   "buefy": { "background": "#FFFFFF", "border": "#A8A8A8", "stroke": "#A8A8A8", "ring": "#7957D5", "fire": "#7957D5", "currStreakNum": "#FF3860", "sideNums": "#7957D5", "currStreakLabel": "#FF3860", "sideLabels": "#7957D5", "dates": "#363636", "excludeDaysLabel": "#363636" },
   "buefy-dark": { "background": "#1A1B27", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#7957D5", "fire": "#7957D5", "currStreakNum": "#FF3860", "sideNums": "#7957D5", "currStreakLabel": "#FF3860", "sideLabels": "#7957D5", "dates": "#ABABAB", "excludeDaysLabel": "#ABABAB" },
   "blue-green": { "background": "#040F0F", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#2F97C1", "fire": "#2F97C1", "currStreakNum": "#F5B700", "sideNums": "#2F97C1", "currStreakLabel": "#F5B700", "sideLabels": "#2F97C1", "dates": "#0CF574", "excludeDaysLabel": "#0CF574" },
   "algolia": { "background": "#050F2C", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#00AEFF", "fire": "#00AEFF", "currStreakNum": "#2DDE98", "sideNums": "#00AEFF", "currStreakLabel": "#2DDE98", "sideLabels": "#00AEFF", "dates": "#FFFFFF", "excludeDaysLabel": "#FFFFFF" },
   "great-gatsby": { "background": "#000", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#FFA726", "fire": "#FFA726", "currStreakNum": "#FFB74D", "sideNums": "#FFA726", "currStreakLabel": "#FFB74D", "sideLabels": "#FFA726", "dates": "#FFD95B", "excludeDaysLabel": "#FFD95B" },
   "darcula": { "background": "#242424", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#BA5F17", "fire": "#BA5F17", "currStreakNum": "#84628F", "sideNums": "#BA5F17", "currStreakLabel": "#84628F", "sideLabels": "#BA5F17", "dates": "#BEBEBE", "excludeDaysLabel": "#BEBEBE" },
   "bear": { "background": "#1F2023", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#E03C8A", "fire": "#E03C8A", "currStreakNum": "#00AEFF", "sideNums": "#E03C8A", "currStreakLabel": "#00AEFF", "sideLabels": "#E03C8A", "dates": "#BCB28D", "excludeDaysLabel": "#BCB28D" },
   "solarized-dark": { "background": "#002B36", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#268BD2", "fire": "#268BD2", "currStreakNum": "#B58900", "sideNums": "#268BD2", "currStreakLabel": "#B58900", "sideLabels": "#268BD2", "dates": "#859900", "excludeDaysLabel": "#859900" },
   "solarized-light": { "background": "#FDF6E3", "border": "#ABABAB", "stroke": "#ABABAB", "ring": "#268BD2", "fire": "#268BD2", "currStreakNum": "#B58900", "sideNums": "#268BD2", "currStreakLabel": "#B58900", "sideLabels": "#268BD2", "dates": "#859900", "excludeDaysLabel": "#859900" },
   "chartreuse-dark": { "background": "#000", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#7FFF00", "fire": "#7FFF00", "currStreakNum": "#00AEFF", "sideNums": "#7FFF00", "currStreakLabel": "#00AEFF", "sideLabels": "#7FFF00", "dates": "#FFF", "excludeDaysLabel": "#FFF" },
   "nord": { "background": "#2E3440", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#81A1C1", "fire": "#81A1C1", "currStreakNum": "#88C0D0", "sideNums": "#81A1C1", "currStreakLabel": "#88C0D0", "sideLabels": "#81A1C1", "dates": "#D8DEE9", "excludeDaysLabel": "#D8DEE9" },
   "gotham": { "background": "#0C1014", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#2AA889", "fire": "#2AA889", "currStreakNum": "#599CAB", "sideNums": "#2AA889", "currStreakLabel": "#599CAB", "sideLabels": "#2AA889", "dates": "#99D1CE", "excludeDaysLabel": "#99D1CE" },
   "material": { "background": "#263238", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#80CBC4", "fire": "#80CBC4", "currStreakNum": "#FFAB91", "sideNums": "#80CBC4", "currStreakLabel": "#FFAB91", "sideLabels": "#80CBC4", "dates": "#B0BEC5", "excludeDaysLabel": "#B0BEC5" },
   "material-palenight": { "background": "#292D3E", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#C792EA", "fire": "#C792EA", "currStreakNum": "#89DDFF", "sideNums": "#C792EA", "currStreakLabel": "#89DDFF", "sideLabels": "#C792EA", "dates": "#A6ACCD", "excludeDaysLabel": "#A6ACCD" },
   "graywhite": { "background": "#FFFFFF", "border": "#ABABAB", "stroke": "#ABABAB", "ring": "#24292E", "fire": "#24292E", "currStreakNum": "#24292E", "sideNums": "#24292E", "currStreakLabel": "#24292E", "sideLabels": "#24292E", "dates": "#24292E", "excludeDaysLabel": "#24292E" },
   "vision-friendly-dark": { "background": "#000000", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#FFB000", "fire": "#FFB000", "currStreakNum": "#785EF0", "sideNums": "#FFB000", "currStreakLabel": "#785EF0", "sideLabels": "#FFB000", "dates": "#FFFFFF", "excludeDaysLabel": "#FFFFFF" },
   "ayu-mirage": { "background": "#1F2430", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#F4CD7C", "fire": "#F4CD7C", "currStreakNum": "#73D0FF", "sideNums": "#F4CD7C", "currStreakLabel": "#73D0FF", "sideLabels": "#F4CD7C", "dates": "#C7C8C2", "excludeDaysLabel": "#C7C8C2" },
   "midnight-purple": { "background": "#000000", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#9745F5", "fire": "#9745F5", "currStreakNum": "#9F4BFF", "sideNums": "#9745F5", "currStreakLabel": "#9F4BFF", "sideLabels": "#9745F5", "dates": "#FFFFFF", "excludeDaysLabel": "#FFFFFF" },
   "calm": { "background": "#373F51", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#E07A5F", "fire": "#E07A5F", "currStreakNum": "#EDAE49", "sideNums": "#E07A5F", "currStreakLabel": "#EDAE49", "sideLabels": "#E07A5F", "dates": "#EBCFB2", "excludeDaysLabel": "#EBCFB2" },
   "flag-india": { "background": "#FFFFFF", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#FF8F1C", "fire": "#FF8F1C", "currStreakNum": "#250E62", "sideNums": "#FF8F1C", "currStreakLabel": "#250E62", "sideLabels": "#FF8F1C", "dates": "#509E2F", "excludeDaysLabel": "#509E2F" },
   "omni": { "background": "#191622", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#FF79C6", "fire": "#FF79C6", "currStreakNum": "#E7DE79", "sideNums": "#FF79C6", "currStreakLabel": "#E7DE79", "sideLabels": "#FF79C6", "dates": "#E1E1E6", "excludeDaysLabel": "#E1E1E6" },
   "react": { "background": "#20232A", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#61DAFB", "fire": "#61DAFB", "currStreakNum": "#61DAFB", "sideNums": "#61DAFB", "currStreakLabel": "#61DAFB", "sideLabels": "#61DAFB", "dates": "#FFFFFF", "excludeDaysLabel": "#FFFFFF" },
   "jolly": { "background": "#291B3E", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#FF64DA", "fire": "#FF64DA", "currStreakNum": "#A960FF", "sideNums": "#FF64DA", "currStreakLabel": "#A960FF", "sideLabels": "#FF64DA", "dates": "#FFFFFF", "excludeDaysLabel": "#FFFFFF" },
   "maroongold": { "background": "#260000", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#F7EF8A", "fire": "#F7EF8A", "currStreakNum": "#F7EF8A", "sideNums": "#F7EF8A", "currStreakLabel": "#F7EF8A", "sideLabels": "#F7EF8A", "dates": "#E0AA3E", "excludeDaysLabel": "#E0AA3E" },
   "yeblu": { "background": "#002046", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#FFFF00", "fire": "#FFFF00", "currStreakNum": "#FFFF00", "sideNums": "#FFFF00", "currStreakLabel": "#FFFF00", "sideLabels": "#FFFF00", "dates": "#FFFFFF", "excludeDaysLabel": "#FFFFFF" },
   "blueberry": { "background": "#242938", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#82AAFF", "fire": "#82AAFF", "currStreakNum": "#89DDFF", "sideNums": "#82AAFF", "currStreakLabel": "#89DDFF", "sideLabels": "#82AAFF", "dates": "#27E8A7", "excludeDaysLabel": "#27E8A7" },
   "blueberry-duo": { "background": "#0000", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#82AAFF", "fire": "#82AAFF", "currStreakNum": "#89DDFF", "sideNums": "#82AAFF", "currStreakLabel": "#89DDFF", "sideLabels": "#82AAFF", "dates": "#27E8A7", "excludeDaysLabel": "#27E8A7" },
   "slateorange": { "background": "#36393F", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#FAA627", "fire": "#FAA627", "currStreakNum": "#FAA627", "sideNums": "#FAA627", "currStreakLabel": "#FAA627", "sideLabels": "#FAA627", "dates": "#FFFFFF", "excludeDaysLabel": "#FFFFFF" },
   "kacho-ga": { "background": "#402B23", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#BF4A3F", "fire": "#BF4A3F", "currStreakNum": "#A64833", "sideNums": "#BF4A3F", "currStreakLabel": "#A64833", "sideLabels": "#BF4A3F", "dates": "#D9C8A9", "excludeDaysLabel": "#D9C8A9" },
   "ads-juicy-fresh": { "background": "#0D0C15", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#81FF00", "fire": "#81FF00", "currStreakNum": "#FFF", "sideNums": "#FFF", "currStreakLabel": "#FF5700", "sideLabels": "#FFF", "dates": "#6562AF", "excludeDaysLabel": "#6562AF" },
   "black-ice": { "background": "#151515", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#00E7FF", "fire": "#00E7FF", "currStreakNum": "#FFF", "sideNums": "#FFF", "currStreakLabel": "#00E7FF", "sideLabels": "#FFF", "dates": "#9F9F9F", "excludeDaysLabel": "#9F9F9F" },
   "soft-green": { "background": "#222428", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#00DC4D", "fire": "#00DC4D", "currStreakNum": "#00DC4D", "sideNums": "#3DDC77", "currStreakLabel": "#00DC4D", "sideLabels": "#3DDC77", "dates": "#CECECE", "excludeDaysLabel": "#CECECE" },
   "blood": { "background": "#FFF", "border": "#A8A8A8", "stroke": "#A8A8A8", "ring": "#FF5F5F", "fire": "#357291", "currStreakNum": "#FF5F5F", "sideNums": "#FF5F5F", "currStreakLabel": "#FF5F5F", "sideLabels": "#FF5F5F", "dates": "#273849", "excludeDaysLabel": "#273849" },
   "blood-dark": { "background": "#142B37", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#FF5F5F", "fire": "#357291", "currStreakNum": "#FF5F5F", "sideNums": "#FF5F5F", "currStreakLabel": "#FF5F5F", "sideLabels": "#FF5F5F", "dates": "#FFF", "excludeDaysLabel": "#FFF" },
   "green-nur": { "background": "#0A1E17", "border": "#E4E2E2", "stroke": "#E4E2E2", "ring": "#5AFFC8", "fire": "#5AFFC8", "currStreakNum": "#5AFFC8", "sideNums": "#5AFFC8", "currStreakLabel": "#5AFFC8", "sideLabels": "#5AFFC8", "dates": "#FFF", "excludeDaysLabel": "#FFF" },
   "neon-dark": { "background": "#020200", "border": "#A8A8A8", "stroke": "#A8A8A8", "ring": "#E41D44", "fire": "#E41D44", "currStreakNum": "#F9DD3C", "currStreakLabel": "#F9DD3C", "sideNums": "#5CADC0", "sideLabels": "#5CADC0", "dates": "#ED7B25", "excludeDaysLabel": "#ED7B25" },
   "neon-palenight": { "background": "#212237", "border": "#A8A8A8", "stroke": "#A8A8A8", "ring": "#E41D44", "fire": "#E41D44", "currStreakNum": "#F9DD3C", "currStreakLabel": "#F9DD3C", "sideNums": "#5CADC0", "sideLabels": "#5CADC0", "dates": "#ED7B25", "excludeDaysLabel": "#ED7B25" },
   "dark-smoky": { "background": "#0B0C10", "border": "#C5C6C7", "stroke": "#C5C6C7", "ring": "#EDF5E1", "fire": "#EDF5E1", "currStreakNum": "#66FCF1", "currStreakLabel": "#66FCF1", "sideNums": "#EDF5E1", "sideLabels": "#EDF5E1", "dates": "#45A29E", "excludeDaysLabel": "#45A29E" },
   "monokai-metallian": { "background": "#1F222E", "border": "#FFFFFF", "currStreakLabel": "#F85D7F", "currStreakNum": "#F8D866", "dates": "#9CA2B8", "excludeDaysLabel": "#9CA2B8", "fire": "#FC9867", "ring": "#FC9867", "sideLabels": "#F85D7F", "sideNums": "#F8D866", "stroke": "#4A4F64" },
   "city-lights": { "background": "#1D252C", "border": "#1D252C", "currStreakLabel": "#5D8CB3", "currStreakNum": "#5D8CB3", "dates": "#5D8CB3", "excludeDaysLabel": "#5D8CB3", "fire": "#718CA1", "ring": "#718CA1", "sideLabels": "#5D8CB3", "sideNums": "#61788A", "stroke": "#536676" },
   "blux": { "background": "#263D46", "border": "#E4E2E2", "currStreakLabel": "#F2F2F2", "currStreakNum": "#1590BA", "dates": "#F2F2F2", "excludeDaysLabel": "#F2F2F2", "fire": "#1590BA", "ring": "#1590BA", "sideLabels": "#F2F2F2", "sideNums": "#1590BA", "stroke": "#E4E2E2" },
};

// ==========================================
// 2. TRANSLATIONS
// ==========================================
 const TRANSLATIONS = {
    "en": { "Total Contributions": "Total Contributions", "Current Streak": "Current Streak", "Longest Streak": "Longest Streak", "Week Streak": "Week Streak", "Longest Week Streak": "Longest Week Streak", "Present": "Present", "Excluding {days}": "Excluding {days}", "comma_separator": ", " },
    "es": { "Total Contributions": "Contribuciones Totales", "Current Streak": "Racha Actual", "Longest Streak": "Racha Más Larga", "Week Streak": "Racha Semanal", "Longest Week Streak": "Racha Semanal Más Larga", "Present": "Presente", "Excluding {days}": "Excluyendo {days}" },
    "fr": { "Total Contributions": "Contributions totales", "Current Streak": "Séquence actuelle", "Longest Streak": "Plus longue séquence", "Week Streak": "Séquence de la semaine", "Longest Week Streak": "Plus longue séquence hebdomadaire", "Present": "Aujourd'hui", "Excluding {days}": "À l'exclusion de {days}" },
    "de": { "Total Contributions": "Gesamte Beiträge", "Current Streak": "Aktuelle Serie", "Longest Streak": "Längste Serie", "Week Streak": "Wochenserie", "Longest Week Streak": "Längste Wochenserie", "Present": "Heute", "Excluding {days}": "Ausgenommen {days}" },
    "ja": { "date_format": "[Y.]n.j", "Total Contributions": "総ｺﾝﾄﾘﾋﾞｭｰｼｮﾝ数", "Current Streak": "現在のストリーク", "Longest Streak": "最長のストリーク", "Week Streak": "週間ストリーク", "Longest Week Streak": "最長の週間ストリーク", "Present": "今", "Excluding {days}": "{days}を除く", "comma_separator": "・" },
    "zh_Hans": { "Total Contributions": "合计贡献", "Current Streak": "目前连续贡献", "Longest Streak": "最长连续贡献", "Week Streak": "周连续贡献", "Longest Week Streak": "最长周连续贡献", "Present": "至今", "Excluding {days}": "除外 {days}", "comma_separator": "、" },
    "zh": "zh_Hans",
};

// ==========================================
// 3. LOGIC
// ==========================================

async function fetchContributionData(username) {
  const token = process.env.GITHUB_TOKEN;
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/json",
  };

  const now = new Date();
  const currentYear = now.getFullYear();
  let yearsToFetch = [currentYear];
  
  const userQuery = `
    query {
      user(login: "${username}") {
        createdAt
      }
    }
  `;
  
  const userRes = await fetch("https://api.github.com/graphql", { method: "POST", headers, body: JSON.stringify({ query: userQuery }) });
  
  if (!userRes.ok) throw new Error("GitHub User Not Found");
  const userData = await userRes.json();
  if (userData.errors) throw new Error(userData.errors[0].message);
  
  const createdAt = new Date(userData.data.user.createdAt);
  const startYear = createdAt.getFullYear();
  
  for (let y = currentYear - 1; y >= Math.max(startYear, currentYear - 5); y--) {
    yearsToFetch.push(y);
  }

  const responses = await Promise.all(yearsToFetch.map(async (year) => {
    const start = `${year}-01-01T00:00:00Z`;
    const end = `${year}-12-31T23:59:59Z`;
    const query = `
      query {
        user(login: "${username}") {
          contributionsCollection(from: "${start}", to: "${end}") {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;
    const res = await fetch("https://api.github.com/graphql", { method: "POST", headers, body: JSON.stringify({ query }) });
    return res.json();
  }));

  const contributions = {};
  responses.forEach(res => {
     if (res.data?.user?.contributionsCollection?.contributionCalendar?.weeks) {
        res.data.user.contributionsCollection.contributionCalendar.weeks.forEach(week => {
            week.contributionDays.forEach(day => {
                contributions[day.date] = day.contributionCount;
            });
        });
     }
  });

  return contributions;
}

function calculateStreak(contributions, excludeDays = []) {
    const today = new Date().toISOString().split('T')[0];
    const dates = Object.keys(contributions).sort();
    
    // Day Map
    const dayMap = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };
    const excludedIndices = excludeDays.map(d => dayMap[d]).filter(i => i !== undefined);

    let currentStreak = 0;
    let longestStreak = 0;
    let totalContributions = 0;
    
    let currentStreakStart = today;
    let currentStreakEnd = today;
    let longestStreakStart = today;
    let longestStreakEnd = today;

    let tempStreak = 0;
    let tempStreakStart = dates[0];
    
    for (const date of dates) {
        const count = contributions[date];
        totalContributions += count;
        
        if (date > today) continue; 
        
        const dateObj = new Date(date);
        const dayOfWeek = dateObj.getUTCDay();
        const isExcluded = excludedIndices.includes(dayOfWeek);

        if (count > 0 || (tempStreak > 0 && isExcluded)) {
            if (tempStreak === 0) tempStreakStart = date;
            tempStreak++;
            if (tempStreak > longestStreak) {
                longestStreak = tempStreak;
                longestStreakStart = tempStreakStart;
                longestStreakEnd = date;
            }
        } else {
             tempStreak = 0;
        }
    }

    // Current Streak Backwards
    let runnerDate = new Date();
    let runnerStr = runnerDate.toISOString().split('T')[0];
    let streakActive = true;
    
    if (contributions[runnerStr] === 0) {
        if (!excludedIndices.includes(runnerDate.getUTCDay())) {
            runnerDate.setDate(runnerDate.getDate() - 1);
            runnerStr = runnerDate.toISOString().split('T')[0];
            if (contributions[runnerStr] === 0 && !excludedIndices.includes(runnerDate.getUTCDay())) {
                 streakActive = false;
            }
        }
    }
    
    currentStreakEnd = runnerStr;
    currentStreak = 0;
    currentStreakStart = runnerStr;

    if (streakActive) {
        while (true) {
             const c = contributions[runnerStr];
             if (c === undefined) break; 
             
             const dayOfWeek = runnerDate.getUTCDay();
             const isExcl = excludedIndices.includes(dayOfWeek);
             
             if (c > 0 || isExcl) {
                 currentStreak++;
                 currentStreakStart = runnerStr;
                 runnerDate.setDate(runnerDate.getDate() - 1);
                 runnerStr = runnerDate.toISOString().split('T')[0];
             } else {
                 break;
             }
        }
    }

    return {
        totalContributions,
        currentStreak,
        currentStreakStart,
        currentStreakEnd,
        longestStreak,
        longestStreakStart,
        longestStreakEnd,
        firstContribution: dates[0]
    };
}


// ==========================================
// 4. SVG GENERATION 
// ==========================================

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

function generateSVG(stats, theme, params) {
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

// ==========================================
// 5. ROUTE HANDLER
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
