# server-side-ui-example
Example demonstrate call BPMN action and start SSE connection from front plugin.

Don`t forget to install the modules before starting work.
```
npm i 
```

## Debug

Before you start debugging, you must create your own credentials for basic authentication. You can do this on [page](https://app.mef.dev/console/settings/credentials). For generate click **Add** button;

After, put your name and password into environment.ts file.

For launch app execute command:
```
ng serve
```

## BPMN FLOW
For succsesful launching BPMN procces, you mast publish defoult flow (Click **Create NEW ** in [modeller](https://preview.mef.dev/store/service/35/rflnk/wsvfcV0ECUiTog2b/v2PmCJMkMdhSXKjoyJe5Ziwl6L2/sEhxbNHs0/K9YZqm+xt)). Then save in MyDraft and compile.
After publish into publick tenant lib. 

Then you mast open published flow (File -> Open -> Tenant libs -> Your lib in list). Flow open on **READ ONLY** mode, it`s OK. On right-buttom corner you find id and version.

You mast change id and version in file src\app\endpoints\plugin.ts. 

## Build and deploy
To build the package you can use the command below:
```
 npm run build:plugin
```
After that, the contents of the dist folder can be uploaded to the platform.

# Useful links

> *Guide to register package into the platform: https://mef.dev/en/dev_guides/upload_ui_plugin.md*

> *Creation of UI package with Backend logic: https://mef.dev/en/dev_guides/portal_plugin.md*

> *BPMN modeller guide: mef.dev/download/BPMN_LowCode_Guide_EN.pdf*

