import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JnwService {
  readonly name = 'jnw';
  readonly title = 'Jandrea\'s NEVER WRONG Codebreaker Chart';
  readonly nodes = [
    [null, 3, 'AAA'], // 0
    [0, 0, 'BBB'], // 1
    [1, 0, 'CCC'], // 2
    [1, 1, 'BCC'], // 3
    [3, 1, 'CBC'], // 4
    [4, 1, 'CCB'], // 5
    [1, 2, 'BBC'], // 6
    [6, 1, 'BCB'], // 7
    [7, 1, 'CBB'], // 8
    [0, 1, 'ABB'], // 9
    [9, 0, 'BAC'], // 10
    [10, 0, 'CCA'], // 11
    [10, 1, 'BCA'], // 12
    [10, 2, 'CAC'], // 13
    [9, 1, 'CBA'], // 14
    [14, 0, 'ACC'], // 15
    [15, 0, 'BAB'], // 16
    [14, 1, 'CAB'], // 17
    [14, 2, 'BBA'], // 18
    [9, 2, 'ABC'], // 19
    [19, 1, 'ACB'], // 20
    [0, 2, 'AAB'], // 21
    [21, 1, 'ABA'], // 22
    [22, 1, 'BAA'], // 23
    [23, 2, 'CAA'], // 24
    [22, 2, 'ACA'], // 25
    [21, 2, 'AAC'], // 26
  ] as const;
  readonly width = 62;
  readonly height = 50;
  readonly locations = [
    [9, 489], // 0
    [177, 57], // 1
    [345, 57], // 2
    [345, 129], // 3
    [513, 129], // 4
    [681, 129], // 5
    [345, 201], // 6
    [513, 201], // 7
    [681, 201], // 8
    [177, 273], // 9
    [345, 273], // 10
    [513, 273], // 11
    [513, 345], // 12
    [513, 417], // 13
    [345, 489], // 14
    [513, 489], // 15
    [681, 489], // 16
    [513, 561], // 17
    [513, 633], // 18
    [345, 705], // 19
    [513, 705], // 20
    [177, 777], // 21
    [345, 777], // 22
    [513, 777], // 23
    [681, 777], // 24
    [513, 849], // 25
    [345, 921], // 26
  ];
  readonly drawings: Path2D[][] = [
    ['M57 468c-20 0-37 4-50 17-5 5-2 16-6 22-3 5-2 12-2 18 0 27 18 35 44 35 6 0 18 2 23 0 38-19 17-91-31-91'], // 0
    ['M205 39c-4 0-22-3-25 0-6 6-16 10-21 18-3 4-2 13-2 19 0 36 32 45 64 45 9 0 23 2 30-2 7-3 13-39 6-46-29-29-34-40-85-40', 'M73 497c0-28 27-115 40-141 4-7 3-18 6-25 15-30 25-83 34-118 5-20 22-63 22-79 0-1 3-10 2-11-6-3-20 10-20 10 3 3 18-12 21-12 2 0 5 16 7 18'], // 1
    ['M384 43c-12 0-34-4-43 5l-14 14c-10 10-4 43 7 49 9 5 26 2 37 2 6 0 20 3 26 0 9-5 28-43 17-54-12-12-42-20-62-20', 'M243 90h87s-15-12-15-15c0-2 3 2 4 3 1 2 11 7 10 9-3 7-12 16-12 24'], // 2
    ['M375 109c-7 0-22-3-27 2a88 88 0 00-17 74c2 5 10 7 12 10 2 5 32-5 34-6h6l2-2h2l1-1 3-1h2c52-26 17-76-33-76', 'M243 91l16 16c5 5 76 31 80 29 2-1-2-17-2-17v3c0 3 4 16 3 17l-35 3'], // 3
    ['M551 110c-26-13-64 27-55 53 4 13 20 11 27 18 3 3 38 6 40 2 3-6 13-13 18-22 14-27-22-60-46-60', 'M412 163h89l-12-15s10 10 9 12c-6 13-21 13-29 21'], // 4
    ['M727 107c-15 0-31-1-44 6-33 16-33 64-2 79 22 11 62-5 73-26 3-7 2-16 5-24 2-5 2-15 0-20-9-18-43-19-62-19', 'M580 163h86l-12-8-3-4c0 2 13 12 13 12l-3 2c-3 3-23 14-28 14'], // 5
    ['M379 189c-25 0-37 13-37 38 0 4-1 13 1 16 8 12 48 23 67 14 10-5 14-43 5-52s-36-12-50-12', 'M243 91c10 0 57 76 73 84 5 3 12 24 18 24v-4-13-2 19c-5 0-15-8-23-8'], // 6
    ['M559 184c-29 0-64-2-64 32 0 3-2 15 0 17 4 4 3 11 8 16 3 3 10 7 12 10h4c14 0 42 5 52-5 32-32 0-71-38-71', 'M412 236c3-3 67-1 77-1h10l-20-17c-1-1-4-1-1-2 2-1 22 16 22 17 2 4-19 16-23 16'], // 7
    ['M730 189c-11 0-31-4-40 1-22 11-26 51-9 68 4 4 9 1 13 3 36 18 95-72 15-72', 'M578 236c0-3 6 0 7 1h84l-13-14c-2-1-7-4-5-4 4 0 10 8 13 11 11 11-17 12-24 19'], // 8
    ['M207 257c-8 0-20-2-27 1-14 7-22 46-13 55l20 20c7 7 28 6 38 6 11 0 21 1 29-3 6-3 13-25 9-33-2-4-6-7-8-12-8-25-43-36-71-36', 'M77 503c0-3 7-5 9-9 8-16 30-38 43-51 16-16 47-82 59-106 1-1 0-1-1-1l-12 2h-6c3 0 18-2 20 0 3 3 0 25 0 30'], // 9
    ['M386 259c-18 0-33-3-46 10-8 8-1 42 3 50 1 3 50 11 56 8s5-10 9-14c30-30-18-60-46-60', 'M247 309c7 0 84 5 87 2 1-1-14-12-12-14 0 0 16 16 16 19 0 2-14 8-16 11'], // 10
    ['M555 261c-10 0-23-2-31 2-28 14-31 46-9 68 14 14 59-4 72-8 5-2 0-32-2-34-17-17-32-30-60-30', 'M411 312c0-2 7-1 9-1l76 1h1c2-2-13-11-11-15 0-1 11 7 10 10-4 9-16 15-22 21'], // 11
    ['M551 327c-35 0-62 36-34 64 8 8 17 5 26 10 3 2 16 3 20 1 26-13 37-44 14-67-7-7-29-4-40-4', 'M416 311c2 0 56 31 59 34 2 2 26 12 28 11s-7-17-6-18c1 0 11 15 7 19-3 3-19 2-24 2'], // 12
    ['M552 407c-11 0-20-1-27 6s-39 39-24 54c5 5 64 18 74 8 45-45-2-68-48-68', 'M413 311c0 11 20 23 24 31 5 11 52 72 61 81 5 5 3-5 3-9v-5c0 4 2 14 0 18-1 2-29 0-30-1'], // 13
    ['M385 470c-61 0-60 41-26 75 3 3 29 11 34 6 6-6 15-9 20-14s4-15 4-22c0-41-34-50-71-50', 'M246 309c0 9 22 33 27 43l66 134c2 4 0-24 0-24v27l-22-16'], // 14
    ['M562 478c-20 0-41 0-49 17-11 22 9 74 39 59 22-11 47-49 17-69-14-9-35-9-52-9', 'M413 525h80c2 0 7 2 7 0 0-3-13-19-14-19l14 23-17 7'], // 15
    ['M725 469c-12 0-39 4-44 14-9 19-12 62 7 72 28 14 84-23 68-55-11-22-36-25-61-25', 'M581 525l22-2h67c0-6-11-10-11-17 0-2-6-6-4-6 4 0 6 13 7 15l7 13c0 6-21 11-24 14'], // 16
    ['M557 544c0-3-5-3-7-3h-19l-8 8-4 2c-35 35 14 92 46 76 39-19 28-59-4-80-10-6-33-6-46-6', 'M415 526c9 0 63 32 68 37l19 8-7-16c2 0 4 6 4 7 0 0 6 12 4 13h-8l-17 8'], // 17
    ['M557 619c-35 0-49 11-49 47 0 4-2 14 1 17 6 6 17 10 22 15 7 7 43-14 46-20 15-30-24-57-50-57', 'M417 527c0 19 56 70 66 90 2 4 14 27 19 27v-2l-4-23s9 22 5 26-23-2-28-2'], // 18
    ['M389 690c0 2-5 1-7 1-14 0-23 2-34 8-15 8-17 50-3 60 13 9 56 16 66 0 3-5 2-17 2-23 0-30-4-45-36-45', 'M245 313c0 5 29 103 32 106 1 1 7 38 11 42 18 18 28 109 41 134 6 11 18 67 18 80v6l-23-9h3l22 8c2-5 4-37 10-37'], // 19
    ['M553 693c0-2-5-1-7-1-14 0-32 11-39 21-15 23 12 47 26 56 16 11 53-18 57-25 12-24-21-39-31-49-3-3-24 0-29 0', 'M411 741c10 0 85 2 87 0l-12-21-1-1c-4 8 14 21 14 28 0 2-11 3-12 4l-10 11'], // 20
    ['M232 768c-7 0-26-9-37-3-22 11-43 45-21 67 6 6 17 2 25 5 3 2 11 1 16 1s15 2 18-2c12-12 17-54 3-67-5-6-20-7-29-7', 'M74 525c0 31 38 127 51 154 8 16 9 41 22 54 5 5 16 37 20 44l3 6v-4l-1-25v25c-2 2-6-2-8-4s-18-3-20-3'], // 21
    ['M391 765c-12 0-26-2-37 2-9 3-18 7-24 14-10 9-8 39 4 45 5 3 56 16 64 8 45-45 14-69-44-69', 'M245 813c7 0 86 3 88 1s-7-14-8-15-4-5-2-5l6 12 6 12c-7 3-14 10-22 14'], // 22
    ['M557 767c-8 0-27-4-34 0-15 7-37 30-23 51 13 19 58 24 77 14 9-4 8-27 5-35-2-4-1-12-5-15-15-15-35-19-58-19', 'M411 813h87a118 118 0 00-7-9l6 9c0 3-8 8-10 10'], // 23
    ['M732 763c-15 0-35-2-46 2-25 8-26 44-6 57 15 10 32 9 53 9 3 0 15 2 16 0 30-30-8-79-45-79', 'M581 815h88c1-1-13-13-13-15 0-4 5 5 7 8l6 7c0 2-10 10-12 10'], // 24
    ['M551 835c-6-6-44 4-47 9-4 6-4 13-7 20-2 3-1 16 1 17 4 5 5 17 11 23 21 21 70 14 91-6 3-3-1-27-2-29-3-3-5-13-8-17-4-6-12-8-17-13s-49-3-59-3', 'M411 809c1 0 66 36 78 40 1 0 11 4 12 3s-10-21-8-19c3 3 1 9 4 12 10 10-14 8-20 8'], // 25
    ['M397 903c-2-2-5-1-8-1-51-13-82 42-46 66 9 6 17 8 27 12 6 2 24 8 32 4 21-11 19-88-28-88', 'M247 811c5 0 14 19 16 23 13 25 38 45 50 69l18 21-2-25v7l1 18c-7 0-13-9-22-9'], // 26
  ].map(paths => paths.map(path => new Path2D(path)));

  constructor() { }
}
