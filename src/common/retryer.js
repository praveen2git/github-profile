export const retryer = async (fetcher, variables) => {
    return fetcher(variables, process.env.GITHUB_TOKEN);
};
