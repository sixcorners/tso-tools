import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Tso0112Service {
  readonly name = 'tso0112' as const;
  readonly title = 'tso0112\'s chart' as const;
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
    [0, 1, 'AAB'], // 11
    [11, 0, 'BBA'], // 12
    [12, 1, 'CCA'], // 13
    [12, 2, 'BCA'], // 14
    [14, 1, 'CBA'], // 15
    [11, 1, 'ABC'], // 16
    [16, 1, 'CAC'], // 17
    [17, 2, 'BAC'], // 18
    [16, 2, 'ACC'], // 19
    [11, 2, 'ABB'], // 20
    [20, 1, 'BAB'], // 21
    [21, 2, 'CAB'], // 22
    [20, 2, 'ACB'], // 23
    [0, 2, 'ABC'], // 24
    [24, 0, 'BAA'], // 25
    [25, 2, 'CAA'], // 26
    [24, 1, 'AAB'], // 27
    [27, 1, 'ACA'], // 28
    [24, 2, 'AAC'], // 29
    [29, 1, 'ABA'], // 30
  ] as const;

  constructor() { }
}
