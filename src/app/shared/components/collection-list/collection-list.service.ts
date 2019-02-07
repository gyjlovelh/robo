import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CollectionService {

    constructor(
        private $http: HttpClient
    ) {}

    queryDocumentList(tableName: string) {
        return this.$http.get(`/collection/config/${tableName}`);
    }
}
