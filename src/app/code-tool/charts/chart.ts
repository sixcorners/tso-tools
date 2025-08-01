export const allCombinations = [
    'AAA',
    'AAB',
    'AAC',
    'ABA',
    'ABB',
    'ABC',
    'ACA',
    'ACB',
    'ACC',
    'BAA',
    'BAB',
    'BAC',
    'BBA',
    'BBB',
    'BBC',
    'BCA',
    'BCB',
    'BCC',
    'CAA',
    'CAB',
    'CAC',
    'CBA',
    'CBB',
    'CBC',
    'CCA',
    'CCB',
    'CCC',
] as const;

export type Match = 0 | 1 | 2 | 3;

export type Combination = typeof allCombinations[number];

export interface Chart {
    readonly name: string;
    readonly title: string;
    readonly nodes: ReadonlyArray<readonly [number | null, Match, Combination]>;
}
