import moment from 'moment';
import * as Yup from 'yup';
import { errorMessages } from './errorMessages';
import RegularExpression from './regularExpression';
//validating the input fields using yup validation
export const accountFormSchema = (formType) =>
    Yup.object({
        accountId: Yup.string()
            .trim()
            .matches(RegularExpression.alphaNumeric, `${errorMessages.W_ALPHANUMERIC_01('アカウントID')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('アカウントID', 2, 16)}`)
            .required(`${errorMessages.W_REQUIRED_01('アカウントID')}`),
        fullName: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('氏名')}`)
            .min(2, `${errorMessages.W_GTE_01('氏名', 2)}`),
        roleId: Yup.string().required(`${errorMessages.W_REQUIRED_02('ロール')}`),
        email: Yup.string().email(`${errorMessages.W_EMAIL_01}`),
        initialPassword:
            formType === 'add'
                ? Yup.string()
                      .matches(RegularExpression.passwordValidation, `${errorMessages.W_PASSWORD_05}`)
                      .required(`${errorMessages.W_PASSWORD_05}`)
                : Yup.string().matches(RegularExpression.passwordValidation, `${errorMessages.W_PASSWORD_05}`),
    });

export const csvPasswordSchema = () =>
    Yup.object({
        csvDownloadPassword: Yup.string().matches(
            RegularExpression.passwordValidation,
            `${errorMessages.W_PASSWORD_05}`
        ),
    });

export const appModalSchema = () =>
    Yup.object({
        appNoticeTermsOfServiceTitle: Yup.string().required(`${errorMessages.W_REQUIRED_01('利用規約チェック文言')}`),
        appNoticeTermsOfServiceContents: Yup.string().required(`${errorMessages.W_REQUIRED_01('利用規約内容')}`),
    });

export const projectFormSchema = () =>
    Yup.object({
        projectName: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('プロジェクト名')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('プロジェクト名', 2, 32)}`)
            .max(32, `${errorMessages.W_BETWEEN_01('プロジェクト名', 2, 32)}`), // After test remove update max
        projectCode: Yup.string()
            .trim()
            .matches(RegularExpression.alphaNumeric, `${errorMessages.W_ALPHANUMERIC_01('プロジェクトコード')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('プロジェクトコード', 2, 16)}`)
            .required(`${errorMessages.W_REQUIRED_01('プロジェクトコード')}`),
    });

export const domainFormSchema = () =>
    Yup.object({
        domainName: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('ドメイン名')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('ドメイン名', 2, 64)}`),
        domainURL: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('ドメインURL')}`)
            .matches(RegularExpression.urlValidation, `${errorMessages.W_URL_01('ドメイン')}`),
    });

export const appFormSchema = (appBasicFlag) =>
    Yup.object({
        eventId: Yup.string()
            .strict(false)
            .required(`${errorMessages.W_REQUIRED_01('イベント')}`),
        appName: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('APP名')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('APP名', 2, 32)}`)
            .max(32, `${errorMessages.W_BETWEEN_01('APP名', 2, 32)}`),
        appBasicUser: appBasicFlag
            ? Yup.string()
                  .strict(false)
                  .trim()
                  .matches(RegularExpression.alphaNumeric, `${errorMessages.W_ALPHANUMERIC_01('BASIC認証ユーザー名')}`)
                  .min(2, `${errorMessages.W_BETWEEN_01('BASIC認証ユーザー名', 2, 16)}`)
                  .required(`${errorMessages.W_REQUIRED_01('BASIC認証ユーザー名')}`)
            : Yup.string(),
        appBasicPassword: appBasicFlag
            ? Yup.string()
                  .strict(false)
                  .trim()
                  .matches(
                      RegularExpression.basicAuthenticationPasswordValidation,
                      `${errorMessages.W_PASSWORD_08('Basic認証パスワード')}`
                  )
                  .min(2, `${errorMessages.W_BETWEEN_01('BASIC認証パスワード', 2, 16)}`)
                  .required(`${errorMessages.W_REQUIRED_01('BASIC認証パスワード')}`)
            : Yup.string(),
    });

export const eventFormSchema = () =>
    Yup.object({
        eventName: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('イベント名')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('イベント名', 2, 32)}`)
            .max(32, `${errorMessages.W_BETWEEN_01('イベント名', 2, 32)}`),
        eventStartDate: Yup.string()
            .strict(false)
            .required(`${errorMessages.W_REQUIRED_01('イベント開始日')}`),
        eventStartTime: Yup.string()
            .strict(false)
            .required(`${errorMessages.W_REQUIRED_01('イベント開始時間')}`),
        // new code 27.10.22 linkon
        eventEndDate: Yup.date()
            .strict(false)
            .required(`${errorMessages.W_REQUIRED_01('イベント停止日')}`)
            .when(
                'eventStartDate',
                (eventStartDate, schema) => eventStartDate && schema.min(eventStartDate, `${errorMessages.W_DATE_01}`)
            ),
        eventEndTime: Yup.string()
            .strict(false)
            .required(`${errorMessages.W_REQUIRED_01('イベント停止時間')}`)
            .test('is-greater', `${errorMessages.W_DATE_01}`, function (value) {
                const { eventStartDate, eventStartTime, eventEndDate, eventEndTime } = this.parent;
                const newEventStartDate = new Date(eventStartDate);
                const newEventEndDate = new Date(eventEndDate);

                const rValue = moment(value, 'HH:mm').isSameOrAfter(moment(eventStartTime, 'HH:mm'));
                if (newEventStartDate > newEventEndDate) {
                    return true;
                } else if (newEventStartDate < newEventEndDate) {
                    return true;
                } else {
                    return rValue;
                }
            }),
    });

