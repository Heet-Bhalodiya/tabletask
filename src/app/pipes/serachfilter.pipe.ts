import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})

export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], globalSearch: string, idSearch: any, nameSearch: string, contactSearch: any): any {
    if (!globalSearch) {
      return value;
    }
    let globalResult;
    if (globalSearch) {
      globalResult = value.filter((val: any) => {
        let result =
          val.id.includes(globalSearch) ||
          val.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
          val.contact.includes(globalSearch)
        return result;
      });
      if (idSearch) {
        globalResult = globalResult.filter((val: any) => {
          let idResult = val.id.includes(idSearch)
          return idResult;
        });
      }
      if (nameSearch) {
        globalResult = globalResult.filter((val: any) => {
          let nameResult = val.name.toLowerCase().includes(nameSearch.toLowerCase())
          return nameResult;
        });
      }
      if (contactSearch) {
        globalResult = globalResult.filter((val: any) => {
          let contactResult = val.contact.includes(contactSearch)
          return contactResult;
        });
      }
    }

    return globalResult
  }

}