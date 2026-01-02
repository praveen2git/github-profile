/**
 * @typedef {Object} GistData
 * @property {string} name
 * @property {string} nameWithOwner
 * @property {string | null} description
 * @property {string | null} language
 * @property {number} starsCount
 * @property {number} forksCount
 */

/**
 * @typedef {Object} RepositoryData
 * @property {string} name
 * @property {string} nameWithOwner
 * @property {boolean} isPrivate
 * @property {boolean} isArchived
 * @property {boolean} isTemplate
 * @property {{ totalCount: number }} stargazers
 * @property {string} description
 * @property {{ color: string; id: string; name: string }} primaryLanguage
 * @property {number} forkCount
 * @property {number} starCount
 */

/**
 * @typedef {Object} StatsData
 * @property {string} name
 * @property {number} totalPRs
 * @property {number} totalPRsMerged
 * @property {number} mergedPRsPercentage
 * @property {number} totalReviews
 * @property {number} totalCommits
 * @property {number} totalIssues
 * @property {number} totalStars
 * @property {number} totalDiscussionsStarted
 * @property {number} totalDiscussionsAnswered
 * @property {number} contributedTo
 * @property {{ level: string; percentile: number }} rank
 */

/**
 * @typedef {Object} Lang
 * @property {string} name
 * @property {string} color
 * @property {number} size
 */

/**
 * @typedef {Record<string, Lang>} TopLangData
 */

/**
 * @typedef {Object} WakaTimeData
 * @property {Array<{ digital: string; hours: number; minutes: number; name: string; percent: number; text: string; total_seconds: number }>} categories
 * @property {number} daily_average
 * @property {number} daily_average_including_other_language
 * @property {number} days_including_holidays
 * @property {number} days_minus_holidays
 * @property {Array<{ digital: string; hours: number; minutes: number; name: string; percent: number; text: string; total_seconds: number }>} editors
 * @property {number} holidays
 * @property {string} human_readable_daily_average
 * @property {string} human_readable_daily_average_including_other_language
 * @property {string} human_readable_total
 * @property {string} human_readable_total_including_other_language
 * @property {string} id
 * @property {boolean} is_already_updating
 * @property {boolean} is_coding_activity_visible
 * @property {boolean} is_including_today
 * @property {boolean} is_other_usage_visible
 * @property {boolean} is_stuck
 * @property {boolean} is_up_to_date
 * @property {Array<{ digital: string; hours: number; minutes: number; name: string; percent: number; text: string; total_seconds: number }>} languages
 * @property {Array<{ digital: string; hours: number; minutes: number; name: string; percent: number; text: string; total_seconds: number }>} operating_systems
 * @property {number} percent_calculated
 * @property {string} range
 * @property {string} status
 * @property {number} timeout
 * @property {number} total_seconds
 * @property {number} total_seconds_including_other_language
 * @property {string} user_id
 * @property {string} username
 * @property {boolean} writes_only
 */

/**
 * @typedef {Object} TopLangOptions
 * @property {boolean} [hide_title]
 * @property {boolean} [hide_border]
 * @property {string|number} [card_width]
 * @property {string} [title_color]
 * @property {string} [text_color]
 * @property {string} [bg_color]
 * @property {string[]} [hide]
 * @property {boolean} [hide_progress]
 * @property {string} [theme]
 * @property {('compact'|'normal'|'donut'|'donut-vertical'|'pie')} [layout]
 * @property {string} [custom_title]
 * @property {string} [locale]
 * @property {number} [langs_count]
 * @property {number} [border_radius]
 * @property {string} [border_color]
 * @property {boolean} [disable_animations]
 * @property {string} [stats_format]
 */

/**
 * @typedef {Object} StatCardOptions
 * @property {string[]} [hide]
 * @property {boolean} [show_icons]
 * @property {boolean} [hide_title]
 * @property {boolean} [hide_border]
 * @property {string|number} [card_width]
 * @property {boolean} [hide_rank]
 * @property {boolean} [include_all_commits]
 * @property {number|string} [commits_year]
 * @property {number|string} [line_height]
 * @property {string} [title_color]
 * @property {string} [ring_color]
 * @property {string} [icon_color]
 * @property {string} [text_color]
 * @property {boolean} [text_bold]
 * @property {string} [bg_color]
 * @property {string} [theme]
 * @property {string} [custom_title]
 * @property {number} [border_radius]
 * @property {string} [border_color]
 * @property {string} [number_format]
 * @property {number} [number_precision]
 * @property {string} [locale]
 * @property {boolean} [disable_animations]
 * @property {string} [rank_icon]
 * @property {string[]} [show]
 */

export {};
