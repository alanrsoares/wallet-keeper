import { useQuery } from "@tanstack/react-query";

type ManifestFile = {
  version: string;
};

export default function useVersion() {
  const { data } = useQuery(
    ["version"],
    () =>
      fetch("/manifest.json").then((res) =>
        res.json()
      ) as Promise<ManifestFile>,
    {
      staleTime: Infinity,
    }
  );
  return data?.version;
}
