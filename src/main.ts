import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerBlocks } from './app/blocks/registry';
import { registerComponents } from './app/ui/block-ui/component-registry';

registerBlocks();
registerComponents();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
