import fetcher from "..";

interface Params {
  name: string;
  cin: string;
}

export default async function saveCompany(body: Params): Promise<void> {
  const { data } = await fetcher.post("/company/save", body);
  return data;
}
