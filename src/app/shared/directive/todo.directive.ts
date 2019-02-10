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
