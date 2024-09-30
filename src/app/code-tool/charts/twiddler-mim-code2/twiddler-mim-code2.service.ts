import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwiddlerMimCode2Service {
  readonly name = 'twiddler_mim_code2' as const;
  readonly title = 'Twiddler\'s CBU Code Smasher 4.0' as const;
  readonly nodes = [
    [null, 3, 'AAA'], // 0
    [0, 2, 'AAB'], // 1
    [1, 2, 'AAC'], // 2
    [1, 1, 'ABA'], // 3
    [3, 2, 'ACA'], // 4
    [3, 1, 'BAA'], // 5
    [5, 2, 'CAA'], // 6
    [0, 1, 'ABB'], // 7
    [7, 2, 'ABC'], // 8
    [8, 1, 'ACB'], // 9
    [7, 1, 'CBA'], // 10
    [10, 2, 'BBA'], // 11
    [10, 1, 'CAB'], // 12
    [10, 0, 'ACC'], // 13
    [13, 0, 'BAB'], // 14
    [7, 0, 'BAC'], // 15
    [15, 2, 'CAC'], // 16
    [15, 1, 'BCA'], // 17
    [15, 0, 'CCA'], // 18
    [0, 0, 'BBB'], // 19
    [19, 2, 'BBC'], // 20
    [20, 1, 'CBB'], // 21
    [21, 1, 'BCB'], // 22
    [19, 1, 'CCB'], // 23
    [23, 1, 'BCC'], // 24
    [24, 1, 'CBC'], // 25
    [19, 0, 'CCC'], // 26
  ] as const;
  readonly width = 39 as const;
  readonly height = 19 as const;
  readonly locations = [
    [60, 276], // 0
    [148, 196], // 1
    [425, 174], // 2
    [243, 234], // 3
    [425, 216], // 4
    [327, 246], // 5
    [425, 257], // 6
    [148, 400], // 7
    [243, 319], // 8
    [425, 332], // 9
    [243, 386], // 10
    [425, 377], // 11
    [425, 400], // 12
    [328, 431], // 13
    [425, 442], // 14
    [243, 482], // 15
    [425, 495], // 16
    [425, 518], // 17
    [425, 541], // 18
    [147, 648], // 19
    [244, 602], // 20
    [326, 625], // 21
    [425, 636], // 22
    [244, 677], // 23
    [326, 691], // 24
    [425, 703], // 25
    [425, 725], // 26
  ] as const;
  readonly drawings: Path2D[][] = [
    ['M91 267c-3-3-11-3-15-3-46 0-27 39 12 39 8 0 19-1 22-8 10-19-27-30-39-30'], // 0
    ['M170 186c-21 0-39 18-22 35 3 3 17 1 22 1 6 0 18 0 22-5 17-16-23-33-34-33', 'M102 279c0-6 46-51 54-59l-4 1-11 6 5-2c3-1 7-6 10-6l2 23'], // 1
    ['M454 167c-83 0-12 56 23 22l2-7c0-15-30-16-40-16', 'M189 199c58 0 114-8 174-8l47-1h7l-13-6 4 3 9 4c1 1-15 8-15 9'], // 2
    ['M266 223c-9 0-16 1-23 4-39 20 36 48 45 20 7-20-16-24-34-24', 'M189 207c0 2 3 2 5 3 14 9 28 16 43 23 4 2 1-17 1-13 0 2 2 12 1 14h-16'], // 3
    ['M450 210c-12 0-47 8-30 24 8 8 44 3 49-3 14-14-25-29-32-22', 'M284 239c33 0 67-7 99-7 10 0 19-4 28-4l4-1-16-3 4 1 10 2c1 1-8 12-8 12'], // 4
    ['M348 236c-7 0-11 0-17 3-39 19 29 50 40 27 11-21-18-31-34-31', 'M285 244l8 2 20 7c3 1 12 4 10 2-4-3-6-6-8-10v-1c0 2 7 9 6 11-2 5-14 7-18 11'], // 5
    ['M448 252h-7c-10 0-18 8-22 16-9 17 46 17 52 4 9-17-29-17-39-17', 'M369 257c11 0 31 7 43 7 5 0 8 1 6-3l-2-5 4 8 2 2c-4 3-13 4-17 8'], // 6
    ['M175 393c0-2-8-2-10-2-19 0-29 11-20 27 8 18 68 9 42-17-5-6-11-12-20-12', 'M102 287c0 23 55 98 55 110a308 308 0 01-6-6c5 11 12 4 12-6'], // 7
    ['M268 313c-8 0-18-1-25 2-38 19 32 38 41 24 15-21-15-27-28-27', 'M189 402l2-3c11-11 17-25 28-36 5-5 17-12 20-19l4-3h-14 6c10 0 8 4 8 14'], // 8
    ['M453 328c-75 0-13 49 17 18 2-1-1-6-2-6-9-14-25-13-41-13', 'M286 332l5 1c5 2 11 2 16 2 16 0 32 3 49 3h63l-4-7-2-3 6 11-19 7'], // 9
    ['M267 379c-7 0-16-2-21 1-41 20 22 46 38 29 19-18-7-30-23-30', 'M189 405c15 0 30-6 46-6h4l-4-6c-5-5 5 3 2 5l-2 4-2 2'], // 10
    ['M449 372c-14 0-46 5-27 24 7 7 38 4 44-2 17-16-23-21-32-21', 'M284 387l100 2c5 0 30 4 33 0 1-1-10-10-10-10l3 3c1 3 8 5 6 8-2 5-13 4-15 9'], // 11
    ['M452 395h-19c-6 0-13 3-16 8-12 24 46 27 52 17 11-23-17-27-35-27', 'M288 397c33 0 65 11 99 11 4 0 27 6 31 3l-4-4c-2-2-11-8-11-10s3 3 4 5l10 8c0 2-8 8-10 9'], // 12
    ['M356 425l-11-1c-17 0-27 11-19 27 5 9 44 10 44-11 0-6-6-11-10-13-5-3-11-4-17-4', 'M283 397c14 0 28 24 40 30l5 4c1-1-4-15-4-15s6 14-1 14c-2 0-6 2-7 0'], // 13
    ['M452 437c-7-8-41 7-30 24 6 10 49 8 43-10-2-6-2-8-9-11-5-3-10-2-16-2', 'M370 443c3 0 61 16 49 4-3-3-3-7-5-10-2-1 1 4 3 6l6 10-13 6'], // 14
    ['M273 477l-6-2c-14 0-39 9-30 27 12 24 80-5 42-21-5-2-10-4-16-4', 'M189 411c1-1 3 1 3 2 7 7 13 21 21 25 7 3 18 19 21 27l6 8c0 2 6 3 4 3-5 0-12-9-17-9l6 2c1 1 11 7 12 6 2-2 0-15 0-17'], // 15
    ['M451 491l-3-1c-8-8-26 3-29 9-10 19 43 23 49 12 10-19-26-23-39-23', 'M283 492c10 0 22 6 32 8 21 5 48 3 69 3 4 0 29 3 32 0l-4-4c-2-2-5-8-8-8-2 0 3 2 4 4 2 2 9 6 9 8s-15 8-18 8'], // 16
    ['M459 514c-7-7-49-4-38 18 8 17 64 5 48-11-3-4-5-7-11-7l-24-2', 'M285 490a4331 4331 0 01130 38 243 243 0 00-1-8c0 1 3 9 2 10l-20 5'], // 17
    ['M456 539l-4-2c-8-4-44 2-33 13 4 3 4 7 9 10 10 5 50 3 44-13-3-7-30-18-38-10', 'M284 492c15 15 80 38 102 46 11 3 20 8 29 11h3l-4-11 2 6c0 2 3 5 2 6-1 2-15 5-19 5'], // 18
    ['M178 641c-11-11-46 12-37 22 10 10 38 19 52 5 11-11-18-31-26-31', 'M100 288c0 30 15 91 20 123 8 50 5 105 17 153 5 20 9 50 9 71l2 9-10-16 3 6 5 11 1 1s6-23 8-23'], // 19
    ['M275 594c-10-10-51 7-34 23 34 35 79-23 20-23', 'M188 651c0-6 39-25 44-30l6-3-14-1h15l-2 17'], // 20
    ['M354 619l-2-1c-7-4-29-3-32 4-14 28 39 37 53 23 19-19-27-29-37-29', 'M285 614c10 0 26 13 35 17 0 0-4-13-1-8 5 11-5 13-14 13'], // 21
    ['M455 631c-13 0-43-1-32 21 6 12 58 10 41-15-3-6-10-9-18-9', 'M370 637a167 167 0 0149 8l-3-9 1 5c2 6-2 9-11 9'], // 22
    ['M275 669c-8 0-16-2-23 1-42 21 18 47 34 31 17-17-15-34-30-34', 'M190 658c12 0 32 20 42 25 4 2 0-14 0-14l2 15h-14'], // 23
    ['M355 688l-2-2c-8-4-41 0-36 14 7 19 80 18 51-11-5-5-17-3-24-3', 'M288 686l3 2c4 7 24 14 30 17 2 0-1-14-1-14l1 4c0 9 4 13-10 13'], // 24
    ['M454 694c-8 0-15 1-22 4-48 15 21 37 38 21 19-20-34-23-43-23', 'M368 701c16 0 32 13 46 13h4c1-1-3-14-3-14l2 6c5 9-5 7-10 12'], // 25
    ['M461 720c-14 0-43-6-47 8 0 3-2 10 0 12 16 16 73 5 57-10-7-8-11-10-22-14l-6 1', 'M188 660c0 10 12 19 18 27 31 42 93 51 146 51h64l-3-3-2-2c-6-10 5 5 5 6l-20 5'], // 26
  ].map(paths => paths.map(path => new Path2D(path)));
}
