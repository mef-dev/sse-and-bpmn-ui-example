import { PLUGIN_VERSION } from './version'

export const environment = {
  production: false,
  version: PLUGIN_VERSION.version,

  // used for ng serve on local machine
  // Generate own on credentials https://app.mef.dev/console/settings/credentials (click *ADD*)
  bauth: 'NAME:PASS',

  apiUrl: 'https://api.mef.dev'
};