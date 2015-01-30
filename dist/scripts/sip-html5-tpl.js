angular.module('').run(['$templateCache', function($templateCache) {
  'use strict';

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
    "                       ng-model=\"filterExpressions.fromDate\"\n" +
    "                       />\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"toDateField\">End Date: </label>\n" +
    "                <input class=\"form-control\" name=\"toDateField\" id=\"toDateField\" type=\"date\" \n" +
    "                       placeholder=\"yyyy-MM-dd\" ng-model=\"filterExpressions.toDate\"/>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/keyword-filter-directive.html',
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-body\">\n" +
    "        <!--<input type=\"text\" ng-model=\"keyword\" \n" +
    "               typeahead=\"keyword for keyword in keywordList | filter:$viewValue | limitTo:8\" \n" +
    "               typeahead-editable=\"false\"\n" +
    "               class=\"form-control\">-->\n" +
    "        <select name=\"{{keywordGroup}}\" id=\"{{keywordGroup}}\" \n" +
    "                ng-model=\"keyword\" ng-options=\"keyword for keyword in keywordList\" \n" +
    "                class=\"form-control\" size=\"8\" multiple ></select>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/list-view-directive.html',
    "<table ng-table=\"tableParams\" class=\"table table-striped table-bordered table-hover\">\n" +
    "    <tr ng-repeat=\"node in $data\">\n" +
    "        <td data-title=\"'Name'\" sortable=\"'object.name'\" class=\"name\">{{node.object.name}}</td>\n" +
    "        <td data-title=\"'Description'\" sortable=\"'object.description'\">{{node.object.description | txtLen:80:false:null:true}}</td>\n" +
    "        <td data-title=\"'Start date'\" sortable=\"'object.fromdate'\" class=\"date\">{{node.object.fromdate | date: \"dd.MM.yyyy HH:mm:ss 'GMT'Z\"}}</td>\n" +
    "        <td data-title=\"'End date'\" sortable=\"'object.todate'\" class=\"date\">{{node.object.todate | date: \"dd.MM.yyyy HH:mm:ss 'GMT'Z\"}}</td>\n" +
    "        <td data-title=\"'Tools'\" class=\"tools\">\n" +
    "            <span popover=\"Info\"\n" +
    "                  popover-trigger=\"mouseenter\"\n" +
    "                  popover-placement=\"left\"\n" +
    "                  class=\"btn-invisible btn-icon\"\n" +
    "                  ng-click=\"showInfo(node.object)\" >\n" +
    "                <i class=\"glyphicon glyphicon-info-sign\"></i>\n" +
    "            </span>\n" +
    "            <span popover=\"Download\" \n" +
    "                  popover-trigger=\"mouseenter\"\n" +
    "                  popover-placement=\"left\"\n" +
    "                  class=\"btn-invisible\"\n" +
    "                  ng-click=\"showDownload(node.object)\">\n" +
    "                <i class=\"glyphicon glyphicon-download\"></i>\n" +
    "            </span>\n" +
    "            <span popover=\"Bookmark\" \n" +
    "                  popover-trigger=\"mouseenter\"\n" +
    "                  popover-placement=\"left\"\n" +
    "                  class=\"btn-invisible btn-icon disabled\"\n" +
    "                  ng-click=\"\" >\n" +
    "                <i class=\"glyphicon glyphicon-bookmark\"></i>\n" +
    "            </span>\n" +
    "            <span popover=\"Share\" \n" +
    "                  popover-trigger=\"mouseenter\"\n" +
    "                  popover-placement=\"left\"\n" +
    "                  class=\"btn-invisible btn-icon disabled\" \n" +
    "                  ng-click=\"\" >\n" +
    "                <i class=\"glyphicon glyphicon-share\"></i>\n" +
    "            </span>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "</table>\n"
  );


  $templateCache.put('templates/my-profile-directive.html',
    "<div class=\"page-header\" style=\"text-align: center\">\n" +
    "    <h1>You are: <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span> '{{user.name}}' <small> However, the profile page is yet to come</small></h1>\n" +
    "</div>"
  );


  $templateCache.put('templates/my-workspace-directive.html',
    "<div class=\"btn-group nav navbar-nav navbar-right\" dropdown is-open=\"status.isopen\"\n" +
    "     ng-mouseenter=\"popup(true)\"\n" +
    "     ng-mouseleave=\"popup(false)\">\n" +
    "    <button class=\"btn btn-xs navbar-btn dropdown-toggle ws-button\" \n" +
    "            data-toggle=\"dropdown\"\n" +
    "            role=\"button\"\n" +
    "            type=\"button\"\n" +
    "            aria-expanded=\"false\"\n" +
    "            ng-click=\"showProfile()\">\n" +
    "        <div>Hello {{user.name}}</div>\n" +
    "        <b>My {{workspaceName}} <span class=\"caret\"></span></b>\n" +
    "    </button>\n" +
    "    <ul class=\"dropdown-menu hoverdropdown\" role=\"menu\">\n" +
    "        <li>\n" +
    "            <a ui-sref=\"profile\">My profile</a>\n" +
    "        </li>\n" +
    "        <li class=\"divider\"></li>\n" +
    "        <li>\n" +
    "            <a ui-sref=\"login\" ng-show=\"sessionService.isAnonymousUser(user)\">Log in</a>\n" +
    "            <a ui-sref=\"login\" ng-hide=\"sessionService.isAnonymousUser(user)\">Not {{user.name}}? Log out</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>"
  );


  $templateCache.put('templates/object-download-modal-template.html',
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">Downloads of {{object.name}}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <accordion close-others=\"false\">\n" +
    "            <accordion-group ng-repeat=\"rep in reps\" is-open=\"rep._status.open\">\n" +
    "                <accordion-heading>\n" +
    "                    {{rep.name}} <i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': rep._status.open, 'glyphicon-chevron-right': !rep._status.open}\"></i> \n" +
    "                </accordion-heading>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-lg-3\">\n" +
    "                        <label>Temporal resolution:</label>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-lg-9\">\n" +
    "                        {{rep.temporalresolution || 'n/a'}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-lg-3\">\n" +
    "                        <label>Spatial resolution:</label>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-lg-9\">\n" +
    "                        {{rep.spatialresolution || 'n/a'}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-lg-3\">\n" +
    "                        <label>Spatial scale:</label>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-lg-9\">\n" +
    "                        {{rep.spatialscale || 'n/a'}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-lg-3\">\n" +
    "                        <label>Mime type:</label>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-lg-9\">\n" +
    "                        {{rep.contenttype.name || 'n/a'}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-lg-3\">\n" +
    "                        <label>Data access function:</label>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-lg-9\">\n" +
    "                        {{rep.function.name || 'n/a'}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-lg-3\">\n" +
    "                        <label>Data access link:</label>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-lg-9\">\n" +
    "                        <a href=\"{{rep.contentlocation}}\" ng-disabled=\"!rep.contentlocation\">{{rep.contentlocation || 'n/a'}}</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </accordion-group>\n" +
    "        </accordion>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"closeDownloadView()\">OK</button>\n" +
    "</div>"
  );


  $templateCache.put('templates/object-info-modal-template.html',
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">Object info of {{object.name}}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-3\">\n" +
    "                <label>Name:</label>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-9\">\n" +
    "                {{object.name}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-3\">\n" +
    "                <label>Description:</label>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-9\">\n" +
    "                {{object.description}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-3\">\n" +
    "                <label>Keywords:</label>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-9\">\n" +
    "                <span ng-repeat=\"tag in object.tags\">\n" +
    "                    <span class=\"label label-primary\">{{tag.name}}</span>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-3\">\n" +
    "                <label>Topic:</label>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-9\">\n" +
    "                {{object.topiccategory.name ? object.topiccategory.name : '[none]'}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-3\">\n" +
    "                <label>Point of Contact:</label>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-9\">\n" +
    "                {{object.contact.name ? object.contact.name : '[none]'}} ({{object.contact.organisation ? object.contact.organisation : 'no organisation'}})\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-3\">\n" +
    "                <label>Time Range:</label>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-9\">\n" +
    "                {{object.fromdate | date: \"dd.MM.yyyy HH:mm:ss 'GMT'Z\"}} - {{object.todate | date: \"dd.MM.yyyy HH:mm:ss 'GMT'Z\"}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-3\">\n" +
    "                <label>Last modification:</label>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-9\">\n" +
    "                {{object.lastmodificationdate | date: \"dd.MM.yyyy HH:mm:ss 'GMT'Z\"}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-3\">\n" +
    "                <label>Access limitations:</label>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-9\">\n" +
    "                {{object.accesslimitations.name ? object.accesslimitations.name : 'unknown'}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-3\">\n" +
    "                <label>License:</label>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-9\">\n" +
    "                {{object.licensestatement ? object.licensestatement : 'unknown'}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"closeInfoView()\">OK</button>\n" +
    "</div>"
  );


  $templateCache.put('templates/resultset-directive.html',
    "<div class=\"panel panel-default\">\n" +
    "\n" +
    "    <div class=\"container nowrap\"> \n" +
    "        <strong>Resources</strong> ({{resultSet.$total}})\n" +
    "        <ul class=\"pagination pagination-sm\">\n" +
    "            <li ng-class=\"{disabled: !resultSet.$previous}\"><a href=\"#\" aria-label=\"Previous\" ng-click=\"alert();\"><span aria-hidden=\"true\">&laquo;</span></a></li>\n" +
    "            <li ng-class=\"{disabled: resultSet.$next}\"><a href=\"#\" aria-label=\"Next\" ng-click=\"alert();\"><span aria-hidden=\"true\">&raquo;</span></a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"list-group\">\n" +
    "        <li class=\"list-group-item\" ng-repeat=\"node in resultSet.$collection\">  \n" +
    "            <span class=\"btn-link\" ng-click=\"alert();\">{{node.name}}</span>\n" +
    "            <p><small>{{node.description}}</small></p>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('templates/search-filter-ribbon-directive.html',
    "<button type=\"button\" id=\"search-filter-directive-button\" \n" +
    "        class=\"btn btn-default navbar-btn navbar-left\" \n" +
    "        template=\"templates/search-filter-ribbon-popup.html\"\n" +
    "        placement=\"bottom\"\n" +
    "        target=\"#universalSearchBox\"\n" +
    "        bs-popover>\n" +
    "    Search Filter <span class=\"caret\"></span>\n" +
    "</button>\n"
  );


  $templateCache.put('templates/search-filter-ribbon-popup.html',
    "<div class=\"popover switchon-ribbon-popover\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
    "    <div class=\"popover-content\">\n" +
    "        <div class=\"switchon-ribbon\">\n" +
    "            <div class=\"switchon-ribbon-panel\">\n" +
    "                <date-filter filter-expressions=\"filterExpressions\"></date-filter>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"switchon-ribbon-panel\">\n" +
    "                <tabset>\n" +
    "                    <tab heading=\"CUASHI\">\n" +
    "                       <keyword-filter filter-expressions=\"filterExpressions\" keyword-group=\"cuashi_keyword\"></keyword-filter>\n" +
    "                    </tab>\n" +
    "                    <tab heading=\"INSPIRE\">\n" +
    "                       <keyword-filter filter-expressions=\"filterExpressions\" keyword-group=\"inspire_keyword\"></keyword-filter>\n" +
    "                    </tab>\n" +
    "                    <tab heading=\"Topics\">\n" +
    "                       <keyword-filter filter-expressions=\"filterExpressions\" keyword-group=\"inspire_topic\"></keyword-filter>\n" +
    "                    </tab>\n" +
    "                    <tab heading=\"Keywords\">\n" +
    "                       <keyword-filter filter-expressions=\"filterExpressions\" keyword-group=\"keyword\"></keyword-filter>\n" +
    "                    </tab>\n" +
    "                </tabset>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('templates/usb-directive.html',
    "<form  class=\"navbar-form navbar-left\" \n" +
    "       name=\"universalSearchBox\" \n" +
    "       id=\"universalSearchBox\" \n" +
    "       role=\"search\"  \n" +
    "       novalidate >\n" +
    "\n" +
    "    <div class=\"form-group\" \n" +
    "         ng-class=\"{'has-error': !universalSearchBox.filterExpressionInput.$error.required\n" +
    "                     && universalSearchBox.filterExpressionInput.$invalid}\">\n" +
    "\n" +
    "        <input class=\"form-control\" \n" +
    "               name=\"filterExpressionInput\" \n" +
    "               id=\"filterExpressionInput\" \n" +
    "               type=\"text\" \n" +
    "               size=\"60\" placeholder=\"keyword:\" \n" +
    "               ng-model=\"filterExpressions.universalSearchString\" \n" +
    "               ng-pattern=\"pattern\" required/>\n" +
    "        <!--<input class=\"static\" type=\"text\" placeholder=\"keyword:\" value=\"{{info}}\"/>-->\n" +
    "        <button ng-click=\"performSearch(universalSearchBox)\" ng-disabled=\"universalSearchBox.filterExpressionInput.$error.required\n" +
    "                    || universalSearchBox.filterExpressionInput.$invalid\" class=\"btn btn-primary\">\n" +
    "            <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\n" +
    "        </button>\n" +
    "\n" +
    "        <button ng-click=\"clear()\" class=\"btn btn-default\">Clear</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <p class=\"help-block error\" ng-show=\"notificationFunction === undefined && !universalSearchBox.filterExpressionInput.$error.required\n" +
    "                    && universalSearchBox.filterExpressionInput.$invalid\">\n" +
    "        This filter expression is not valid. \n" +
    "        Try <strong>expression</strong><strong>:</strong><i>\"parameter\"</i>, e.g. keyword:\"water quality\".\n" +
    "    </p>\n" +
    "\n" +
    "    <p class=\"help-block info\" ng-show=\"notificationFunction === undefined &&\n" +
    "                    universalSearchBox.filterExpressionInput.$error.required\">\n" +
    "        Please enter a filter expression,  e.g. keyword:\"water quality\".\n" +
    "    </p>\n" +
    "</form>"
  );

}]);
