import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../../server/url/url.service";

@Injectable()
export class CreateCollectionService {

    constructor(
        private $http: HttpClient,
        private $urlService: UrlService
    ) {}

    createCollection(params: any) {
        return this.$http.post('/collection/create', params);
    }

}
