import { Component, Input, OnInit, Output, EventEmitter, ViewChild, TemplateRef, AfterViewInit } from "@angular/core";
import { CollectionDetailService } from "./collection-detail.service";
import { HsFormControl, HsFormGroup } from "@hibiscus/form";

@Component({
    selector: 'rob-collection-detail',
    templateUrl: './collection-detail.component.html',
    providers: [
        CollectionDetailService
    ]
})
export class CollectionDetailComponent implements OnInit, AfterViewInit {
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

    @ViewChild('dropdownTemplate') private dropdownTemplate: TemplateRef<any>;

    constructor(
        private $service: CollectionDetailService
    ) {
        this.rules = this.$service.initFormStatus();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.$service.addTemplate('dropdownTemplate', this.dropdownTemplate);
    }

    onSubmit() {
        this.nzOnOk.emit(Object.assign(this.rules.value, {field: this.field}));
        this.nzVisible = false;
    }

}
