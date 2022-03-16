import utilsApi from "../api/utilsApi";
import {getCacheObject, setCacheObject} from "../utils/functions";

export const BASIC_DATA_FETCH = 'BASIC_DATA_FETCH';
export const BASIC_DATA_FETCH_SUCCESS = 'BASIC_DATA_FETCH_SUCCESS';
export const BASIC_DATA_FETCH_FAILURE = 'BASIC_DATA_FETCH_FAILURE';
export const BASIC_DATA_FETCH_RESET = 'BASIC_DATA_FETCH_RESET';

export const PSP_DATA_FETCH = 'PSP_DATA_FETCH';
export const PSP_DATA_FETCH_SUCCESS = 'PSP_DATA_FETCH_SUCCESS';
export const PSP_DATA_FETCH_FAILURE = 'PSP_DATA_FETCH_FAILURE';
export const PSP_DATA_FETCH_RESET = 'PSP_DATA_FETCH_RESET';

export function basicDataFetch(entityName, entityId) {
  return {
    type: BASIC_DATA_FETCH,
    payload: new Promise((resolve, reject) => {
      const c = getCacheObject('nameQuery_' + entityName + '_' + entityId);
      if (c) {
        resolve(c);
      } else {
        utilsApi.nameQuery(entityName,entityId).then((data) => {
          const obj = {
            entity: {id: entityId, name: entityName},
            data: data
          };
          setCacheObject('nameQuery_' + entityName + '_' + entityId, obj, 10);
          resolve(obj);
        }).catch(() => {
          console.log('Something went wrong fetching basic data');
        });
      }
    }),
  };
}

export function basicDataFetchSuccess(data) {
  return {
    type: BASIC_DATA_FETCH_SUCCESS,
    payload: data
  };
}

export function basicDataFetchFailure(error) {
  return {
    type: BASIC_DATA_FETCH_FAILURE,
    payload: error
  };
}

export function basicDataFetchReset() {
  return {
    type: BASIC_DATA_FETCH_RESET,
    payload: null
  };
}





export function pspDataFetch() {
  return {
    type: PSP_DATA_FETCH,
    payload: new Promise((resolve, reject) => {
      utilsApi.pspProcesses().then((data) => {
        data.processes.map((item,i) => item.process.phases.sort((a, b) => a.order - b.order));
        resolve(data);
      }).catch(() => {
        console.log('Something went wrong fetching psp processes data');
      })
    }),
  };
}

export function pspDataFetchSuccess(data) {
  return {
    type: PSP_DATA_FETCH_SUCCESS,
    payload: data
  };
}

export function pspDataFetchFailure(error) {
  return {
    type: PSP_DATA_FETCH_FAILURE,
    payload: error
  };
}

export function pspDataFetchReset() {
  return {
    type: PSP_DATA_FETCH_RESET,
    payload: null
  };
}
