export default /*@ngInject*/class CalculatorController{
  constructor($scope, student){
    this.twoSided = student.twoSided;
    this.oneSided = student.oneSided;
    this.select('twoSample');
    function watcher(){
      const data = $scope.$ctrl.data;
      const selected = $scope.$ctrl.selected;
      if(selected === 'twoSample' || selected === 'welch'){
        if(data.m1 && data.m2 && data.n1 && data.n2 && data.s1 && data.s2){return data;}
      }
      else if(selected === 'paired' || selected === 'oneSample'){
        if(data.m && data.n && data.s){return data;}
      }
    }
    $scope.$watch(watcher, (val, oldVal) => {
      if(val === oldVal){return;}
      if(!val){
        this.stats = undefined;
        return;
      }
      this.stats = student.stats(val, this.selected);
    }, true);
  }
  select(val){
    this.selected = val;
    this.data = {};
    this.stats = undefined;
  }
}
