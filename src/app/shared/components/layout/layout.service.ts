import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../../server/url/url.service";

@Injectable()
export class LayoutService {

    constructor(
        private $http: HttpClient,
        private $urlService: UrlService
    ) { }

    queryCollections() {
        // return this.$http.post()
    }
}
