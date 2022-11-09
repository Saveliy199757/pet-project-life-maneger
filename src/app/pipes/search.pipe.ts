import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform<T>(list: T[], searchField: keyof T, searchText: string): T[] {
    if (searchText === '') return list;

    return list.filter((item) =>
      (item[searchField] as unknown as string).toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
