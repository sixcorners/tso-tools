import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  readonly name = 'chart' as const;
  readonly title = 'The Hermione CBU Chart' as const;
  readonly nodes = [
    [null, 3, 'AAA'], // 0
    [0, 0, 'BBB'], // 1
    [1, 0, 'CCC'], // 2
    [1, 1, 'ABC'], // 3
    [3, 0, 'CCB'], // 4
    [3, 1, 'BCC'], // 5
    [3, 2, 'CBC'], // 6
    [1, 2, 'ABC'], // 7
    [7, 0, 'BCB'], // 8
    [7, 1, 'CBB'], // 9
    [7, 2, 'BBC'], // 10
    [0, 1, 'ABB'], // 11
    [11, 0, 'BAC'], // 12
    [12, 0, 'CCA'], // 13
    [12, 1, 'BCA'], // 14
    [12, 2, 'CAC'], // 15
    [11, 1, 'BAB'], // 16
    [16, 0, 'ACC'], // 17
    [17, 0, 'CBA'], // 18
    [16, 1, 'BBA'], // 19
    [16, 2, 'CAB'], // 20
    [11, 2, 'ABC'], // 21
    [21, 1, 'ACB'], // 22
    [0, 2, 'ABB'], // 23
    [23, 0, 'BAA'], // 24
    [24, 2, 'CAA'], // 25
    [23, 1, 'AAC'], // 26
    [26, 1, 'ACA'], // 27
    [23, 2, 'AAB'], // 28
    [28, 1, 'ABA'], // 29
  ] as const;
  readonly width = 59 as const;
  readonly height = 25 as const;
  readonly locations = [
    [0, 457], // 0
    [202, 157], // 1
    [402, 57], // 2
    [402, 157], // 3
    [602, 107], // 4
    [602, 157], // 5
    [602, 207], // 6
    [402, 307], // 7
    [602, 257], // 8
    [602, 307], // 9
    [602, 357], // 10
    [202, 557], // 11
    [402, 457], // 12
    [602, 407], // 13
    [602, 457], // 14
    [602, 507], // 15
    [402, 607], // 16
    [602, 557], // 17
    [802, 557], // 18
    [602, 607], // 19
    [602, 657], // 20
    [402, 707], // 21
    [602, 707], // 22
    [202, 807], // 23
    [402, 757], // 24
    [602, 757], // 25
    [402, 807], // 26
    [602, 807], // 27
    [402, 857], // 28
    [602, 857], // 29
  ] as const;
  readonly drawings: Path2D[][] = [
    ['M53 435c-30 0-52 1-64 25-2 4-20 29-8 35 13 6 80 17 89-1 6-12-3-53-11-57-5-3-18 0-24 0'], // 0
    ['M245 140c-10 0-29-5-38 1-15 10-16 42-2 56 9 9 42 6 54 2 27-9 4-65-35-65', 'M61 456c9 0 30-55 37-66 16-24 29-50 41-74 10-21 17-49 33-65l1-2c6-12 17-24 22-38 1-2 4-4 2-5-1-1-20 8-20 9 0 2 3-1 5-2 4-2 10-5 14-5l5 21'], // 1
    ['M447 43c0 3-16 0-19 1-4 2-51 13-37 27l12 15c10 10 53 7 65 1 20-10-10-35-15-40-3-3-19-2-22-2', 'M265 154c9 0 89-45 96-52 5-5 17-8 24-12l4-1h-14 8c11 0 6 5 6 12'], // 2
    ['M446 141c-5 0-18-7-26-3-10 5-46 35-20 48 5 2 52 12 57 7 6-6 18-23 13-33-4-8-39-24-48-24', 'M267 176l93 1h29s-10-8-8-8 8 7 9 8l5 4h-6c-3 3-9 8-14 10'], // 3
    ['M645 91c-17 0-52 1-52 23v9c11 11 37 32 58 22 16-8 17-44 2-52-5-2-17 0-22 0', 'M465 162c0-5 20-6 23-9 9-9 81-24 83-26 0 0-19-4-22-1-2 2 18 1 20 2 1 0-5 11-5 14'], // 4
    ['M642 146l-31-1c-4 0-14-2-18 0-9 4-21 22-11 32 24 24 85 21 100-9 18-36-71-21-87-21', 'M467 176l113 2h1c3-3-12-13-10-9 2 3 7 5 8 8s-12 14-14 14'], // 5
    ['M643 196c0 2-4-2-5-2-22 0-67 2-51 34s76 27 91-3c14-28-53-30-69-30', 'M467 173c10 0 23 10 31 14 11 5 76 25 87 25 5 0-11-13-6-15 1-1 3 3 4 4 6 13 3 14-16 14'], // 6
    ['M444 289c-14-14-51 8-55 20-14 41 63 42 80 25 3-3 2-10 2-15 0-29-28-30-54-30', 'M267 177c16 0 90 61 105 76 10 10 20 30 32 36h3c2-2-7-19-6-19l2 3c0 2 8 17 2 20-5 2-12-3-16-5-4-1-7 0-10-3'], // 7
    ['M647 245c-6 0-32-4-36 0-5 5-34 19-24 34 20 31 85 20 85-19 0-6 0-11-3-14-2-2-40-1-46-1', 'M469 315c5 0 95-29 98-32l25-6h-22 13c8 0 2 0 0 5-2 3-3 7-6 10'], // 8
    ['M649 293c0-2-6-1-8-1-20 0-50-5-50 20 0 4 1 14 4 17 9 9 70 21 78 5 12-24-32-49-51-49', 'M467 326l90 1c4 0 27 3 30 0 1-1-10-13-11-13l2 4c2 2 10 8 7 11-4 4-11 5-15 9'], // 9
    ['M646 339c-3-3-16-2-19 0-7 4-25 3-30 14-11 22 30 51 50 41 15-7 20-30 12-47-3-6-30-6-39-6', 'M467 326c11 0 84 28 86 31l40 7v-1c0-5-4-7-4-12l1 5c0 1 5 9 3 10-5 2-18-1-25-1'], // 10
    ['M241 537c-12 0-34-2-42 6-5 5-8 13-8 22 0 29 25 33 50 33 5 0 15 2 19 0 17-8 17-47-1-53-10-3-19-4-31-4', 'M63 471c17 17 72 61 92 68 10 3 17 10 24 12l3 2c1-1-6-13-7-16-1-2-4-5-2-5s9 18 9 19c0 5-13 6-17 6'], // 11
    ['M441 435c-37 0-75 21-40 56 17 17 52-1 63-12 3-3 2-9 2-14 0-24-12-30-35-30', 'M266 563c9 0 93-45 107-52v-1l2-1 23-18h-3c-7 0-13 6-18 6l-7 1c0-6 21-11 27-8 3 1 1 25 1 29'], // 12
    ['M647 394c-5 5-39-3-54 12v8c-16 32 65 39 71 27 27-55-14-45-55-45', 'M463 464c4 0 80-27 92-31l28-5-22-1h14c3 0 10-2 8 0-3 3-12 10-12 14'], // 13
    ['M651 442h-33c-17 0-23 11-23 24 0 2-1 7 1 9 9 9 64 24 79 9v-9c0-23-37-29-55-29', 'M464 477h94c3 0 28 2 29 0s-8-10-2-4c10 10-4 7-10 13'], // 14
    ['M641 492c-6 0-25-1-28 2s-11 2-14 4c-10 5-11 28-6 39h4c7 4 64 7 67 1 25-49-55-53-62-46', 'M461 474c23 0 76 19 95 29 4 2 26 13 31 8 2-2-3-14-3-14v6c0 10-9 13-19 13'], // 15
    ['M437 592c-70 0-61 55-1 55 4 0 14 2 17 0 18-9 20-36 8-48-6-6-30 3-34-6', 'M267 573c31 0 68 8 92 20 6 3 26 14 34 10 5-3-12-16-6-16 3 0 8 16 5 18-2 1-8-2-10 0-3 3-22 10-27 10'], // 16
    ['M653 544c-7 0-21-3-27 0-10 5-42 18-33 36s54 17 70 9c5-2 3-12 5-16s1-15-2-18c-4-4-13-7-16-10-4-4-18-2-25-2', 'M464 613c31 0 69-13 96-22l29-9 4-1-24-10h4c7 0 12 2 16 6 6 6-5 18-5 24'], // 17
    ['M845 541c-17 0-73 16-62 38 8 15 74 25 80 14 2-5 8-20 5-26-6-12-28-27-40-27', 'M665 574h109c3 0 18 2 20 0 1-1-6-7-7-9l-2-4c0 11 16 11 1 18-5 2-10 6-15 6'], // 18
    ['M643 594c0-2-9-1-11-1-21 0-37 0-47 20-17 34 77 38 90 13 21-43-87-38-87-18', 'M464 625c12 0 112 9 117 4 1-1-9-9-11-9l3 3c1 1 3 6 5 6 0 0 5 0 3 1-3 1-14 7-14 9'], // 19
    ['M648 647c-15 0-78-4-61 31 8 16 100 19 90-10-7-22-46-9-56-19', 'M464 623c15 0 88 22 95 29 2 2 27 9 30 6l-4-14v-2l2 6c0 15-2 17-21 17'], // 20
    ['M437 686c-63 0-64 61-4 61 4 0 14 2 18 0 10-5 24-34 16-46-8-11-32-27-46-13', 'M265 573c13 0 59 68 76 76 7 4 45 48 56 48 1 0-6-22-4-24s3 6 3 6c1 2 5 17 2 20s-28-8-31-8'], // 21
    ['M640 691c-14 0-25 3-33 11-3 3-9 4-11 9-8 23 55 46 71 30 3-3 2-10 2-14s2-12 0-15c-4-9-48-18-60-18', 'M464 725c0-2 6-1 8-1l67 2h46c-5 0-5-8-8-9-1-1-2-5-3-4-1 3 8 16 7 16l-12 3c-4 2-11 6-16 6'], // 22
    ['M240 787c-9 0-36-5-43 0-8 6-7 11-10 17-19 39 56 41 76 31 12-6 6-32-2-40s-31-10-41-10', 'M63 475c6 12 41 105 46 108v4c7 7 6 23 12 32 9 14 19 53 28 62 10 10 27 48 34 63l20 38c1 1 6 4 4 6-3 3-19-5-21-7s-10-6-7-6c5 0 28 14 32 10v-46'], // 23
    ['M439 739c-54 0-89 28-20 51 18 6 52-7 52-24v-3l-8-6c-2-3-12-8-16-8', 'M267 809c7 0 84-22 94-25l23-10 4-1h-32 32c2 2-4 21-4 26'], // 24
    ['M640 741c-8 0-26-3-31 2s-16-1-19 8c-15 44 74 59 85 38 2-4 0-14-2-18-14-28-40-24-74-24', 'M461 777c0 2 6 1 8 1h116l-18-17 4 7c2 4 12 8 12 12 0 0-16 11-18 11'], // 25
    ['M445 791c-20 0-38 3-51 16-3 3-14 25-7 28 20 10 50 11 70 4 11-4 15-31 8-38-8-8-26-10-36-10', 'M266 823c5 0 22 4 27 6 7 4 46 0 56 0h42c-2-2-12-6-12-10l4 2c2 2 11 5 11 8 0 2-4 2-5 3l-5 9'], // 26
    ['M650 792c-27 0-45-1-55 20-2 5-8 15-4 22 3 7 23 4 30 4 9 0 28 4 35 0 39-19-11-67-39-39', 'M467 824c0-2 3 0 5 0h58c11 0 48 4 55 0 3-1-12-14-11-15l4 6c7 7 3 8-4 15'], // 27
    ['M437 839c-9 0-14 1-22 4-10 3-14 11-20 17-26 26 73 40 85 16 13-26-50-31-63-31', 'M265 823a1366 1366 0 01111 40c3 0 10 5 10 2 0-2-12-13-9-16 1-1 11 14 10 16-3 5-13 9-18 9'], // 28
    ['M639 841c-15 0-77 5-52 30 5 5 8 15 16 20 17 11 55 3 66-8 2-2 0-9 1-11 11-22-24-32-40-32', 'M464 875h126l-10-8 6 4c11 5 0 12-7 19'], // 29
  ].map(paths => paths.map(path => new Path2D(path)));
}
