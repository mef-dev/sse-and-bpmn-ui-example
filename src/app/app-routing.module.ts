import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlatformHelper } from '@natec/mef-dev-platform-connector';

import { ContainerComponent } from './components/container/container.component';

import { TranslationLoaderResolver } from './resolvers/translation-loader.resolver';
import { HomeComponent } from './components/home/home.component';
import { OptimazeNetworkComponent } from './components/optimaze-network/optimaze-network.component';
import { ResetStateComponent } from './components/reset-state/reset-state.component';
import { BpmnCallComponent } from './components/bpmn-call/bpmn-call.component';
import { SseDemoComponent } from './components/sse-demo/sse-demo.component';

const routes: Routes = PlatformHelper.updatePluginsRoutes([  //use only ones time, for others sub routes use regular Angular way
  	{
		path: "",
		component: ContainerComponent,
		resolve: {model: TranslationLoaderResolver},
		children: // not to change. all used routes must be declared as children
		[
			{
				path:"", 
				redirectTo:"home", 
				pathMatch: 'full', 
			},
			{
				path:"home", 
				component: HomeComponent, 
			},
			{
				path:"reset-state", 
				component: ResetStateComponent, 
			},
			{
				path:"optimaze-network", 
				component: OptimazeNetworkComponent, 
			},
			{
				path:"bpmn-call", 
				component: BpmnCallComponent, 
			},
			{
				path:"sse-demo", 
				component: SseDemoComponent, 
			},
		]
	},
]);


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
