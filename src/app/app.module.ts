import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { GridModule } from '@jwaf/grid';
import { AuthModule } from '@jwaf/auth';
import { CacheModule } from '@jwaf/cache';
import { StorageModule } from '@jwaf/storage';
import { CookieService } from 'ngx-cookie-service';

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

/** 配置 ng-zorro-antd 国际化 **/
import { NZ_I18N, en_US, zh_CN } from 'ng-zorro-antd';

/** 配置图标 */
import { IconModule } from '@ant-design/icons-angular';
import { AppRoute } from './app.route';
import { UrlService } from './shared/server/url/url.service';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';
import { InterceptorService } from './shared/server/interceptor/interceptor.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        IconModule,
        HttpClientModule,
        NgZorroAntdModule,
        GridModule,
        CacheModule,
        AuthModule,
        StorageModule,
        SharedModule,
        AppRoute
    ],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN },
        { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
        CookieService,
        { provide: UrlService, useFactory: () => {
            return new UrlService(environment.httpHeadUrl, environment.wsHeadUrl);
        }}
    ],
    entryComponents: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
