import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ValidationErrors } from "@angular/forms";
import { Observable, Observer } from "rxjs";
import { CreateCollectionService } from "./create-collection.service";
import { NzNotificationService } from "ng-zorro-antd";

@Component({
    selector: 'rob-create-collection',
    templateUrl: './create-collection.component.html',
    providers: [
        CreateCollectionService
    ]
})
export class CreateCollectionComponent implements OnInit {
    rules: FormGroup;

    list = ['field_1'];

    cValue: string;

    details = new Map<string, any>();

    constructor(
        private $service: CreateCollectionService,
        private $notify: NzNotificationService
    ) { }

    ngOnInit() {
        this.rules = new FormGroup({});
        this.rules.addControl('tableName', this.commonControl());
        this.rules.addControl('field_1', this.commonControl());
        this.details.set('field_1', {});
    }

    /**
     * 添加字段
     */
    addField() {
        const field = `field_${this.list.length + 1}`;
        this.list.push(field);
        this.details.set(field, {});
        this.rules.addControl(field, this.commonControl())
    }

    handleCollectionDetailSubmit(detail: any) {
        this.details.set(detail.field, detail);
    }

    openDetail(detail: any, field: string) {
        detail.nzVisible = true;
        detail.field = field;
        detail.detail = this.details.get(field);
        detail.fieldName = this.rules.get(field).value;
    }

    onSubmit() {
        console.log(this.details);
        console.log(this.rules.value);
        const config = {};
        this.list.forEach(field => {
            config[this.rules.get(field).value] = this.details.get(field);
        });

        this.$service.createCollection({collection: this.rules.get('tableName').value, config}).subscribe(res => {
            this.$notify.success('数据库操作', '成功创建XXXX表 xxxx');
        });
    }

    commonControl(): FormControl {
        const control = new FormControl();
        control.setValidators([
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('^[a-zA-Z][a-zA-Z0-9_]*$')
        ]);
        // TODO:判断重复
        // control.valueChanges.subscribe(value => {
        //     this.list.forEach(field => {

        //     });
        // });
        return control;
    }
}
