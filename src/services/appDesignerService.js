import { appEditorInitialEndPoint, listFilter, listField,listApp,appEditorCopyEndPointURL } from "../restapi/queries";
//import http from "./httpService";
import { instance as http } from "./axios";


export function appDesignerInitiate(appId = 0) {
    return http.get(appEditorInitialEndPoint + `/${appId}`);
}

export function appDesignerUpdate(data, appId = 0) {
    return http.put(appEditorInitialEndPoint + `/${appId}`, data);
}

export function copyApp(data,appId = 0) {
    return http.post(appEditorCopyEndPointURL+ `/${appId}`, data);
}

export function getFilterList(pid = 0, fieldType = '') {
    let url = listFilter + `?pid=${pid}`;

    if (fieldType !== '') {
        url += `&fieldType=${fieldType}`
    }

    return http.get(url);
}

export function deployApp(appId = 0, appBaseId) {
    return http.put(appEditorInitialEndPoint + `/deployecs/${appId}?appBaseId=${appBaseId}`);
}

export function getAppInfo(appId = 0,projectId=0) {
    return http.get(listApp + `${appId}?pid=${projectId}`);
}

//getFieldDropDownItes
export function getFieldDropDownItemsByFieldType(pid = 0, fieldType = 0) {
    return http.get(listField + `?pid=${pid}&fieldType=${fieldType}`);
}

export function getFieldList(fieldType = '', pid = 0) {
    const url = `${listField}?pid=${pid}&fieldType=${fieldType}`;

    return http.get(url);
}
