import { Injectable } from "@angular/core";
import { CommonI18nService } from "../common-i18n/common-i18n.service";
import { FieldType } from "../../enum/field-type.enum";
import { TimePeriod } from "../../enum/time-period.enum";

@Injectable()
export class EnumToListService {

    constructor(
        private $i18n: CommonI18nService
    ) {}

    /**
     * 获取字段类型枚举
     */
    getFieldTypeDropdown() {
        return Object.keys(FieldType).map(key => ({label: this.$i18n.get(`enum.fieldType.${key}`), value: FieldType[key]}));
    }

    getTimePeriodDropdown() {
        return Object.keys(TimePeriod).map(key => ({label: key, value: TimePeriod[key]}));
    }
}
