'use strict';

angular.module('app')
    .directive('appFixedHeader', ['$timeout', function (timer) {

        return {
            restrict: 'AE',

            link: function (scope, element, attributes) {

                var scrollFixOn = function () {

                    element.addClass('app-fixed-header');

                    var container = $('#main-content'),
                        offset = element.offset().top;

                    if (!scrollWatcher) {

                        scrollWatcher = function () {
                            if(this.scrollTop > offset) {
                                container.addClass('fix-header');
                            } else {
                                container.removeClass('fix-header');
                            }
                        }

                        container.on('scroll', scrollWatcher)
                    }

                };

                var scrollFixOff = function () {

                    var container = $('#main-content');

                    if (scrollWatcher) {
                        container.off('scroll', scrollWatcher)
                    }

                    scrollWatcher = null;

                    element.removeClass('app-fixed-header');
                    container.removeClass('fix-header');
                };

                if (attributes.gspFixedHeader) {
                    scope.$watch(attributes.gspFixedHeader, function(on) {
                        if (on) {
                            timer(scrollFixOn, 500);
                        } else {
                            scrollFixOff();
                        }
                    });
                }
                else {
                    timer(scrollFixOn, 500);
                }

                var scrollWatcher = null;

                scope.$on('$destroy', scrollFixOff);

            }
        }
    }]);