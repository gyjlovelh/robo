import { PipeTransform, Pipe } from "@angular/core";
import {CandyDate} from 'ng-zorro-antd';
@Pipe({
    name: ''
})
export class TimeFormatPipe implements PipeTransform {

    transform(date: string | Date, params: string) {
        const now = Date.now();
        if (date) {

        } else {
            return params;
        }
    }
}
