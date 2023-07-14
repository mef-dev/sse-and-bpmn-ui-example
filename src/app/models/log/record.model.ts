export class Record{

    message:string;
    data: any | string;
    date: Date;
    params: any;
  
    get dataIsString():boolean{
      return typeof this.data == 'string';
    }
  }