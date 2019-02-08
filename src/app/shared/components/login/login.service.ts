import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from '../../server/url/url.service';

@Injectable()
export class LoginService {

    constructor(
        private $http: HttpClient,
        private $urlService: UrlService
    ) {}

    login(username: string, password: string): Observable<any> {
        return this.$http.post('/user/login', {username, password});
    }
}
