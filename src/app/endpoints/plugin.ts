import { PlatformHelper, PluginLocalData } from "@natec/mef-dev-platform-connector"
import { environment } from "src/environments/environment";

const info:PluginLocalData = PlatformHelper?.getPluginData();
const api = 
        environment.production ?
        info.pluginApiUrl.replace('/api/v1/', '/api/v0/') 
        //@ts-ignore
        : `${environment.apiUrl}/api/v0/`;

export const PluginEndpoints = {
    // BPMN endpoints (path to default BPMN flow)
    FlowDefinition: `${api}bpmn/flowdefinitions/tenant/catalyst/simple-flow-echo/Start.json?debug=false&async=false&run=auto`,
    // SSE demo
    eventSource: `${api}message/sse/connect`,
    eventSend:  `${api}message/sse/send`,
}