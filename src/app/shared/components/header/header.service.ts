import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HeaderService {

    constructor(
        private $http: HttpClient
    ) {}

    logout() {
        return this.$http.post('/user/logout', {});
    }
}