export const eventCategoryFormSchema = () =>
    Yup.object({
        categoryId: Yup.string()
            .strict(false)
            .required(`${errorMessages.W_REQUIRED_02('予約カテゴリー')}`),
        eventCategoryStartDate: Yup.string()
            .strict(false)
            .required(`${errorMessages.W_REQUIRED_01('予約カテゴリー開始日')}`),
        eventCategoryStartTime: Yup.string()
            .strict(false)
            .required(`${errorMessages.W_REQUIRED_01('予約カテゴリー開始時間')}`),
        eventCategoryEndDate: Yup.string()
            .strict(false)
            .required(`${errorMessages.W_REQUIRED_01('予約カテゴリー停止日')}`),
        eventCategoryEndTime: Yup.string()
            .strict(false)
            .required(`${errorMessages.W_REQUIRED_01('予約カテゴリー停止時間')}`),
    });

export const eventInstituteFormSchema = (eventInstituteSlotType) =>
    Yup.object({
        instituteId: Yup.string()
            .strict(false)
            .required(`${errorMessages.W_REQUIRED_02('施設')}`),
        eventInstituteSlotStyleRangeTime:
            eventInstituteSlotType == 0
                ? Yup.string()
                      .strict(false)
                      .trim()
                      .required(`${errorMessages.W_REQUIRED_01('開催時間（範囲）')}`)
                      .test('checking_to_date_is_there', `${errorMessages.W_TIME_01}`, (values) => {
                          if (values) {
                              if (values.length) {
                                  const dateArray = values.split('~'); // [16:10, 17:20]

                                  const startTime = dateArray[0].split(':'); // [16, 10]
                                  const endTime = dateArray[1].split(':'); // [17, 20]

                                  const totalStartMins = startTime[0] * 60 + startTime[1];
                                  const totalEndMins = endTime[0] * 60 + endTime[1];

                                  if (values.length > 9 && +totalStartMins <= +totalEndMins) return true;
                              }
                          }
                      })
                : Yup.string(), // This is an unchecked fake.
    });

export const filterFormSchema = () =>
    Yup.object({
        filterName: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('フィルター名')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('フィルター名', 2, 64)}`)
            .max(64, `${errorMessages.W_BETWEEN_01('フィルター名', 2, 64)}`),
    });

export const fieldFormSchema = () =>
    Yup.object({
        fieldName: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('フィールド名')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('フィールド名', 2, 32)}`),
            fieldType: Yup.string().strict(false).required(`フィールドタイプを選択してください`),
        
    });

export const categoryFormSchema = () =>
    Yup.object({
        categoryName: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('予約カテゴリー名')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('予約カテゴリー名', 2, 32)}`),
    });

export const itemFormSchema = () =>
    Yup.object({
        itemName: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('アイテム名')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('アイテム名', 2, 32)}`),
    });

export const customerSettingAddEditFromSchema = () =>
    Yup.object({
        customerEditTemplateName: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('顧客作成テンプレート名')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('顧客作成テンプレート名', 2, 32)}`),
    });

export const customerSettingEditFromSchema = () =>
    Yup.object({
        customerEditTemplateName: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('顧客編集テンプレート名')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('顧客編集テンプレート名', 2, 32)}`),
    });

export const instituteFormSchema = () =>
    Yup.object({
        instituteName: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('施設名')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('施設名', 2, 32)}`),
        instituteZipCode: Yup.string()
            .strict(false)
            .trim()
            .matches(RegularExpression.zipCode, `${errorMessages.W_ZIPCODE_01('')}`),
        instituteTelNo: Yup.string()
            .strict(false)
            .trim()
            .matches(RegularExpression.telNo, `${errorMessages.W_TELNO_01('')}`),
    });

export const counselorFormSchema = () =>
    Yup.object({
        counselorName: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('カウンセラー名')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('カウンセラー', 2, 16)}`),
    });

