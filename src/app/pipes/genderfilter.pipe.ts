import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderFilter'
})
export class GenderfilterPipe implements PipeTransform {

  transform(value: any[], args: any): any {
    if(!args){
      return value
    }
    else{
      return args ? value.filter((value:any) => value.gender === args) : value;
    }
  }

}
