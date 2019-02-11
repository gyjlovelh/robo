/**
 * 项目消息队列
 *
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-02-07 19:04:22
 * @LastEditTime: 2019-02-11 12:18:44
 */
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class BusService {

    [key: string]: any;

    constructor() { }

    /**
     * 注册Topic
     *
     * @param topic
     */
    registry(topic: string) {
        this[`${topic}`] = new Subject<any>();
        this[`${topic}Change$`] = this[`${topic}`].asObservable();
        this[`commit${topic}change`] = (val: any) => {
            this[`${topic}`].next(val);
        }
    }

    /**
     * 订阅Topic
     *
     * @param topic
     * @param fn
     */
    subscribe(topic: string, fn: (data: any) => void) {
        return this[`${topic}Change$`].subscribe(fn);
    }

    /**
     * 提交Topic
     *
     * @param topic
     * @param data
     */
    commit(topic: string, data: any) {
        if (this[topic]) {
            this[`commit${topic}change`](data);
        } else {
            // 创建新的topic
            throw new Error(`未注册此${topic}主题`);
        }
    }

}
