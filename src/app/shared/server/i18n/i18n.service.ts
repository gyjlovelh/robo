/**
 * Created by guanyj on  2018/9/5
 */
import {I18N as custom_en_US} from '../../../../assets/i18n/custom/en_US';
import {I18N as custom_zh_CN} from '../../../../assets/i18n/custom/zh_CN';
import {Injectable} from "@angular/core";

@Injectable()
export class I18nService {
    public i18n: any;

    constructor(
        protected language: string = 'zh_CN',
    ) {
        if (this.language === 'zh_CN') {
            this.i18n = custom_zh_CN;
        } else {
            this.i18n = custom_en_US;
        }
    }

    /**
     * 根据指定的key的全拼读取对应国际化配置
     * @param key
     */
    get(key: string): string {
        try {
            return key.split('.').reduce((p, c) => p[c], this.i18n);
        } catch (err) {
            console.warn(`该${key}国际化未声明`);
            return '';
        }
    }
}
