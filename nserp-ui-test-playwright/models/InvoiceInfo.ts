export interface InvoiceInfo {
    PartyName?: string | null;
    InvNumber?: string | null;
    InvDate?: string | null;
    SentDate?: string | null;
    InvAmount?: string | null;
    HeaderMemo?: string | null;
    HeaderStatus?: string | null;

    ShipName?: string | null;
    ShipDate?: string | null;
    PoNumber?: string | null;
    PartNumber?: string | null;
    ProductNameEn?: string | null;
    ProductNameCn?: string | null;
    Content?: string | null;
    Amount?: string | null;
    Price?: string | null;
    Qty?: string | null;
    DetailMemo?: string | null;
    DetailStatus?: string | null;
}