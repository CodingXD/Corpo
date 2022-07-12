import fetcher from "..";

export default async function getSearchResults(
  query: string
): Promise<{ cin: string; name: string }[]> {
  const { data } = await fetcher.get("/company/find", {
    params: {
      query,
    },
  });

  return data;
}
