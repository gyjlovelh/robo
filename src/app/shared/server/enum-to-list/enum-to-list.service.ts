import { Injectable } from "@angular/core";
import { CommonI18nService } from "../common-i18n/common-i18n.service";
import { FieldType } from "../../enum/field-type.enum";

@Injectable()
export class EnumToListService {

    constructor(
        private $i18n: CommonI18nService
    ) {}

    getFieldTypeDropdown() {
        return Object.keys(FieldType).map(key => ({label: this.$i18n.get(`enum.fieldType.${key}`), value: FieldType[key]}));
    }

}
