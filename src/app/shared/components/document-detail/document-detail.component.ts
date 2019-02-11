import { Component, Input, Output, EventEmitter } from "@angular/core";
import { HsFormGroup, HsFormControl } from "@hibiscus/form";
import { DocumentDetailService } from "./document-detail.service";
import { NzNotificationService } from "ng-zorro-antd";
import { ActionType } from "../../enum/action-type.enum";
import { Validators } from "@angular/forms";
import { CommonI18nService } from "../../server/common-i18n/common-i18n.service";

@Component({
    selector: 'rob-document-detail',
    templateUrl: './document-detail.component.html',
    styleUrls: ['./document-detail.component.scss'],
    providers: [DocumentDetailService]
})
export class DocumentDetailComponent {

    private _rules: HsFormGroup;
    @Input() set rules(rules: any) {
        console.log(rules);
        if (!rules) {
            return;
        }
        const group = new HsFormGroup();
        group.labelWidth = 6;
        group.controlWidth = 18;
        group.readonly = this.documentType === 'detail';

        rules.forEach(item => {
            const control = new HsFormControl();
            control.label = item.title_zh;
            control.field = item.field;
            control.type = this.converControlType(item.filterType);
            if (control.type === 'dropdown') {
                control.dropdown = item.dropdown;
            }
            this.resolveValidator(control, item);
            group.addControl(item.field, control);
        });

        this._rules = group;
    }

    get rules(): any {
        return this._rules;
    }

    @Input() modal: any;

    private _type: ActionType;
    @Input() set documentType(type: ActionType) {
        this._type = type;
        if (this.rules) {
            this.rules.readonly = type === ActionType.detail;
        }
        if (type === ActionType.insert) {
            (this.rules as HsFormGroup).reset();
        }
    };

    get documentType(): ActionType {
        return this._type;
    }

    @Input() tableName: string;

    @Output() onback = new EventEmitter<any>();

    constructor(
        private $form: DocumentDetailService,
        private $notify: NzNotificationService,
        private $i18n: CommonI18nService
    ) {}

    handleBack() {
        this.rules.reset();
        this.onback.emit(true);
    }

    handleSubmit() {
        if (this.documentType === ActionType.edit) {
            const params = Object.assign({}, this.rules.value);
            params._id = this.modal._id;
            this.$form.updateDocument(this.tableName, params).subscribe(res => {
                this.$notify.success('数据库操作', '修改成功', {
                    nzDuration: 3000
                });
                this.onback.emit(true);
            })
        } else if (this.documentType === ActionType.insert) {
            this.$form.insertDocument(this.tableName, this.rules.value).subscribe(res => {
                this.$notify.success('数据库操作', '新增成功', {
                    nzDuration: 3000
                });
                this.onback.emit(true);
            });
        } else {
            throw new Error('000');
        }
    }

    converControlType(type: string): any {
        let convertType = '';
        switch (type) {
            case 'string':
                convertType = 'input';
                break;
            case 'numeric':
                convertType = 'number';
                break;
            default:
                convertType = type;
                break;
        }
        return convertType;
    }

    private resolveValidator(control: HsFormControl, data: any) {
        const valitors = [];
        if (data.required) {
            valitors.push(Validators.required);
            control.setErrorMsg('required', this.$i18n.get('errorMessage.required'));
        }
        if (data.min) {
            valitors.push(Validators.min(data.min));
            control.setErrorMsg('min', this.$i18n.get('errorMessage.min') + data.min);
        }
        if (data.max) {
            valitors.push(Validators.max(data.max));
            control.setErrorMsg('max', this.$i18n.get('errorMessage.max') + data.max);
        }
        if (data.minlength) {
            valitors.push(Validators.minLength(data.minlength));
            control.setErrorMsg('minlength', this.$i18n.get('errorMessage.minlength') + data.minlength);
        }
        if (data.maxlength) {
            valitors.push(Validators.maxLength(data.maxlength));
            control.setErrorMsg('maxlength', this.$i18n.get('errorMessage.maxlength') + data.maxlength);
        }
        control.setValidators(valitors);
    }
}
