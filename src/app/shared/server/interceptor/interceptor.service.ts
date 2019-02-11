/**
 * {{desc}}
 *
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-02-03 18:43:37
 * @LastEditTime: 2019-02-11 12:22:27
 */
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpHeaderResponse} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Injectable} from "@angular/core";
import {map} from 'rxjs/operators';
import { NzModalService } from "ng-zorro-antd";
import { BusService } from "../bus/bus.service";
import { TopicConst } from "../../const/topic.const";

@Injectable()
export class InterceptorService implements HttpInterceptor {
    private i18n: any;
    constructor(
        private $modal: NzModalService,
        private $bus: BusService
    ) {}

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

        return next.handle(authReq).pipe(
            map(value => {
                if (value instanceof HttpResponse) {
                    if (!value.body.success) {
                        this.$modal.error({
                            nzTitle: '请求错误',
                            nzContent: value.body.errorMsg
                        });
                        if (value.body.code === -1) {
                            this.$bus.commit(TopicConst.login, {status: false});
                        }
                    }
                }
                return value;
            })
        );
    }

}
