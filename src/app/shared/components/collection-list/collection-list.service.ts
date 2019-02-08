import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CollectionService {

    constructor(
        private $http: HttpClient
    ) {}

    queryDocumentConfig(tableName: string) {
        return this.$http.get(`/collection/config/${tableName}`);
    }

    queryDocumentList(tableName: string, params: any) {
        return this.$http.post(`/document/list/${tableName}`, params);
    }

    deleteDocuments(tableName: string, ids: any[]) {
        return this.$http.post(`/document/delete/${tableName}`, ids);
    }
}
