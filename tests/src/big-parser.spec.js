describe('Big parser', function(){
  'use strict';
  beforeEach(angular.mock.module('calculator'));
  var scope, element, Big;
  beforeEach(angular.mock.inject(function($rootScope, $compile, _Big_){
    scope = $rootScope.$new();
    element = angular.element('<input type="text" big ng-model="value"/>');
    element = $compile(element)(scope);
    $rootScope.$digest();
    Big = _Big_;
  }));
  it('parse valid string', function(){
    element.val('20');
    element.triggerHandler('input');
    scope.$digest();
    expect(scope.value).toEqual(new Big(20));
  });
  it('ignore invalid value', function(){
    element.val('30')
    .triggerHandler('input');
    scope.$digest();
    expect(scope.value).toEqual(new Big(30));
    element.val('dummy')
    .triggerHandler('input');
    scope.$digest();
    expect(scope.value).toBeFalsy();
  });
  it('fill and empty', function(){
    element.val('30')
    .triggerHandler('input');
    scope.$digest();
    expect(scope.value).toEqual(new Big(30));
    element.val('')
    .triggerHandler('input');
    scope.$digest();
    expect(scope.value).toBeFalsy();
  });
});
