var sampleapp = angular.module('sampleapp', []);

sampleapp.controller('MainController', function($scope, $http) {

  var crossword = null;
  var crosswordDom = null;

  $http.get('crosswords/guardian_quiptic_89.json').success(function(crosswordDefinition) {

    //  Create the crossword model.
    crossword = new CrosswordsJS.Crossword(crosswordDefinition);
    crosswordDom = new CrosswordsJS.CrosswordDOM(crossword, document.getElementById('crossword1'));

    $scope.acrossClues = crossword.acrossClues;
    $scope.downClues = crossword.downClues;

    crosswordDom.onStateChanged = function(message) {

      if(message.message === "clueSelected") {
        $scope.currentClue = crosswordDom.currentClue;
        $scope.$apply();
      }

    };

  });

  $scope.isSelectedClue = function(clue) {
    return clue === $scope.currentClue;
  };

  $scope.selectClue = function(clue) {
    crosswordDom.selectClue(clue);
  };

});