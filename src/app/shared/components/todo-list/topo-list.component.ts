import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { EnumToListService } from "../../server/enum-to-list/enum-to-list.service";
import { TimePeriod } from "../../enum/time-period.enum";

@Component({
    selector: 'rob-topo-list',
    templateUrl: './topo-list.component.html',
    styleUrls: ['./topo-list.component.scss']
})
export class TopoListComponent implements OnInit {

    readonly tagColors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

    selectedIndex = 1;

    /** tag与input切换 */
    inputVisible = false;

    data = [
        'Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.'
    ];

    editTaskTags: Array<{name: string, color: string}> = [];

    timePeriodOptions = [];

    @ViewChild('inputEl') private inputEl: ElementRef;

    constructor(
        private $enum: EnumToListService
    ) {}

    ngOnInit() {
        this.timePeriodOptions = this.$enum.getTimePeriodDropdown();
    }

    onTodoClick(index: number) {
        this.selectedIndex = index;
    }

    showInput() {
        this.inputVisible = true;
        setTimeout(() => {
            this.inputEl.nativeElement.focus();
        }, 10);
    }

    onInputConfirm(value: string) {
        value = value.trim();
        if (!this.editTaskTags.find(task => task.name === value)) {
            this.editTaskTags.push({
                name: value,
                color: this.tagColors[Math.floor(Math.random() * this.tagColors.length)]
            });
        }
        this.inputEl.nativeElement.value = '';
        this.inputVisible = false;
    }

    afterTagClose({tagName}) {
        this.editTaskTags = this.editTaskTags.filter(task => task.name !== tagName);
    }



}
