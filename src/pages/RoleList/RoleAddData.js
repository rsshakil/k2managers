export const ParentChildData = [
    // ALERT --- DON"T MODIFY name PROPERTY; If You add New  Item You must have also add in RoleEdit, RoleForm files.
    {
        label: [ 'システム管理', '（ドメイン管理・アカウント設定・権限ロール設定・プロジェクト管理）'],
        parentLabel: '全権（閲覧・編集・作成・削除）',
        name:["r1"]
    },
    {
        label: ['システム監視', '（ログ）'],
        parentLabel: '全権（閲覧）',
        name:["r2"]
    },
    {
        label: ['プロジェクト： ','APP管理'],
        parentLabel: '全権（閲覧・編集・作成・削除）',
        name:["r3"]
    },
    {
        label: ['プロジェクト： ','イベント管理'],
        parentLabel: '閲覧のみ',
        childLabel: '全権（閲覧・編集・作成・削除）',
        name:["r4", "c4"]
    },
    {
        label: ['プロジェクト： ', 'イベントスケジューラー（イベント管理の閲覧以上の権限が必要です）'],
        parentLabel: '閲覧のみ',
        childLabel: '全権（閲覧・編集・作成・削除）',
        name:["r5", 'c5']
    },
    {
        label: ['プロジェクト： ', 'スロット（イベントスケジューラーの権限が必要です）'],
        parentLabel: '閲覧のみ（CSV）',
        childLabel: '全権（閲覧・編集・作成・削除）',
        name:["r6", "c6"]
    },
    {
        label: ['プロジェクト： ', 'データ管理（フィールド管理・フィルター管理・予約カテゴリー管理・アイテム管理・カウンセラー管理・施設管理・バス管理）'],
        parentLabel: 'データ利用',
        childLabel: '全権（閲覧・編集・作成・削除）',
        name:["r7", "c7"]
    },
    {
        label: ['プロジェクト： ', '顧客情報管理（顧客テンプレート管理。顧客情報閲覧方法の権限が必要です。編集画面はマスクされません）'],
        parentLabel: '編集',
        childLabel: '全権（編集・作成）',
        name:["r9", "c9"]
    },
    {
        label: ['プロジェクト： ', '顧客情報閲覧方法（データ管理のデータ利用以上の権限が必要です）'],
        parentLabel: '部分閲覧（マスクあり）',
        childLabel: '全権（マスクなし）',
        name:["r8", "c8"]
    },
    {
        label: ['プロジェクト：  ', 'CSVエクスポート'],
        parentLabel: 'CSV生成・エクスポート実行',
        childLabel: 'その他の機能（全権）',
        name:["r10", "c10"]
    },
    {
        label: ['プロジェクト：  ', 'CSVインポート'],
        parentLabel: 'インポート実行',
        childLabel: 'その他の機能（全権）',
        name:["r11", "c11"]
    },
    {
        label: ['プロジェクト：  ', ' 一斉送信（メールとSMSでの勧奨案内）'],
        parentLabel: '全権',
        name:["r12"]
    }
]
export const EventData = [
    '指定したイベントの閲覧が可能',
    '全てのイベントの閲覧が可能',
    '全てのイベントの閲覧が不可能',
]
