import fetch from 'isomorphic-fetch';
import { sessionService } from 'redux-react-session';
import { routes } from '../constants/routesPaths';

const saveSessionHeaders = (headers) => {
  if (headers.get('access-token')) {
    const sessionHeaders = {
      token: headers.get('access-token'),
      uid: headers.get('uid'),
      client: headers.get('client')
    };
    sessionService.saveSession(sessionHeaders);
  }
};

const handleErrors = (response) => new Promise((resolve, reject) => {
  if (!response) {
    reject({ message: 'No response returned from fetch' });
    return;
  }

  if (response.ok) {
    saveSessionHeaders(response.headers);
    resolve(response);
    return;
  }

  sessionService.loadSession()
    .catch(() => {
      if (response.status === 401 && !response.url.includes('users/password')) {
        sessionService.deleteSession();
      }
    });

  response.json()
    .then((json) => {
      const error = json || { message: response.statusText };
      reject(error);
    }).catch(() => reject({ message: 'Response not JSON' }));
});

const getResponseBody = (response) => {
  const bodyIsEmpty = response.status === 204;
  if (bodyIsEmpty) {
    return Promise.resolve();
  }
  return response.json();
};

class Api {
  performRequest(uri, apiUrl, requestData = {}) {
    const url = `${apiUrl}${uri}`;
    return new Promise((resolve, reject) => {
      fetch(url, requestData)
        .then(handleErrors)
        .then(getResponseBody)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  addTokenHeader(requestData) {
    return sessionService.loadSession()
      .then((session) => {
        const { token, client, uid } = session;
        requestData.headers['access-token'] = token;
        requestData.headers.client = client;
        requestData.headers.uid = uid;
        return requestData;
      }).catch(() => requestData);
  }

  get(uri, apiUrl = process.env.API_URL) {
    const requestData = {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store'
      }
    };
    return this.addTokenHeader(requestData)
      .then((data) => this.performRequest(uri, apiUrl, data));
  }

  post(uri, data, apiUrl = process.env.API_URL) {
    const requestData = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store'
      },
      body: JSON.stringify(data)
    };
    return this.addTokenHeader(requestData)
      .then((data) => this.performRequest(uri, apiUrl, data));
  }

  delete(uri, data, apiUrl = process.env.API_URL) {
    const requestData = {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store'
      },
      body: JSON.stringify(data)
    };
    return this.addTokenHeader(requestData)
      .then((data) => this.performRequest(uri, apiUrl, data));
  }

  put(uri, data, apiUrl = process.env.API_URL) {
    const requestData = {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store'
      },
      body: JSON.stringify(data)
    };
    return this.addTokenHeader(requestData)
      .then((data) => this.performRequest(uri, apiUrl, data));
  }

  putWithCustomHeaders(uri, data, headers, apiUrl = process.env.API_URL) {
    const requestData = {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': headers.token,
        client: headers.client,
        uid: headers.uid,
      },
      body: JSON.stringify(data)
    };
    return this.performRequest(uri, apiUrl, requestData);
  }

  putFormData(uri, data, apiUrl = process.env.API_URL) {
    const requestData = {
      method: 'put',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data'
      },
      body: data
    };
    return this.addTokenHeader(requestData)
      .then((data) => this.performRequest(uri, apiUrl, data));
  }

  postFormData(uri, data, apiUrl = process.env.API_URL) {
    const requestData = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data'
      },
      body: data
    };
    return this.addTokenHeader(requestData)
      .then((data) => this.performRequest(uri, apiUrl, data));
  }

  patch(uri, data, apiUrl = process.env.API_URL) {
    const requestData = {
      method: 'patch',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    return this.addTokenHeader(requestData)
      .then((data) => this.performRequest(uri, apiUrl, data));
  }
}

export default new Api();
