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

    isDetailOpen = false;

    @Input() set tableName(tn: string) {
        this.$service.queryDocumentList(tn).subscribe((res: any) => {
            this.columns = Object.keys(res.data).map(key => (
                {
                    field: key,
                    width: 100,
                    filterType: res.data[key].fieldType,
                    title_zh: res.data[key].title_zh,
                    title_en: res.data[key].title_en
                }
            ));

            this.columns[this.columns.length - 1].width = null;

        })
    }

    constructor(
        private $service: CollectionService
    ) {
        const model = new GridResultModel();
        model.data = [{}, {}, {}];
        model.total = 100;
        model.current = 1;
        model.pagesize = 20;

        this.dataSource = model;
    }

    ngOnInit() { }

    handleCreate() {
        this.isDetailOpen = true;
    }

    onAction(action: any) {
        this.isDetailOpen = true;
        console.log('action', action);
        if (action.type === 'delete') {

        } else {

        }
    }

}
