import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: 'rob-collection-detail',
    templateUrl: './collection-detail.component.html'
})
export class CollectionDetailComponent implements OnInit {
    @Input() field: string;

    @Input() set fieldName(field: string) {
        if (!this.rules.contains('fieldName')) {
            this.rules.addControl('fieldName', new FormControl());
        }
        this.rules.get('fieldName').setValue(field);
    }

    get fieldName() {
        return this.rules.contains('fieldName') ? this.rules.get('fieldName').value : '';
    }

    @Input() nzVisible = false;

    @Input() set detail(detail: any) {
        this.rules.reset();
        Object.keys(detail).forEach(key => {
            if (key !== 'field') {
                this.rules.get(key).reset(detail[key]);
            }
        });
    }

    @Output() nzOnOk = new EventEmitter<any>();

    rules: FormGroup = new FormGroup({});

    constructor() {
        this.rules.addControl('fieldType', new FormControl());
        this.rules.addControl('title_zh', new FormControl());
        this.rules.addControl('title_en', new FormControl());
        this.rules.addControl('max', new FormControl());
        this.rules.addControl('min', new FormControl());
        this.rules.addControl('maxlength', new FormControl());
        this.rules.addControl('minlength', new FormControl());
        this.rules.addControl('required', new FormControl());
        this.rules.addControl('unique', new FormControl());
        this.rules.addControl('isCopy', new FormControl());
        this.rules.addControl('default', new FormControl());
        this.rules.addControl('pattern', new FormControl());
        this.rules.addControl('async', new FormControl());
    }

    ngOnInit() {


    }

    onSubmit() {
        this.nzOnOk.emit(Object.assign(this.rules.value, {field: this.field}));
        this.nzVisible = false;
    }

}
