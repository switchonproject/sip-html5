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
    "                ng-model=\"country\" ng-options=\"country for (country, geom) in countryList\" \r" +
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
    "                       ng-model=\"filterExpressions.fromDate\"\r" +
    "\n" +
    "                       />\r" +
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
    "                       placeholder=\"yyyy-MM-dd\" ng-model=\"filterExpressions.toDate\"/>\r" +
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


  $templateCache.put('templates/keyword-filter-directive.html',
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
    "        <select name=\"{{keywordGroup}}\" id=\"{{keywordGroup}}\" \r" +
    "\n" +
    "                ng-model=\"keyword\" ng-options=\"keyword for keyword in keywordList\" \r" +
    "\n" +
    "                class=\"form-control\" size=\"8\" multiple ></select>\r" +
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
    "        <td data-title=\"'Description'\" sortable=\"'object.description'\">{{node.object.description | txtLen:80:false:null:true}}</td>\r" +
    "\n" +
    "        <td data-title=\"'Start date'\" sortable=\"'object.fromdate'\" class=\"date\">{{node.object.fromdate | date: \"dd.MM.yyyy HH:mm:ss 'GMT'Z\"}}</td>\r" +
    "\n" +
    "        <td data-title=\"'End date'\" sortable=\"'object.todate'\" class=\"date\">{{node.object.todate | date: \"dd.MM.yyyy HH:mm:ss 'GMT'Z\"}}</td>\r" +
    "\n" +
    "        <td data-title=\"'Tools'\" class=\"tools\">\r" +
    "\n" +
    "            <!--<span bs-tooltip\r" +
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
    "            </span>-->\r" +
    "\n" +
    "            <span bs-tooltip\r" +
    "\n" +
    "                  data-placement=\"left\"\r" +
    "\n" +
    "                  data-trigger=\"hover\"\r" +
    "\n" +
    "                  data-delay=\"{show: 400, hide: 100}\"\r" +
    "\n" +
    "                  data-title=\"Show Download Link\"\r" +
    "\n" +
    "                  class=\"btn-invisible\"\r" +
    "\n" +
    "                  ng-click=\"showDownload(node.object)\">\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-download\"></i>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "            <!--<span bs-tooltip\r" +
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


  $templateCache.put('templates/my-profile-directive.html',
    "<div class=\"page-header\" style=\"text-align: center\">\r" +
    "\n" +
    "    <h1>You are: <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span> '{{user.name}}' <small> However, the profile page is yet to come</small></h1>\r" +
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
    "    <button class=\"btn btn-primary\" ng-click=\"closeDownloadView()\">OK</button>\r" +
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
    "    <button class=\"btn btn-primary\" ng-click=\"closeInfoView()\">OK</button>\r" +
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
    "        <ul class=\"pagination pagination-sm\">\r" +
    "\n" +
    "            <li ng-class=\"{disabled: !resultSet.$previous}\"><a href=\"#\" aria-label=\"Previous\" ng-click=\"alert();\"><span aria-hidden=\"true\">&laquo;</span></a></li>\r" +
    "\n" +
    "            <li ng-class=\"{disabled: resultSet.$next}\"><a href=\"#\" aria-label=\"Next\" ng-click=\"alert();\"><span aria-hidden=\"true\">&raquo;</span></a></li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <ul class=\"list-group\">\r" +
    "\n" +
    "        <li class=\"list-group-item\" ng-repeat=\"node in resultSet.$collection\">  \r" +
    "\n" +
    "            <span class=\"btn-link\" ng-click=\"alert();\">{{node.name}}</span>\r" +
    "\n" +
    "            <p><small>{{node.description}}</small></p>\r" +
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
    "        class=\" btn navbar-btn btn-link navbar-left\" \r" +
    "\n" +
    "        template=\"templates/search-filter-ribbon-popup.html\"\r" +
    "\n" +
    "        placement=\"bottom\"\r" +
    "\n" +
    "        auto-close=\"1\"\r" +
    "\n" +
    "        bs-popover>\r" +
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
    "                <tabset>\r" +
    "\n" +
    "                    <!--<tab heading=\"Topic Category\">\r" +
    "\n" +
    "                        <keyword-filter filter-expressions=\"filterExpressions\" \r" +
    "\n" +
    "                                        keyword-group=\"inspire_topic\"\r" +
    "\n" +
    "                                        keyword-parameter=\"topic\"></keyword-filter>\r" +
    "\n" +
    "                    </tab>-->\r" +
    "\n" +
    "                    <tab heading=\"CUASHI\">\r" +
    "\n" +
    "                        <keyword-filter filter-expressions=\"filterExpressions\" \r" +
    "\n" +
    "                                        keyword-group=\"cuashi_keyword\"\r" +
    "\n" +
    "                                        keyword-parameter=\"keyword\"></keyword-filter>\r" +
    "\n" +
    "                    </tab>\r" +
    "\n" +
    "                    <!--<tab heading=\"INSPIRE\">\r" +
    "\n" +
    "                        <keyword-filter filter-expressions=\"filterExpressions\" \r" +
    "\n" +
    "                                        keyword-group=\"inspire_keyword\"\r" +
    "\n" +
    "                                        keyword-parameter=\"keyword\"></keyword-filter>\r" +
    "\n" +
    "                    </tab>\r" +
    "\n" +
    "                    <tab heading=\"Open Keywords\">\r" +
    "\n" +
    "                        <keyword-filter filter-expressions=\"filterExpressions\" \r" +
    "\n" +
    "                                        keyword-group=\"keyword\"\r" +
    "\n" +
    "                                        keyword-parameter=\"keyword\"></keyword-filter>\r" +
    "\n" +
    "                    </tab>-->\r" +
    "\n" +
    "                </tabset>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            \r" +
    "\n" +
    "            <!--<div class=\"switchon-ribbon-panel\">\r" +
    "\n" +
    "                <date-filter filter-expressions=\"filterExpressions\"></date-filter>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"switchon-ribbon-panel last\">\r" +
    "\n" +
    "                <tabset>\r" +
    "\n" +
    "                    <tab heading=\"Europe\">\r" +
    "\n" +
    "                        <countries-filter filter-expressions=\"filterExpressions\" country-group=\"countries_europe\"></countries-filter>\r" +
    "\n" +
    "                    </tab>\r" +
    "\n" +
    "                    <tab heading=\"World\">\r" +
    "\n" +
    "                        <countries-filter filter-expressions=\"filterExpressions\" country-group=\"countries_world\"></countries-filter>\r" +
    "\n" +
    "                    </tab>\r" +
    "\n" +
    "                </tabset>\r" +
    "\n" +
    "            </div>-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"switchon-ribbon-footer\">\r" +
    "\n" +
    "                <span bs-tooltip\r" +
    "\n" +
    "                      data-placement=\"left\"\r" +
    "\n" +
    "                      data-trigger=\"hover\"\r" +
    "\n" +
    "                      data-delay=\"{show: 400, hide: 100}\"\r" +
    "\n" +
    "                      data-title=\"Clear\"\r" +
    "\n" +
    "                      class=\"btn-invisible btn-icon\"\r" +
    "\n" +
    "                      ng-click=\"clear()\">\r" +
    "\n" +
    "                    <i class=\"glyphicon glyphicon-remove-circle\"></i>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <span>Clear current search filters and options</span>\r" +
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


  $templateCache.put('templates/search-progress-modal-template.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <strong>Please wait, search is in progress.</strong>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    \r" +
    "\n" +
    "      \r" +
    "\n" +
    "\r" +
    "\n" +
    "            <progressbar class=\"progress-striped active\" \r" +
    "\n" +
    "                         max=\"200\" \r" +
    "\n" +
    "                         value=\"status.current+100\" \r" +
    "\n" +
    "                         type=\"{{status.type}}\">\r" +
    "\n" +
    "            </progressbar>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "    \r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/usb-directive.html',
    "<form  class=\"navbar-form navbar-left\" \r" +
    "\n" +
    "       name=\"universalSearchBox\" \r" +
    "\n" +
    "       id=\"universalSearchBox\" \r" +
    "\n" +
    "       role=\"search\"  \r" +
    "\n" +
    "       novalidate >\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"form-group\" \r" +
    "\n" +
    "         ng-class=\"{'has-error': !universalSearchBox.filterExpressionInput.$error.required\r" +
    "\n" +
    "                     && universalSearchBox.filterExpressionInput.$invalid}\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <input class=\"form-control\" \r" +
    "\n" +
    "               name=\"filterExpressionInput\" \r" +
    "\n" +
    "               id=\"filterExpressionInput\" \r" +
    "\n" +
    "               type=\"text\" \r" +
    "\n" +
    "               size=\"60\" placeholder=\"keyword:\" \r" +
    "\n" +
    "               ng-model=\"filterExpressions.universalSearchString\" \r" +
    "\n" +
    "               ng-pattern=\"pattern\" required/>\r" +
    "\n" +
    "        <!--<input class=\"static\" type=\"text\" placeholder=\"keyword:\" value=\"{{info}}\"/>-->\r" +
    "\n" +
    "        <button ng-click=\"performSearch(universalSearchBox)\" ng-disabled=\"universalSearchBox.filterExpressionInput.$error.required\r" +
    "\n" +
    "                    || universalSearchBox.filterExpressionInput.$invalid\" class=\"btn btn-primary\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <p class=\"help-block error\" ng-show=\"notificationFunction === undefined && !universalSearchBox.filterExpressionInput.$error.required\r" +
    "\n" +
    "                    && universalSearchBox.filterExpressionInput.$invalid\">\r" +
    "\n" +
    "        This filter expression is not valid. \r" +
    "\n" +
    "        Try <strong>expression</strong><strong>:</strong><i>\"parameter\"</i>, e.g. keyword:\"water quality\".\r" +
    "\n" +
    "    </p>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <p class=\"help-block info\" ng-show=\"notificationFunction === undefined &&\r" +
    "\n" +
    "                    universalSearchBox.filterExpressionInput.$error.required\">\r" +
    "\n" +
    "        Please enter a filter expression,  e.g. keyword:\"water quality\".\r" +
    "\n" +
    "    </p>    \r" +
    "\n" +
    "</form>"
  );

}]);
