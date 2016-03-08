angular.module('').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/categories-directive-popup.html',
    "<div ng-class=\"{expanded:categoriesDirectiveController.expanded}\" \n" +
    "     class=\"popover switchon-categories-popover\" \n" +
    "     id=\"categories-popover\" \n" +
    "     ng-mouseleave=\"\n" +
    "         categoriesDirectiveController.expanded = false; \n" +
    "         categoriesDirectiveController.selectedCategory=null;\">\n" +
    "    <div class=\"popover-content\">\n" +
    "        <div class=\"switchon-categories-list\">\n" +
    "            <div class=\"switchon-categories-list\">\n" +
    "                <ul class=\"list-group\">\n" +
    "                    <li class=\"list-group-item\">  \n" +
    "                        <span ng-style=\"{'font-weight': \n" +
    "                                categoriesDirectiveController.selectedCategory === 'category-collection' ? \n" +
    "                               'bold' : 'plain'}\">Data Collections</span>               \n" +
    "                        <i class=\"glyphicon glyphicon-chevron-right\" \n" +
    "                           ng-mouseenter=\"categoriesDirectiveController.expanded = true;\n" +
    "                                   categoriesDirectiveController.selectedCategory = 'category-collection'\">\n" +
    "                        </i>\n" +
    "                        <p>\n" +
    "                            <small><small>Browse open hydrological data by popular data collections.</small></small>\n" +
    "                        </p>\n" +
    "                    </li>\n" +
    "                    <li class=\"list-group-item\">  \n" +
    "                        <span ng-style=\"{'font-weight': \n" +
    "                                categoriesDirectiveController.selectedCategory === 'topic-inspire' ? \n" +
    "                            'bold' : 'plain'}\">INSPIRE Topic Categories</span>               \n" +
    "                        <i class=\"glyphicon glyphicon-chevron-right\" \n" +
    "                           ng-mouseenter=\"categoriesDirectiveController.expanded = true;\n" +
    "                                   categoriesDirectiveController.selectedCategory = 'topic-inspire'\">\n" +
    "                        </i>\n" +
    "                        <p>\n" +
    "                            <small><small>Browse open hydrological data by INSPIRE Topic Categories.</small></small>\n" +
    "                        </p>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-if=\"categoriesDirectiveController.expanded && \n" +
    "                    categoriesDirectiveController.selectedCategory !== null\" class=\"switchon-categories-list switchon-sub-categories-list\">\n" +
    "            <ul class=\"list-group\">\n" +
    "                <li class=\"list-group-item\" \n" +
    "                    ng-repeat=\"category in categoriesDirectiveController.getCategories(categoriesDirectiveController.selectedCategory)\">  \n" +
    "                    <a ng-click=\"$hide(); categoriesDirectiveController.performCategoriesSearch(categoriesDirectiveController.selectedCategory, category);\">\n" +
    "                        {{category}}\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/categories-directive-template.html',
    "<div class=\"nav navbar-nav btn-group\">\n" +
    "    <button type=\"button\" \n" +
    "        class=\"btn navbar-btn switchon-categories-button navbar-left\" \n" +
    "        template=\"templates/categories-directive-popup.html\"\n" +
    "        placement=\"bottom-left\"\n" +
    "        auto-close=\"1\"\n" +
    "        bs-popover=\"true\"\n" +
    "        id=\"categories-button\">\n" +
    "        <strong>All categories</strong> <span class=\"caret\"></span>\n" +
    "    </button>\n" +
    "</div>"
  );


  $templateCache.put('templates/countries-filter-directive.html',
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-body\">\n" +
    "        <!--<input type=\"text\" ng-model=\"keyword\" \n" +
    "               typeahead=\"keyword for keyword in keywordList | filter:$viewValue | limitTo:8\" \n" +
    "               typeahead-editable=\"false\"\n" +
    "               class=\"form-control\">-->\n" +
    "        <select name=\"{{countryGroup}}\" id=\"{{countryGroup}}\" \n" +
    "                ng-model=\"filterExpression.selectedCountry\" ng-options=\"country as country for (country, geom) in countryList\" \n" +
    "                class=\"form-control\" size=\"8\" multiple ></select>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/datefilter-directive.html',
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">Date Filter</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <form  class=\"form\" \n" +
    "               name=\"dateFilterBox\" \n" +
    "               role=\"form\"  \n" +
    "               novalidate>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"fromDateField\">Start Date: </label>\n" +
    "                <input class=\"form-control\" name=\"fromDateField\" id=\"fromDateField\" type=\"date\" \n" +
    "                       placeholder=\"yyyy-MM-dd\" ng-model=\"fromDateFilterExpression.value\"/>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"toDateField\">End Date: </label>\n" +
    "                <input class=\"form-control\" name=\"toDateField\" id=\"toDateField\" type=\"date\" \n" +
    "                       placeholder=\"yyyy-MM-dd\" ng-model=\"toDateFilterExpression.value\"/>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/filter-expression-editor-popup.html',
    "<div class=\"popover switchon-ribbon-popover\" id=\"filterExpressionEditor\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <div class=\"popover-content\" ng-init=\"enumeratedTags = tag.origin.enumerateTags()\">\n" +
    "        <span style=\"float:left; padding-bottom: 0.5em;\" \n" +
    "              ng-repeat=\"subtag in enumeratedTags\" \n" +
    "              search-filter-tag\n" +
    "              tag=\"subtag\">  \n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/geo-buffer-editor-popup.html',
    "<div class=\"popover switchon-ribbon-popover\" id=\"geoBufferEditor\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <div class=\"popover-content\">\n" +
    "        <form name=\"geoBufferForm\" id=\"geoBufferForm\" novalidate> \n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': geoBufferForm.geoBufferField.$invalid}\">\n" +
    "                <input type=\"number\" \n" +
    "                       class=\"form-control\" \n" +
    "                       min=\"0\" \n" +
    "                       max=\"99999\" \n" +
    "                       name=\"geoBufferField\" \n" +
    "                       id=\"geoBufferField\" \n" +
    "                       placeholder=\"buffer\"\n" +
    "                       ng-model=\"data.editorValue\">\n" +
    "                <span title=\"Cancel\"\n" +
    "                      aria-label=\"Cancel\"\n" +
    "                      name=\"cancelButton\"\n" +
    "                      id=\"cancelButton\"\n" +
    "                      class=\"btn btn-default\"\n" +
    "                      ng-click=\"$hide()\">\n" +
    "                    <span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "                </span>\n" +
    "                <span title=\"Apply\"\n" +
    "                      aria-label=\"Apply\"\n" +
    "                      name=\"applyButton\"\n" +
    "                      id=\"clearButton\"\n" +
    "                      class=\"btn btn-default\"\n" +
    "                      ng-click=\"tag.origin.value = data.editorValue; $hide()\"\n" +
    "                      ng-disabled=\"geoBufferForm.geoBufferField.$invalid\">\n" +
    "                    <span class=\"glyphicon glyphicon-ok\"></span>    \n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/geo-editor-popup.html',
    "<div class=\"popover switchon-ribbon-popover\" id=\"geoEditor\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <div class=\"popover-content\">\n" +
    "        <form name=\"geoForm\" id=\"geoForm\" novalidate> \n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': geoForm.geoBufferField.$invalid}\">\n" +
    "                <input type=\"text\" \n" +
    "                       class=\"form-control\" \n" +
    "                       size=\"30\"\n" +
    "                       name=\"geoField\" \n" +
    "                       id=\"geoField\" \n" +
    "                       placeholder=\"WKT String\"\n" +
    "                       ng-model=\"data.editorValue\">\n" +
    "                <span title=\"Cancel\"\n" +
    "                      aria-label=\"Cancel\"\n" +
    "                      name=\"cancelButton\"\n" +
    "                      id=\"cancelButton\"\n" +
    "                      class=\"btn btn-default\"\n" +
    "                      ng-click=\"$hide()\">\n" +
    "                    <span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "                </span>\n" +
    "                <span title=\"Apply\"\n" +
    "                      aria-label=\"Apply\"\n" +
    "                      name=\"applyButton\"\n" +
    "                      id=\"clearButton\"\n" +
    "                      class=\"btn btn-default\"\n" +
    "                      ng-click=\"tag.origin.setStringValue(data.editorValue); $hide()\"\n" +
    "                      ng-disabled=\"geoForm.geoField.$invalid\">\n" +
    "                    <span class=\"glyphicon glyphicon-ok\"></span>    \n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/keyword-filter-directive.html',
    "<!--<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-body\">-->\n" +
    "        <!--<input type=\"text\" ng-model=\"keyword\" \n" +
    "               typeahead=\"keyword for keyword in keywordList | filter:$viewValue | limitTo:8\" \n" +
    "               typeahead-editable=\"false\"\n" +
    "               class=\"form-control\">-->\n" +
    "        <select ng-if=\"multiple === 'true'\"\n" +
    "                name=\"{{keywordGroup}}\" id=\"{{keywordGroup}}\" \n" +
    "                ng-model=\"filterExpression.value\" ng-options=\"keyword for keyword in keywordList\" \n" +
    "            class=\"form-control\" size=\"11\" multiple> \n" +
    "        </select>\n" +
    "        <select ng-if=\"multiple !== 'true'\"\n" +
    "                name=\"{{keywordGroup}}\" id=\"{{keywordGroup}}\" \n" +
    "                ng-model=\"filterExpression.value\" ng-options=\"keyword for keyword in keywordList\" \n" +
    "            class=\"form-control\" size=\"11\">   \n" +
    "            <option value=\"\">none</option>\n" +
    "        </select>\n" +
    "<!--    </div>\n" +
    "</div>-->"
  );


  $templateCache.put('templates/limit-editor-popup.html',
    "<div class=\"popover switchon-ribbon-popover\" id=\"limitEditor\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <div class=\"popover-content\">\n" +
    "        <form name=\"limitForm\" id=\"limitForm\" novalidate> \n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': limitForm.limitField.$invalid}\">\n" +
    "                <input type=\"number\" \n" +
    "                       class=\"form-control\" \n" +
    "                       min=\"1\" \n" +
    "                       max=\"50\" \n" +
    "                       name=\"limitField\" \n" +
    "                       id=\"limitField\" \n" +
    "                       placeholder=\"limit\"\n" +
    "                       ng-model=\"data.editorValue\"\n" +
    "                       ng-init=\"data.applyChangesOnClose = false\">\n" +
    "                <span title=\"Cancel\"\n" +
    "                      aria-label=\"Cancel\"\n" +
    "                      name=\"cancelButton\"\n" +
    "                      id=\"cancelButton\"\n" +
    "                      class=\"btn btn-default\"\n" +
    "                      ng-click=\"$hide()\">\n" +
    "                    <span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "                </span>\n" +
    "                <span title=\"Apply\"\n" +
    "                      aria-label=\"Apply\"\n" +
    "                      name=\"applyButton\"\n" +
    "                      id=\"clearButton\"\n" +
    "                      class=\"btn btn-default\"\n" +
    "                      ng-click=\"tag.origin.value = data.editorValue; $hide()\"\n" +
    "                      ng-disabled=\"limitForm.limitField.$invalid\">\n" +
    "                    <span class=\"glyphicon glyphicon-ok\"></span>    \n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/list-view-directive.html',
    "<table ng-table=\"tableParams\" class=\"table table-striped table-bordered table-hover\">\n" +
    "    <tr ng-repeat=\"node in $data\">\n" +
    "        <td data-title=\"'Name'\" class=\"name\" \n" +
    "            sortable=\"(filterService.isCompleteResult()  && filterService.getLoadedResourcesNumber() > 1) ? 'object.name' : null\">\n" +
    "            {{node.object.name | txtLen:160:false:'...':true}}\n" +
    "        </td>\n" +
    "        \n" +
    "        <td data-title=\"'Description'\">\n" +
    "            <span>{{node.object.description | txtLen:160:false:'':true}}</span>\n" +
    "            <span ng-hide=\"node.object.description.length < 160\">\n" +
    "                <a href=\"#/resource/{{node.object.id}}\" title=\"Show the complete Description\"><strong>...</strong></a>\n" +
    "            </span>\n" +
    "        </td>\n" +
    "        \n" +
    "        <td data-title=\"'Temporal Extent'\" class=\"date\"\n" +
    "            sortable=\"(filterService.isCompleteResult()  && filterService.getLoadedResourcesNumber() > 1) ? 'object.fromdate' : null\">\n" +
    "            {{node.object.fromdate | date: \"yyyy-MM-ddTHH:mmZ\"}} - \n" +
    "            {{node.object.todate | date: \"yyyy-MM-ddTHH:mmZ\"}}\n" +
    "        </td>\n" +
    "        \n" +
    "        <td data-title=\"'Keywords'\" class=\"tags\">\n" +
    "            <span ng-repeat=\"tag in tags = (node.object.tags | orderBy:'name' | limitTo:config.keywordsLimit)\">\n" +
    "                <span ng-hide=\"config.filterKeyword && !(tag.taggroup.name === config.filterKeyword)\" \n" +
    "                      class=\"label\" ng-class=\"isHighlightKeyword(config.highlightKeyword, tag.name) ? 'label-success' : 'label-default'\">{{tag.name}}</span>\n" +
    "            </span>\n" +
    "            <span ng-if=\"tags.length < node.object.tags.length\"><a href=\"#/resource/{{node.object.id}}\" title=\"Show all Keywords\"><strong>...</strong></a></span>\n" +
    "\n" +
    "        </td>\n" +
    "        \n" +
    "        <td data-title=\"'Tools'\" class=\"tools\">\n" +
    "            <a class=\"btn-invisible btn-icon\"\n" +
    "               href=\"#/resource/{{node.object.id}}\"\n" +
    "               title=\"Show detailed resource information\"><i class=\"glyphicon glyphicon-info-sign\"></i></a>\n" +
    "            <a class=\"btn-invisible btn-icon\"\n" +
    "               title=\"Show resource on the on the map\"\n" +
    "               ng-click=\"$parent.$parent.selectedObject = $index\"\n" +
    "               href=\"#/map\"><i class=\"glyphicon glyphicon-globe\"></i></a>\n" +
    "            <span ng-repeat=\"representation in node.object.representation | filter:{function:'download', type:'original data'}\"\n" +
    "                  class=\"btn-invisible\">\n" +
    "                    <a href=\"{{representation.contentlocation}}\" download \n" +
    "                       rel=\"nofollow\"\n" +
    "                       title=\"Download {{representation.contentlocation.substr(representation.contentlocation.lastIndexOf('/')+1)}} ({{(representation.contenttype) ? representation.contenttype.name : 'application/octet-stream'}})\"\n" +
    "                       type=\"{{(representation.contenttype) ? representation.contenttype.name : 'application/octet-stream'}}\"><i class=\"glyphicon glyphicon-download\"></i></a>\n" +
    "            </span>\n" +
    " <!--           <span bs-tooltip\n" +
    "                  data-placement=\"left\"\n" +
    "                  data-trigger=\"hover\"\n" +
    "                  data-delay=\"{show: 400, hide: 100}\"\n" +
    "                  data-title=\"Bookmark\"\n" +
    "                  class=\"btn-invisible btn-icon disabled\"\n" +
    "                  ng-click=\"\" >\n" +
    "                <i class=\"glyphicon glyphicon-bookmark\"></i>\n" +
    "            </span>\n" +
    "            <span bs-tooltip\n" +
    "                  data-placement=\"left\"\n" +
    "                  data-trigger=\"hover\"\n" +
    "                  data-delay=\"{show: 400, hide: 100}\"\n" +
    "                  data-title=\"Share\"\n" +
    "                  class=\"btn-invisible btn-icon disabled\" \n" +
    "                  ng-click=\"\" >\n" +
    "                <i class=\"glyphicon glyphicon-share\"></i>\n" +
    "            </span>-->\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "</table>\n"
  );


  $templateCache.put('templates/map-view-directive.html',
    "<div>\n" +
    "    <leaflet id=\"mainmap\" defaults=\"defaults\" center=\"center\" width=\"{{currentWidth}}\" height=\"{{currentHeight}}\"></leaflet>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('templates/master-toolbar-template.html',
    "<div class=\"switchon-master-toolbar\" \n" +
    "     ng-class=\"{'switchon-master-toolbar-toggled': masterToolbarService.getCanShow() && masterToolbarService.isShowing()}\">\n" +
    "    <result-pager result-set=\"resultSet\"\n" +
    "                  search-function=\"performSearch()\" \n" +
    "                  filter-expressions=\"filterExpressions\"></result-pager>\n" +
    "    <result-list result-set=\"resultSet\" selected-object=\"selectedObject\"></result-list>\n" +
    "    <postsearchfilter filter-expressions=\"filterExpressions\" \n" +
    "                      post-search-filter-expressions=\"postSearchFilterExpressions\" \n" +
    "                      post-search-filters-filter-expression=\"postSearchFiltersFilterExpression\" \n" +
    "                      filter-tags=\"filterTags\" \n" +
    "                      search-function=\"performSearch()\" \n" +
    "                      notification-function=\"notificationFunction()\"\n" +
    "                      remove-threshold=\"resultSet.$total\">     \n" +
    "    </postsearchfilter>\n" +
    "    <!-- the functions that are only passed through to the lower level are invoked as we want to pass the reference\n" +
    "         to the real function not the reference to the getter function -->\n" +
    "</div>"
  );


  $templateCache.put('templates/my-profile-directive.html',
    "<div class=\"page-header\" style=\"text-align: center\">\n" +
    "    <h1>You are: <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span> '{{user.name}}' <small> However, the profile page is yet to come</small></h1>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <div class=\"thumbnail\">\n" +
    "                <img src=\"images/under_construction_icon-green.svg\"  alt=\"Under Construction\"/>\n" +
    "                <div style=\"margin:auto; width:600px\">\n" +
    "                    <h2>This feature is currently under construction!</h2>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
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
    "    <accordion-group ng-repeat=\"rep in reps | filter:{type:'original data'}\" \r" +
    "\n" +
    "                     is-open=\"rep._status.open\"\r" +
    "\n" +
    "                     ng-init=\"filename = rep.contentlocation.substr(rep.contentlocation.lastIndexOf('/')+1)\">\r" +
    "\n" +
    "        <accordion-heading>\r" +
    "\n" +
    "            {{rep.name}} <i class=\"pull-right glyphicon\" \r" +
    "\n" +
    "                            ng-class=\"{'glyphicon-chevron-down': rep._status.open, 'glyphicon-chevron-right': !rep._status.open}\"></i> \r" +
    "\n" +
    "        </accordion-heading>\r" +
    "\n" +
    "        <!-- Description -->\r" +
    "\n" +
    "        <!--\r" +
    "\n" +
    "        <div class=\"row\" ng-if=\"rep.description\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\" title=\"Description of the data, e.g. information on data formats, download possibilities, etc.\">\r" +
    "\n" +
    "                <label>Description:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{rep.description}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        -->\r" +
    "\n" +
    "        <!-- Temporal resolution -->\r" +
    "\n" +
    "        <div class=\"row\" ng-if=\"rep.temporalresolution\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\" title=\"Temporal resolution of the data, e.g. daily\">\r" +
    "\n" +
    "                <label>Temporal resolution:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{rep.temporalresolution || 'n/a'}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <!-- Spatial resolution -->\r" +
    "\n" +
    "        <div class=\"row\" ng-if=\"rep.spatialresolution\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\" title=\"Spatial resolution of the data, e.g. meters or arc degrees.\">\r" +
    "\n" +
    "                <label>Spatial resolution:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{rep.spatialresolution || 'n/a'}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <!-- Spatial scale -->\r" +
    "\n" +
    "        <div class=\"row\" ng-if=\"rep.spatialscale\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\" title=\"Spatial scale of the data, e.g. 1:2000 or  1:10000\">\r" +
    "\n" +
    "                <label>Spatial scale:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{rep.spatialscale || 'n/a'}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <!-- Content Type -->\r" +
    "\n" +
    "        <div class=\"row\" ng-if=\"rep.contenttype\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\" title=\"MIME Type of the dataset\">\r" +
    "\n" +
    "                <label>File type:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\" title=\"{{rep.contenttype.description || 'n/a'}}\">\r" +
    "\n" +
    "                {{rep.contenttype.name || 'n/a'}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <!-- Data access function -->\r" +
    "\n" +
    "        <div class=\"row\" ng-if=\"rep.function\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\" title=\"Function that can be performed following the link to the dataset\">\r" +
    "\n" +
    "                <label>Type of Link:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\" title=\"{{rep.function.description || 'n/a'}}\">\r" +
    "\n" +
    "                {{rep.function.name || 'n/a'}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <!-- Data access Link -->\r" +
    "\n" +
    "        <div class=\"row\" ng-if=\"rep.contentlocation\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\" title=\"Link to the data or website where the data can be obtained\">\r" +
    "\n" +
    "                <label>Link to Data:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                <a href=\"{{rep.contentlocation}}\" \r" +
    "\n" +
    "                    target=\"_blank\" \r" +
    "\n" +
    "                    rel=\"nofollow\"\r" +
    "\n" +
    "                    type=\"{{(rep.contenttype) ? rep.contenttype.name : 'application/octet-stream'}}\"\r" +
    "\n" +
    "                    ng-disabled=\"!rep.contentlocation\">{{(filename && filename.indexOf('.') !== -1) ? filename : (rep.name ? rep.name : rep.contentlocation)}}</a>\r" +
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
    "<accordion class=\"switchon-toolbar-component\"\n" +
    "           close-others=\"!config.expandPostSearchFilters\" \n" +
    "           ng-show=\"isVisible\">\n" +
    "    <accordion-group ng-repeat=\"filterExpression in postSearchFilterExpressions.list | filter:{valid:true}\" \n" +
    "                     ng-init=\"filterExpression._status.open = config.expandPostSearchFilters\"\n" +
    "                     is-open=\"filterExpression._status.open\">\n" +
    "        <accordion-heading>\n" +
    "            <strong>{{filterExpression.getName()}}<strong>\n" +
    "                    <i class=\"pull-right glyphicon\" \n" +
    "                       ng-class=\"{'glyphicon-chevron-down': filterExpression._status.open, 'glyphicon-chevron-up': !filterExpression._status.open}\">      \n" +
    "                    </i>\n" +
    "        </accordion-heading>\n" +
    "        <span style=\"float:left; padding-bottom: 0.5em;\" \n" +
    "              ng-repeat=\"tag in filterExpression.enumeratedTags\" \n" +
    "              search-filter-tag \n" +
    "              tag=\"tag\" \n" +
    "              remove-threshold=\"removeThreshold\">  \n" +
    "        </span>\n" +
    "    </accordion-group>\n" +
    "</accordion>"
  );


  $templateCache.put('templates/result-pager-template.html',
    "<div class=\"switchon-toolbar-component switchon-result-pager\" ng-show=\"isVisible\">   \n" +
    "    <span class=\"switchon-result-pager-title\">\n" +
    "        <strong>Resources</strong>\n" +
    "        <span title=\"Showing {{resultSet.$length}} of {{resultSet.$total}} resources\" ng-show=\"resultSet && resultSet.$length && resultSet.$length > 0\">({{resultSet.$total}})</span>\n" +
    "    </span>\n" +
    "    <ul class=\"pagination pagination-sm pull-right\">\n" +
    "        <li ng-class=\"{disabled: !hasPrevious()}\">\n" +
    "            <a title=\"Show previous {{resultSet.$limit}} resources\" aria-label=\"Previous\" \n" +
    "               ng-show=\"hasPrevious()\" ng-click=\"previous()\">\n" +
    "                <span aria-hidden=\"true\">&laquo;</span>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "        <li ng-class=\"{disabled: !hasNext()}\">\n" +
    "            <a title=\"Show next {{resultSet.$limit}} resources\" aria-label=\"Next\" \n" +
    "               ng-show=\"hasNext()\" ng-click=\"next()\">\n" +
    "                <span aria-hidden=\"true\">&raquo;</span>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>"
  );


  $templateCache.put('templates/resultlist-directive.html',
    "<div class=\"switchon-toolbar-component switchon-result-list\" ng-show=\"isVisible\">   \n" +
    "    <ul class=\"list-group\">\n" +
    "        <li class=\"list-group-item\" ng-repeat=\"node in resultSet.$collection\">  \n" +
    "            <span class=\"btn-link\" \n" +
    "                  ng-style=\"{'font-weight': $parent.selectedObject === $index ? 'bold' : 'plain'}\"\n" +
    "                  ng-click=\"$parent.selectedObject = $index\">\n" +
    "                {{node.name | txtLen:30:false:'...':true}}\n" +
    "            </span>\n" +
    "            <a class=\"btn-invisible btn-icon pull-right\"\n" +
    "               href=\"#/resource/{{node.object.id}}\"\n" +
    "               title=\"Show detailed resource information\"><i class=\"glyphicon glyphicon-info-sign\"></i>\n" +
    "            </a>\n" +
    "            <p>\n" +
    "                <small><small>\n" +
    "                        {{node.object.description| txtLen:80:false:'...':true}}\n" +
    "                </small></small>\n" +
    "            </p>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>"
  );


  $templateCache.put('templates/search-filter-ribbon-directive.html',
    "<button type=\"button\" id=\"search-filter-directive-button\" \n" +
    "        class=\"btn btn-default navbar-btn navbar-left\" \n" +
    "        template=\"templates/search-filter-ribbon-popup.html\"\n" +
    "        placement=\"bottom-left\"\n" +
    "        auto-close=\"1\"\n" +
    "        bs-popover=\"true\">\n" +
    "    Search Filter <span class=\"caret\"></span>\n" +
    "</button>\n"
  );


  $templateCache.put('templates/search-filter-ribbon-popup.html',
    "<div class=\"popover switchon-ribbon-popover\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
    "    <div class=\"popover-content\">\n" +
    "        <div class=\"switchon-ribbon\">\n" +
    "            <div class=\"switchon-ribbon-panel last\">\n" +
    "                <div class=\"btn-group switchon-keywordgroup\" \n" +
    "                     dropdown \n" +
    "                     is-open=\"keywordFilters.isopen\">\n" +
    "                    <button type=\"button\" \n" +
    "                            class=\"btn btn-default dropdown-toggle\" \n" +
    "                            dropdown-toggle \n" +
    "                            ng-init=\"keywordFilters.keywordGroup = 'X-CUAHSI Keywords'\"\n" +
    "                            style=\"width:100%\">\n" +
    "                        {{keywordFilters.keywordGroup}}\n" +
    "                        <span class=\"caret\"></span>\n" +
    "                    </button>\n" +
    "                    <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                        <li>\n" +
    "                            <label class=\"btn\" \n" +
    "                                   ng-model=\"keywordFilters.keywordGroup\" \n" +
    "                                   btn-radio=\"'X-CUAHSI Keywords'\" \n" +
    "                                   ng-click=\"keywordFilters.isopen = !keywordFilters.isopen\"\n" +
    "                                   title=\"X-CUAHSI keywords build on a hierarchical keyword selection from the hydrologic ontology developed by CUAHSI, with additional hierarchical keywords for relevant non-hydrosphere data.\">\n" +
    "                                X-CUAHSI Keywords\n" +
    "                            </label>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <label class=\"btn\" ng-model=\"keywordFilters.keywordGroup\" \n" +
    "                                   btn-radio=\"'INSPIRE TOPIC Categories'\" \n" +
    "                                   ng-click=\"keywordFilters.isopen = !keywordFilters.isopen\"\n" +
    "                                   title=\"INSPIRE Topic Categories available in the SWITCH-ON Meta-Data Repository\">\n" +
    "                                INSPIRE TOPIC Categories\n" +
    "                            </label>\n" +
    "                        </li>\n" +
    "                        \n" +
    "                        <!--\n" +
    "                        <li>\n" +
    "                            <label class=\"btn\" \n" +
    "                                ng-model=\"keywordFilters.keywordGroup\" \n" +
    "                                btn-radio=\"'Keywords'\" \n" +
    "                                ng-click=\"keywordFilters.isopen = !keywordFilters.isopen\"\n" +
    "                                title=\"All Keywords available in the SWITCH-ON Meta-Data Repository\">\n" +
    "                                Keywords\n" +
    "                            </label>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <label class=\"btn\" \n" +
    "                                   ng-model=\"keywordFilters.keywordGroup\" \n" +
    "                                   btn-radio=\"'INSPIRE Keywords'\" \n" +
    "                                   ng-click=\"keywordFilters.isopen = !keywordFilters.isopen\">INSPIRE Keywords\n" +
    "                            </label>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <label class=\"btn\" \n" +
    "                                ng-model=\"keywordFilters.keywordGroup\" \n" +
    "                                btn-radio=\"'Free Keywords'\" \n" +
    "                                ng-click=\"keywordFilters.isopen = !keywordFilters.isopen\">\n" +
    "                                Free Keywords\n" +
    "                            </label>\n" +
    "                        </li>\n" +
    "                        -->\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "\n" +
    "                <keyword-filter ng-show=\"keywordFilters.keywordGroup === 'X-CUAHSI Keywords'\" \n" +
    "                                class=\"ng-hide\"\n" +
    "                                filter-expression=\"keywordsCuashiFilterExpression\" \n" +
    "                                keyword-group=\"keyword-x-cuahsi\"\n" +
    "                                multiple=\"true\"\n" +
    "                                title=\"X-CUAHSI keywords build on a hierarchical keyword selection from the hydrologic ontology developed by CUAHSI, with additional hierarchical keywords for relevant non-hydrosphere data.\">      \n" +
    "                </keyword-filter>\n" +
    "                <keyword-filter ng-show=\"keywordFilters.keywordGroup === 'INSPIRE TOPIC Categories'\" \n" +
    "                                class=\"ng-hide\"\n" +
    "                                filter-expression=\"topicFilterExpression\" \n" +
    "                                keyword-group=\"topic-inspire\"\n" +
    "                                multiple=\"false\"\n" +
    "                                title=\"INSPIRE Topic Categories available in the SWITCH-ON Meta-Data Repository\">\n" +
    "                </keyword-filter>\n" +
    "                <!--\n" +
    "                <keyword-filter ng-show=\"keywordFilters.keywordGroup === 'Keywords'\" \n" +
    "                                class=\"ng-hide\"\n" +
    "                                filter-expression=\"keywordsFilterExpression\" \n" +
    "                                keyword-group=\"keyword-all\"\n" +
    "                                multiple=\"true\">    \n" +
    "                </keyword-filter>\n" +
    "                <keyword-filter ng-show=\"keywordFilters.keywordGroup === 'INSPIRE Keywords'\" \n" +
    "                                class=\"ng-hide\"\n" +
    "                                filter-expression=\"keywordsFilterExpression\" \n" +
    "                                keyword-group=\"keyword-inspire\"\n" +
    "                                multiple=\"true\">\n" +
    "                </keyword-filter>\n" +
    "                <keyword-filter ng-show=\"keywordFilters.keywordGroup === 'Free Keywords'\" \n" +
    "                                class=\"ng-hide\"\n" +
    "                                filter-expression=\"keywordsFilterExpression\" \n" +
    "                                keyword-group=\"keyword-free\"\n" +
    "                                multiple=\"true\">        \n" +
    "                -->\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- FIXME: Date Filter Directive does not work properly in latest versions of \n" +
    "            Firefox and Internet Explorer. See https://github.com/switchonproject/sip-html5/issues/48 -->\n" +
    "<!--            <div class=\"switchon-ribbon-panel\">\n" +
    "                <date-filter from-date-filter-expression=\"fromDateFilterExpression\"\n" +
    "                             to-date-filter-expression=\"toDateFilterExpression\">\n" +
    "                </date-filter>\n" +
    "            </div>-->\n" +
    "\n" +
    "<!--            <div class=\"switchon-ribbon-panel\">\n" +
    "                <tabset>\n" +
    "                    <tab heading=\"Europe\">\n" +
    "                        <countries-filter \n" +
    "                            filter-expression=\"geoFilterExpression\" \n" +
    "                            country-group=\"country-europe\">\n" +
    "                        </countries-filter>\n" +
    "                    </tab>\n" +
    "                    <tab heading=\"World\">\n" +
    "                        <countries-filter \n" +
    "                            filter-expression=\"geoFilterExpression\" \n" +
    "                            country-group=\"country-world\">\n" +
    "                        </countries-filter>\n" +
    "                    </tab>\n" +
    "                </tabset>\n" +
    "            </div>-->\n" +
    "\n" +
    "            <!--\n" +
    "            <div class=\"switchon-ribbon-panel last\">\n" +
    "                <search-options geo-intersects-filter-expression=\"geoIntersectsFilterExpression\"\n" +
    "                                geo-buffer-filter-expression=\"geoBufferFilterExpression\"\n" +
    "                                limit-filter-expression=\"limitFilterExpression\">\n" +
    "                </search-options>\n" +
    "            </div>\n" +
    "            -->\n" +
    "\n" +
    "            <div class=\"switchon-ribbon-footer\">\n" +
    "                <span title=\"Close the Search Filter Dialog\"\n" +
    "                      aria-label=\"Close\"\n" +
    "                      name=\"closeButton\"\n" +
    "                      id=\"closeButton\"\n" +
    "                      class=\"btn btn-default\"\n" +
    "                      ng-click=\"$hide()\">\n" +
    "                    <span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "                </span>\n" +
    "                <span title=\"Clear all Search Filters\"\n" +
    "                      aria-label=\"Clear\"\n" +
    "                      name=\"clearButton\"\n" +
    "                      id=\"clearButton\"\n" +
    "                      class=\"btn btn-default\"\n" +
    "                      ng-disabled=\"((filterExpressions.enumeratedTags.length < 1)\n" +
    "                      && (!textFilterExpression.value || textFilterExpression.value.length < 3))\"\n" +
    "                      ng-click=\"clear()\">\n" +
    "                    <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "                </span>\n" +
    "                <span title=\"Search for resources\"\n" +
    "                      aria-label=\"Search\"\n" +
    "                      name=\"searchButton\"\n" +
    "                      id=\"searchButton\"\n" +
    "                      class=\"btn btn-primary\"\n" +
    "                      ng-disabled=\"((filterExpressions.enumeratedTags.length < 1)\n" +
    "                      && (!textFilterExpression.value || textFilterExpression.value.length < 3))\"\n" +
    "                      ng-click=\"$hide(); performSearch()(0, config.clearPostSearchFilters)\">\n" +
    "                    <span class=\"glyphicon glyphicon-search\"></span>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('templates/search-filter-tag-directive-template.html',
    "<span class=\"tag label\" \n" +
    "      ng-class=\"getTagStyle(tag.getType(), false, highlightNegated)\">\n" +
    "    <span ng-class=\"getTagIcon(tag.getType())\" title=\"{{tag.getTitle()}}\"></span>\n" +
    "    <span ng-if=\"!tag.isEditable()\">{{tag.getDisplayValue()}}</span>\n" +
    "    <span ng-if=\"tag.isEditable()\" \n" +
    "          bs-popover template=\"{{tag.getEditor()}}\"\n" +
    "          placement=\"bottom\"\n" +
    "          auto-close=\"1\">{{tag.getDisplayValue(data.editorValue)}}\n" +
    "    </span> \n" +
    "    <span ng-if=\"tag.getCardinality() > 0\"><small><em>({{tag.getCardinality()}})</em></small></span>\n" +
    "    <a ng-if=\"tag.isRemoveable(removeThreshold)\" title=\"delete\"><i ng-click=\"tag.remove()\" \n" +
    "          class=\"glyphicon glyphicon-remove\"></i>\n" +
    "    </a>\n" +
    "</span>"
  );


  $templateCache.put('templates/search-options-directive.html',
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">Options</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <form name=\"optionsForm\" id=\"optionsForm\" novalidate> \n" +
    "            <div class=\"form-group \">\n" +
    "                <label for=\"geoIntersectsOption\">Geospatial Search</label>\n" +
    "                <div class=\"form-inline\">\n" +
    "                    <div class=\"radio\" title=\"Find resources that intersect with the geospatial search area\">\n" +
    "                        <label>\n" +
    "                            <input name=\"geoIntersectsOption\" \n" +
    "                                   id=\"geoIntersectsOption\" \n" +
    "                                   type=\"radio\" \n" +
    "                                   ng-model=\"geoIntersectsFilterExpression.value\" \n" +
    "                                   value=\"true\"> Intersects\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                    <div class=\"radio\" title=\"Find resources that are enclosed in the geospatial search area\">\n" +
    "                        <label>\n" +
    "                            <input name=\"geoEnclosesOption\" \n" +
    "                                   id=\"geoEnclosesOption\" \n" +
    "                                   type=\"radio\" \n" +
    "                                   ng-model=\"geoIntersectsFilterExpression.value\" \n" +
    "                                   value=\"false\"> Encloses\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!--\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': optionsForm.geoBufferField.$invalid}\">\n" +
    "                 <input type=\"number\" class=\"form-control\" \n" +
    "                   min=\"0\" \n" +
    "                   max=\"1000000\" \n" +
    "                   ngMinlength=\"1\"\n" +
    "                   name=\"geoBufferField\" \n" +
    "                   id=\"geoBufferField\" \n" +
    "                   placeholder=\"buffer in meters\"\n" +
    "                   ng-model=\"geoBufferFilterExpression.value\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': optionsForm.limitField.$invalid}\">\n" +
    "                <div class=\"form-inline\" title=\"Maximum number of search results that are shown at once\">\n" +
    "                    <label for=\"limitField\">Max. Search Results</label>                    \n" +
    "                    <input type=\"number\" class=\"form-control\" \n" +
    "                           min=\"0\" \n" +
    "                           max=\"50\" \n" +
    "                           ngMinlength=\"1\"\n" +
    "                           name=\"limitField\" \n" +
    "                           id=\"limitField\" \n" +
    "                           ng-model=\"limitFilterExpression.value\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            -->\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/search-progress-modal-template.html',
    "<div class=\"modal-header\">\n" +
    "    <center><h4>Please wait, search is in progress.</h4></center>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <progressbar class=\"progress-striped active\" \n" +
    "                 max=\"200\" \n" +
    "                 value=\"status.current\" \n" +
    "                 type=\"{{status.type}}\">\n" +
    "    </progressbar>\n" +
    "    <span><i>{{status.message}}</i></span>\n" +
    " </div>\n" +
    "<div class=\"modal-footer\"><!-- empty --></div>"
  );


  $templateCache.put('templates/usb-directive.html',
    "<!--<div class=\"switchon-usb\">-->\n" +
    "    <form  class=\"navbar-form navbar-left\" \n" +
    "           name=\"universalSearchBox\" \n" +
    "           id=\"universalSearchBox\" \n" +
    "           role=\"search\"  \n" +
    "           novalidate >\n" +
    "        <div class=\"form-group\" \n" +
    "             ng-class=\"{'has-error': !universalSearchBox.filterExpressionInput.$error.required\n" +
    "                         && universalSearchBox.filterExpressionInput.$invalid}\" >\n" +
    "            \n" +
    "            <div class=\"form-control usb-form-control\">\n" +
    "                <div class=\"usb-tag-container\">\n" +
    "                    <span ng-repeat=\"tag in filterExpressions.enumeratedTags\"\n" +
    "                          search-filter-tag tag=\"tag\" highlight-negated=\"true\">\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"usb-input-container\">\n" +
    "                    <input class=\"switchon-usb-input\"\n" +
    "                        name=\"filterExpressionInput\" \n" +
    "                        id=\"filterExpressionInput\" \n" +
    "                        type=\"text\" \n" +
    "                        placeholder=\"Please enter a query\" \n" +
    "                        ng-model=\"textFilterExpression.value\" \n" +
    "                        required/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <button ng-click=\"performSearch()(0, config.clearPostSearchFilters)\" \n" +
    "                    ng-disabled=\"((filterExpressions.enumeratedTags.length === 0) \n" +
    "                        && (!textFilterExpression.value || textFilterExpression.value.length < 3))\" \n" +
    "                    class=\"btn btn-primary\">\n" +
    "                <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\n" +
    "            </button>\n" +
    "\n" +
    "<!--            <button ng-click=\"clear()\" class=\"btn btn-default\">Clear</button>-->\n" +
    "        </div>\n" +
    "\n" +
    "        <p class=\"help-block error\" \n" +
    "           ng-show=\"notificationFunction === undefined && !universalSearchBox.filterExpressionInput.$error.required\n" +
    "                        && universalSearchBox.filterExpressionInput.$invalid\">\n" +
    "            This filter expression is not valid. \n" +
    "            Try <strong>expression</strong><strong>:</strong><i>\"parameter\"</i>, e.g. keyword:\"water quality\".\n" +
    "        </p>\n" +
    "\n" +
    "        <p class=\"help-block info\" ng-show=\"notificationFunction === undefined &&\n" +
    "                        universalSearchBox.filterExpressionInput.$error.required\">\n" +
    "            Please enter a filter expression,  e.g. keyword:\"water quality\".\n" +
    "        </p>    \n" +
    "    </form>\n" +
    "<!--</div>-->"
  );

}]);
