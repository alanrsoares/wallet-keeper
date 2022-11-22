import { useQuery } from "@tanstack/react-query";

export default function useVersion() {
  const { data } = useQuery(
    ["version"],
    () =>
      fetch("/manifest.json").then((res) => res.json()) as Promise<{
        version: string;
      }>,
    {
      staleTime: Infinity,
    }
  );
  return data?.version;
}
