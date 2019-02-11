/**
 * 待办事项
 *
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-02-10 13:09:31
 * @LastEditTime: 2019-02-11 12:17:32
 */
import { Directive, HostListener } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd";

@Directive({
    selector: '[robTodo]',
})
export class TodoDirective {

    constructor(
        private $notify: NzNotificationService
    ) {}

    @HostListener('click')
    handleClick() {
        this.$notify.warning('此功能暂未开发', '正在拼命赶工~/(ㄒoㄒ)/~~', {nzDuration: 3000});
    }

}
