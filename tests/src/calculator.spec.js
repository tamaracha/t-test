describe('calculator directive', function(){
  'use strict';
  beforeEach(angular.mock.module('calculator'));
  var $scope, scope, elem, $ctrl;
  beforeEach(angular.mock.inject(function($rootScope, $compile, $window){
    $window.MathJax = {
      Hub: {
        Queue: function(){}
      }
    };
    $scope = $rootScope.$new();
    elem = angular.element('<calculator></calculator>');
    elem = $compile(elem)($scope);
    $scope.$apply();
    scope = elem.isolateScope();
    $ctrl = scope.$ctrl;
  }));
  it('initialization works', function(){
    expect($ctrl.selected).toEqual('twoSample');
    expect($ctrl.data).toEqual({});
    expect($ctrl.stats).toBeFalsy();
  });
  describe('two sample', function(){
    it('no params', function(){
      scope.$apply('$ctrl.select("twoSample")');
      expect($ctrl.stats).toBeFalsy();
    });
    it('fulfilled params', function(){
      scope.$apply('$ctrl.select("twoSample")');
      $ctrl.form.m1.$setViewValue('30'),
      $ctrl.form.m2.$setViewValue('35'),
      $ctrl.form.n1.$setViewValue('20'),
      $ctrl.form.n2.$setViewValue('20'),
      $ctrl.form.s1.$setViewValue('2'),
      $ctrl.form.s2.$setViewValue('3')
      expect($ctrl.stats && $ctrl.stats.t && $ctrl.stats.df && $ctrl.stats.p).toBeTruthy();
      $ctrl.form.s2.$setViewValue('hallo');
      expect($ctrl.stats).toBeFalsy();
    });
  });
  describe('welch', function(){
    it('no params', function(){
      scope.$apply('$ctrl.select("welch")');
      expect($ctrl.stats).toBeFalsy();
    });
    it('fulfilled params', function(){
      scope.$apply('$ctrl.select("welch")');
      $ctrl.form.m1.$setViewValue('30'),
      $ctrl.form.m2.$setViewValue('35'),
      $ctrl.form.n1.$setViewValue('20'),
      $ctrl.form.n2.$setViewValue('20'),
      $ctrl.form.s1.$setViewValue('2'),
      $ctrl.form.s2.$setViewValue('3')
      expect($ctrl.stats && $ctrl.stats.t && $ctrl.stats.df && $ctrl.stats.p).toBeTruthy();
      $ctrl.form.s2.$setViewValue('');
      expect($ctrl.stats).toBeFalsy();
    });
  });
  describe('paired', function(){
    it('no params', function(){
      scope.$apply('$ctrl.select("paired")');
      expect($ctrl.stats).toBeFalsy();
    });
    it('fulfilled params', function(){
      scope.$apply('$ctrl.select("paired")');
      $ctrl.form.m.$setViewValue('3');
      $ctrl.form.n.$setViewValue('20');
      $ctrl.form.s.$setViewValue('3');
      expect($ctrl.stats && $ctrl.stats.t && $ctrl.stats.df && $ctrl.stats.p).toBeTruthy();
      $ctrl.form.s.$setViewValue('');
      expect($ctrl.stats).toBeFalsy();
    });
  });
  describe('oneSample', function(){
    it('no params', function(){
      scope.$apply('$ctrl.select("oneSample")');
      expect($ctrl.stats).toBeFalsy();
    });
    it('fulfilled params', function(){
      scope.$apply('$ctrl.select("oneSample")');
      $ctrl.form.m.$setViewValue('3');
      $ctrl.form.n.$setViewValue('20');
      $ctrl.form.s.$setViewValue('3');
      expect($ctrl.stats && $ctrl.stats.t && $ctrl.stats.df && $ctrl.stats.p).toBeTruthy();
      $ctrl.form.s.$setViewValue('');
      expect($ctrl.stats).toBeFalsy();
    });
  });
});
