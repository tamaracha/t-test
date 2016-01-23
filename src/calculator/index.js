import controller from './calculator-controller';
import templateUrl from './calculator.jade';
const directive = /*@ngInject*/function directive(){
  return {
    controller: 'CalculatorController as $ctrl',
    templateUrl
  };
};
export {controller, directive};
