/**
 * Shared模块
 *
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-02-03 18:41:52
 * @LastEditTime: 2019-02-11 12:16:56
 */

import { NgModule, Injector } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthorityService } from "./server/authority/authority.service";
import { AuthorityGuardService } from "./server/authority-guard/authority-guard.service";
import { CommonI18nService } from "./server/common-i18n/common-i18n.service";
import { SystemConfigService } from "./server/system-config/system-config.service";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { PermissionService } from "./server/permission/permission.service";
import { NavigationService } from "./server/navigation/navigation.service";
import { SystemConfigKey } from "./const/system-config-key";
import { COMMON_INJECTOR, InitCommonInjector } from "./common.consts";
import { LayoutComponent } from "./components/layout/layout.component";
import { RouterModule } from "@angular/router";
import { GridModule } from '@jwaf/grid';
import { FormModule } from '@hibiscus/form';
import { CreateCollectionComponent } from "./components/create-collection/create-collection.component";
import { CollectionDetailComponent } from "./components/collection-detail/collection-detail.component";
import { CollectionListComponent } from "./components/collection-list/collection-list.component";
import { DocumentDetailComponent } from "./components/document-detail/document-detail.component";
import { HeaderComponent } from "./components/header/header.component";
import { BusService } from "./server/bus/bus.service";
import { TopicConst } from './const/topic.const';
import { LoginComponent } from "./components/login/login.component";
import { EnumToListService } from "./server/enum-to-list/enum-to-list.service";
import { CookieService } from "ngx-cookie-service";
import { TodoDirective } from "./directive/todo.directive";
import { TopoListComponent } from "./components/todo-list/topo-list.component";
import { TabNamePipe } from "./pipe/tab-name.pipe";
import { DateService } from "./server/date/date.service";
import { TimeFormatPipe } from "./pipe/time-format.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        GridModule,
        FormModule,
        ReactiveFormsModule,
        NgZorroAntdModule
    ],
    declarations: [
        LoginComponent,
        LayoutComponent,
        CreateCollectionComponent,
        CollectionDetailComponent,
        CollectionListComponent,
        DocumentDetailComponent,
        HeaderComponent,
        TopoListComponent,
        TodoDirective,
        TabNamePipe,
        TimeFormatPipe
    ],
    exports: [
        LayoutComponent,
        LoginComponent,
        TodoDirective,
        TabNamePipe
    ],
    entryComponents: [
        CreateCollectionComponent,
        CollectionDetailComponent,
        CollectionListComponent,
        DocumentDetailComponent,
        TopoListComponent,
        HeaderComponent
    ],
    providers: [
        CookieService,
        AuthorityService,
        AuthorityGuardService,
        SystemConfigService,
        PermissionService,
        NavigationService,
        DateService,
        EnumToListService,
        {
            provide: BusService,
            useFactory() {
                const bus = new BusService();
                Object.keys(TopicConst).forEach(key => {
                    bus.registry(TopicConst[key]);
                });
                return bus;
            }
        },
        {
            provide: CommonI18nService,
            useFactory: () => {
                const systemConfigService = COMMON_INJECTOR.get(SystemConfigService);
                const language = systemConfigService.getSystemConfigByKey(SystemConfigKey.language);
                console.log('language', language);
                return new CommonI18nService(language);
            }
        }
    ]
})

export class SharedModule {
    constructor(
        private injector: Injector
    ) {
        InitCommonInjector(this.injector);
    }
 }
