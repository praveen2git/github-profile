// @ts-check

/**
 * Common color utility functions
 */

/**
 * Retrieves the theme colors based on the provided options.
 *
 * @param {object} options Options object.
 * @param {string=} options.title_color Title color.
 * @param {string=} options.text_color Text color.
 * @param {string=} options.icon_color Icon color.
 * @param {string=} options.bg_color Background color.
 * @param {string=} options.border_color Border color.
 * @param {string=} options.ring_color Ring color.
 * @param {string=} options.theme Theme name.
 * @returns {object} Theme colors.
 */
export const getCardColors = ({
  title_color,
  text_color,
  icon_color,
  bg_color,
  border_color,
  ring_color,
  theme,
}) => {
  const defaultTheme = {
    title_color: "#2f80ed",
    icon_color: "#4c71f2",
    text_color: "#434d58",
    bg_color: "#fffefe",
    border_color: "#e4e2e2",
    ring_color: "#2f80ed",
  };

  const themes = {
    default: defaultTheme,
    dark: {
      title_color: "#fff",
      icon_color: "#79ff97",
      text_color: "#9f9f9f",
      bg_color: "#151515",
      border_color: "#e4e2e2",
      ring_color: "#79ff97",
    },
    radical: {
      title_color: "#fe428e",
      icon_color: "#f8d847",
      text_color: "#a9fef7",
      bg_color: "#141321",
      border_color: "#e4e2e2",
      ring_color: "#fe428e",
    },
    dracula: {
      title_color: "#ff6e96",
      icon_color: "#79dafa",
      text_color: "#f8f8f2",
      bg_color: "#282a36",
      border_color: "#e4e2e2",
      ring_color: "#ff6e96",
    },
    // Add more themes as needed...
  };

  const selectedTheme = themes[theme] || defaultTheme;

  return {
    titleColor: title_color || selectedTheme.title_color,
    textColor: text_color || selectedTheme.text_color,
    iconColor: icon_color || selectedTheme.icon_color,
    bgColor: bg_color || selectedTheme.bg_color,
    borderColor: border_color || selectedTheme.border_color,
    ringColor: ring_color || selectedTheme.ring_color,
  };
};
