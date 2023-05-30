import {
  API_PATH,
  DADATA_PATH,
  API_CONTENT_TYPE,
  TOKEN,
  DADATA_TOKEN,
  DADATA_CLEANER_PATH,
  DADATA_CLEAR_TOKEN,
} from '../configs';

const apiGetPublic = async (path = '', params = {}) => {
  let paramsConvert = '?';
  if (Object.keys(params).length) {
    Object.keys(params).map(item => {
      paramsConvert += `${item}=${params[item]}&`;
    });
  }
  // console.log('%c%s', 'color: lime;', 'GET: ' + path + ' TOKEN: ' + TOKEN);
  try {
    const response = await fetch(`${API_PATH}${path}${paramsConvert}`, {
      method: 'GET',
      headers: {
        Token: TOKEN,
        'Content-Type': API_CONTENT_TYPE,
        'Cache-Control': 'no-cache',
      },
    });
    if (response.ok) {
      const res = await response.json();
      // console.log('%c%s', 'color: fuchsia;', 'RESPONSE: ' + path, res);
      return res;
    }
    throw new Error(`Status: ${response.status}, URL: ${response.url}`);
  } catch (error) {
    // console.log('%c%s', 'color: red;', `${error}`);
  }
};

const apiPostPublic = async (path = '', body = {}) => {
  console.log(
    '%c%s',
    'color: magenta;',
    'POST: ' + API_PATH + path + ' Token: ' + TOKEN + ' body: ',
    body,
  );
  try {
    const response = await fetch(`${API_PATH}${path}`, {
      method: 'POST',
      headers: new Headers({
        Token: TOKEN,
        'Content-Type': API_CONTENT_TYPE,
        'Cache-Control': 'no-cache',
      }),
      body: JSON.stringify(body),
    });
    if (response) {
      const res = await response.json();
      console.log('%c%s', 'color:magenta;', 'RESPONSE: ' + path, res);
      return res;
    }
    throw new Error(`Status: ${response.status}, URL: ${response.url}`);
  } catch (error) {
    // console.log('%c%s', 'color: red;', `${error}`);
  }
};



const apiPostDadata = async (path = '', body = {}) => {
  // console.log(
  //   '%c%s',
  //   'color: aqua;',
  //   'POST: ' + path + ' Token: ' + TOKEN + ' body: ',
  //   body,
  // );
  try {
    const response = await fetch(`${DADATA_PATH}${path}`, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        Authorization: 'Token ' + DADATA_TOKEN,
        'Content-Type': API_CONTENT_TYPE,
      }),
      body: JSON.stringify(body),
    });
    if (response) {
      const res = await response.json();
      // console.log('%c%s', 'color: fuchsia;', 'RESPONSE: ' + path, res);
      return res;
    }
    throw new Error(`Status: ${response.status}, URL: ${response.url}`);
  } catch (error) {
    // console.log('%c%s', 'color: red;', `${error}`);
  }
};

const apiPostDadataCleaner = async (path = '', body = {}) => {
  console.log(
    '%c%s',
    'color: aqua;',
    'POST: ' + path + ' Token: ' + TOKEN + ' body: ',
    body,
  );
  try {
    const response = await fetch(`${DADATA_CLEANER_PATH}${path}`, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        Authorization: 'Token ' + DADATA_TOKEN,
        'Content-Type': API_CONTENT_TYPE,
        'X-Secret': DADATA_CLEAR_TOKEN,
      }),
      body: JSON.stringify(body),
    });
    if (response) {
      const res = await response.json();
      // console.log('%c%s', 'color: fuchsia;', 'RESPONSE: ' + path, res);
      return res;
    }
    throw new Error(`Status: ${response.status}, URL: ${response.url}`);
  } catch (error) {
    console.log('%c%s', 'color: red;', `${error}`);
  }
};

const apiPutPublic = async (path = '', body = {}) => {
  console.log('%c%s', 'color: aqua;', 'PUT: ' + path + ' TOKEN: ' + TOKEN);

  try {
    const response = await fetch(`${API_PATH}${path}`, {
      method: 'PUT',
      headers: {
        Token: TOKEN,
        'Content-Type': API_CONTENT_TYPE,
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const res = await response.json();
      console.log('%c%s', 'color: fuchsia;', 'RESPONSE: ' + path, res);
      return res;
    }
    throw new Error(`Status: ${response.status}, URL: ${response.url}`);
  } catch (error) {
    console.log('%c%s', 'color: red;', `${error}`);
  }
};

const apiDeletePublic = async (path = '') => {
  console.log('%c%s', 'color: yellow;', 'DELETE: ' + path + ' TOKEN: ' + TOKEN);
  try {
    const response = await fetch(`${API_PATH}${path}`, {
      method: 'DELETE',
      headers: {
        Token: TOKEN,
        'Content-Type': API_CONTENT_TYPE,
      },
    });
    if (response.ok) {
      const res = await response.json();
      console.log('%c%s', 'color: fuchsia;', 'RESPONSE: ' + path, res);
      return res;
    }
    throw new Error(`Status: ${response.status}, URL: ${response.url}`);
  } catch (error) {
    console.log('%c%s', 'color: red;', `${error}`);
  }
};

export {
  apiPostPublic,
  apiPostDadata,
  apiPostDadataCleaner,
  apiGetPublic,
  apiPutPublic,
  apiDeletePublic,
};
