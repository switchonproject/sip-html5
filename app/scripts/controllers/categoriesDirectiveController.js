angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.categoriesDirectiveController',
    [
        '$scope',
        'eu.water-switch-on.sip.services.TagGroupService',
        'FilterExpression',
        function ($scope, TagGroupService, FilterExpression) {
            'use strict';

            var collectionFilterExpressions, topicFilterExpressions;

            // avoid scope soup in ng repeat
            this.expanded = false;
            this.selectedCategory = null;

            collectionFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__COLLECTION);
            if (collectionFilterExpressions && collectionFilterExpressions.length > 0) {
                this.collectionFilterExpression = collectionFilterExpressions[0];
            } else {
                this.collectionFilterExpression = new FilterExpression(FilterExpression.FILTER__COLLECTION,
                    [], true, true, null, 'Data Collection');
                $scope.filterExpressions.addFilterExpression(this.collectionFilterExpression);
            }

            topicFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__TOPIC);
            if (topicFilterExpressions && topicFilterExpressions.length > 0) {
                this.topicFilterExpression = topicFilterExpressions[0];
            } else {
                this.topicFilterExpression = new FilterExpression(FilterExpression.FILTER__TOPIC,
                    null, false, true, null, 'Topic Category');
                $scope.filterExpressions.addFilterExpression(this.topicFilterExpression);
            }

            this.getCategories = function (category) {
                return TagGroupService.getCategoryList(category);
            };

            this.performCategoriesSearch = function (selectedCategory, categoryValue) {
                $scope.filterExpressions.clear();

                switch (selectedCategory) {
                case 'topic-inspire':
                    this.topicFilterExpression.value = categoryValue;
                    break;
                case 'category-collection':
                    this.collectionFilterExpression.value = categoryValue;
                    break;
                default:
                    return;
                }

                $scope.performSearch(0, false);
                this.expanded = false;
                this.selectedCategory = null;
            };
        }]
    );