import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DocumentDetailService {

    constructor(
        private $http: HttpClient
    ) {}

    /**
     * 新增文档
     *
     * @param collection
     * @param params
     */
    insertDocument(collection: string, params) {
        return this.$http.put(`/document/insert/${collection}`, params);
    }

    /**
     * 更新文档
     *
     * @param collection
     * @param params
     */
    updateDocument(collection: string, params: any) {
        return this.$http.put(`/document/modify/${collection}`, params);
    }

}
