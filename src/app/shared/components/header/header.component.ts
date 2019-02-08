import { Component } from "@angular/core";
import { HeaderService } from "./header.service";
import { BusService } from "../../server/bus/bus.service";
import { TopicConst } from "../../const/topic.const";

@Component({
    selector: 'rob-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [HeaderService]
})
export class HeaderComponent {

    constructor(
        private $service: HeaderService,
        private $bus: BusService
    ) {

    }

    logout() {
        this.$service.logout().subscribe((res: any) => {
            if (res.success) {
                this.$bus.commit(TopicConst.login, {status: false});
            }
        });
    }
}
