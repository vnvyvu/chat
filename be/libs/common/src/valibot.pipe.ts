import { Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema, parse } from 'valibot';

@Injectable()
export class ValiBotPipe implements PipeTransform {
  private schemas: ObjectSchema<any>[];
  constructor(...schemas: ObjectSchema<any>[]) {
    this.schemas = schemas;
  }

  transform(value: any) {
    let _value = value;
    for (let i = 0; i < this.schemas.length; i++) {
      const schema = this.schemas[i];
      _value = parse(_value, schema);
    }
    return _value;
  }
}
