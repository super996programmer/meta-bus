import SHA from 'jssha';

// const AppId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
// const AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
const AppId = '7a541e50d99542889ad49ecbf1a8a261';
const AppKey = 'ztwc_Fb2wxJm8vNo4mYsQ-PmylM';

export const getAuthorizationHeader = () => {
  const dateTimeString = new Date().toUTCString();
  const SHAObject = new SHA('SHA-1', 'TEXT');
  SHAObject.setHMACKey(AppKey, 'TEXT');
  SHAObject.update(`x-date: ${dateTimeString}`);
  const HMAC = SHAObject.getHMAC('B64');
  const Authorization = `hmac username="${AppId}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

  return {
    Authorization,
    'X-Date': dateTimeString,
  };
};

const fetchTdxApi = async <T>(url: string) => {
  const tdxApiConfig: RequestInit = {
    method: 'GET',
    headers: getAuthorizationHeader(),
  };

  try {
    const response = await fetch(url, tdxApiConfig);
    if (response.ok) {
      const result: T = await response.json();
      return result;
    }
    throw new Error('Something went wrong');
  } catch (error) {
    throw new Error(`Something went wrong ${error}`);
  }
};

export default fetchTdxApi;
