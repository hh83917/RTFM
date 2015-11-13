angular.module('rtfmApp', ['firebase', 'ui.router'])

  .constant('fb', {url: 'https://hh-rtfm-demo.firebaseio.com/'})

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('threads', {
        url: '/threads',
        templateUrl: '/templates/threads.html',
        controller: 'threadsCtrl',
        resolve: {
          threadsRef: function(threadService) {
            return threadService.getThreads();
          },
        }
      })
      .state('thread', {
        url: '/threads/:threadId',
        templateUrl: '/templates/thread.html',
        controller: 'threadCtrl',
        resolve: {
          threadRef: function(threadService, $stateParams) {
            return threadService.getThread($stateParams.threadId);
          },
          commentsRef: function(threadService, $stateParams) {
            return threadService.getComments($stateParams.threadId);
          }
        }
      });

    $urlRouterProvider
      .otherwise('/threads');
});
