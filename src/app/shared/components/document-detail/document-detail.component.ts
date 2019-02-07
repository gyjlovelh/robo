import { Component, Input, Output, EventEmitter } from "@angular/core";
import { HsFormGroup, HsFormControl } from "@hibiscus/form";
import { DocumentDetailService } from "./document-detail.service";

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
        // group.readonly = true;

        rules.forEach(item => {
            const control = new HsFormControl();
            control.label = item.title_zh;
            control.field = item.field;
            control.type = this.converControlType(item.filterType);
            group.addControl(item.field, control);
        });

        this._rules = group;
    }

    get rules(): any {
        return this._rules;
    }

    @Output() onback = new EventEmitter<any>();

    constructor(
        private $form: DocumentDetailService
    ) {
        // const group = new HsFormGroup();
        // group.addControl('name', new HsFormControl());
        // group.addControl('age', new HsFormControl());

        // this.rules = group;
    }

    handleBack() {
        this.onback.emit(true);
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
}
