import { Injectable } from "@angular/core";
import { firstDayInWeek, isEqualDate, firstDayOfMonth, firstMonthOfYear } from '@progress/kendo-date-math';
import { CommonI18nService } from "../common-i18n/common-i18n.service";
import { SystemConfigService } from "../system-config/system-config.service";
import { SystemConfigKey } from "../../const/system-config-key";

const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

@Injectable()
export class DateService {

    constructor(
        private $i18n: CommonI18nService,
        private $system: SystemConfigService
    ) { }

    /**
     * 日期格式化
     *
     * @param date
     * @param f
     */
    format(date: string | Date, f: string = 'yyyy-MM-dd hh:mm:ss'): string {
        if (!Date.prototype['format']) {
            Date.prototype['format'] = function (fmt) {
                const o = {
                    'y+': this.getYear(),                           // 年
                    'M+': this.getMonth() + 1,                      // 月份
                    'd+': this.getDate(),                           // 日
                    'h+': this.getHours(),                          // 小时
                    'm+': this.getMinutes(),                        // 分
                    's+': this.getSeconds(),                        // 秒
                    'q+': Math.floor((this.getMonth() + 3) / 3),    // 季度
                    'S': this.getMilliseconds()                     // 毫秒
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (const k in o) {
                    if (new RegExp('(' + k + ')').test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
                    }
                }
                return fmt;
            };
        }

        return (typeof date === 'string' ? new Date(date) : date)['format'](f);
    }

    /**
     * 是否为同一周
     *
     * @param d1
     * @param d2
     */
    isSameWeek(d1: Date, d2: Date): boolean {
        const weekStartDay = this.$system.getSystemConfigByKey(SystemConfigKey.weekStartDay);
        return isEqualDate(firstDayInWeek(d1, weekStartDay), firstDayInWeek(d2, weekStartDay));
    }

    isSameMonth(d1: Date, d2: Date): boolean {
        return isEqualDate(firstDayOfMonth(d1), firstDayOfMonth(d2));
    }

    isSameYear(d1: Date, d2: Date): boolean {
        return d1.getFullYear() === d2.getFullYear();
    }

    /**
     * 获取星期
     *
     * @param date
     */
    getWeek(date: Date): string {
        return this.$i18n.get(`weekDays.${weekDays[date.getDay()]}`);
    }
}
