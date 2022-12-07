/**
 * Creates a set of test ids for a given namespace
 *
 * @param namespace {string} - The namespace to use for the test ids
 * @param testIds {string[]} - The test ids to create
 * @returns {Readonly<{[K in typeof testIds[number]]: `${P}/${K}`}>} - The test ids
 *
 * @example
 * ```
 * const TEST_IDS = createTestIds("namespace", ["testId1", "testId2"]);
 * // TEST_IDS = {
 * //   testId1: "namespace/testId1",
 * //   testId2: "namespace/testId2",
 * // }
 * ```
 */
export const createTestIds = <T extends string, P extends string>(
  namespace: P,
  testIds: T[]
): Readonly<{ [K in typeof testIds[number]]: `${P}/${K}` }> =>
  testIds.reduce(
    (acc, key) => ({
      ...acc,
      [key]: `${namespace}/${key}`,
    }),
    {} as Readonly<
      {
        [K in typeof testIds[number]]: `${P}/${K}`;
      }
    >
  );

export type TestableProps<T extends {} = {}> = {
  "data-testid"?: string;
  testId?: string;
} & T;
