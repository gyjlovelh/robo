import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BusService } from './shared/server/bus/bus.service';
import { TopicConst } from './shared/const/topic.const';

@Component({
    selector: 'rob-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isCollapsed = false;
    triggerTemplate = null;
    tabs = [ 'Tab 1', 'Tab 2' ];

    isLogin = false;

    constructor(
        private $bus: BusService
    ) {
        this.$bus.subscribe(TopicConst.login, data => {
            this.isLogin = data.status;
        });
    }

    ngOnInit() {
    }
}
