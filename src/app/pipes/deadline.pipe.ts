import { Pipe, PipeTransform } from '@angular/core';

const monthCaptions = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

const isSameDate = (target: Date, source: Date) => {
  return (
    target.getFullYear() === source.getFullYear() &&
    target.getMonth() === source.getMonth() &&
    target.getDate() === source.getDate()
  );
};

const addDays = (target: Date, days: number) => {
  target.setDate(target.getDate() + days);

  return target;
};

@Pipe({
  name: 'deadline'
})
export class DeadlinePipe implements PipeTransform {
  transform(value: Date | string): string {
    const inputDate = new Date(value);
    if (!value) {
      return '';
    }

    if (isSameDate(new Date(), inputDate)) {
      return 'Сегодня';
    }

    if (isSameDate(addDays(new Date(), 1), inputDate)) {
      return 'Завтра';
    }

    if (isSameDate(addDays(new Date(), -1), inputDate)) {
      return 'Вчера';
    }

    return `до ${inputDate.getDate()} ${monthCaptions[inputDate.getMonth()]}`;
  }
}
