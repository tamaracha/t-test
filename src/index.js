import angular from 'angular';
import Big from 'big.js';
import student from './student';
import calculator from './calculator';
import MathJaxDirective from './math-jax-directive';
import bigParser from './big-parser';

export default angular.module('calculator', [
  'ngAria',
  'ngAnimate'
])
.constant('Big',Big)
.factory('student', student)
.component('calculator', calculator)
.directive('mathJax', MathJaxDirective)
.directive('big', bigParser)
.name;
angular.bootstrap(document.body, ['calculator'], {strictDi: true});
