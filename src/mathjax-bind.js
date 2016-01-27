import angular from 'angular';
export default /*@ngInject*/function mathjaxBind($window){
  function link(scope, el){
    scope.$watch('text', function(value){
      const $script = angular.element('<script type="math/tex">')
      .html(value === undefined ? '' : value);
      el.html('')
      .append($script);
      $window.MathJax.Hub.Queue(['Reprocess', $window.MathJax.Hub, el[0]]);
    });
  }
  return {
    restrict: 'A',
    scope: {
      text: '@mathjaxBind'
    },
    link
  };
}
