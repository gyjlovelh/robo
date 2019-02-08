import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { LocalStorageService } from '@jwaf/storage';
import { BusService } from '../../server/bus/bus.service';
import { TopicConst } from '../../const/topic.const';

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
        private $storage: LocalStorageService
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
            this.$storage.set('collections', Object.keys(res.data.collections).map(key => key.split('_')[1]));
            this.$bus.commit(TopicConst.login, {status: true});
        });
    }
}
