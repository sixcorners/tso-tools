import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwiddlerMimCode2Service {
  readonly name = 'twiddler_mim_code2';
  readonly title = 'Twiddler\'s CBU Code Smasher 4.0';
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
  readonly width = 39;
  readonly height = 19;
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
  ];
  readonly drawings: Path2D[][] = [
    [''], // 0
    [''], // 1
    [''], // 2
    [''], // 3
    [''], // 4
    [''], // 5
    [''], // 6
    [''], // 7
    [''], // 8
    [''], // 9
    [''], // 10
    [''], // 11
    [''], // 12
    [''], // 13
    [''], // 14
    [''], // 15
    [''], // 16
    [''], // 17
    [''], // 18
    [''], // 19
    [''], // 20
    [''], // 21
    [''], // 22
    [''], // 23
    [''], // 24
    [''], // 25
    [''], // 26
  ].map(paths => paths.map(path => new Path2D(path)));

  constructor() { }
}
