import angular from 'angular';
import uiRouter from 'angular-ui-router';
import CommonCore from './common/core';
import CommonElements from './common/elements';
import CommonThirdParty from './common/thirdParty';
import MainElements from './main';
import AppComponent from './app.component';
import 'normalize.css';
import 'angular-ui-bootstrap';


angular.module('app', [
  uiRouter,
  CommonCore,
  CommonElements,
  CommonThirdParty,
  MainElements,
  'ui.bootstrap'
])
  .config(($locationProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .component('app', AppComponent);
