import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { CollectionDetailService } from "./collection-detail.service";
import { HsFormControl, HsFormGroup } from "@hibiscus/form";

@Component({
    selector: 'rob-collection-detail',
    templateUrl: './collection-detail.component.html',
    providers: [
        CollectionDetailService
    ]
})
export class CollectionDetailComponent implements OnInit {
    @Input() field: string;

    @Input() set fieldName(field: string) {
        this.rules.get('fieldName').setValue(field);
    }

    get fieldName() {
        return this.rules.contains('fieldName') ? this.rules.get('fieldName').value : '';
    }

    @Input() nzVisible = false;

    @Input() set detail(detail: any) {
        Object.keys(detail).forEach(key => {
            if (key !== 'field') {
                this.rules.get(key).reset(detail[key]);
            }
        });
    }

    @Output() nzOnOk = new EventEmitter<any>();

    rules: HsFormGroup;

    constructor(
        private $service: CollectionDetailService
    ) {
        this.rules = this.$service.initFormStatus();
    }

    ngOnInit() {

    }

    onSubmit() {
        this.nzOnOk.emit(Object.assign(this.rules.value, {field: this.field}));
        this.nzVisible = false;
    }

}
