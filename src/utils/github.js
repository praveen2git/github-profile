/**
 * @typedef {Object} GitHubUserData
 * @property {string} username
 * @property {string} name
 * @property {string} bio
 * @property {string} location
 * @property {string} blog
 * @property {string} twitter
 * @property {string} email
 * @property {string[]} topLanguages
 * @property {number} totalRepos
 * @property {number} totalStars
 */

/**
 * @typedef {Object} GitHubApiError
 * @property {string} message
 * @property {('rate_limit'|'not_found'|'network'|'unknown')} type
 * @property {number} [retryAfter]
 */

/**
 * Fetch GitHub user data with rate limit handling and authentication
 * @param {string} username 
 * @returns {Promise<GitHubUserData|null>}
 */
export async function fetchGitHubUser(username) {
  try {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
    };

    // Use token if available to increase rate limits
    // Note: NEXT_PUBLIC_GITHUB_TOKEN is exposed to client, use with caution or only for public read-only tokens
    const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });

    if (!userResponse.ok) {
      // Handle specifically rate limit
      if (userResponse.status === 403) {
        const rateLimitRemaining = userResponse.headers.get('X-RateLimit-Remaining');
        const rateLimitReset = userResponse.headers.get('X-RateLimit-Reset');

        if (rateLimitRemaining === '0') {
          const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000) : null;
          const retryAfter = resetTime
            ? Math.ceil((resetTime.getTime() - Date.now()) / 1000 / 60)
            : null;

          throw {
            message: `GitHub API rate limit exceeded. ${retryAfter ? `Try again in ${retryAfter} minutes.` : 'Please try again later.'}`,
            type: 'rate_limit',
            retryAfter: retryAfter || undefined,
          };
        }
      }

      if (userResponse.status === 404) {
        throw {
          message: `GitHub user "${username}" not found. Please check the username.`,
          type: 'not_found',
        };
      }

      // Generic error
      throw {
        message: `Failed to fetch GitHub user data (${userResponse.status}). Please try again.`,
        type: 'unknown',
      };
    }

    const user = await userResponse.json();

    // Fetch user repos to analyze languages
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      { headers }
    );

    let repos = [];
    if (reposResponse.ok) {
      repos = await reposResponse.json();
    } else if (reposResponse.status === 403) {
      console.warn('GitHub API rate limit hit for repos endpoint, continuing with basic user data');
    }

    // Analyze top languages
    const languageCounts = {};
    let totalStars = 0;

    repos.forEach((repo) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
      totalStars += repo.stargazers_count;
    });

    // Sort languages by frequency
    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([lang]) => lang.toLowerCase());

    return {
      username: user.login,
      name: user.name || user.login,
      bio: user.bio || '',
      location: user.location || '',
      blog: user.blog || '',
      twitter: user.twitter_username || '',
      email: user.email || '',
      topLanguages,
      totalRepos: user.public_repos,
      totalStars,
    };
  } catch (error) {
    console.error('Error fetching GitHub user:', error);

    if (error && typeof error === 'object' && 'type' in error) {
      throw error;
    }

    throw {
      message: 'Network error occurred. Please check your connection and try again.',
      type: 'network',
    };
  }
}

/**
 * Map GitHub languages to skill IDs
 * @param {string} language 
 * @returns {string[]}
 */
export function mapLanguageToSkills(language) {
  const languageMap = {
    javascript: ['javascript', 'nodejs', 'react', 'express'],
    typescript: ['typescript', 'nodejs', 'react'],
    python: ['python', 'django', 'flask'],
    java: ['java', 'spring'],
    go: ['go'],
    rust: ['rust'],
    ruby: ['ruby', 'rails'],
    php: ['php', 'laravel'],
    swift: ['swift'],
    kotlin: ['kotlin', 'android'],
    csharp: ['csharp', 'dotnet'],
    cpp: ['cplusplus'],
    c: ['c'],
    scala: ['scala'],
    html: ['html5', 'css3'],
    css: ['css3', 'sass'],
  };

  return languageMap[language.toLowerCase()] || [language.toLowerCase()];
}

/**
 * Generate smart subtitle based on user data
 * @param {GitHubUserData} userData 
 * @returns {string}
 */
export function generateSmartSubtitle(userData) {
  const { topLanguages, totalRepos } = userData;

  if (topLanguages.length === 0) {
    return 'A passionate developer from around the world';
  }

  const primaryLang = topLanguages[0];
  const langDisplay = primaryLang.charAt(0).toUpperCase() + primaryLang.slice(1);

  if (totalRepos < 5) {
    return `A budding ${langDisplay} developer`;
  } else if (totalRepos < 20) {
    return `A passionate ${langDisplay} developer`;
  } else if (totalRepos < 50) {
    return `An experienced ${langDisplay} developer`;
  } else {
    return `A seasoned ${langDisplay} developer`;
  }
}
