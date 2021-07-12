import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwiddlerMimCode2Service {
  readonly name = 'twiddler_mim_code2';
  readonly title = 'Twiddler\'s CBU Code Smasher 4.0';
  readonly width = 37;
  readonly height = 18;
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

  constructor() { }
}
