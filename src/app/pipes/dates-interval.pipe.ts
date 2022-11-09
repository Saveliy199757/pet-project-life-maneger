import { Pipe, PipeTransform } from '@angular/core';

const monthCaptions = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

/** Преобразует даты через в строку типа 10-17 марта или 23 февраля - 4 марта или с 23 февраля по 4 марта (withWords) 4 марта или с 23 февраля 2021 (withYear)*/
@Pipe({
  name: 'datesInterval'
})
export class DatesIntervalPipe implements PipeTransform {
  firstDate?: string;
  secondDate?: string;

  transform(startDate: Date, endDate: Date, withWords: boolean = false, withYear: boolean = false): string {
    if (!startDate || !endDate) {
      return startDate.toString() || endDate.toString();
    }
    if (!(startDate instanceof Date)) {
      console.error('start date is not Date');
      return '';
    }

    const startMonth = startDate.getMonth();
    const startDay = startDate.getDate();
    const startYear = startDate.getFullYear().toString();
    if (!(endDate instanceof Date) || endDate.toLocaleDateString() === startDate.toLocaleDateString()) {
      return `${startDay} ${monthCaptions[startMonth]} ${startYear}`;
    }

    const endMonth = endDate.getMonth();
    const endDay = endDate.getDate();
    const endYear = endDate.getFullYear().toString();
    const isSameYears = startYear === endYear;
    this.firstDate = startDay.toString();
    this.secondDate = endDay.toString();
    this.secondDate = this._getDateWithMonth(this.secondDate, monthCaptions[endMonth]);
    if (!isSameYears || startMonth !== endMonth) {
      this.firstDate = this._getDateWithMonth(this.firstDate, monthCaptions[startMonth]);
    }
    if (withYear) {
      this.secondDate = this._getDateWithYear(this.secondDate, endYear);
    }
    if (withYear && !isSameYears) {
      this.firstDate = this._getDateWithYear(this.firstDate, startYear);
    }
    return this._concatDatesIntoString(this.firstDate, this.secondDate, withWords);
  }

  private _getDateWithYear(date: string, year: string): string {
    return `${date} ${year}`;
  }

  private _getDateWithMonth(date: string, month: string): string {
    return `${date} ${month}`;
  }

  private _concatDatesIntoString(firstDate: string, secondDate: string, withWords: boolean): string {
    return withWords ? `c ${firstDate} по ${secondDate}` : `${firstDate} — ${secondDate}`;
  }
}
