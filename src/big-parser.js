export default /*@ngInject*/function(Big){
  function link(scope, el, attrs, c){
    function toBig(val){
      if(!val){return null;}
      try{
        return new Big(val);
      }
      catch(e){
        return;
      }
    }
    c.$parsers.push(toBig);
  }
  return {
    require: 'ngModel',
    link
  };
}
