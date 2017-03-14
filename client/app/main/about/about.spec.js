import AboutModule from './about'

describe('About', () => {
  let $rootScope, $state, $location, $componentController, $compile;

  beforeEach(window.module(AboutModule));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    it('About component should be visible when navigates to /about', () => {
      $location.url('/about');
      $rootScope.$digest();
      expect($state.current.component).to.eq('about');
    });
  });

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController('about', {
        $scope: $rootScope.$new()
      });
    });

    it('is defined', () => {
      expect(controller).to.exist;
    });
  });
});
