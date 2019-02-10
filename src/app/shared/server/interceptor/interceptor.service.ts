/**
 * Created by guanyj on  2018/9/6
 */
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Injectable} from "@angular/core";
import {SystemConfigService} from "../system-config/system-config.service";
import {SystemConfigKey} from "../../const/system-config-key";
import {NzNotificationService} from "ng-zorro-antd";

@Injectable()
export class InterceptorService implements HttpInterceptor {
    private i18n: any;
    constructor(
        private $systemConfigService: SystemConfigService,
        private $notifyService: NzNotificationService
    ) {
        // this.i18n = $commonI18nService.i18n.common;
    }

    /**
     * 请求/响应拦截器
     * @param {HttpRequest<any>} req
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const token = this.$systemConfigService.getSystemConfigByKey(SystemConfigKey.authorization);

        const authReq = req.clone({
            setHeaders: {
                'Authorization': '111',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        return next.handle(authReq);
    }

}
