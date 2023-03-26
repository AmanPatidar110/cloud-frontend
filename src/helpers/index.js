export const mapFromQueryString = () => {
  try {
    let queryString = window.location.search ?? "";
    if (queryString.startsWith("?")) queryString = queryString.substring(1);
    const map = {};
    queryString
      .split("&")
      .forEach((query) => (map[query.split("=")[0]] = query.split("=")[1]));
    return map;
  } catch {
    return {};
  }
};
