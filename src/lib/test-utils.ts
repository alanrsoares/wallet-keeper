export const createTestIds = <T extends Record<string, string>>(
  prefix: string,
  testIds: T
) => {
  return Object.entries(testIds).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: `${prefix}/${value}`,
    }),
    {} as T
  );
};
