/**
 * 22/06/2022
 * create for utilities text on your pages
 */

const utilitiesText = {
    // Carefully add array elements always add in last index
    roleList: {
        mfa: ['無効', '有効'],
        r1: ['', '全権'],
        r2: ['', '全権'],
        r3: ['', '全権'],
        r4: ['', '全権', '閲覧'],
        r5: ['', '全権', '閲覧'],
        r6: ['', '全権', '閲覧'],
        r7: ['', '全権', '閲覧'],
        r8: ['', '全権', '閲覧'],
        r9: ['', '全権', '編集'],
        r10: ['', '全権', '閲覧'],
        r11: ['', '全権', '閲覧'],
        r12: ['', '全権'],
    },
};
export const NAVBAR_TITLES = [
    { pathname: '/', text: 'K2システム ログイン' },
    { pathname: '/login', text: 'K2システム ログイン' },
    { pathname: '/verify', text: 'K2システム ログイン' },
    { pathname: '/top', text: 'ダッシュボード' },
    { pathname: '/pwd_reset', text: 'ログイン情報変更' },
    { pathname: '/log_list', text: '操作ログ一覧' },
    { pathname: '/account_list', text: 'アカウント一覧' },
    { pathname: '/account_add', text: 'アカウント追加' },
    { pathname: '/account_edit', text: 'アカウント編集' },
    { pathname: '/role_list', text: '権限・ロール一覧' },
    { pathname: '/role_add', text: '権限・ロール追加' },
    { pathname: '/role_edit', text: '権限・ロール編集' },
    { pathname: '/project_list', text: 'プロジェクト' },
    { pathname: '/project_add', text: 'プロジェクト追加' },
    { pathname: '/project_edit', text: 'プロジェクト編集' },
    { pathname: '/domain_list', text: 'ドメイン' },
    { pathname: '/domain_add', text: 'ドメイン追加' },
    { pathname: '/domain_edit', text: 'ドメイン編集' },

    { pathname: '/app_list', text: '%project_name%' },
    { pathname: '/app_add', text: 'APP追加' },
    { pathname: '/app_edit', text: 'APP編集' },
    { pathname: '/event_list', text: '%project_name%' },
    { pathname: '/event_add', text: 'イベント追加' },
    { pathname: '/event_edit', text: 'イベント編集' },
    { pathname: '/event_scheduler', text: 'スケジューラー' },
    { pathname: '/filter_list', text: '%project_name%' },
    { pathname: '/filter_add', text: 'フィルター追加' },
    { pathname: '/filter_edit', text: 'フィルター編集' },
    { pathname: '/field_list', text: '%project_name%' },
    { pathname: '/field_add', text: 'フィールド追加' },
    { pathname: '/field_edit', text: 'フィールド編集' },
    { pathname: '/category_list', text: '%project_name%' },
    { pathname: '/category_add', text: '予約カテゴリー追加' },
    { pathname: '/category_edit', text: '予約カテゴリー編集' },
    { pathname: '/item_list', text: '%project_name%' },
    { pathname: '/item_add', text: 'アイテム追加' },
    { pathname: '/item_edit', text: 'アイテム編集' },
    { pathname: '/counselor_list', text: '%project_name%' },
    { pathname: '/counselor_add', text: 'カウンセラー追加' },
    { pathname: '/counselor_edit', text: 'カウンセラー編集' },
    { pathname: '/institute_list', text: '%project_name%' },
    { pathname: '/institute_add', text: '施設追加' },
    { pathname: '/institute_edit', text: '施設編集' },
    { pathname: '/setting', text: '%project_name%' },
    { pathname: '/customer_list', text: '%project_name%' },
    { pathname: '/customer_add', text: '顧客追加' },
    { pathname: '/customer_setting', text: '顧客設定' },
    { pathname: '/csv_export_list', text: '%project_name%' },
    { pathname: '/csv_import_list', text: '%project_name%' },
    { pathname: '/csv_export_setting', text: 'CSV出力テンプレート設定' },
    { pathname: '/bus_route_list', text: '%project_name%' },
    { pathname: '/bus_route_add', text: 'バス路線追加' },
    { pathname: '/bus_route_edit', text: 'バス路線編集' },
    { pathname: '/bus_way_list', text: '%project_name%' },
    { pathname: '/bus_way_add', text: 'バス便追加' }, // Changes the lable バスウェイを追加 --> バス便追加  Linkon 24/11/22
    { pathname: '/bus_way_edit', text: 'バス便編集' }, // Changes the lable  バスウェイを編集 --> バス便編集 Linkon 24/11/22
    { pathname: '/bus_stop_list', text: '%project_name%' },
    { pathname: '/bus_stop_add', text: 'バス停追加' },
    { pathname: '/bus_stop_edit', text: 'バス停編集' },
    { pathname: '/notification_setting', text: '%project_name%' },
    { pathname: '/broadcast_list', text: '%project_name%' },
];

export const ROUTE_960SCREEN = [
    { pathname: '/' },
    { pathname: '/login' },
    { pathname: '/verify' },
    { pathname: '/pwd_reset' },
];
export const ROUTE_1920SCREEN = [{ pathname: '/app_designer', text: '%project_name%' }];
export default utilitiesText;
