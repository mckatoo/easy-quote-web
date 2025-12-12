type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type Options = {
  endpoint: string
  method: Method
  body?: BodyInit
  queryParams?: Object
}

/**
 * fetch(`http://localhost:8080/${endpoint}`
 */

export default ({ endpoint, method = 'GET', body, queryParams }: Options) => {
  const baseUrl = `http://localhost:8080/${endpoint}`;
  const url = new URL(baseUrl);
  !!queryParams && Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  return fetch(url, {
    method: method || 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-app-token': import.meta.env.VITE_SECRET_KEY || ''
    },
    body
  })
}
