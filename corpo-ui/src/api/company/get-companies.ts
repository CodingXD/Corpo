import fetcher from "..";

export default async function getCompanies(): Promise<
  {
    name: string;
    cin: string;
  }[]
> {
  const { data } = await fetcher.get("/company/list");
  return data;
}
