describe('calculator directive', function(){
  'use strict';
  beforeEach(angular.mock.module('calculator'));
  var scope, element;
  beforeEach(angular.mock.inject(function($rootScope, $compile, $window){
    $window.MathJax = {
      Hub: {
        Queue: function(){}
      }
    };
    scope = $rootScope.$new();
    element = angular.element('<calculator></calculator>');
    element = $compile(element)(scope);
    $rootScope.$digest();
  }));
  it('has children', function(){
    expect(element.children().length).toBeGreaterThan(0);
  });
});
