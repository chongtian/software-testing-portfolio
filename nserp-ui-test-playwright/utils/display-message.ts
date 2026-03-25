export const DisplayMessages = {
    common: {
        NoRecord: '没有数据',
        Loading: '正在读取数据',
        SelectAll: '选择全部',
        Export: '导出数据',
        Filter: '查找',
        CannotRetrieveRecord: '无法读取数据',
        InvalidFormData: '输入数据有错误',
        Save: '保存',
        Delete: '删除',
        Cancel: '取消',
        Select: '选择',
        Reset: '清空',
        ConfirmReset: '确认清空？',
        ConfirmSubmit: '确认保存？',
        ConfirmClose: '确认关闭？',
        ConfirmDelete: '确认删除？',
        SaveSuccessful: '成功保存',
        DeleteSuccessful: '成功删除',
        SaveFailed: '保存失败',
        DeleteFailed: '删除失败',
        Edit: '编辑',
        View: '查看',
        Browse: '浏览',
        Create: '创建',
        GlobalSearch: '全局检索',
        Search: '搜索',
        EnableEdit: '开始编辑',
        ExitEdit: '退出编辑',
        Required: '必须填写',
        WarningUnsavedChanges: '表单还没有保存。确认继续？',
        Keyword: '关键词',
        MsgSelectPartyFirst: '请先选择客户名称',
        LoadMore: '读取更多数据',
        CloseButton: '把状态更新为关闭',
        AccountYear: '年份',
        OrLabel: '或者',
        DisplayNames: {
            Status: '状态',
            Memo: '备注',
        }
    },
    party: {
        ModuleName: '客户信息',
        Address: '地址信息',
        ListLabel: '浏览客户信息',
        CopyFromOfficeAddress: '复制办公地址',
        DisplayNames: {
            PartyId: 'PartyId',
            ShortAlpha: '客户代号',
            FullName: '客户全称',
            ShortName: '客户名称',
            PartyType: '类别',
            PayTerm: '支付条款',
            ShipTerm: '货运条款',
            ShipPort: '到货港口',
            ChargeDeliver: '支付运费?',
            CommissionFlag: '支付佣金?',
            PartyDetails: '地址信息',
            AddressType: '地址类别',
            AddressLine1: '地址栏1',
            AddressLine2: '地址栏2',
            AddressLine3: '地址栏3',
            City: '城市',
            State: '州',
            Zipcode: '邮编',
            Country: '国家',
            Contact: '联系人',
            Email: '电子邮件',
            Telphone: '电话',
            Memo: '备注',
        },
        CodeMapping: {
            Status: {
                A: '有效',
                I: '无效',
            },
            PartyType: {
                CUSTOMER: '客户',
                VENDOR: '供应商',
                OTHER: '其他',
                OFFICE: '办公地址',
                SHIPPING: '收货地址',
                INVOICE: '开票地址'
            }
        }
    },
    product: {
        ModuleName: '产品信息',
        ListLabel: '浏览产品信息',
        QueryLabel: '选择产品信息',
        InsertDetail: '添加产品',
        MsgSelectPartyFirst: '请先选择客户名称',
        DisplayNames: {
            PartyId: 'PartyId',
            ProductGroupId: 'ProductGroupId',
            ProductId: 'ProductId',
            GroupName: '产品组名',
            HtsCode: 'HTS代码',
            PartNumber: '件号',
            ProductNameEn: '名称',
            ProductNameCn: '中文名称',
            Version: '版本',
            Weight: '重量kg',
            ProductType: '产品类别',
            Memo: '备注',
        },
        CodeMapping: {
            Status: {
                NEW: '新产品',
                WAP: '等待批准',
                APV: '样品已批准',
                DIS: '停产'
            },
            ProductType: {
                P: '普通产品',
                T: '工装模具'
            }
        }
    },
    document: {
        ModuleName: '文档信息',
        ListLabel: '浏览文档信息',
        Download: '下载文档',
        Upload: '上传文档',
        DisplayNames: {
            DocId: 'DocId',
            DocModule: 'DocModule',
            DocParentId: 'DocParentId',
            DocName: '文档名称',
            DocType: '文档类别',
            DocVendor: 'DocVendor',
            DocUid: '文档文件名',
            DocUrl: '文档链接',
        },
    },
    quote: {
        ModuleName: '报价信息',
        ListLabel: '浏览报价信息',
        InsertDetail: '添加报价',
        StartQuoteDate: '起始报价日期',
        QueryLabel: '选择报价信息',
        CopyQuote: '复制报价单',
        DisplayNames: {
            QuoteHeadId: 'QuoteHeadId',
            QuoteName: '报价名称',
            QuoteDate: '报价日期',
            PartyId: 'PartyId',
            ExchgRate: '汇率',
            QuoteId: 'QuoteId',
            ProductId: 'ProductId',
            VendorPartyId: 'VendorPartyId',
            Qty: '数量',
            Weight: '重量',
            BasicCost: '基础成本(元)',
            ExtraCost: '附加成本(元)',
            FreightCost: '货运成本($)',
            DutyCost: '关税成本($)',
            Price: '报价',
            Leadtime: '生产时间',
            ProfitRate: '利润率'
        },
        CodeMapping: {
            Status: {
                OPEN: '开放',
                CLOSE: '关闭',
                SENT: '已发送',
                LOCKED: '锁定',
                CANCEL: '取消'
            }
        }
    },
    po: {
        ModuleName: '订单信息',
        ListLabel: '浏览订单信息',
        InsertDetail: '添加订单',
        QueryLabel: '选择订单信息',
        DisplayNames: {
            PoHeadId: 'PoHeadId',
            PoNumber: '订单号',
            PoDate: '订单日期',
            PartyId: 'PartyId',
            PoAmount: '订单总金额',
            PoId: 'PoId',
            ProductId: 'ProductId',
            QuoteId: 'QuoteId',
            Qty: '数量',
            Price: '单价',
            Amount: '金额',
            ReqDate: '交货日期',
            PoType: '订单类别'
        },
        CodeMapping: {
            Status: {
                OPEN: '开放',
                CLOSE: '关闭',
                SHIPPED: '已发送',
                PENDING: '待定',
                CANCEL: '取消',
                WORK: '已开工',
                PARTIAL: '部分发运',
                READY: '生产完成'
            },
            PoType: {
                P: '普通订单',
                T: '模具订单'
            }
        }
    },
    ship: {
        ModuleName: '货运信息',
        ListLabel: '浏览货运信息',
        InsertDetail: '添加货运',
        QueryLabel: '选择货运信息',
        ImportLabel: '导入货运信息',
        ValidateLabel: '检查货运信息',
        DisplayNames: {
            ShipHeadId: 'ShipHeadId',
            ShipName: '货运名称',
            ShipDate: '货运日期',
            DepartDate: '开船日期',
            ShipVia: '货运方式',
            BrokerInvoice: '代理发票号',
            ShipAmount: '货运总金额',
            ShipId: 'ShipId',
            PartyId: 'PartyId',
            PoHeadId: 'PoHeadId',
            PoId: 'PoId',
            ProductId: 'ProductId',
            Weight: '重量',
            Qty: '数量',
            Price: '单价',
            Amount: '金额',
            LeadTimeInDays:'交货时间(天)',
            MinLeadTimeInDays:'最短交货时间',
            MaxLeadTimeInDays:'最长交货时间',
            AvgLeadTimeInDays:'平均交货时间'
        },
        CodeMapping: {
            Status: {
                OPEN: '开放',
                CLOSE: '关闭',
                WIRED: '已电汇',
                WWIRE: '等待电汇',
                INVOICED: '已开发票',
                PARTIAL: '部分发票'
            },
            ShipVia: {
                SEA: '海运',
                AIR: '空运',
                SELF: '自提',
                EXP: '快递',
                UPS: 'UPS',
                FDX: 'FedEx',
                MISC: '其他',
                OCEAN: '海运2'
            }
        },
        Import: {
            DefLables: {
                SheetNumber: 'Excel表号',
                DetailsStartRowNumber: '发货明细起始行号',
                PartyNameColNumber: '客户名称列号',
                PoNumberColNumber: '订单号列号',
                PartNumberColNumber: '件号列号',
                WeightColNumber: '单个净重列号',
                QtyColNumber: '数量列号',
                PriceColNumber: '价格列号',
                BrokerInvoiceRowNumber: '代理发票行号',
                BrokerInvoiceColNumber: '代理发票列号',
                ShipViaRowNumber: '货运方式行号',
                ShipViaColNumber: '货运方式列号',
            },
            ImportMessages: {
                1: '客户名称错误',
                2: '订单号码错误',
                4: '件号错误或件号不在订单上',
                8: '订单已关闭',
                16: '找到重复的订单',
                32: '请检查价格',
                64: '缺少信息'
            }
        }
    },
    invoice: {
        ModuleName: '发票信息',
        ListLabel: '浏览发票信息',
        InsertProductInvoice: '添加普通发票明细',
        InsertToolingInvoice: '添加模具发票明细',
        InsertCreditInvoice: '添加赔款发票明细',
        InsertMiscInvoice: '添加其他发票明细',
        QueryLabel: '选择发票信息',
        PrintLabel: '打印发票',
        CreditMemoPrefix: 'Refund for ',
        DisplayNames: {
            InvHeadId: 'InvHeadId',
            PartyId: 'PartyId',
            InvNumber: '发票号',
            InvDate: '发票日期',
            SentDate: '发送日期',
            InvAmount: '发票总金额',
            InvId: 'InvId',
            ShipHeadId: 'ShipHeadId',
            PoHeadId: 'PoHeadId',
            ProductId: 'ProductId',
            Content: '发票内容',
            Qty: '数量',
            Price: '单价',
            Amount: '金额',
            InvType: '发票类别'
        },
        CodeMapping: {
            Status: {
                OPEN: '开放',
                CLOSE: '关闭',
                PAID: '已付款',
                PARTIAL: '部分付款'
            },
            InvType: {
                P: '普通发票',
                T: '模具发票',
                C: '赔款发票',
                M: '其他发票',
            }
        },
    },
    payment: {
        ModuleName: '收款信息',
        ListLabel: '浏览收款信息',
        InsertRegularPayment: '添加普通收款明细',
        InsertSpecialPayment: '添加特殊收款明细',
        QueryLabel: '选择收款信息',
        DepositLabel: '兑支票',
        DisplayNames: {
            PayHeadId: 'PayHeadId',
            PayId: 'PayId',
            PartyId: 'PartyId',
            InvHeadId: 'InvHeadId',
            InvId: 'InvId',
            PayDocNum: '付款凭证号',
            PayDocDate: '付款日期',
            DepositDate: '兑款日期',
            CommissionDate: '付佣金日期',
            PayAmount: '收款总金额',
            PayItem: '收款内容',
            Amount: '金额',
            PayType: '收款类别'
        },
        CodeMapping: {
            Status: {
                OPEN: '开放',
                CLOSE: '关闭',
                COMM: '待付佣金',
            },
            PayType: {
                C: '支票',
                E: '电子支票',
                W: '电汇',
                P: '普通收款',
                S: '特殊收款'
            }
        },
    },
    bank: {
        ModuleName: '银行账目',
        ListLabel: '浏览银行账目',
        ImportLabel: '导入银行账目',
        ImportFail: '导入银行账目出错',
        ImportAgain: '重新导入',
        DisplayNames: {
            TrnId: 'TrnId',
            TrnAccount: '账户',
            TrnYear: '账目年份',
            TrnDate: '账目日期',
            TrnType: '账目类别',
            TrnDesc: '描述',
            TrnAmount: '金额'
        },
        CodeMapping: {
            TrnType: {
                11: '客户收款',
                32: '汇款和手续费',
                33: '货运费',
                34: '工资和工资税',
                35: '财务费用',
                36: '佣金',
                37: '运营支出',
                38: '通讯',
                31: '律师费',
                50: '其他',
                99: '统计'
            },
        },
        Import: {
            DefLables: {
                SheetNumber: 'Excel表号',
                DetailsStartRowNumber: '账目明细起始行号',
                TranDateColNumber: '账目日期列号',
                TranAmountColNumber: '账目金额列号',
                TranDescColNumber: '账目描述列号'
            }
        }
    },
    report: {
        ModuleName: '报告',
        AnnualReport: '年度运营报告',
        LeadTimeReport: '交货时间查询',
        AnnualReportAdjustmentRate: '毛利润系数',
        AnnualReportTypeMapping: {
            ANNUAL_PO_AMT: '年度订单总额',
            ANNUAL_SHIP_AMT: '年度发货总额',
            ANNUAL_INV_AMT: '年度开票总额',
            ANNUAL_PAY_AMT: '年度收款总额',
            ANNUAL_CASH_IN: '年度流入现金总额',
            ANNUAL_CASH_OUT: '年度现金流出总额',
            ANNUAL_CUR_PAY_AMT: '本年收款总额',
            ANNUAL_PREV_PAY_AMT: '往年收款总额',
            NET_CASH_CHANGE: '现金变化',
            GROSS_PROFIT: '毛利润',
            RECEIVABLE: '本年应收'
        },
        OpenEntityReport: {
            NA:'N/A',
            product:'需要核对的工装模具列表',
            po:'开放的订单列表',
            ship:'开放的货运列表',
            invoice:'开放的发票列表'
        }
    },
    auth: {
        ChangePassword: '更改密码',
        Logout: '退出',
        Login: '登录',
        Username: '用户名',
        Password: '密码',
        ForgetPassword: '忘记密码',
        SetPasswordFirstLogin: '第一次登录，请设置新密码',
        ConfirmPassword: '确认密码',
        ConfirmNewPassword: '确认新密码',
        ConfirmationCode: '输入确认码（请检查您的电子邮件）',
        SavePassword: '保存密码',
        ErrorConfirmPassword: '请输入密码并且确认两次输入的密码相同',
        SuccessfulChangePassword: '成功更新密码。 请使用您的新密码登录。',
        FailChangePassword: '密码更新失败',
        ErrorRequireUsername: '请输入用户名',
        OldPassword: '旧密码',
        NewPassword: '新密码'
    }
};
