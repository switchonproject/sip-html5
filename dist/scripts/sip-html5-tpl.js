angular.module('').run(['$templateCache', function($templateCache) {
  'use strict';

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
    "        <form name=\"geoBufferForm\" id=\"geoForm\" novalidate> \r" +
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
    "        <select name=\"{{keywordGroup}}\" id=\"{{keywordGroup}}\" \r" +
    "\n" +
    "                ng-model=\"filterExpression.value\" ng-options=\"keyword for keyword in keywordList\" \r" +
    "\n" +
    "                class=\"form-control\" size=\"11\" multiple ></select>\r" +
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
    "                       id=\"geoBufferField\" \r" +
    "\n" +
    "                       placeholder=\"limit\"\r" +
    "\n" +
    "                       ng-model=\"data.editorValue\">\r" +
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
    "        <td data-title=\"'Name'\" sortable=\"'object.name'\" class=\"name\">{{node.object.name}}</td>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <td data-title=\"'Description'\">\r" +
    "\n" +
    "            <span>{{node.object.description | txtLen:80:false:'':true}}</span>\r" +
    "\n" +
    "            <span ng-hide=\"node.object.description.length < 80\"><a ng-click=\"showInfo(node.object)\">...</a></span>\r" +
    "\n" +
    "        </td>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <td data-title=\"'Temporal Extent'\" sortable=\"'object.fromdate'\" class=\"date\">\r" +
    "\n" +
    "            {{node.object.fromdate| date: \"dd.MM.yyyy\"}} - \r" +
    "\n" +
    "            {{node.object.todate| date: \"dd.MM.yyyy\"}}\r" +
    "\n" +
    "        </td>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <td data-title=\"'Keywords'\" class=\"tags\">\r" +
    "\n" +
    "            <span ng-repeat=\"tag in node.object.tags | orderBy:'name'\">\r" +
    "\n" +
    "                <span ng-hide=\"config.filterKeyword && !(tag.taggroup.name === config.filterKeyword)\" \r" +
    "\n" +
    "                      class=\"label\" ng-class=\"isHighlightKeyword(config.highlightKeyword, tag.name) ? 'label-success' : 'label-default'\">{{tag.name}}</span>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "        </td>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <td data-title=\"'Tools'\" class=\"tools\">\r" +
    "\n" +
    "            <span bs-tooltip\r" +
    "\n" +
    "                  data-placement=\"left\"\r" +
    "\n" +
    "                  data-trigger=\"hover\"\r" +
    "\n" +
    "                  data-delay=\"{show: 400, hide: 100}\"\r" +
    "\n" +
    "                  data-title=\"Info\"\r" +
    "\n" +
    "                  class=\"btn-invisible btn-icon\"\r" +
    "\n" +
    "                  ng-click=\"showInfo(node.object)\">\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-info-sign\"></i>\r" +
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
    "                  data-title=\"Download\"\r" +
    "\n" +
    "                  class=\"btn-invisible\"\r" +
    "\n" +
    "                  ng-click=\"showDownload(node.object)\">\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-download\"></i>\r" +
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
    "    <leaflet id=\"mainmap\" defaults=\"defaults\" center=\"center\" width=\"{{currentWidth}}\" height=\"{{currentHeight}}\"></leaflet>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
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
    "<div class=\"btn-group nav navbar-nav navbar-right\" dropdown is-open=\"status.isopen\">\r" +
    "\n" +
    "    <button ng-disabled=\"true\" class=\"btn btn-xs navbar-btn dropdown-toggle ws-button\" \r" +
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


  $templateCache.put('templates/object-download-modal-template.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <h3 class=\"modal-title\">Downloads of {{object.name}}</h3>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <div class=\"container-fluid\">\r" +
    "\n" +
    "        <accordion close-others=\"false\">\r" +
    "\n" +
    "            <accordion-group ng-repeat=\"rep in reps\" is-open=\"rep._status.open\">\r" +
    "\n" +
    "                <accordion-heading>\r" +
    "\n" +
    "                    {{rep.name}} <i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': rep._status.open, 'glyphicon-chevron-right': !rep._status.open}\"></i> \r" +
    "\n" +
    "                </accordion-heading>\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-lg-3\">\r" +
    "\n" +
    "                        <label>Temporal resolution:</label>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"col-lg-9\">\r" +
    "\n" +
    "                        {{rep.temporalresolution || 'n/a'}}\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-lg-3\">\r" +
    "\n" +
    "                        <label>Spatial resolution:</label>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"col-lg-9\">\r" +
    "\n" +
    "                        {{rep.spatialresolution || 'n/a'}}\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-lg-3\">\r" +
    "\n" +
    "                        <label>Spatial scale:</label>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"col-lg-9\">\r" +
    "\n" +
    "                        {{rep.spatialscale || 'n/a'}}\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-lg-3\">\r" +
    "\n" +
    "                        <label>Mime type:</label>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"col-lg-9\">\r" +
    "\n" +
    "                        {{rep.contenttype.name || 'n/a'}}\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-lg-3\">\r" +
    "\n" +
    "                        <label>Data access function:</label>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"col-lg-9\">\r" +
    "\n" +
    "                        {{rep.function.name || 'n/a'}}\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-lg-3\">\r" +
    "\n" +
    "                        <label>Data access link:</label>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"col-lg-9\">\r" +
    "\n" +
    "                        <a href=\"{{rep.contentlocation}}\" ng-disabled=\"!rep.contentlocation\">{{rep.contentlocation || 'n/a'}}</a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </accordion-group>\r" +
    "\n" +
    "        </accordion>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "    <span bs-tooltip\r" +
    "\n" +
    "          data-placement=\"top\"\r" +
    "\n" +
    "          data-trigger=\"hover\"\r" +
    "\n" +
    "          data-delay=\"{show: 400, hide: 100}\"\r" +
    "\n" +
    "          data-title=\"Close Dialog\"\r" +
    "\n" +
    "          aria-label=\"Close\"\r" +
    "\n" +
    "          name=\"clearButton\"\r" +
    "\n" +
    "          id=\"clear-button\"\r" +
    "\n" +
    "          class=\"btn btn-default\"\r" +
    "\n" +
    "          ng-click=\"closeDownloadView()\">\r" +
    "\n" +
    "        <span class=\"glyphicon glyphicon-remove\"></span>\r" +
    "\n" +
    "    </span>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/object-info-modal-template.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <h3 class=\"modal-title\">Object info of {{object.name}}</h3>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <div class=\"container-fluid\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\">\r" +
    "\n" +
    "                <label>Name:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{object.name}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\">\r" +
    "\n" +
    "                <label>Description:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{object.description}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\">\r" +
    "\n" +
    "                <label>Keywords:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                <span ng-repeat=\"tag in object.tags\">\r" +
    "\n" +
    "                    <span class=\"label label-primary\">{{tag.name}}</span>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\">\r" +
    "\n" +
    "                <label>Topic:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{object.topiccategory.name ? object.topiccategory.name : '[none]'}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\">\r" +
    "\n" +
    "                <label>Point of Contact:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{object.contact.name ? object.contact.name : '[none]'}} ({{object.contact.organisation ? object.contact.organisation : 'no organisation'}})\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\">\r" +
    "\n" +
    "                <label>Time Range:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{object.fromdate | date: \"dd.MM.yyyy HH:mm:ss 'GMT'Z\"}} - {{object.todate | date: \"dd.MM.yyyy HH:mm:ss 'GMT'Z\"}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\">\r" +
    "\n" +
    "                <label>Last modification:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{object.lastmodificationdate | date: \"dd.MM.yyyy HH:mm:ss 'GMT'Z\"}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\">\r" +
    "\n" +
    "                <label>Access limitations:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{object.accesslimitations.name ? object.accesslimitations.name : 'unknown'}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-3\">\r" +
    "\n" +
    "                <label>License:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9\">\r" +
    "\n" +
    "                {{object.licensestatement ? object.licensestatement : 'unknown'}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "    <span bs-tooltip\r" +
    "\n" +
    "          data-placement=\"top\"\r" +
    "\n" +
    "          data-trigger=\"hover\"\r" +
    "\n" +
    "          data-delay=\"{show: 400, hide: 100}\"\r" +
    "\n" +
    "          data-title=\"Close Dialog\"\r" +
    "\n" +
    "          aria-label=\"Close\"\r" +
    "\n" +
    "          name=\"clearButton\"\r" +
    "\n" +
    "          id=\"clear-button\"\r" +
    "\n" +
    "          class=\"btn btn btn-default\"\r" +
    "\n" +
    "          ng-click=\"closeInfoView()\">\r" +
    "\n" +
    "        <span class=\"glyphicon glyphicon-remove\"></span>\r" +
    "\n" +
    "    </span>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/resultset-directive.html',
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"container nowrap\"> \r" +
    "\n" +
    "        <strong>Resources</strong> ({{resultSet.$total}})\r" +
    "\n" +
    "<!--        <ul class=\"pagination pagination-sm\">\r" +
    "\n" +
    "            <li ng-class=\"{disabled: !resultSet.$previous}\"><a href=\"#\" aria-label=\"Previous\" ng-click=\"alert();\"><span aria-hidden=\"true\">&laquo;</span></a></li>\r" +
    "\n" +
    "            <li ng-class=\"{disabled: resultSet.$next}\"><a href=\"#\" aria-label=\"Next\" ng-click=\"alert();\"><span aria-hidden=\"true\">&raquo;</span></a></li>\r" +
    "\n" +
    "        </ul>-->\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <ul class=\"list-group\">\r" +
    "\n" +
    "        <li class=\"list-group-item\" ng-repeat=\"node in resultSet.$collection\">  \r" +
    "\n" +
    "            <span class=\"btn-link\" ng-click=\"$parent.selectedObject = $index\">{{node.name}}</span>\r" +
    "\n" +
    "            <p style=\"line-height: normal;\"><small><small>{{node.object.description | txtLen:80:false:'...':true}}</small></small></p>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n"
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
    "            <div class=\"switchon-ribbon-panel\">\r" +
    "\n" +
    "                <div class=\"btn-group switchon-keywordgroup\" dropdown is-open=\"keywordFilters.isopen\">\r" +
    "\n" +
    "                    <button type=\"button\" \r" +
    "\n" +
    "                            class=\"btn btn-default dropdown-toggle\" \r" +
    "\n" +
    "                            dropdown-toggle \r" +
    "\n" +
    "                            ng-init=\"keywordFilters.keywordGroup = 'Free Keywords'\"\r" +
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
    "                            <label class=\"btn btn-invisible\" \r" +
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
    "                        <li>\r" +
    "\n" +
    "                            <label class=\"btn btn-invisible\" ng-model=\"keywordFilters.keywordGroup\" \r" +
    "\n" +
    "                                   btn-radio=\"'TOPIC Categories'\" \r" +
    "\n" +
    "                                   ng-click=\"keywordFilters.isopen = !keywordFilters.isopen\">\r" +
    "\n" +
    "                                TOPIC Categories\r" +
    "\n" +
    "                            </label>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <label class=\"btn btn-invisible\" \r" +
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
    "                            <label class=\"btn btn-invisible\" \r" +
    "\n" +
    "                                   ng-disabled=\"true\"\r" +
    "\n" +
    "                                   ng-model=\"keywordFilters.keywordGroup\" \r" +
    "\n" +
    "                                   btn-radio=\"'CUAHSI Keywords'\" \r" +
    "\n" +
    "                                   ng-click=\"keywordFilters.isopen = !keywordFilters.isopen\">\r" +
    "\n" +
    "                                CUAHSI Keywords\r" +
    "\n" +
    "                            </label>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                    </ul>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <keyword-filter ng-show=\"keywordFilters.keywordGroup === 'TOPIC Categories'\" \r" +
    "\n" +
    "                                class=\"ng-hide\"\r" +
    "\n" +
    "                                filter-expression=\"topicFilterExpression\" \r" +
    "\n" +
    "                                keyword-group=\"topic-inspire\">\r" +
    "\n" +
    "                </keyword-filter>\r" +
    "\n" +
    "                <keyword-filter ng-show=\"keywordFilters.keywordGroup === 'CUAHSI Keywords'\" \r" +
    "\n" +
    "                                class=\"ng-hide\"\r" +
    "\n" +
    "                                filter-expression=\"keywordsCuashiFilterExpression\" \r" +
    "\n" +
    "                                keyword-group=\"keyword-cuahsi\">      \r" +
    "\n" +
    "                </keyword-filter>\r" +
    "\n" +
    "                <keyword-filter ng-show=\"keywordFilters.keywordGroup === 'INSPIRE Keywords'\" \r" +
    "\n" +
    "                                class=\"ng-hide\"\r" +
    "\n" +
    "                                filter-expression=\"keywordsFilterExpression\" \r" +
    "\n" +
    "                                keyword-group=\"keyword-inspire\">\r" +
    "\n" +
    "                </keyword-filter>\r" +
    "\n" +
    "                <keyword-filter ng-show=\"keywordFilters.keywordGroup === 'Free Keywords'\" \r" +
    "\n" +
    "                                class=\"ng-hide\"\r" +
    "\n" +
    "                                filter-expression=\"keywordsFilterExpression\" \r" +
    "\n" +
    "                                keyword-group=\"keyword-free\">        \r" +
    "\n" +
    "                </keyword-filter>\r" +
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
    "\r" +
    "\n" +
    "            <div class=\"switchon-ribbon-footer\">\r" +
    "\n" +
    "                <span bs-tooltip\r" +
    "\n" +
    "                      data-placement=\"top\"\r" +
    "\n" +
    "                      data-trigger=\"hover\"\r" +
    "\n" +
    "                      data-delay=\"{show: 400, hide: 100}\"\r" +
    "\n" +
    "                      data-title=\"Close the Search Filter Dialog\"\r" +
    "\n" +
    "                      aria-label=\"Close\"\r" +
    "\n" +
    "                      name=\"closeButton\"\r" +
    "\n" +
    "                      id=\"close-button\"\r" +
    "\n" +
    "                      class=\"btn btn-default\"\r" +
    "\n" +
    "                      ng-click=\"$hide()\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-remove\"></span>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <span bs-tooltip\r" +
    "\n" +
    "                      data-placement=\"top\"\r" +
    "\n" +
    "                      data-trigger=\"hover\"\r" +
    "\n" +
    "                      data-delay=\"{show: 400, hide: 100}\"\r" +
    "\n" +
    "                      data-title=\"Clear all Search Filters\"\r" +
    "\n" +
    "                      aria-label=\"Clear\"\r" +
    "\n" +
    "                      name=\"clearButton\"\r" +
    "\n" +
    "                      id=\"clear-button\"\r" +
    "\n" +
    "                      class=\"btn btn-default\"\r" +
    "\n" +
    "                      ng-disabled=\"filterExpressions.enumeratedTags.length < 1\"\r" +
    "\n" +
    "                      ng-click=\"clear()\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-trash\"></span>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <span bs-tooltip\r" +
    "\n" +
    "                      data-placement=\"top\"\r" +
    "\n" +
    "                      data-trigger=\"hover\"\r" +
    "\n" +
    "                      data-delay=\"{show: 400, hide: 100}\"\r" +
    "\n" +
    "                      data-title=\"Search for resources\"\r" +
    "\n" +
    "                      aria-label=\"Clear\"\r" +
    "\n" +
    "                      name=\"clearButton\"\r" +
    "\n" +
    "                      id=\"clear-botton\"\r" +
    "\n" +
    "                      class=\"btn btn-primary\"\r" +
    "\n" +
    "                      ng-disabled=\"((filterExpressions.enumeratedTags.length < 1)\r" +
    "\n" +
    "                      && (!textFilterExpression.value || textFilterExpression.value.length < 3))\"\r" +
    "\n" +
    "                      ng-click=\"$hide(); performSearch()\">\r" +
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
    "      ng-class=\"getTagStyle(tag.type)\">\r" +
    "\n" +
    "    <span ng-class=\"getTagIcon(tag.type)\"></span>\r" +
    "\n" +
    "    <span ng-if=\"!tag.origin.isEditable()\">{{tag.name}}</span>\r" +
    "\n" +
    "    <span ng-if=\"tag.origin.isEditable()\" \r" +
    "\n" +
    "          bs-popover template=\"{{tag.origin.editor}}\"\r" +
    "\n" +
    "          placement=\"bottom\"\r" +
    "\n" +
    "          auto-close=\"1\">{{tag.origin.getDisplayValue(data.editorValue)}}</span>\r" +
    "\n" +
    "    <a><i ng-click=\"tag.remove()\" class=\"glyphicon glyphicon-remove\"></i></a>\r" +
    "\n" +
    "</span>"
  );


  $templateCache.put('templates/search-options-directive.html',
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\">Filter Options</div>\r" +
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
    "                    <div class=\"radio\">\r" +
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
    "                    <div class=\"radio\">\r" +
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
    "                <label for=\"limitField\">Limit Search Results</label>                    \r" +
    "\n" +
    "                <input type=\"number\" class=\"form-control\" \r" +
    "\n" +
    "                       min=\"0\" \r" +
    "\n" +
    "                       max=\"25\" \r" +
    "\n" +
    "                       ngMinlength=\"1\"\r" +
    "\n" +
    "                       name=\"limitField\" \r" +
    "\n" +
    "                       id=\"limitField\" \r" +
    "\n" +
    "                       placeholder=\"# of results\"\r" +
    "\n" +
    "                       ng-model=\"limitFilterExpression.value\">\r" +
    "\n" +
    "            </div>\r" +
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
    "    <span ng-show=\"status.current < 100\"><i>Searching for Resources in the Meta-Data Repository.</i></span>\r" +
    "\n" +
    "    <span ng-show=\"status.current > 100\"><i>Collecting meta-data of resource #{{status.objects}} of {{status.max}}</i></span>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\"></div>\r" +
    "\n"
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
    "                          search-filter-tag tag=\"tag\">\r" +
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
    "            <button ng-click=\"performSearch()\" \r" +
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

}]);
