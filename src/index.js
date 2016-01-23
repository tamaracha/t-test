import angular from 'angular';
import Big from 'big.js';
import student from './student';
import * as calculator from './calculator';
import bigParser from './big-parser';

export default angular.module('calculator', [
  'ngAria',
  'ngAnimate'
])
.constant('Big',Big)
.factory('student', student)
.controller('CalculatorController', calculator.controller)
.directive('calculator', calculator.directive)
.directive('mathJax', /*@ngInject*/function($window){
  function link(scope, el){
    $window.MathJax.Hub.Queue(['Typeset', $window.MathJax.Hub, el[0]]);
  }
  return {
    restrict: 'A',
    link
  };
})
.directive('big', bigParser)
.name;
