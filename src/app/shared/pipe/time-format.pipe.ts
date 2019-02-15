import { PipeTransform, Pipe } from "@angular/core";
import { addDays, isEqualDate, firstDayInWeek } from '@progress/kendo-date-math';
import { DateService } from "../server/date/date.service";
@Pipe({
    name: 'taskTimeFormat'
})
export class TimeFormatPipe implements PipeTransform {

    constructor(
        private $date: DateService
    ) { }

    transform(date: string | Date, params: string) {
        const now = new Date();
        if (date) {
            if (typeof date === 'string') {
                date = new Date(date);
            }
            if (isEqualDate(date, now)) {
                return `今天`;
            } else if (this.$date.isSameWeek(date, now)) {
                return this.$date.getWeek(date);
            } else if (this.$date.isSameYear(date, now)) {
                return this.$date.format(date, 'M月d日');
            } else {
                return this.$date.format(date, 'yyyy年M月d日');
            }
        } else {
            return params;
        }
    }
}

