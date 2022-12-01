export const createTestIds = <T extends Record<string, string>>(
  prefix: string,
  testIds: T
) =>
  Object.entries(testIds).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: `${prefix}/${value}`,
    }),
    {} as Readonly<T>
  );

export type TestableProps<T extends {} = {}> = {
  "data-testid"?: string;
  testId?: string;
} & T;
