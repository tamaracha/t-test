import angular from 'angular';
import Big from 'big.js';
import student from './student';
import calculator from './calculator';
import latex from './latex';
import bigParser from './big-parser';

export default angular.module('calculator', [
  'ngAria',
  'ngAnimate'
])
.constant('Big',Big)
.factory('student', student)
.component('calculator', calculator)
.directive('latex', latex)
.directive('big', bigParser)
.name;
angular.element(document).ready(function(){
  angular.bootstrap(document, ['calculator'], {strictDi: true});
});
