export default /*@ngInject*/function latex($window){
  function link(scope, element){
    let pre, post;
    if(element[0].tagName === 'SPAN'){
      pre = '\\(';
      post = '\\)';
    }
    if(element[0].tagName === 'DIV'){
      pre = '\\[';
      post = '\\]';
    }
    scope.$watch(
      'math',
      function(value){
        element.html(pre + value + post);
        $window.MathJax.Hub.Queue(['Typeset', $window.MathJax.Hub, element[0]]);
      }
    );
  }
  return {
    restrict: 'AE',
    scope: {
      math: '@latex'
    },
    link
  };
}
