import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'individualsearch'
})
export class IndividualsearchPipe implements PipeTransform {
  transform(value: any, idSearch: any, nameSearch: any, contactSearch: any): any {

    if (idSearch || nameSearch || contactSearch) {
      let Found = value.filter((val: any) => {
        let idResult = val.id.includes(idSearch);
        let nameResult = val.name.toLowerCase().includes(nameSearch.toLowerCase());
        let contactResult = val.contact.includes(contactSearch);
        if (value.topFilter) {
          return idResult || nameResult || contactResult;
        } else {
          return idResult && nameResult && contactResult;
        }
      });
      return Found;
    }
    else {
      return value;
    }
  }
}
