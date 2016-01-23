describe('calculator controller', function(){
  'use strict';
  beforeEach(angular.mock.module('calculator'));
  var $ctrl;
  var $scope;
  beforeEach(angular.mock.inject(function($controller, $rootScope){
    $scope = $rootScope.$new();
    $ctrl = $controller('CalculatorController as $ctrl', {$scope: $scope});
  }));
  it('initialization works', function(){
    expect($ctrl.selected).toEqual('twoSample');
    expect($ctrl.data).toEqual({});
    expect($ctrl.stats).toBeFalsy();
  });
  it('wrong method', function(){
    $scope.$digest();
    $ctrl.select('dummy');
    $scope.$digest();
    expect($ctrl.stats).toBeFalsy();
  });
  describe('two sample', function(){
    it('no params', function(){
      $scope.$digest();
      $ctrl.select('twoSample');
      $scope.$digest();
      expect($ctrl.stats).toBeFalsy();
    });
    it('fulfilled params', function(){
      $scope.$digest();
      $ctrl.select('twoSample');
      $ctrl.data = {
        m1: 30,
        m2: 35,
        n1: 20,
        n2: 20,
        s1: 2,
        s2: 3
      };
      $scope.$digest();
      expect($ctrl.stats && $ctrl.stats.t && $ctrl.stats.df && $ctrl.stats.p).toBeTruthy();
      $ctrl.data.s2 = undefined;
      $scope.$digest();
      expect($ctrl.stats).toBeFalsy();
    });
  });
  describe('welch', function(){
    it('no params', function(){
      $scope.$digest();
      $ctrl.select('welch');
      $scope.$digest();
      expect($ctrl.stats).toBeFalsy();
    });
    it('fulfilled params', function(){
      $scope.$digest();
      $ctrl.select('welch');
      $ctrl.data = {
        m1: 30,
        m2: 35,
        n1: 20,
        n2: 20,
        s1: 2,
        s2: 3
      };
      $scope.$digest();
      expect($ctrl.stats && $ctrl.stats.t && $ctrl.stats.df && $ctrl.stats.p).toBeTruthy();
      $ctrl.data.s2 = undefined;
      $scope.$digest();
      expect($ctrl.stats).toBeFalsy();
    });
  });
  describe('paired', function(){
    it('no params', function(){
      $scope.$digest();
      $ctrl.select('paired');
      $scope.$digest();
      expect($ctrl.stats).toBeFalsy();
    });
    it('fulfilled params', function(){
      $scope.$digest();
      $ctrl.select('paired');
      $ctrl.data = {
        m: 3,
        n: 20,
        s: 3
      };
      $scope.$digest();
      expect($ctrl.stats && $ctrl.stats.t && $ctrl.stats.df && $ctrl.stats.p).toBeTruthy();
      $ctrl.data.s = undefined;
      $scope.$digest();
      expect($ctrl.stats).toBeFalsy();
    });
  });
  describe('oneSample', function(){
    it('no params', function(){
      $scope.$digest();
      $ctrl.select('oneSample');
      $scope.$digest();
      expect($ctrl.stats).toBeFalsy();
    });
  });
    it('fulfilled params', function(){
      $scope.$digest();
      $ctrl.select('oneSample');
      $ctrl.data = {
        m: 3,
        n: 20,
        s: 3
      };
      $scope.$digest();
      expect($ctrl.stats && $ctrl.stats.t && $ctrl.stats.df && $ctrl.stats.p).toBeTruthy();
      $ctrl.data.s = undefined;
      $scope.$digest();
      expect($ctrl.stats).toBeFalsy();
    });
});
