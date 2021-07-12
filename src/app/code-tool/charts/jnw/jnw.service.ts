import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JnwService {
  readonly name = 'jnw';
  readonly title = 'Jandrea\'s NEVER WRONG Codebreaker Chart';
  readonly width = 61;
  readonly height = 49;
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

  constructor() { }
}
