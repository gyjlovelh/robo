/**
 * Created by guanyj on  2018/9/4
 */

import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LocalStorageService } from "./server/local-storage/local-storage.service";
import { AuthorityService } from "./server/authority/authority.service";
import { AuthorityGuardService } from "./server/authority-guard/authority-guard.service";
import { CommonI18nService } from "./server/common-i18n/common-i18n.service";
import { SystemConfigService } from "./server/system-config/system-config.service";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { PermissionService } from "./server/permission/permission.service";
import { NavigationService } from "./server/navigation/navigation.service";
import { SystemConfigKey } from "./const/system-config-key";
import { COMMON_INJECTOR } from "./common.consts";
import { LayoutComponent } from "./components/layout/layout.component";
import { RouterModule } from "@angular/router";
import { GridModule } from '@jwaf/grid';
import { FormModule } from '@hibiscus/form';
import { CreateCollectionComponent } from "./components/create-collection/create-collection.component";
import { CollectionDetailComponent } from "./components/collection-detail/collection-detail.component";
import { CollectionListComponent } from "./components/collection-list/collection-list.component";
import { DocumentDetailComponent } from "./components/document-detail/document-detail.component";

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
        LayoutComponent,
        CreateCollectionComponent,
        CollectionDetailComponent,
        CollectionListComponent,
        DocumentDetailComponent
    ],
    exports: [
        LayoutComponent
    ],
    entryComponents: [
        CreateCollectionComponent,
        CollectionDetailComponent,
        CollectionListComponent,
        DocumentDetailComponent
    ],
    providers: [
        LocalStorageService,
        AuthorityService,
        AuthorityGuardService,
        SystemConfigService,
        PermissionService,
        NavigationService,
        {
            provide: CommonI18nService,
            useFactory() {
                const systemConfigService = COMMON_INJECTOR.get(SystemConfigService);
                const language = systemConfigService.getSystemConfigByKey(SystemConfigKey.language);
                return new CommonI18nService(language);
            }
        }
    ]
})

export class SharedModule { }
