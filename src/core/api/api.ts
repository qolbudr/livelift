import { generateURLQueryParam } from "@/core/utils/generate_query_params";
import CryptoJS from "crypto-js";

export enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface ApiParameter<Type> {
  url?: string;
  path?: string;
  method: ApiMethod;
  query?: any;
  body?: Object;
  headers?: HeadersInit;
}

export async function api<Type>({url, path, method, headers, body, query}: ApiParameter<Type>): Promise<Type | undefined> {
  try {
    const token = localStorage.getItem('token');
    // const iv = CryptoJS.AES.encrypt('tai', process.env.SECRET_KEY!).toString()
    
    let newUrl = url ?? `${path}`;

    if (query != null) newUrl += `?${generateURLQueryParam({ body: query })}`;

    const response = await fetch(newUrl, {
      method: method,
      headers: {
        ...headers,
        // 'iv': iv,
        'Content-Type': 'application/json',
        Authorization: token ?? '',
      },
      body: JSON.stringify(body),
    });

    if (response.status != 200) throw await response.json();
    const json = (await response.json()) as Type | undefined;
    return json;
  } catch (e) {
    throw e;
  }
}

export async function apiTenant<Type>({url, path, method, headers, body, query}: ApiParameter<Type>): Promise<Type | undefined> {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const userData = user ? JSON.parse(user) : null;
    const tenant = userData?.tenant;
    // const iv = CryptoJS.AES.encrypt('tai', process.env.SECRET_KEY!).toString()
    
    let newUrl = url ?? `${path}`;

    if (query != null) newUrl += `?${generateURLQueryParam({ body: query })}`;

    newUrl += `${tenant}${newUrl}`;

    alert(newUrl)

    const response = await fetch(newUrl, {
      method: method,
      headers: {
        ...headers,
        // 'iv': iv,
        'Content-Type': 'application/json',
        Authorization: token ?? '',
      },
      body: JSON.stringify(body),
    });

    if (response.status != 200) throw await response.json();
    const json = (await response.json()) as Type | undefined;
    return json;
  } catch (e) {
    throw e;
  }
}