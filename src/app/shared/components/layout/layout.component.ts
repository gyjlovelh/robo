import { Component, OnInit } from "@angular/core";
import { LayoutService } from "./layout.service";
import { LocalStorageService } from "@jwaf/storage";
import { NzMenuItemDirective } from "ng-zorro-antd";
import { BusService } from "../../server/bus/bus.service";
import { SystemConfigService } from "../../server/system-config/system-config.service";

@Component({
    selector: 'rob-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    providers: [LayoutService]
})
export class LayoutComponent implements OnInit {
    isCollapsed = false;
    collectionsName = [];
    tabs = ['create'];

    selectedIndex = 0;

    constructor(
        private $layoutService: LayoutService,
        private $system: SystemConfigService
    ) {

    }

    ngOnInit() {
        this.collectionsName = this.$system.getSystemConfigByKey('collections');
    }

    handleMenuClick(name: string) {
        if (this.tabs.includes(name)) {
            this.selectedIndex = this.tabs.findIndex(tab => tab === name);
        } else {
            this.tabs.push(name);
            this.selectedIndex = this.tabs.length - 1;
        }
    }

    handleCloseTab(name: string) {
        this.tabs = this.tabs.filter(tab => tab !== name);
    }

}
