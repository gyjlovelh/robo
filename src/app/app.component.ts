import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'rob-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isCollapsed = false;
    triggerTemplate = null;
    tabs = [ 'Tab 1', 'Tab 2' ];

    constructor() {

    }

    ngOnInit() {
    }
}
