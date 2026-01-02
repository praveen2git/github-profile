
// ==========================================
// LOGIC
// ==========================================

export async function fetchContributionData(username) {
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

export function calculateStreak(contributions, excludeDays = []) {
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
