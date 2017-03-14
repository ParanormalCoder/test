import HomeModule from './home'
import _ from 'lodash';

describe('Home', () => {
  let $rootScope, $state, $location, $componentController, $compile, CommunicationService, _;

  beforeEach(window.module(HomeModule));

  beforeEach(window.module(function ($provide) {
    $provide.value('_', _);
  }));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
    CommunicationService = $injector.get('CommunicationService');
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    it('default component should be home', () => {
      $location.url('/');
      $rootScope.$digest();
      expect($state.current.component).to.eq('home');
    });
  });

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController('home', {
        $scope: $rootScope.$new(),
        CommunicationService: CommunicationService,
        _: _
      });
    });

    it('has a name property pools', () => {
      expect(controller).to.have.property('pools');
    });
    it('has a name property currentPool', () => {
      expect(controller).to.have.property('currentPool');
    });
    it('has a name property lines', () => {
      expect(controller).to.have.property('lines');
    });
    it('has a name property form', () => {
      expect(controller).to.have.property('form');
    });

  });
});
