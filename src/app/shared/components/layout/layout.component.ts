import { Component, OnInit } from "@angular/core";
import { LayoutService } from "./layout.service";
import { BusService } from "../../server/bus/bus.service";
import { SystemConfigService } from "../../server/system-config/system-config.service";
import { TopicConst } from "../../const/topic.const";
import { TabName } from "../../enum/tab-name.enum";

@Component({
    selector: 'rob-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    providers: [LayoutService]
})
export class LayoutComponent implements OnInit {
    isCollapsed = false;
    collectionsName = [];
    tabs = [TabName.todo];

    selectedIndex = 0;

    constructor(
        private $layoutService: LayoutService,
        private $system: SystemConfigService,
        private $bus: BusService
    ) {
        this.$bus.subscribe(TopicConst.topolist, (data: any) => {
            this.handleMenuClick(data.tab);
        });
    }

    ngOnInit() {
        this.collectionsName = this.$system.getSystemConfigByKey('collections');
    }

    handleMenuClick(name: TabName) {
        if (this.tabs.includes(name)) {
            this.selectedIndex = this.tabs.findIndex(tab => tab === name);
        } else {
            this.tabs.push(name);
            this.selectedIndex = this.tabs.length - 1;
        }
    }

    onCollectionDelete(name: string) {
        console.log('---', name);
    }

    handleCloseTab(name: string) {
        this.tabs = this.tabs.filter(tab => tab !== name);
    }

    handleTodo() {
        this.$bus.commit(TopicConst.topolist, {tab: TabName.todo});
    }
}
