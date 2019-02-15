import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { BusService } from '../../server/bus/bus.service';
import { TopicConst } from '../../const/topic.const';
import { SystemConfigService } from '../../server/system-config/system-config.service';
import { Day } from '@progress/kendo-date-math';
import { SystemConfigKey } from '../../const/system-config-key';

@Component({
    selector: 'rob-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {
    isLogin = false;

    rules: FormGroup;

    constructor(
        private $cookie: CookieService,
        private $bus: BusService,
        private $loginService: LoginService,
        private $system: SystemConfigService
    ) {
        this.$bus.subscribe('topic_login', data => {
            this.isLogin = data.status;
        });
    }

    ngOnInit() {
        this.isLogin = this.$cookie.check('user');
        this.$bus.commit(TopicConst.login, {status: this.isLogin});

        this.rules = new FormGroup({});

        this.rules.addControl('username', new FormControl());
        this.rules.addControl('password', new FormControl());
    }

    /**
     * 登录
     * @param btn
     */
    handleLogin(btn: any) {
        this.$loginService.login(this.rules.get('username').value, this.rules.get('password').value).subscribe(res => {
            this.isLogin = true;
            // 设置cookie
            // this.$cookie.set('user', res.data.code, new Date(new Date().getTime() + 2 * 60 * 60 * 1000));
            // 设置TOKEN
            console.log('this.is', this.$cookie.get('user'));
            // 缓存该用户所有collection名称
            this.$system.setSystemConfigByKey('collections', Object.keys(res.data.collections).map(key => key.split('_')[1]));
            // 设置语言环境
            this.$system.setSystemConfigByKey(SystemConfigKey.language, 'zh_CN');
            // 设置WeekStart
            this.$system.setSystemConfigByKey(SystemConfigKey.weekStartDay, Day.Monday);
            // 推送登录成功消息
            this.$bus.commit(TopicConst.login, {status: this.isLogin});
        });
    }
}
