export const ItemData = [
  {
    name: "APP",
    link: "/app_list",
    pid: 1,
    isActive: [{ link: "app_add" }, { link: "app_edit" }],
  }, //app list
  {
    name: "フィルター",
    link: "/filter_list",
    pid: 2,
    isActive: [{ link: "filter_add" }, { link: "filter_edit" }],
  }, // filter
  {
    name: "フィールド",
    link: "/field_list",
    pid: 3,
    isActive: [{ link: "field_add" }, { link: "field_edit" }],
  }, // field
  {
    name: "イベント",
    link: "/event_list",
    pid: 4,
    isActive: [
      { link: "event_add" },
      { link: "event_edit" },
      { link: "event_scheduler" },
    ],
  }, // event list
  {
    name: "予約カテゴリー",
    link: "/category_list",
    pid: 5,
    isActive: [{ link: "category_add" }, { link: "category_edit" }],
  }, // reservation category
  {
    name: "アイテム",
    link: "/item_list",
    pid: 6,
    isActive: [{ link: "item_add" }, { link: "item_edit" }],
  }, //  item
  {
    name: "施設",
    link: "/institute_list",
    pid: 7,
    isActive: [{ link: "institute_add" }, { link: "institute_edit" }],
  }, // institute
  {
    name: "バス",
    link: "/bus_route_list",
    pid: 8,
    isActive: [
      { link: "bus_route_add" },
      { link: "bus_route_edit" },
      { link: "bus_stop_list" },
      { link: "bus_stop_add" },
      { link: "bus_stop_edit" },
      { link: "bus_way_list" },
      { link: "bus_way_add" },
      { link: "bus_way_edit" },
    ],
  }, //bus
  {
    name: "カウンセラー",
    link: "/counselor_list",
    pid: 9,
    isActive: [{ link: "counselor_add" }, { link: "counselor_edit" }],
  }, // counselor
  {
    name: "顧客",
    link: "/customer_list",
    pid: 10,
  }, //client
  {
    name: "CSV出力",
    link: "/csv_export_list",
    pid: 11,
  }, //csv export
  {
    name: "CSV入力",
    link: "/csv_import_list",
    pid: 12,
  }, //csv import
  {
    name: "一斉送信",
    link: "/broadcast_list",
    pid: 13,
  }, // Email Broadcast
];
