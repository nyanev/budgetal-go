import { StatusBar } from 'react-native';
import { GetAuthenticationToken } from 'utils/authentication';
import { error } from 'notify';
import { Constants } from 'expo';
const isDevice = Constants.isDevice;
const expoHost = Constants.manifest.debuggerHost;

let baseURL = 'https://beta-api.budgetal.com';
const port = '3000';

if (__DEV__) {
  if (isDevice) {
    // On same LAN
    baseURL = 'http://' + expoHost.replace(':19001', `:${port}`);
  } else {
    // On simulator
    baseURL = `http://localhost:${port}`;
  }
}

const base = async (path, method, headers = {}, body = {}) => {
  try {
    let sessionToken = await GetAuthenticationToken();
    sessionToken = sessionToken || '';

    let req = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Budgetal-Session': sessionToken,
        ...headers,
      },
      credentials: 'include',
      method,
    };

    if (method !== 'GET') {
      switch (req.headers['Content-Type']) {
        case 'application/json':
          req.body = JSON.stringify(body);
          break;
        case 'multipart/form-data':
          delete req.headers['Content-Type'];
          req.body = body;
          break;
        default:
          req.body = body;
      }
    }

    StatusBar.setNetworkActivityIndicatorVisible(true);
    const resp = await fetch(baseURL + path, req);

    switch (resp.status) {
      case 503:
        error('We are performing maintenance. We should be done shortly.');
        return;
      case 500:
      case 404:
        error('Something went wrong');
        return;
      case 403:
        error('Permission Denied. This incident will be reported');
        return;
      case 401:
        error('You are not logged in. Your session may have expired.');
        return;
      default:
    }

    if (!resp.ok) {
      const text = await resp.text();
      const err = {
        ...JSON.parse(text),
        status: resp.status,
        ok: false,
      };
      throw err;
    }

    const json = await resp.json();
    return { ...json, ok: true };
  } catch (err) {
    error(err.error || 'Something went wrong');
  } finally {
    StatusBar.setNetworkActivityIndicatorVisible(false);
  }
};

export const _get = (path, headers = {}) => {
  return base(path, 'GET', headers);
};
export const _post = (path, body = {}, headers = {}) => {
  return base(path, 'POST', headers, body);
};
export const _put = (path, body = {}, headers = {}) => {
  return base(path, 'PUT', headers, body);
};
export const _patch = (path, body = {}, headers = {}) => {
  return base(path, 'PATCH', headers, body);
};
export const _delete = (path, body = {}, headers = {}) => {
  return base(path, 'DELETE', headers, body);
};

export const _raw_get = (path, body = {}, headers = {}) => {
  return fetch(baseURL + path, {
    method: 'GET',
    headers,
    body,
  });
};