export const busRouteFormSchema = () =>
    Yup.object({
        busRouteName: Yup.string()
            .strict(false)
            .trim()
            .required(`${errorMessages.W_REQUIRED_01('バス路線名')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('バス路線名', 2, 32)}`),
    });
// busWay from schema
export const busWayFormSchema = () =>
    Yup.object({
        busWayName: Yup.string()
            .strict(false)
            .trim()
            .required(errorMessages.W_REQUIRED_01('バス便名'))
            .min(2, `${errorMessages.W_BETWEEN_01('バス便名', 2, 32)}`),
        busWayCapacity: Yup.number()
            .min(0, errorMessages.W_BETWEEN_01('バス便定員', 1, 3))
            .max(999, errorMessages.W_BETWEEN_01('バス便定員', 1, 3))
            .typeError(errorMessages.W_INTEGER_01('バス便定員')),
    });

// busWay from schema
export const busStopFromSchema = () =>
    Yup.object({
        busStopName: Yup.string()
            .strict(false)
            .trim()
            .required(errorMessages.W_REQUIRED_01('バス停名'))
            .min(2, `${errorMessages.W_BETWEEN_01('バス停名', 2, 32)}`),
    });

//Schema for AppDesigner page
export const freePagesValidationSchema = Yup.object().shape({
    appPageManagerName: Yup.string().max(16, 'should not exceed 16 characters').required('This field is required'),

    appPageURLName: Yup.string()
        // .max(8, 'should not exceed 8 characters')
        // .matches(/^[0-9a-zA-Z]+$/, 'should only route chars')
        .matches('UNIQUE', 'should be unique')
        .required('This field is required'),
});

export const customerListAddFormSchema = () =>
    Yup.object({
        customerViewTemplateName: Yup.string().strict(false).required(`顧客一覧テンプレート名を入力してください`),
        appId: Yup.string().strict(false).trim().required(`予約APPURLを入力してください`),
    });

export const csvExportSettingModal = (formType) =>
    Yup.object({
        csvExportTemplateName: Yup.string().required(`${errorMessages.W_REQUIRED_01('CSV出力テンプレート名')}`),
        csvExportTemplateFileName: Yup.string().required(`${errorMessages.W_REQUIRED_01('CSV出力ファイル名')}`),
    });

export const csvImportTempSettingAddModal = (formType) =>
    Yup.object({
        csvImportTemplateName: Yup.string()
            .required(`${errorMessages.W_REQUIRED_01('CSVインポートテンプレート名')}`)
            .min(2, `${errorMessages.W_BETWEEN_01('CSVインポートテンプレート名', 2, 32)}`),
    });

export const broadcastTemplateSchema = (broadcastType) =>
    Yup.object({
        broadcastTemplateTitle: Yup.string().strict(false).trim().required(`${errorMessages.W_REQUIRED_01('一斉送信タイトル')}`),
        broadcastTemplateSubject: broadcastType === 0 ? Yup.string().strict(false).trim().required(`${errorMessages.W_REQUIRED_01('Subject')}`) : Yup.string(),
    });

export const pageBlockFormSchema = Yup.object().shape({
    name: Yup.string().required('This name field is required'),
});

export const zipCodeBlockFormSchema = Yup.object()
    .shape({
        input1Name: Yup.string().required('This name field is required 1'),
        input3Name: Yup.string().required('This name field is required 3'),
        input4Name: Yup.string().required('This name field is required 4'),
        input2Name: Yup.string().required('This name field is required 2'),
        input5Name: Yup.string().required('This name field is required 5'),
        input6Name: Yup.string().required('This name field is required 6'),
    })
    .transform(function (current, original) {
        this.fields.input1Name =
            original?.input1Name?.length === undefined ? Yup().string() : Yup().string().required();
        this.fields.input2Name =
            original?.input2Name?.length === undefined ? Yup().string() : Yup().string().required();
        this.fields.input3Name =
            original?.input3Name?.length === undefined ? Yup().string() : Yup().string().required();
        this.fields.input4Name =
            original?.input4Name?.length === undefined ? Yup().string() : Yup().string().required();
        this.fields.input5Name =
            original?.input5Name?.length === undefined ? Yup().string() : Yup().string().required();
        this.fields.input6Name =
            original?.input6Name?.length === undefined ? Yup().string() : Yup().string().required();
        return current;
    });

export const birthdaySchema = Yup.object().shape({
    dayName: Yup.string().required('name属性は必須です ..'),
    monthName: Yup.string().required('name属性は必須です ..'),
    yearName: Yup.string().required('name属性は必須です ..'),
});

export const combineInputSchema = Yup.object().shape({
    area1Name: Yup.string().required('name属性は必須です ..'),
});
