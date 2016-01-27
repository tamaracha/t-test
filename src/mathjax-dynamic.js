export default /*@ngInject*/function mathjaxDynamic($compile) {
  function link(scope, el, attrs) {
    scope.$watch(attrs.mathjaxDynamic, function(html) {
      html = html.replace(/\$\$([^$]+)\$\$/g, '<span class="blue" mathjax-bind="$1"></span>');
      html = html.replace(/\$([^$]+)\$/g, '<span class="red" mathjax-bind="$1"></span>');
      el.html(html);
      $compile(el.contents())(scope);
    });
  }
  return {
    restrict: 'A',
    replace: true,
    link
  };
}
