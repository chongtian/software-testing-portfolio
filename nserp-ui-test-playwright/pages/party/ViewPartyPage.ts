import { Page } from "@playwright/test";
import { BASE_URL } from "@ui-test/utils";
import { PartyInfo } from "@ui-test/models";

export class ViewPartyPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(id: number) {
        await this.page.goto(BASE_URL + '/party/view/' + id);
    }

    async getPartyInfo(): Promise<PartyInfo> {
        const ret: PartyInfo = {};
        ret.FullName = await this.page.locator('#viewFullName').textContent();
        ret.ShortAlpha = await this.page.locator('#viewShortAlpha').textContent();
        ret.ShortName = await this.page.locator('#viewShortName').textContent();
        ret.PartyType = await this.page.locator('#viewPartyType').textContent();
        ret.PayTerm = await this.page.locator('#viewPayTerm').textContent();
        ret.ChargeDeliver = await this.page.locator('#viewChargeDeliver').textContent();
        ret.ShipTerm = await this.page.locator('#viewShipTerm').textContent();
        ret.ShipPort = await this.page.locator('#viewShipPort').textContent();
        ret.Memo = await this.page.locator('#viewMemo').textContent();
        ret.Status = await this.page.locator('#viewStatus').textContent();
        ret.CommissionFlag = await this.page.locator('#viewCommissionFlag').textContent();
        return ret;
    }
}