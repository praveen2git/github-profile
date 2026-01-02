/**
 * @param {object} options
 * @param {object} headers
 */
export const request = async (options, headers) => {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      query: options.query,
      variables: options.variables,
    }),
  });

  const data = await res.json();
  
  return {
    data,
    statusText: res.statusText,
    headers: res.headers,
    status: res.status
  };
};
