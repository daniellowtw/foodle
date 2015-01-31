'use strict';
angular.module('foodle')
    .controller('MainCtrl', function($scope) {
        $scope.items = [];
        // .cookies = $cookies.myFavorite

        $scope.Oauth = function() {
            hello.init({
                google: config.CLIENT_ID
            }, {
                scope: 'https://www.googleapis.com/auth/calendar.readonly',
                redirect_uri: "http://daniellowtw.github.io"
            });
            hello.login('google').then(getStuff, handleError)
        }

        function addEntryToCalendar(item) {
            if (colour) {
                $scope.items.push({
                    id: id,
                    colour: colour
                })
            } else {
                $scope.items.push({
                    id: id
                })
            }
        }

        function handleError(e) {
            console.log(e)
        }

        function getStuff(token) {
            hello('google').api('calendar/v3/users/me/calendarList?key=' + config.API_KEY).then(function(json) {
                json.data.forEach(function(x) {
                    // Ignore birthday calendar
                    if (x.id[0] != "#") {
                        $scope.items.push({
                            id:x.id,
                            summary:x.summary,
                            color:x.color
                        })
                    }
                })
            }, handleError).then(function() {
                $scope.$apply(updateURL)
            }, handleError)
        }


        $scope.url = "";
        $scope.tempItem = {};
        $scope.ids = "";

        function updateURL() {
            var arrayList = $scope.items
            var start = "https://www.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23FFFFFF&showTitle=0&showPrint=0&showTabs=0&showCalendars=0showTz=0&mode=WEEK"
            for (var i = 0; i < arrayList.length; i++) {
                if (arrayList[i].id) {
                    start += "&src=" + arrayList[i].id.trim();
                }
            };
            $scope.url = start;
        }


        // // Deprecated
        // $scope.addRow = function() {
        //     $scope.items.push({});
        // }
        // // Deprecated
        // var pruneEmpty = function() {
        //     var arrayList = $scope.items
        //     for (var i = 0; i < arrayList.length - 1; i++) {
        //         if (!arrayList[i].id) {
        //             arrayList.splice(i, 1);
        //             i--
        //         }
        //     }
        // }
        // // Deprecated
        // $scope.checkLast = function(j) {
        //     var arrayList = $scope.items
        //     if (j == arrayList.length - 1) {
        //         $scope.addRow();
        //     }
        // }
        // // Deprecated
        // $scope.updateState = function() {
        //     updateURL();
        //     pruneEmpty();
        // }


        $scope.removeCalendar = function(i) {
            $scope.items.splice(i, 1)
            updateURL()
        }


        $scope.addEntry = function() {
            if ($scope.tempItem.id) {
                $scope.items.push($scope.tempItem);
                $scope.tempItem = {}
            }
            updateURL();
        }


        $scope.addEntries = function() {
            if ($scope.ids) {
                $scope.ids.replace(/\n/g, ',').split(",").forEach(function(x) {
                    if (x) {
                        $scope.items.push({
                            id: x
                        });
                    }
                })
                $scope.ids = "";
            }
            updateURL();
        }

    })
