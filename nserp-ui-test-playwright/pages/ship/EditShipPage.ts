import { Page } from "@playwright/test";
import { BASE_URL } from "@ui-test/utils";
import { BaseEditShipPage } from "@ui-test/pages/ship/BaseEditShipPage";

export class EditShipPage extends BaseEditShipPage {

    constructor(page: Page) {
        super(page);
    }

    async goto(id?: number | undefined) {
        if (id) {
            await this.page.goto(BASE_URL + '/ship/edit/' + id);
        } else {
            await this.page.goto(BASE_URL + '/ship/create');
        }
    }
}