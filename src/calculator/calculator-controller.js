export default /*@ngInject*/class CalculatorController{
  constructor($scope, student){
    this.twoSided = student.twoSided;
    this.oneSided = student.oneSided;
    this.select('twoSample');
    $scope.$watch(
      () => {
        if(this.form.$valid){return this.data;}
      },
      (val, oldVal) => {
        if(val === oldVal){return;}
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
