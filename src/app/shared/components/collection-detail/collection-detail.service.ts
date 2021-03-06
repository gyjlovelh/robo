import { Injectable } from "@angular/core";
import { HsFormGroup, HsFormControl } from "@hibiscus/form";
import { EnumToListService } from "../../server/enum-to-list/enum-to-list.service";
import { FieldType } from "../../enum/field-type.enum";
import { Validators } from "@angular/forms";
import { CommonI18nService } from "../../server/common-i18n/common-i18n.service";

@Injectable()
export class CollectionDetailService {

    private rules: HsFormGroup;

    private templateMap = new Map<string, any>();

    constructor(
        private $dropdown: EnumToListService,
        private $i18n: CommonI18nService
    ) {}

    initFormStatus() {
        this.rules = new HsFormGroup();
        this.rules.labelWidth = 6;
        this.rules.controlWidth = 18;
        // this.rules.layout = 'inline';

        this.rules.addControl('fieldName', this.initFieldNameControl());
        this.rules.addControl('fieldType', this.initFieldTypeControl());
        this.rules.addControl('title_zh', this.initTitleZhControl());
        this.rules.addControl('title_en', this.initTitleEnControl());
        this.rules.addControl('maxlength', this.initMaxlengthControl());
        this.rules.addControl('minlength', this.initMinlengthControl());
        this.rules.addControl('required', this.initRequiredControl());
        this.rules.addControl('unique', this.initUniqueControl());
        this.rules.addControl('isCopy', this.initIsCopyControl());
        this.rules.addControl('default', this.initDefaultControl());
        this.rules.addControl('pattern', this.initPatternControl());
        this.rules.addControl('async', this.initAsyncControl());

        return this.rules;
    }

    addTemplate(key, template) {
        this.templateMap.set(key, template);
    }

    private initFieldNameControl() {
        const control = new HsFormControl();
        control.field = 'fieldName';
        control.label = '字段名';
        control.readonly = true;
        return control;
    }

    private initFieldTypeControl() {
        const control = new HsFormControl();
        control.field = 'fieldType';
        control.label = '字段类型';
        control.type = 'dropdown';
        control.dropdown = this.$dropdown.getFieldTypeDropdown();
        control.reset('string');
        control.valueChanges.subscribe(value => {
            this.whenFieldTypeChange();
            if (value === FieldType.string) {
                this.rules.addControl('minlength', this.initMinlengthControl(), {after: 'fieldType'});
                this.rules.addControl('maxlength', this.initMaxlengthControl(), {after: 'fieldType'});
            } else if (value === FieldType.numeric) {
                this.rules.addControl('max', this.initMaxControl(), {after: 'fieldType'});
                this.rules.addControl('min', this.initMinControl(), {after: 'fieldType'});
            } else if (value === FieldType.dropdown) {
                this.rules.addControl('dropdown', this.initDropdownControl(), {after: 'fieldType'});
            } else if (value === FieldType.date) {
                this.rules.addControl('dateformat', this.initDateFormatControl(), {after: 'fieldType'});
            } else {

            }
        });
        return control;
    }

    private initTitleZhControl() {
        const control = new HsFormControl();
        control.field = 'title_zh';
        control.label = '中文名';
        control.required = true;
        control.type = 'input';
        control.setValidators([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(12),
        ]);

        control.setErrorMsg('required', this.$i18n.get('errorMessage.required'));
        control.setErrorMsg('minlength', this.$i18n.get('errorMessage.minlength') + 2);
        control.setErrorMsg('maxlength', this.$i18n.get('errorMessage.maxlength') + 12);
        return control;
    }

    private initTitleEnControl() {
        const control = new HsFormControl();
        control.field = 'title_en';
        control.label = '英文名';
        control.required = true;
        control.type = 'input';

        control.setValidators([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(12),
        ]);

        control.setErrorMsg('required', this.$i18n.get('errorMessage.required'));
        control.setErrorMsg('minlength', this.$i18n.get('errorMessage.minlength') + 2);
        control.setErrorMsg('maxlength', this.$i18n.get('errorMessage.maxlength') + 12);
        return control;
    }

    /** 枚举配置 */
    private initDropdownControl() {
        const control = new HsFormControl();
        control.field = 'dropdown';
        control.labelTemplate = this.templateMap.get('dropdownTemplate');
        control.type = 'textarea';
        control.placeholder = `张三 zhangsan zs\n李四 lisi ls\n...`;
        control.setValidators([
            Validators.required,
            Validators.pattern(/([a-z\u4e00-\u9fa5]+\s[a-z]+\s[a-z0-9]+(\n)*)+/i)
        ]);
        control.setErrorMsg('required', this.$i18n.get('errorMessage.required'));
        control.setErrorMsg('pattern', '正则不对');
        return control;
    }
    /** 日期格式化 */
    private initDateFormatControl() {
        const control = new HsFormControl();
        control.field = 'dateformat';
        control.label = '日期格式';
        control.type = 'input';
        control.placeholder = 'yyyy/MM/dd hh:mm:ss';
        return control;
    }

    private initMaxControl() {
        const control = new HsFormControl();
        control.field = 'max';
        control.label = '最大值';
        control.type = 'number';
        return control;
    }

    private initMinControl() {
        const control = new HsFormControl();
        control.field = 'min';
        control.label = '最小值';
        control.type = 'number';
        return control;
    }

    private initMaxlengthControl() {
        const control = new HsFormControl();
        control.field = 'maxlength';
        control.label = '最大长度';
        control.type = 'number';
        return control;
    }

    private initMinlengthControl() {
        const control = new HsFormControl();
        control.field = 'minlength';
        control.label = '最小长度';
        control.type = 'number';
        return control;
    }

    private initRequiredControl() {
        const control = new HsFormControl();
        control.field = 'required';
        control.label = '是否必填';
        control.type = 'boolean';
        return control;
    }

    private initUniqueControl() {
        const control = new HsFormControl();
        control.field = 'unique';
        control.label = '是否唯一';
        control.type = 'boolean';
        return control;
    }

    private initIsCopyControl() {
        const control = new HsFormControl();
        control.field = 'isCopy';
        control.label = '能否复制';
        control.type = 'boolean';
        return control;
    }

    private initDefaultControl() {
        const control = new HsFormControl();
        control.field = 'default';
        control.label = '缺省值';
        control.type = 'input';
        return control;
    }

    private initPatternControl() {
        const control = new HsFormControl();
        control.field = 'pattern';
        control.label = '正则';
        control.type = 'input';
        return control;
    }

    private initAsyncControl() {
        const control = new HsFormControl();
        control.field = 'async';
        control.label = '异步校验';
        control.type = 'input';
        return control;
    }

    private whenFieldTypeChange() {
        this.rules.removeControl('min');
        this.rules.removeControl('max');
        this.rules.removeControl('minlength');
        this.rules.removeControl('maxlength');
        this.rules.removeControl('dropdown');
        this.rules.removeControl('dateformat');
    }
}
