import angular from 'angular';
import CommunicationService from './services/CommunicationService';


let coreModule = angular.module('app.core', [])
  .service('CommunicationService', CommunicationService)
  .name;

export default coreModule;

