export default /*@ngInject*/function MathJaxDirective($window){
  function link(scope, el){
    $window.MathJax.Hub.Queue(['Typeset', $window.MathJax.Hub, el[0]]);
  }
  return {
    restrict: 'A',
    link
  };
}
