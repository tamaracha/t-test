export default /*@ngInject*/class CalculatorController{
  constructor($scope, student){
    this.select('twoSample');
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
    this.data = {
      alpha: 0.05,
      alternative: 'ne'
    };
    this.stats = undefined;
    if(val === 'oneSample' || val === 'paired'){this.data.mu = 0;}
  }
}
