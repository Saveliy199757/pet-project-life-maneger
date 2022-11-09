import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  statisticDateFrom: Date = new Date()
  statisticDateTo: Date = new Date()

  constructor() { }

  ngOnInit(): void {
    this.statisticDateFrom.setDate(this.statisticDateFrom.getDate() - 5).toLocaleString()
    this.statisticDateTo.toLocaleDateString()
  }

}
