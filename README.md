# server-side-ui-example
## Purpose
Example demonstrates  BPMN-flow call and handling SSE connection from Canvas UI Angular plugin.
To send the Server-Side-Events from backend the BPMN flow implements the following all call:
```curl --location 'https://api.mef.dev/api/v0/message/sse/send?lang=en' \
--header 'accept: application/json, text/plain, */*' \
--header 'content-type: application/json' \
--header 'Authorization: Basic bmF0ZWNfZGVtbzpkZW1vMjAyMw==' \
--data '{
   "serviceId":123,
   "message":{
      "someMsg":"Lorem ipsum dolor sit amet"
   }
}'
```
The BPMN flow **simple-flow-echo.bpmn** is presented in repo also.

## Prerequisites
Don`t forget to install the modules before starting work.
```
npm i 
```

## Debug

Before you start debugging, you must login or register into [mef.dev platfrom](https://preview.mef.dev/rflnk/KKtKZAipNBYheGDPAt%2FU4BYdywdGkODMFYwcfR9O7vsIz%2F5iTq6R2UyD5fvKwbvJ), and create your own credentials for Basic Authentication (provided with example should be changed). You can do this on [credentials page](https://preview.mef.dev/console/settings/credentials). For generate click **Add** button;

After, put your name and password into environment.ts file and change within the BPMN flow accordingly (see below).

For launch app execute command:
```
ng serve
```

## BPMN FLOW
For succsesful launching BPMN procces, you have to publish example **simple-flow-echo.bpmn** flow (Click **Create NEW** in [BPMN Flow Designer](https://preview.mef.dev/store/service/35/rflnk/wsvfcV0ECUiTog2b/v2PmCJMkMdhSXKjoyJe5Ziwl6L2/sEhxbNHs0/K9YZqm+xt)) with name **simple-flow-echo**. Then save in MyDraft and compile. After, publish into public tenant lib (Before you have to create a new Library with name **catalyst**). If you change the names, you should do changes within the Angular application accordingly - match the tenant lib name and flow in the file src\app\endpoints\plugin.ts. 

Only to check the BPMN flow content, you can open published flow (File -> Open -> Tenant libs -> Your lib in list). Flow will open in **READ ONLY** mode, it`s OK for published flows. On right-buttom corner you find name, id and current version.

## Build and deploy
To build the package you can use the command below:
```
 npm run build:plugin
```
After that, the contents of the dist folder can be uploaded to the mef.dev platform (look in guide below).
To handle assest, please check to home page of Angular plugin - it have an example of logo picture handling. 

# Useful links

> *Guide to register package into the platform: https://mef.dev/en/dev_guides/upload_ui_plugin.md*

> *BPMN Lowcode guide: https://mef.dev/download/BPMN_LowCode_Guide_EN.pdf*
