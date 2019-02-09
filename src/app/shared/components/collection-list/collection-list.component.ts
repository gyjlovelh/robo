import { Component, OnInit, Input } from "@angular/core";
import { CollectionService } from "./collection-list.service";
import { GridResultModel, GridColumns } from "@jwaf/grid";
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
} from '@angular/animations';
import { ActionType } from "../../enum/action-type.enum";
import { NzNotificationService } from "ng-zorro-antd";


@Component({
    selector: 'rob-collection-list',
    templateUrl: './collection-list.component.html',
    styleUrls: ['./collection-list.component.scss'],
    providers: [CollectionService],
    animations: [
        trigger('collectionChange', [
            state('listOpen', style({
                transform: 'rotateY(0)'
            })),
            state('listClose', style({
                transform: 'rotateY(90deg)'
            })),
            transition('listOpen => listClose', [
                animate('.3s')
            ]),
            transition('listClose => listOpen', [
                animate('.3s')
            ]),
        ]),
        trigger('detailChange', [
            state('detailOpen', style({
                transform: 'rotateY(0)'
            })),
            state('detailClose', style({
                transform: 'rotateY(90deg)'
            })),
            transition('detailOpen => detailClose', [
                animate('.3s')
            ]),
            transition('detailClose => detailOpen', [
                animate('.3s')
            ])
        ])
    ]
})
export class CollectionListComponent implements OnInit {

    columns: GridColumns[];

    dataSource: GridResultModel;

    doc: any;

    isDetailOpen = false;

    condition: any;

    private _tableName: string;

    @Input() set tableName(tn: string) {
        this._tableName = tn;
        this.$service.queryDocumentConfig(tn).subscribe((res: any) => {
            this.columns = Object.keys(res.data).map(key => {
                const item = res.data[key];
                item.width = 100;
                item.field = item.fieldName;
                item.filterType = item.fieldType;
                console.log('item', item);
                return item;
            });

            this.columns[this.columns.length - 1].width = null;
        });

        this.refreshTable();
    }

    get tableName() {
        return this._tableName;
    }

    @Input() documentType: string;

    constructor(
        private $service: CollectionService,
        private $notify: NzNotificationService
    ) {
        this.condition = {
            filters: [],
            sort: null,
            pagesize: 10,
            current: 1
        }
    }

    ngOnInit() { }

    handleCreate() {
        this.isDetailOpen = true;
        this.doc = null;
        this.documentType = ActionType.insert;
    }

    handleBack() {
        this.isDetailOpen = false;
        this.refreshTable();
    }

    onAction(action: {type: ActionType, data: any}) {
        if (action.type === ActionType.delete) {
            this.$service.deleteDocuments(this.tableName, [action.data._id]).subscribe(data => {
                console.log(data);
                this.$notify.success('数据库操作', '删除成功', {nzDuration: 3000});
                this.refreshTable();
            });
        } else {
            this.isDetailOpen = true;
            this.documentType = action.type;
            this.doc = action.data;
        }
    }

    handleDataSourceChange(change: any) {
        this.condition.filters = change.filters;
        this.condition.sort = change.sort;
        this.condition.current = change.offset / change.pagesize + 1;
        this.condition.pagesize = change.pagesize;

        this.refreshTable();
        console.log('change:', change);
    }

    private refreshTable() {
        this.$service.queryDocumentList(this.tableName, this.condition).subscribe((res: any) => {
            const model = new GridResultModel();
            model.data = res.data.data;
            model.total = res.data.totalCount;
            model.current = res.data.pageNum;
            model.pagesize = res.data.pageSize;

            this.dataSource = model;
        });
    }

}
