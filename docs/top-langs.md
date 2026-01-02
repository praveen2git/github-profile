
# Top Languages Card

The top languages card shows a GitHub user's most frequently used languages.

> **Warning**
> By default, the language card shows language results only from public repositories. To include languages used in private repositories, you should deploy your own instance using your own GitHub API token.

> **Note**
> Top Languages does not indicate the user's skill level or anything like that; it's a GitHub metric to determine which languages have the most code on GitHub. It is a new feature of github-readme-stats.

> **Warning**
> This card shows language usage only inside your own non-forked repositories, not depending on who the author of the commits is. It does not include your contributions into another users/organizations repositories. Currently there are no way to get this data from GitHub API. If you want this behavior to be improved you can support this feature request created by @rickstaa inside GitHub Community.

> **Warning**
> Currently this card shows data only about first 100 repositories. This is because GitHub API limitations which cause downtimes of public instances (see #1471). In future this behavior will be improved by releasing GitHub action or providing environment variables for user's own instances.

## Usage

Copy-paste this code into your readme and change the links.

Endpoint: `api/top-langs?username=praveen2git`

[![Top Langs](https://leogitreadme.vercel.app/api/top-langs/?username=praveen2git)](https://github.com/praveen2git/github-readme-stats)

## Options

You can customize the appearance and behavior of the top languages card using the common options and exclusive options listed in the table below.

| Name | Description | Type | Default value |
|---|---|---|---|
| `hide` | Hides the specified languages from card. | string (comma-separated values) | null |
| `hide_title` | Hides the title of your card. | boolean | false |
| `layout` | Switches between five available layouts `normal` & `compact` & `donut` & `donut-vertical` & `pie`. | enum | `normal` |
| `card_width` | Sets the card's width manually. | number | 300 |
| `langs_count` | Shows more languages on the card, between 1-20. | integer | 5 for normal and donut, 6 for other layouts |
| `exclude_repo` | Excludes specified repositories. | string (comma-separated values) | null |
| `custom_title` | Sets a custom title for the card. | string | Most Used Languages |
| `disable_animations` | Disables all animations in the card. | boolean | false |
| `hide_progress` | Uses the compact layout option, hides percentages, and removes the bars. | boolean | false |
| `size_weight` | Configures language stats algorithm (see Language stats algorithm). | integer | 1 |
| `count_weight` | Configures language stats algorithm (see Language stats algorithm). | integer | 0 |
| `stats_format` | Switches between two available formats for language's stats percentages and bytes. | enum | `percentages` |

> **Warning**
> Language names and custom title should be URI-escaped, as specified in Percent Encoding (i.e: `c++` should become `c%2B%2B`, `jupyter notebook` should become `jupyter%20notebook`, `Most Used Languages` should become `Most%20Used%20Languages`, etc.) You can use [urlencoder.org](https://urlencoder.org) to help you do this automatically.

### Language stats algorithm

We use the following algorithm to calculate the languages percentages on the language card:

```
ranking_index = (byte_count ^ size_weight) * (repo_count ^ count_weight)
```

By default, only the byte count is used for determining the languages percentages shown on the language card (i.e. `size_weight=1` and `count_weight=0`). You can, however, use the `&size_weight=` and `&count_weight=` options to weight the language usage calculation. The values must be positive real numbers. More details about the algorithm can be found here.

- `&size_weight=1&count_weight=0` - (default) Orders by byte count.
- `&size_weight=0.5&count_weight=0.5` - (recommended) Uses both byte and repo count for ranking
- `&size_weight=0&count_weight=1` - Orders by repo count

![Top Langs](https://leogitreadme.vercel.app/api/top-langs/?username=praveen2git&size_weight=0.5&count_weight=0.5)

### Exclude individual repositories

You can use the `&exclude_repo=repo1,repo2` parameter to exclude individual repositories.

![Top Langs](https://leogitreadme.vercel.app/api/top-langs/?username=praveen2git&exclude_repo=github-readme-stats,praveen2git.github.io)

### Hide individual languages

You can use `&hide=language1,language2` parameter to hide individual languages.

![Top Langs](https://leogitreadme.vercel.app/api/top-langs/?username=praveen2git&hide=javascript,html)

### Show more languages

You can use the `&langs_count=` option to increase or decrease the number of languages shown on the card. Valid values are integers between 1 and 20 (inclusive). By default it was set to 5 for normal & donut and 6 for other layouts.

![Top Langs](https://leogitreadme.vercel.app/api/top-langs/?username=praveen2git&langs_count=8)

### Compact Language Card Layout

You can use the `&layout=compact` option to change the card design.

![Top Langs](https://leogitreadme.vercel.app/api/top-langs/?username=praveen2git&layout=compact)

### Donut Chart Language Card Layout

You can use the `&layout=donut` option to change the card design.

[![Top Langs](https://leogitreadme.vercel.app/api/top-langs/?username=praveen2git&layout=donut)](https://github.com/praveen2git/github-readme-stats)

### Donut Vertical Chart Language Card Layout

You can use the `&layout=donut-vertical` option to change the card design.

[![Top Langs](https://leogitreadme.vercel.app/api/top-langs/?username=praveen2git&layout=donut-vertical)](https://github.com/praveen2git/github-readme-stats)

### Pie Chart Language Card Layout

You can use the `&layout=pie` option to change the card design.

[![Top Langs](https://leogitreadme.vercel.app/api/top-langs/?username=praveen2git&layout=pie)](https://github.com/praveen2git/github-readme-stats)

### Hide Progress Bars

You can use the `&hide_progress=true` option to hide the percentages and the progress bars (layout will be automatically set to compact).

![Top Langs](https://leogitreadme.vercel.app/api/top-langs/?username=praveen2git&hide_progress=true)

### Change format of language's stats

You can use the `&stats_format=bytes` option to display the stats in bytes instead of percentage.

![Top Langs](https://leogitreadme.vercel.app/api/top-langs/?username=praveen2git&stats_format=bytes)
