import angular from 'angular';
import _ from 'lodash';

let commonModule = angular.module('app.thirdParty', [

]).factory('_', ()=>{
  return _;
}).name;

export default commonModule;


