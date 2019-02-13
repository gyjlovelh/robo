import { Pipe, PipeTransform } from "@angular/core";
import { TabName } from "../enum/tab-name.enum";

@Pipe({
    name: 'tabName'
})
export class TabNamePipe implements PipeTransform {

    transform(value: string, params: any) {
        let label = '';
        switch (value) {
            case TabName.create:
                label = '创建集合';
                break;
            case TabName.todo:
                label = '待办事项';
                break;
            default:
                label = value;
        }
        return label;
    }

}
