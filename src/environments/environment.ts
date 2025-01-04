// import { environment as env } from '@ngx-env/builder';

// export const environment = {
//     URL_BASE_USERS: env['NG_APP_MS_USERS'],
//     URL_BASE_LOGIN: env['NG_APP_MS_LOGIN'],
//   };
  

const getEnvVars = () => ({
  URL_BASE_USERS: import.meta.env?.['NG_APP_MS_USERS'],
  URL_BASE_LOGIN: import.meta.env?.['NG_APP_MS_LOGIN']
});

export const environment = getEnvVars();