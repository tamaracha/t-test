export default /*@ngInject*/class CalculatorController{
  constructor($scope, student){
    this.select('twoSample');
    this.alternative = 'ne';
    this.alpha = 0.05;
    $scope.$watch(
      () => {
        if(this.form.$valid && this.form.$dirty){return this.data;}
      },
      (val) => {
        if(val === undefined){
          this.stats = undefined;
        }
        else{
          this.stats = student.stats(val, this.selected);
        }
      },
      true
    );
  }
  select(val){
    this.selected = val;
    this.data = {};
    this.stats = undefined;
    if(val === 'oneSample' || val === 'paired'){this.data.mu = 0;}
  }
}
