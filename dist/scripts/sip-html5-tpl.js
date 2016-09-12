angular.module('').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/categories-directive-popup.html',
    "<div ng-class=\"{expanded:categoriesDirectiveController.expanded}\" \r" +
    "\n" +
    "     class=\"popover switchon-categories-popover\" \r" +
    "\n" +
    "     id=\"categories-popover\" \r" +
    "\n" +
    "     ng-mouseleave=\"\r" +
    "\n" +
    "         categoriesDirectiveController.expanded = false; \r" +
    "\n" +
    "         categoriesDirectiveController.selectedCategory=null;\">\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <div class=\"switchon-categories-list\">\r" +
    "\n" +
    "            <div class=\"switchon-categories-list\">\r" +
    "\n" +
    "                <ul class=\"list-group\">\r" +
    "\n" +
    "                    <li class=\"list-group-item\">  \r" +
    "\n" +
    "                        <span ng-style=\"{'font-weight': \r" +
    "\n" +
    "                                categoriesDirectiveController.selectedCategory === 'category-collection' ? \r" +
    "\n" +
    "                               'bold' : 'plain'}\">Data Collections</span>               \r" +
    "\n" +
    "                        <i class=\"glyphicon glyphicon-chevron-right\" \r" +
    "\n" +
    "                           ng-mouseenter=\"categoriesDirectiveController.expanded = true;\r" +
    "\n" +
    "                                   categoriesDirectiveController.selectedCategory = 'category-collection'\">\r" +
    "\n" +
    "                        </i>\r" +
    "\n" +
    "                        <p>\r" +
    "\n" +
    "                            <small><small>Browse open hydrological data by popular data collections.</small></small>\r" +
    "\n" +
    "                        </p>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li class=\"list-group-item\">  \r" +
    "\n" +
    "                        <span ng-style=\"{'font-weight': \r" +
    "\n" +
    "                                categoriesDirectiveController.selectedCategory === 'topic-inspire' ? \r" +
    "\n" +
    "                            'bold' : 'plain'}\">INSPIRE Topic Categories</span>               \r" +
    "\n" +
    "                        <i class=\"glyphicon glyphicon-chevron-right\" \r" +
    "\n" +
    "                           ng-mouseenter=\"categoriesDirectiveController.expanded = true;\r" +
    "\n" +
    "                                   categoriesDirectiveController.selectedCategory = 'topic-inspire'\">\r" +
    "\n" +
    "                        </i>\r" +
    "\n" +
    "                        <p>\r" +
    "\n" +
    "                            <small><small>Browse open hydrological data by INSPIRE Topic Categories.</small></small>\r" +
    "\n" +
    "                        </p>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div ng-if=\"categoriesDirectiveController.expanded && \r" +
    "\n" +
    "                    categoriesDirectiveController.selectedCategory !== null\" class=\"switchon-categories-list switchon-sub-categories-list\">\r" +
    "\n" +
    "            <ul class=\"list-group\">\r" +
    "\n" +
    "                <li class=\"list-group-item\" \r" +
    "\n" +
    "                    ng-repeat=\"category in categoriesDirectiveController.getCategories(categoriesDirectiveController.selectedCategory)\">  \r" +
    "\n" +
    "                    <a ng-click=\"$hide(); categoriesDirectiveController.performCategoriesSearch(categoriesDirectiveController.selectedCategory, category);\">\r" +
    "\n" +
    "                        {{category}}\r" +
    "\n" +
    "                    </a>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/categories-directive-template.html',
    "<div class=\"nav navbar-nav btn-group\">\r" +
    "\n" +
    "    <button type=\"button\" \r" +
    "\n" +
    "        class=\"btn navbar-btn switchon-categories-button navbar-left\" \r" +
    "\n" +
    "        template=\"templates/categories-directive-popup.html\"\r" +
    "\n" +
    "        placement=\"bottom-left\"\r" +
    "\n" +
    "        auto-close=\"1\"\r" +
    "\n" +
    "        bs-popover=\"true\"\r" +
    "\n" +
    "        id=\"categories-button\">\r" +
    "\n" +
    "        <strong>All categories</strong> <span class=\"caret\"></span>\r" +
    "\n" +
    "    </button>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/countries-filter-directive.html',
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-body\">\r" +
    "\n" +
    "        <!--<input type=\"text\" ng-model=\"keyword\" \r" +
    "\n" +
    "               typeahead=\"keyword for keyword in keywordList | filter:$viewValue | limitTo:8\" \r" +
    "\n" +
    "               typeahead-editable=\"false\"\r" +
    "\n" +
    "               class=\"form-control\">-->\r" +
    "\n" +
    "        <select name=\"{{countryGroup}}\" id=\"{{countryGroup}}\" \r" +
    "\n" +
    "                ng-model=\"filterExpression.selectedCountry\" ng-options=\"country as country for (country, geom) in countryList\" \r" +
    "\n" +
    "                class=\"form-control\" size=\"8\" multiple ></select>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/datefilter-directive.html',
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\">Date Filter</div>\r" +
    "\n" +
    "    <div class=\"panel-body\">\r" +
    "\n" +
    "        <form  class=\"form\" \r" +
    "\n" +
    "               name=\"dateFilterBox\" \r" +
    "\n" +
    "               role=\"form\"  \r" +
    "\n" +
    "               novalidate>\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label for=\"fromDateField\">Start Date: </label>\r" +
    "\n" +
    "                <input class=\"form-control\" name=\"fromDateField\" id=\"fromDateField\" type=\"date\" \r" +
    "\n" +
    "                       placeholder=\"yyyy-MM-dd\" ng-model=\"fromDateFilterExpression.value\"/>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label for=\"toDateField\">End Date: </label>\r" +
    "\n" +
    "                <input class=\"form-control\" name=\"toDateField\" id=\"toDateField\" type=\"date\" \r" +
    "\n" +
    "                       placeholder=\"yyyy-MM-dd\" ng-model=\"toDateFilterExpression.value\"/>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/filter-expression-editor-popup.html',
    "<div class=\"popover switchon-ribbon-popover\" id=\"filterExpressionEditor\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-content\" ng-init=\"enumeratedTags = tag.origin.enumerateTags()\">\r" +
    "\n" +
    "        <span style=\"float:left; padding-bottom: 0.5em;\" \r" +
    "\n" +
    "              ng-repeat=\"subtag in enumeratedTags\" \r" +
    "\n" +
    "              search-filter-tag\r" +
    "\n" +
    "              tag=\"subtag\">  \r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/geo-buffer-editor-popup.html',
    "<div class=\"popover switchon-ribbon-popover\" id=\"geoBufferEditor\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <form name=\"geoBufferForm\" id=\"geoBufferForm\" novalidate> \r" +
    "\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': geoBufferForm.geoBufferField.$invalid}\">\r" +
    "\n" +
    "                <input type=\"number\" \r" +
    "\n" +
    "                       class=\"form-control\" \r" +
    "\n" +
    "                       min=\"0\" \r" +
    "\n" +
    "                       max=\"99999\" \r" +
    "\n" +
    "                       name=\"geoBufferField\" \r" +
    "\n" +
    "                       id=\"geoBufferField\" \r" +
    "\n" +
    "                       placeholder=\"buffer\"\r" +
    "\n" +
    "                       ng-model=\"data.editorValue\">\r" +
    "\n" +
    "                <span title=\"Cancel\"\r" +
    "\n" +
    "                      aria-label=\"Cancel\"\r" +
    "\n" +
    "                      name=\"cancelButton\"\r" +
    "\n" +
    "                      id=\"cancelButton\"\r" +
    "\n" +
    "                      class=\"btn btn-default\"\r" +
    "\n" +
    "                      ng-click=\"$hide()\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-remove\"></span>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <span title=\"Apply\"\r" +
    "\n" +
    "                      aria-label=\"Apply\"\r" +
    "\n" +
    "                      name=\"applyButton\"\r" +
    "\n" +
    "                      id=\"clearButton\"\r" +
    "\n" +
    "                      class=\"btn btn-default\"\r" +
    "\n" +
    "                      ng-click=\"tag.origin.value = data.editorValue; $hide()\"\r" +
    "\n" +
    "                      ng-disabled=\"geoBufferForm.geoBufferField.$invalid\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-ok\"></span>    \r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/geo-editor-popup.html',
    "<div class=\"popover switchon-ribbon-popover\" id=\"geoEditor\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <form name=\"geoForm\" id=\"geoForm\" novalidate> \r" +
    "\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': geoForm.geoBufferField.$invalid}\">\r" +
    "\n" +
    "                <input type=\"text\" \r" +
    "\n" +
    "                       class=\"form-control\" \r" +
    "\n" +
    "                       size=\"30\"\r" +
    "\n" +
    "                       name=\"geoField\" \r" +
    "\n" +
    "                       id=\"geoField\" \r" +
    "\n" +
    "                       placeholder=\"WKT String\"\r" +
    "\n" +
    "                       ng-model=\"data.editorValue\">\r" +
    "\n" +
    "                <span title=\"Cancel\"\r" +
    "\n" +
    "                      aria-label=\"Cancel\"\r" +
    "\n" +
    "                      name=\"cancelButton\"\r" +
    "\n" +
    "                      id=\"cancelButton\"\r" +
    "\n" +
    "                      class=\"btn btn-default\"\r" +
    "\n" +
    "                      ng-click=\"$hide()\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-remove\"></span>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <span title=\"Apply\"\r" +
    "\n" +
    "                      aria-label=\"Apply\"\r" +
    "\n" +
    "                      name=\"applyButton\"\r" +
    "\n" +
    "                      id=\"clearButton\"\r" +
    "\n" +
    "                      class=\"btn btn-default\"\r" +
    "\n" +
    "                      ng-click=\"tag.origin.setStringValue(data.editorValue); $hide()\"\r" +
    "\n" +
    "                      ng-disabled=\"geoForm.geoField.$invalid\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-ok\"></span>    \r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/keyword-filter-directive.html',
    "<!--<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-body\">-->\r" +
    "\n" +
    "        <!--<input type=\"text\" ng-model=\"keyword\" \r" +
    "\n" +
    "               typeahead=\"keyword for keyword in keywordList | filter:$viewValue | limitTo:8\" \r" +
    "\n" +
    "               typeahead-editable=\"false\"\r" +
    "\n" +
    "               class=\"form-control\">-->\r" +
    "\n" +
    "        <select ng-if=\"multiple === 'true'\"\r" +
    "\n" +
    "                name=\"{{keywordGroup}}\" id=\"{{keywordGroup}}\" \r" +
    "\n" +
    "                ng-model=\"filterExpression.value\" ng-options=\"keyword for keyword in keywordList\" \r" +
    "\n" +
    "            class=\"form-control\" size=\"11\" multiple> \r" +
    "\n" +
    "        </select>\r" +
    "\n" +
    "        <select ng-if=\"multiple !== 'true'\"\r" +
    "\n" +
    "                name=\"{{keywordGroup}}\" id=\"{{keywordGroup}}\" \r" +
    "\n" +
    "                ng-model=\"filterExpression.value\" ng-options=\"keyword for keyword in keywordList\" \r" +
    "\n" +
    "            class=\"form-control\" size=\"11\">   \r" +
    "\n" +
    "            <option value=\"\">none</option>\r" +
    "\n" +
    "        </select>\r" +
    "\n" +
    "<!--    </div>\r" +
    "\n" +
    "</div>-->"
  );


  $templateCache.put('templates/limit-editor-popup.html',
    "<div class=\"popover switchon-ribbon-popover\" id=\"limitEditor\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <form name=\"limitForm\" id=\"limitForm\" novalidate> \r" +
    "\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': limitForm.limitField.$invalid}\">\r" +
    "\n" +
    "                <input type=\"number\" \r" +
    "\n" +
    "                       class=\"form-control\" \r" +
    "\n" +
    "                       min=\"1\" \r" +
    "\n" +
    "                       max=\"50\" \r" +
    "\n" +
    "                       name=\"limitField\" \r" +
    "\n" +
    "                       id=\"limitField\" \r" +
    "\n" +
    "                       placeholder=\"limit\"\r" +
    "\n" +
    "                       ng-model=\"data.editorValue\"\r" +
    "\n" +
    "                       ng-init=\"data.applyChangesOnClose = false\">\r" +
    "\n" +
    "                <span title=\"Cancel\"\r" +
    "\n" +
    "                      aria-label=\"Cancel\"\r" +
    "\n" +
    "                      name=\"cancelButton\"\r" +
    "\n" +
    "                      id=\"cancelButton\"\r" +
    "\n" +
    "                      class=\"btn btn-default\"\r" +
    "\n" +
    "                      ng-click=\"$hide()\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-remove\"></span>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <span title=\"Apply\"\r" +
    "\n" +
    "                      aria-label=\"Apply\"\r" +
    "\n" +
    "                      name=\"applyButton\"\r" +
    "\n" +
    "                      id=\"clearButton\"\r" +
    "\n" +
    "                      class=\"btn btn-default\"\r" +
    "\n" +
    "                      ng-click=\"tag.origin.value = data.editorValue; $hide()\"\r" +
    "\n" +
    "                      ng-disabled=\"limitForm.limitField.$invalid\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-ok\"></span>    \r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/list-view-directive.html',
    "<table ng-table=\"tableParams\" class=\"table table-striped table-bordered table-hover\">\r" +
    "\n" +
    "    <tr ng-repeat=\"node in $data\">\r" +
    "\n" +
    "        <td data-title=\"'Name'\" class=\"name\" \r" +
    "\n" +
    "            sortable=\"(filterService.isCompleteResult()  && filterService.getLoadedResourcesNumber() > 1) ? 'object.name' : null\">\r" +
    "\n" +
    "            {{node.object.name | txtLen:160:false:'...':true}}\r" +
    "\n" +
    "        </td>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <td data-title=\"'Description'\">\r" +
    "\n" +
    "            <span>{{node.object.description | txtLen:160:false:'':true}}</span>\r" +
    "\n" +
    "            <span ng-hide=\"node.object.description.length < 160\">\r" +
    "\n" +
    "                <a href=\"#/resource/{{node.object.id}}\" title=\"Show the complete Description\"><strong>...</strong></a>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "        </td>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <!--\r" +
    "\n" +
    "        <td data-title=\"'Temporal Extent'\" class=\"date\"\r" +
    "\n" +
    "            sortable=\"(filterService.isCompleteResult()  && filterService.getLoadedResourcesNumber() > 1) ? 'object.fromdate' : null\">\r" +
    "\n" +
    "            {{node.object.fromdate | date: \"yyyy-MM-ddTHH:mmZ\"}} - \r" +
    "\n" +
    "            {{node.object.todate | date: \"yyyy-MM-ddTHH:mmZ\"}}\r" +
    "\n" +
    "        </td>\r" +
    "\n" +
    "        -->\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <td data-title=\"'Keywords'\" class=\"tags\">\r" +
    "\n" +
    "            <span ng-repeat=\"tag in tags = (node.object.tags | orderBy:'name' | limitTo:config.keywordsLimit)\">\r" +
    "\n" +
    "                <span ng-hide=\"config.filterKeyword && !(tag.taggroup.name === config.filterKeyword)\" \r" +
    "\n" +
    "                      class=\"label\" ng-class=\"isHighlightKeyword(config.highlightKeyword, tag.name) ? 'label-success' : 'label-default'\">{{tag.name}}</span>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "            <span ng-if=\"tags.length < node.object.tags.length\"><a href=\"#/resource/{{node.object.id}}\" title=\"Show all Keywords\"><strong>...</strong></a></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </td>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <td data-title=\"'Tools'\" class=\"tools\">\r" +
    "\n" +
    "            <a class=\"btn-invisible btn-icon\"\r" +
    "\n" +
    "               href=\"#/resource/{{node.object.id}}\"\r" +
    "\n" +
    "               title=\"Show detailed resource information\"><i class=\"glyphicon glyphicon-info-sign\"></i></a>\r" +
    "\n" +
    "            <a class=\"btn-invisible btn-icon\"\r" +
    "\n" +
    "               title=\"Show resource on the on the map\"\r" +
    "\n" +
    "               ng-click=\"$parent.$parent.selectedObject = $index\"\r" +
    "\n" +
    "               href=\"#/map\"><i class=\"glyphicon glyphicon-globe\"></i></a>\r" +
    "\n" +
    "            <span ng-repeat=\"representation in node.object.representation | filter:{type: {name: 'original data'}} | filter:{function: {name: 'download'}}\"\r" +
    "\n" +
    "                  class=\"btn-invisible\">\r" +
    "\n" +
    "                    <a href=\"{{representation.contentlocation}}\" download \r" +
    "\n" +
    "                       rel=\"nofollow\"\r" +
    "\n" +
    "                       title=\"Download {{representation.contentlocation.substr(representation.contentlocation.lastIndexOf('/')+1)}} ({{(representation.contenttype) ? representation.contenttype.name : 'application/octet-stream'}})\"\r" +
    "\n" +
    "                       type=\"{{(representation.contenttype) ? representation.contenttype.name : 'application/octet-stream'}}\"><i class=\"glyphicon glyphicon-download\"></i></a>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    " <!--           <span bs-tooltip\r" +
    "\n" +
    "                  data-placement=\"left\"\r" +
    "\n" +
    "                  data-trigger=\"hover\"\r" +
    "\n" +
    "                  data-delay=\"{show: 400, hide: 100}\"\r" +
    "\n" +
    "                  data-title=\"Bookmark\"\r" +
    "\n" +
    "                  class=\"btn-invisible btn-icon disabled\"\r" +
    "\n" +
    "                  ng-click=\"\" >\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-bookmark\"></i>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "            <span bs-tooltip\r" +
    "\n" +
    "                  data-placement=\"left\"\r" +
    "\n" +
    "                  data-trigger=\"hover\"\r" +
    "\n" +
    "                  data-delay=\"{show: 400, hide: 100}\"\r" +
    "\n" +
    "                  data-title=\"Share\"\r" +
    "\n" +
    "                  class=\"btn-invisible btn-icon disabled\" \r" +
    "\n" +
    "                  ng-click=\"\" >\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-share\"></i>\r" +
    "\n" +
    "            </span>-->\r" +
    "\n" +
    "        </td>\r" +
    "\n" +
    "    </tr>\r" +
    "\n" +
    "</table>\r" +
    "\n"
  );


  $templateCache.put('templates/map-view-directive.html',
    "<div>\r" +
    "\n" +
    "    <leaflet \r" +
    "\n" +
    "        id=\"mainmap\" \r" +
    "\n" +
    "        defaults=\"defaults\" \r" +
    "\n" +
    "        layers=\"layers\" \r" +
    "\n" +
    "        lf-center=\"center\" \r" +
    "\n" +
    "        controls=\"controls\"\r" +
    "\n" +
    "        width=\"{{currentWidth}}\" \r" +
    "\n" +
    "        height=\"{{currentHeight}}\">\r" +
    "\n" +
    "    </leaflet>\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    \r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/master-toolbar-template.html',
    "<div class=\"switchon-master-toolbar\" \r" +
    "\n" +
    "     ng-class=\"{'switchon-master-toolbar-toggled': masterToolbarService.getCanShow() && masterToolbarService.isShowing()}\">\r" +
    "\n" +
    "    <result-pager result-set=\"resultSet\"\r" +
    "\n" +
    "                  search-function=\"performSearch()\" \r" +
    "\n" +
    "                  filter-expressions=\"filterExpressions\"></result-pager>\r" +
    "\n" +
    "    <result-list result-set=\"resultSet\" selected-object=\"selectedObject\"></result-list>\r" +
    "\n" +
    "    <postsearchfilter filter-expressions=\"filterExpressions\" \r" +
    "\n" +
    "                      post-search-filter-expressions=\"postSearchFilterExpressions\" \r" +
    "\n" +
    "                      post-search-filters-filter-expression=\"postSearchFiltersFilterExpression\" \r" +
    "\n" +
    "                      filter-tags=\"filterTags\" \r" +
    "\n" +
    "                      search-function=\"performSearch()\" \r" +
    "\n" +
    "                      notification-function=\"notificationFunction()\"\r" +
    "\n" +
    "                      remove-threshold=\"resultSet.$total\">     \r" +
    "\n" +
    "    </postsearchfilter>\r" +
    "\n" +
    "    <!-- the functions that are only passed through to the lower level are invoked as we want to pass the reference\r" +
    "\n" +
    "         to the real function not the reference to the getter function -->\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/my-profile-directive.html',
    "<div class=\"page-header\" style=\"text-align: center\">\r" +
    "\n" +
    "    <h1>You are: <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span> '{{user.name}}' <small> However, the profile page is yet to come</small></h1>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"container\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-sm-12\">\r" +
    "\n" +
    "            <div class=\"thumbnail\">\r" +
    "\n" +
    "                <img src=\"images/under_construction_icon-green.svg\"  alt=\"Under Construction\"/>\r" +
    "\n" +
    "                <div style=\"margin:auto; width:600px\">\r" +
    "\n" +
    "                    <h2>This feature is currently under construction!</h2>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/my-workspace-directive.html',
    "<div class=\"btn-group nav navbar-nav navbar-right\" dropdown is-open=\"status.isopen\"\r" +
    "\n" +
    "     ng-mouseenter=\"popup(true)\"\r" +
    "\n" +
    "     ng-mouseleave=\"popup(false)\">\r" +
    "\n" +
    "    <button class=\"btn btn-xs navbar-btn dropdown-toggle ws-button\" \r" +
    "\n" +
    "            data-toggle=\"dropdown\"\r" +
    "\n" +
    "            role=\"button\"\r" +
    "\n" +
    "            type=\"button\"\r" +
    "\n" +
    "            aria-expanded=\"false\"\r" +
    "\n" +
    "            ng-click=\"showProfile()\">\r" +
    "\n" +
    "        <div>Hello {{user.name}}</div>\r" +
    "\n" +
    "        <b>My {{workspaceName}} <span class=\"caret\"></span></b>\r" +
    "\n" +
    "    </button>\r" +
    "\n" +
    "    <ul class=\"dropdown-menu hoverdropdown\" role=\"menu\">\r" +
    "\n" +
    "        <li>\r" +
    "\n" +
    "            <a ui-sref=\"profile\">My profile</a>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "        <li class=\"divider\"></li>\r" +
    "\n" +
    "        <li>\r" +
    "\n" +
    "            <a ui-sref=\"login\" ng-show=\"sessionService.isAnonymousUser(user)\">Log in</a>\r" +
    "\n" +
    "            <a ui-sref=\"login\" ng-hide=\"sessionService.isAnonymousUser(user)\">Not {{user.name}}? Log out</a>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/object-representation-template.html',
    "<accordion close-others=\"false\">\r" +
    "\n" +
    "    <accordion-group ng-repeat=\"representation in representations | filter:{type: {name: 'original data'}}\" \r" +
    "\n" +
    "                     is-open=\"representation._status.open\"\r" +
    "\n" +
    "                     ng-init=\"filename = representation.contentlocation.substr(representation.contentlocation.lastIndexOf('/')+1)\">\r" +
    "\n" +
    "        <accordion-heading>\r" +
    "\n" +
    "            <i class=\"glyphicon {{representation.protocol.name | representationIcon}}\"></i> \r" +
    "\n" +
    "            {{representation.name}} \r" +
    "\n" +
    "            <i class=\"pull-right glyphicon\" \r" +
    "\n" +
    "               ng-class=\"{'glyphicon-chevron-down': representation._status.open, 'glyphicon-chevron-right': !representation._status.open}\"></i> \r" +
    "\n" +
    "        </accordion-heading>\r" +
    "\n" +
    "        <!-- Description -->\r" +
    "\n" +
    "        <!--\r" +
    "\n" +
    "        <div class=\"row\" ng-if=\"representation.description\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\" title=\"Description of the data, e.g. information on data formats, download possibilities, etc.\">\r" +
    "\n" +
    "                <label>Description:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{representation.description}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        -->\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <!-- Temporal resolution -->\r" +
    "\n" +
    "        <div class=\"row\" ng-if=\"representation.temporalresolution\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\" title=\"Temporal resolution of the data, e.g. daily\">\r" +
    "\n" +
    "                <label>Temporal resolution:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{representation.temporalresolution || 'n/a'}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <!-- Spatial resolution -->\r" +
    "\n" +
    "        <div class=\"row\" ng-if=\"representation.spatialresolution\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\" title=\"Spatial resolution of the data, e.g. meters or arc degrees.\">\r" +
    "\n" +
    "                <label>Spatial resolution:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{representation.spatialresolution || 'n/a'}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <!-- Spatial scale -->\r" +
    "\n" +
    "        <div class=\"row\" ng-if=\"representation.spatialscale\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\" title=\"Spatial scale of the data, e.g. 1:2000 or  1:10000\">\r" +
    "\n" +
    "                <label>Spatial scale:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{representation.spatialscale || 'n/a'}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <!-- Content Type -->\r" +
    "\n" +
    "        <div class=\"row\" ng-if=\"representation.contenttype\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\" title=\"MIME Type of the dataset\">\r" +
    "\n" +
    "                <label>File type:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\" title=\"{{representation.contenttype.description || 'n/a'}}\">\r" +
    "\n" +
    "                {{representation.contenttype.name || 'n/a'}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <!-- Data access function -->\r" +
    "\n" +
    "        <div class=\"row\" ng-if=\"representation.function\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\" title=\"Function that can be performed following the link to the dataset\">\r" +
    "\n" +
    "                <label>Type of Link:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\" title=\"{{representation.function.description || 'n/a'}}\">\r" +
    "\n" +
    "                {{representation.function.name || 'n/a'}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <!-- Data access Link -->\r" +
    "\n" +
    "        <div class=\"row\" ng-if=\"representation.contentlocation\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\" title=\"Link to the data or website where the data can be obtained\">\r" +
    "\n" +
    "                <label>Link to Data:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                <a href=\"{{representation.contentlocation}}\" \r" +
    "\n" +
    "                    target=\"_blank\" \r" +
    "\n" +
    "                    rel=\"nofollow\"\r" +
    "\n" +
    "                    type=\"{{(representation.contenttype) ? representation.contenttype.name : 'application/octet-stream'}}\"\r" +
    "\n" +
    "                    ng-disabled=\"!representation.contentlocation\">{{(filename && filename.indexOf('.') !== -1) ? filename : (representation.name ? representation.name : representation.contentlocation)}}</a>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </accordion-group>\r" +
    "\n" +
    "</accordion>"
  );


  $templateCache.put('templates/post-search-filter-directive.html',
    "<accordion class=\"switchon-toolbar-component\"\r" +
    "\n" +
    "           close-others=\"!config.expandPostSearchFilters\" \r" +
    "\n" +
    "           ng-show=\"isVisible\">\r" +
    "\n" +
    "    <accordion-group ng-repeat=\"filterExpression in postSearchFilterExpressions.list | filter:{valid:true}\" \r" +
    "\n" +
    "                     ng-init=\"filterExpression._status.open = config.expandPostSearchFilters\"\r" +
    "\n" +
    "                     is-open=\"filterExpression._status.open\">\r" +
    "\n" +
    "        <accordion-heading>\r" +
    "\n" +
    "            <strong>{{filterExpression.getName()}}<strong>\r" +
    "\n" +
    "                    <i class=\"pull-right glyphicon\" \r" +
    "\n" +
    "                       ng-class=\"{'glyphicon-chevron-down': filterExpression._status.open, 'glyphicon-chevron-up': !filterExpression._status.open}\">      \r" +
    "\n" +
    "                    </i>\r" +
    "\n" +
    "        </accordion-heading>\r" +
    "\n" +
    "        <span style=\"float:left; padding-bottom: 0.5em;\" \r" +
    "\n" +
    "              ng-repeat=\"tag in filterExpression.enumeratedTags\" \r" +
    "\n" +
    "              search-filter-tag \r" +
    "\n" +
    "              tag=\"tag\" \r" +
    "\n" +
    "              remove-threshold=\"removeThreshold\">  \r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "    </accordion-group>\r" +
    "\n" +
    "</accordion>"
  );


  $templateCache.put('templates/result-pager-template.html',
    "<div class=\"switchon-toolbar-component switchon-result-pager\" ng-show=\"isVisible\">   \r" +
    "\n" +
    "    <span class=\"switchon-result-pager-title\">\r" +
    "\n" +
    "        <strong>Resources</strong>\r" +
    "\n" +
    "        <span title=\"Showing {{resultSet.$length}} of {{resultSet.$total}} resources\" ng-show=\"resultSet && resultSet.$length && resultSet.$length > 0\">({{resultSet.$total}})</span>\r" +
    "\n" +
    "    </span>\r" +
    "\n" +
    "    <ul class=\"pagination pagination-sm pull-right\">\r" +
    "\n" +
    "        <li ng-class=\"{disabled: !hasPrevious()}\">\r" +
    "\n" +
    "            <a title=\"Show previous {{resultSet.$limit}} resources\" aria-label=\"Previous\" \r" +
    "\n" +
    "               ng-show=\"hasPrevious()\" ng-click=\"previous()\">\r" +
    "\n" +
    "                <span aria-hidden=\"true\">&laquo;</span>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "        <li ng-class=\"{disabled: !hasNext()}\">\r" +
    "\n" +
    "            <a title=\"Show next {{resultSet.$limit}} resources\" aria-label=\"Next\" \r" +
    "\n" +
    "               ng-show=\"hasNext()\" ng-click=\"next()\">\r" +
    "\n" +
    "                <span aria-hidden=\"true\">&raquo;</span>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/resultlist-directive.html',
    "<div class=\"switchon-toolbar-component switchon-result-list\" ng-show=\"isVisible\">   \r" +
    "\n" +
    "    <ul class=\"list-group\">\r" +
    "\n" +
    "        <li class=\"list-group-item\" ng-repeat=\"node in resultSet.$collection\">  \r" +
    "\n" +
    "            <span class=\"btn-link\" \r" +
    "\n" +
    "                  ng-style=\"{'font-weight': $parent.selectedObject === $index ? 'bold' : 'plain'}\"\r" +
    "\n" +
    "                  ng-click=\"$parent.selectedObject = $index\">\r" +
    "\n" +
    "                {{node.name | txtLen:30:false:'...':true}}\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "            <a class=\"btn-invisible btn-icon pull-right\"\r" +
    "\n" +
    "               href=\"#/resource/{{node.object.id}}\"\r" +
    "\n" +
    "               title=\"Show detailed resource information\"><i class=\"glyphicon glyphicon-info-sign\"></i>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "            <p>\r" +
    "\n" +
    "                <small><small>\r" +
    "\n" +
    "                        {{node.object.description| txtLen:80:false:'...':true}}\r" +
    "\n" +
    "                </small></small>\r" +
    "\n" +
    "            </p>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/search-filter-ribbon-directive.html',
    "<button type=\"button\" id=\"search-filter-directive-button\" \r" +
    "\n" +
    "        class=\"btn btn-default navbar-btn navbar-left\" \r" +
    "\n" +
    "        template=\"templates/search-filter-ribbon-popup.html\"\r" +
    "\n" +
    "        placement=\"bottom-left\"\r" +
    "\n" +
    "        auto-close=\"1\"\r" +
    "\n" +
    "        bs-popover=\"true\">\r" +
    "\n" +
    "    Search Filter <span class=\"caret\"></span>\r" +
    "\n" +
    "</button>\r" +
    "\n"
  );


  $templateCache.put('templates/search-filter-ribbon-popup.html',
    "<div class=\"popover switchon-ribbon-popover\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <div class=\"switchon-ribbon\">\r" +
    "\n" +
    "            <div class=\"switchon-ribbon-panel last\">\r" +
    "\n" +
    "                <div class=\"btn-group switchon-keywordgroup\" \r" +
    "\n" +
    "                     dropdown \r" +
    "\n" +
    "                     is-open=\"keywordFilters.isopen\">\r" +
    "\n" +
    "                    <button type=\"button\" \r" +
    "\n" +
    "                            class=\"btn btn-default dropdown-toggle\" \r" +
    "\n" +
    "                            dropdown-toggle \r" +
    "\n" +
    "                            ng-init=\"keywordFilters.keywordGroup = 'X-CUAHSI Keywords'\"\r" +
    "\n" +
    "                            style=\"width:100%\">\r" +
    "\n" +
    "                        {{keywordFilters.keywordGroup}}\r" +
    "\n" +
    "                        <span class=\"caret\"></span>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <ul class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <label class=\"btn\" \r" +
    "\n" +
    "                                   ng-model=\"keywordFilters.keywordGroup\" \r" +
    "\n" +
    "                                   btn-radio=\"'X-CUAHSI Keywords'\" \r" +
    "\n" +
    "                                   ng-click=\"keywordFilters.isopen = !keywordFilters.isopen\"\r" +
    "\n" +
    "                                   title=\"X-CUAHSI keywords build on a hierarchical keyword selection from the hydrologic ontology developed by CUAHSI, with additional hierarchical keywords for relevant non-hydrosphere data.\">\r" +
    "\n" +
    "                                X-CUAHSI Keywords\r" +
    "\n" +
    "                            </label>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <label class=\"btn\" ng-model=\"keywordFilters.keywordGroup\" \r" +
    "\n" +
    "                                   btn-radio=\"'INSPIRE TOPIC Categories'\" \r" +
    "\n" +
    "                                   ng-click=\"keywordFilters.isopen = !keywordFilters.isopen\"\r" +
    "\n" +
    "                                   title=\"INSPIRE Topic Categories available in the SWITCH-ON Meta-Data Repository\">\r" +
    "\n" +
    "                                INSPIRE TOPIC Categories\r" +
    "\n" +
    "                            </label>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        \r" +
    "\n" +
    "                        <!--\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <label class=\"btn\" \r" +
    "\n" +
    "                                ng-model=\"keywordFilters.keywordGroup\" \r" +
    "\n" +
    "                                btn-radio=\"'Keywords'\" \r" +
    "\n" +
    "                                ng-click=\"keywordFilters.isopen = !keywordFilters.isopen\"\r" +
    "\n" +
    "                                title=\"All Keywords available in the SWITCH-ON Meta-Data Repository\">\r" +
    "\n" +
    "                                Keywords\r" +
    "\n" +
    "                            </label>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <label class=\"btn\" \r" +
    "\n" +
    "                                   ng-model=\"keywordFilters.keywordGroup\" \r" +
    "\n" +
    "                                   btn-radio=\"'INSPIRE Keywords'\" \r" +
    "\n" +
    "                                   ng-click=\"keywordFilters.isopen = !keywordFilters.isopen\">INSPIRE Keywords\r" +
    "\n" +
    "                            </label>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <label class=\"btn\" \r" +
    "\n" +
    "                                ng-model=\"keywordFilters.keywordGroup\" \r" +
    "\n" +
    "                                btn-radio=\"'Free Keywords'\" \r" +
    "\n" +
    "                                ng-click=\"keywordFilters.isopen = !keywordFilters.isopen\">\r" +
    "\n" +
    "                                Free Keywords\r" +
    "\n" +
    "                            </label>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        -->\r" +
    "\n" +
    "                    </ul>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <keyword-filter ng-show=\"keywordFilters.keywordGroup === 'X-CUAHSI Keywords'\" \r" +
    "\n" +
    "                                class=\"ng-hide\"\r" +
    "\n" +
    "                                filter-expression=\"keywordsCuashiFilterExpression\" \r" +
    "\n" +
    "                                keyword-group=\"keyword-x-cuahsi\"\r" +
    "\n" +
    "                                multiple=\"true\"\r" +
    "\n" +
    "                                title=\"X-CUAHSI keywords build on a hierarchical keyword selection from the hydrologic ontology developed by CUAHSI, with additional hierarchical keywords for relevant non-hydrosphere data.\">      \r" +
    "\n" +
    "                </keyword-filter>\r" +
    "\n" +
    "                <keyword-filter ng-show=\"keywordFilters.keywordGroup === 'INSPIRE TOPIC Categories'\" \r" +
    "\n" +
    "                                class=\"ng-hide\"\r" +
    "\n" +
    "                                filter-expression=\"topicFilterExpression\" \r" +
    "\n" +
    "                                keyword-group=\"topic-inspire\"\r" +
    "\n" +
    "                                multiple=\"false\"\r" +
    "\n" +
    "                                title=\"INSPIRE Topic Categories available in the SWITCH-ON Meta-Data Repository\">\r" +
    "\n" +
    "                </keyword-filter>\r" +
    "\n" +
    "                <!--\r" +
    "\n" +
    "                <keyword-filter ng-show=\"keywordFilters.keywordGroup === 'Keywords'\" \r" +
    "\n" +
    "                                class=\"ng-hide\"\r" +
    "\n" +
    "                                filter-expression=\"keywordsFilterExpression\" \r" +
    "\n" +
    "                                keyword-group=\"keyword-all\"\r" +
    "\n" +
    "                                multiple=\"true\">    \r" +
    "\n" +
    "                </keyword-filter>\r" +
    "\n" +
    "                <keyword-filter ng-show=\"keywordFilters.keywordGroup === 'INSPIRE Keywords'\" \r" +
    "\n" +
    "                                class=\"ng-hide\"\r" +
    "\n" +
    "                                filter-expression=\"keywordsFilterExpression\" \r" +
    "\n" +
    "                                keyword-group=\"keyword-inspire\"\r" +
    "\n" +
    "                                multiple=\"true\">\r" +
    "\n" +
    "                </keyword-filter>\r" +
    "\n" +
    "                <keyword-filter ng-show=\"keywordFilters.keywordGroup === 'Free Keywords'\" \r" +
    "\n" +
    "                                class=\"ng-hide\"\r" +
    "\n" +
    "                                filter-expression=\"keywordsFilterExpression\" \r" +
    "\n" +
    "                                keyword-group=\"keyword-free\"\r" +
    "\n" +
    "                                multiple=\"true\">        \r" +
    "\n" +
    "                -->\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <!-- FIXME: Date Filter Directive does not work properly in latest versions of \r" +
    "\n" +
    "            Firefox and Internet Explorer. See https://github.com/switchonproject/sip-html5/issues/48 -->\r" +
    "\n" +
    "<!--            <div class=\"switchon-ribbon-panel\">\r" +
    "\n" +
    "                <date-filter from-date-filter-expression=\"fromDateFilterExpression\"\r" +
    "\n" +
    "                             to-date-filter-expression=\"toDateFilterExpression\">\r" +
    "\n" +
    "                </date-filter>\r" +
    "\n" +
    "            </div>-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "<!--            <div class=\"switchon-ribbon-panel\">\r" +
    "\n" +
    "                <tabset>\r" +
    "\n" +
    "                    <tab heading=\"Europe\">\r" +
    "\n" +
    "                        <countries-filter \r" +
    "\n" +
    "                            filter-expression=\"geoFilterExpression\" \r" +
    "\n" +
    "                            country-group=\"country-europe\">\r" +
    "\n" +
    "                        </countries-filter>\r" +
    "\n" +
    "                    </tab>\r" +
    "\n" +
    "                    <tab heading=\"World\">\r" +
    "\n" +
    "                        <countries-filter \r" +
    "\n" +
    "                            filter-expression=\"geoFilterExpression\" \r" +
    "\n" +
    "                            country-group=\"country-world\">\r" +
    "\n" +
    "                        </countries-filter>\r" +
    "\n" +
    "                    </tab>\r" +
    "\n" +
    "                </tabset>\r" +
    "\n" +
    "            </div>-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <!--\r" +
    "\n" +
    "            <div class=\"switchon-ribbon-panel last\">\r" +
    "\n" +
    "                <search-options geo-intersects-filter-expression=\"geoIntersectsFilterExpression\"\r" +
    "\n" +
    "                                geo-buffer-filter-expression=\"geoBufferFilterExpression\"\r" +
    "\n" +
    "                                limit-filter-expression=\"limitFilterExpression\">\r" +
    "\n" +
    "                </search-options>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            -->\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"switchon-ribbon-footer\">\r" +
    "\n" +
    "                <span title=\"Close the Search Filter Dialog\"\r" +
    "\n" +
    "                      aria-label=\"Close\"\r" +
    "\n" +
    "                      name=\"closeButton\"\r" +
    "\n" +
    "                      id=\"closeButton\"\r" +
    "\n" +
    "                      class=\"btn btn-default\"\r" +
    "\n" +
    "                      ng-click=\"$hide()\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-remove\"></span>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <span title=\"Clear all Search Filters\"\r" +
    "\n" +
    "                      aria-label=\"Clear\"\r" +
    "\n" +
    "                      name=\"clearButton\"\r" +
    "\n" +
    "                      id=\"clearButton\"\r" +
    "\n" +
    "                      class=\"btn btn-default\"\r" +
    "\n" +
    "                      ng-disabled=\"((filterExpressions.enumeratedTags.length < 1)\r" +
    "\n" +
    "                      && (!textFilterExpression.value || textFilterExpression.value.length < 3))\"\r" +
    "\n" +
    "                      ng-click=\"clear()\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-trash\"></span>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <span title=\"Search for resources\"\r" +
    "\n" +
    "                      aria-label=\"Search\"\r" +
    "\n" +
    "                      name=\"searchButton\"\r" +
    "\n" +
    "                      id=\"searchButton\"\r" +
    "\n" +
    "                      class=\"btn btn-primary\"\r" +
    "\n" +
    "                      ng-disabled=\"((filterExpressions.enumeratedTags.length < 1)\r" +
    "\n" +
    "                      && (!textFilterExpression.value || textFilterExpression.value.length < 3))\"\r" +
    "\n" +
    "                      ng-click=\"$hide(); performSearch()(0, config.clearPostSearchFilters)\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-search\"></span>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('templates/search-filter-tag-directive-template.html',
    "<span class=\"tag label\" \r" +
    "\n" +
    "      ng-class=\"getTagStyle(tag.getType(), false, highlightNegated)\">\r" +
    "\n" +
    "    <span ng-class=\"getTagIcon(tag.getType())\" title=\"{{tag.getTitle()}}\"></span>\r" +
    "\n" +
    "    <span ng-if=\"!tag.isEditable()\">{{tag.getDisplayValue()}}</span>\r" +
    "\n" +
    "    <span ng-if=\"tag.isEditable()\" \r" +
    "\n" +
    "          bs-popover template=\"{{tag.getEditor()}}\"\r" +
    "\n" +
    "          placement=\"bottom\"\r" +
    "\n" +
    "          auto-close=\"1\">{{tag.getDisplayValue(data.editorValue)}}\r" +
    "\n" +
    "    </span> \r" +
    "\n" +
    "    <span ng-if=\"tag.getCardinality() > 0\"><small><em>({{tag.getCardinality()}})</em></small></span>\r" +
    "\n" +
    "    <a ng-if=\"tag.isRemoveable(removeThreshold)\" title=\"delete\"><i ng-click=\"tag.remove()\" \r" +
    "\n" +
    "          class=\"glyphicon glyphicon-remove\"></i>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "</span>"
  );


  $templateCache.put('templates/search-options-directive.html',
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\">Options</div>\r" +
    "\n" +
    "    <div class=\"panel-body\">\r" +
    "\n" +
    "        <form name=\"optionsForm\" id=\"optionsForm\" novalidate> \r" +
    "\n" +
    "            <div class=\"form-group \">\r" +
    "\n" +
    "                <label for=\"geoIntersectsOption\">Geospatial Search</label>\r" +
    "\n" +
    "                <div class=\"form-inline\">\r" +
    "\n" +
    "                    <div class=\"radio\" title=\"Find resources that intersect with the geospatial search area\">\r" +
    "\n" +
    "                        <label>\r" +
    "\n" +
    "                            <input name=\"geoIntersectsOption\" \r" +
    "\n" +
    "                                   id=\"geoIntersectsOption\" \r" +
    "\n" +
    "                                   type=\"radio\" \r" +
    "\n" +
    "                                   ng-model=\"geoIntersectsFilterExpression.value\" \r" +
    "\n" +
    "                                   value=\"true\"> Intersects\r" +
    "\n" +
    "                        </label>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"radio\" title=\"Find resources that are enclosed in the geospatial search area\">\r" +
    "\n" +
    "                        <label>\r" +
    "\n" +
    "                            <input name=\"geoEnclosesOption\" \r" +
    "\n" +
    "                                   id=\"geoEnclosesOption\" \r" +
    "\n" +
    "                                   type=\"radio\" \r" +
    "\n" +
    "                                   ng-model=\"geoIntersectsFilterExpression.value\" \r" +
    "\n" +
    "                                   value=\"false\"> Encloses\r" +
    "\n" +
    "                        </label>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <!--\r" +
    "\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': optionsForm.geoBufferField.$invalid}\">\r" +
    "\n" +
    "                 <input type=\"number\" class=\"form-control\" \r" +
    "\n" +
    "                   min=\"0\" \r" +
    "\n" +
    "                   max=\"1000000\" \r" +
    "\n" +
    "                   ngMinlength=\"1\"\r" +
    "\n" +
    "                   name=\"geoBufferField\" \r" +
    "\n" +
    "                   id=\"geoBufferField\" \r" +
    "\n" +
    "                   placeholder=\"buffer in meters\"\r" +
    "\n" +
    "                   ng-model=\"geoBufferFilterExpression.value\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': optionsForm.limitField.$invalid}\">\r" +
    "\n" +
    "                <div class=\"form-inline\" title=\"Maximum number of search results that are shown at once\">\r" +
    "\n" +
    "                    <label for=\"limitField\">Max. Search Results</label>                    \r" +
    "\n" +
    "                    <input type=\"number\" class=\"form-control\" \r" +
    "\n" +
    "                           min=\"0\" \r" +
    "\n" +
    "                           max=\"50\" \r" +
    "\n" +
    "                           ngMinlength=\"1\"\r" +
    "\n" +
    "                           name=\"limitField\" \r" +
    "\n" +
    "                           id=\"limitField\" \r" +
    "\n" +
    "                           ng-model=\"limitFilterExpression.value\">\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            -->\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/search-progress-modal-template.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <center><h4>Please wait, search is in progress.</h4></center>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <progressbar class=\"progress-striped active\" \r" +
    "\n" +
    "                 max=\"200\" \r" +
    "\n" +
    "                 value=\"status.current\" \r" +
    "\n" +
    "                 type=\"{{status.type}}\">\r" +
    "\n" +
    "    </progressbar>\r" +
    "\n" +
    "    <span><i>{{status.message}}</i></span>\r" +
    "\n" +
    " </div>\r" +
    "\n" +
    "<div class=\"modal-footer\"><!-- empty --></div>"
  );


  $templateCache.put('templates/usb-directive.html',
    "<!--<div class=\"switchon-usb\">-->\r" +
    "\n" +
    "    <form  class=\"navbar-form navbar-left\" \r" +
    "\n" +
    "           name=\"universalSearchBox\" \r" +
    "\n" +
    "           id=\"universalSearchBox\" \r" +
    "\n" +
    "           role=\"search\"  \r" +
    "\n" +
    "           novalidate >\r" +
    "\n" +
    "        <div class=\"form-group\" \r" +
    "\n" +
    "             ng-class=\"{'has-error': !universalSearchBox.filterExpressionInput.$error.required\r" +
    "\n" +
    "                         && universalSearchBox.filterExpressionInput.$invalid}\" >\r" +
    "\n" +
    "            \r" +
    "\n" +
    "            <div class=\"form-control usb-form-control\">\r" +
    "\n" +
    "                <div class=\"usb-tag-container\">\r" +
    "\n" +
    "                    <span ng-repeat=\"tag in filterExpressions.enumeratedTags\"\r" +
    "\n" +
    "                          search-filter-tag tag=\"tag\" highlight-negated=\"true\">\r" +
    "\n" +
    "                    </span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"usb-input-container\">\r" +
    "\n" +
    "                    <input class=\"switchon-usb-input\"\r" +
    "\n" +
    "                        name=\"filterExpressionInput\" \r" +
    "\n" +
    "                        id=\"filterExpressionInput\" \r" +
    "\n" +
    "                        type=\"text\" \r" +
    "\n" +
    "                        placeholder=\"Please enter a query\" \r" +
    "\n" +
    "                        ng-model=\"textFilterExpression.value\" \r" +
    "\n" +
    "                        required/>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <button ng-click=\"performSearch()(0, config.clearPostSearchFilters)\" \r" +
    "\n" +
    "                    ng-disabled=\"((filterExpressions.enumeratedTags.length === 0) \r" +
    "\n" +
    "                        && (!textFilterExpression.value || textFilterExpression.value.length < 3))\" \r" +
    "\n" +
    "                    class=\"btn btn-primary\">\r" +
    "\n" +
    "                <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<!--            <button ng-click=\"clear()\" class=\"btn btn-default\">Clear</button>-->\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <p class=\"help-block error\" \r" +
    "\n" +
    "           ng-show=\"notificationFunction === undefined && !universalSearchBox.filterExpressionInput.$error.required\r" +
    "\n" +
    "                        && universalSearchBox.filterExpressionInput.$invalid\">\r" +
    "\n" +
    "            This filter expression is not valid. \r" +
    "\n" +
    "            Try <strong>expression</strong><strong>:</strong><i>\"parameter\"</i>, e.g. keyword:\"water quality\".\r" +
    "\n" +
    "        </p>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <p class=\"help-block info\" ng-show=\"notificationFunction === undefined &&\r" +
    "\n" +
    "                        universalSearchBox.filterExpressionInput.$error.required\">\r" +
    "\n" +
    "            Please enter a filter expression,  e.g. keyword:\"water quality\".\r" +
    "\n" +
    "        </p>    \r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "<!--</div>-->"
  );


  $templateCache.put('templates/welcome-message.html',
    "<div class=\"modal-header\">\n" +
    "    <center>\n" +
    "        <h3 class=\"modal-title\" id=\"modal-title\">\n" +
    "            Welcome to the SWITCH-ON Data Catalogue!\n" +
    "        </h3>\n" +
    "    </center>\n" +
    "</div>\n" +
    "<div class=\"modal-body\" id=\"modal-body\">\n" +
    "    <p>\n" +
    "        The SWITCH-ON data catalogue provides metadata and links to water-relevant open datasets, to easily inspect and download data from many  various data providers. \n" +
    "    </p>\n" +
    "    <p>\n" +
    "        This web-based search tool enables you to:</p>\n" +
    "    <ul>\n" +
    "        <li><strong><em>Construct a search query</em></strong>  - on relevant (combinations of) metadata characteristics like: keyword, free text, geospatial extent - to look for required Open Datasets.</li>\n" +
    "        <li><strong><em>Display the search results and inspect metadata</em></strong> of the datasets found, preview and/or download them.</li>\n" +
    "        <li><strong><em>Post-filter</em></strong> the resources found based on metadata characteristics.</li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <p>For further information about the catalogue <strong>\n" +
    "            <a href=\"data/switch-on-data-search-guide.pdf\" \n" +
    "               title=\"SWITCH-ON Data Search Guide\" \n" +
    "               target=\"_blank\"\n" +
    "               rel=\"help\"\n" +
    "               type=\"application/pdf\">read...</a>\n" +
    "        </strong>\n" +
    "    </p>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <div class=\"checkbox\">\n" +
    "        <label class=\"pull-left\">\n" +
    "            <input\n" +
    "                type=\"checkbox\"\n" +
    "                ng-model=\"hideWelcomeMessage\"\n" +
    "                name=\"hideWelcomeMessage\"> \n" +
    "            Don't show this message again\n" +
    "        </label></div>\n" +
    "    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"close()\">Close</button>\n" +
    "</div>"
  );

}]);
