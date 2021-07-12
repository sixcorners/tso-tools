import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CbuthraxisoptService {
  readonly name = 'cbuthraxisopt';
  readonly title = 'Thraxis optimized by Madison';
  readonly width = 55;
  readonly height = 31;
  readonly locations = [
    [1, 402], // 0
    [129, 169], // 1
    [265, 89], // 2
    [265, 169], // 3
    [394, 169], // 4
    [522, 169], // 5
    [265, 241], // 6
    [394, 241], // 7
    [522, 241], // 8
    [129, 402], // 9
    [265, 346], // 10
    [394, 346], // 11
    [522, 346], // 12
    [265, 450], // 13
    [394, 418], // 14
    [522, 418], // 15
    [394, 474], // 16
    [522, 474], // 17
    [634, 474], // 18
    [265, 546], // 19
    [394, 546], // 20
    [522, 546], // 21
    [129, 699], // 22
    [265, 667], // 23
    [394, 643], // 24
    [522, 643], // 25
    [394, 691], // 26
    [265, 731], // 27
  ];

  constructor() { }
}
