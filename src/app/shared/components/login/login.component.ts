import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { BusService } from '../../server/bus/bus.service';
import { TopicConst } from '../../const/topic.const';
import { SystemConfigService } from '../../server/system-config/system-config.service';

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

        this.rules = new FormGroup({});

        this.rules.addControl('username', new FormControl());
        this.rules.addControl('password', new FormControl());
    }

    handleLogin(btn: any) {
        this.$loginService.login(this.rules.get('username').value, this.rules.get('password').value).subscribe(res => {
            this.isLogin = true;
            this.$cookie.set('user', res.data.code);
            // 缓存该用户所有collection名称
            this.$system.setSystemConfigByKey('collections', Object.keys(res.data.collections).map(key => key.split('_')[1]));
            // 设置语言环境
            this.$system.setSystemConfigByKey('language', 'zh_CN');
            // 推送登录成功消息
            this.$bus.commit(TopicConst.login, {status: true});
        });
    }
}
