import axios, {AxiosError} from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const baseURL = 'http://localhost:3030/v1/api';

const api = {
  auth: axios.create({baseURL}),
  public: axios.create({baseURL}),
};

export default api;

export function setupRefreshTokenInterceptor(
  refreshToken: string,
  onRefresh: (accessToken: string, expiresAt: string) => Promise<any> | any,
) {
  // when 401 and errno = 2
  createAuthRefreshInterceptor(
    api.auth,
    failedRequest => {
      console.log('on refresh');
      return api.public
        .post('/auth/refresh_token', {
          data: {refresh_token: refreshToken},
        })
        .then(async response => {
          console.log(response.data.accessToken);
          failedRequest.response.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          await onRefresh(response.data.accessToken, response.data.expiresAt);
          return Promise.resolve();
        });
    },
    {
      shouldRefresh: (error: AxiosError): boolean =>
        (error.response?.data as any).errno === 2,
      pauseInstanceWhileRefreshing: true,
      statusCodes: [401, 403],
    },
  );
}

export function setupAuthInterceptors(accessToken: string) {
  api.auth.interceptors.request.use(
    request => {
      if (typeof (request.headers as any).Authorization === 'undefined') {
        (request.headers as any).Authorization = `Bearer ${accessToken}`;
      }
      return request;
    },
    error => {
      return Promise.reject(error);
    },
  );
}

export async function fetchIllustById(illustId: number): Promise<any> {
  return api.auth
    .get('/query/illust', {params: {illust_id: illustId}})
    .then(response => response.data)
    .catch(error => {
      console.log('error = ', error);
    });
}
