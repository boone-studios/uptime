angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('Config/config_modal.html','<div class="modal" tabindex="-1" role="dialog" aria-hidden="true">\n  <div class="modal-dialog" role="document">\n    <div class="modal-content" ng-transclude>\n    </div>\n  </div>\n</div>\n');
$templateCache.put('Config/config_modal_body.html','<div class="modal-body" ng-transclude>\n</div>\n');
$templateCache.put('Config/config_modal_footer.html','<div class="modal-footer" ng-transclude>\n</div>\n');
$templateCache.put('Config/config_modal_header.html','<div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n        <span aria-hidden="true">&times;</span>\n    </button>\n    <h4 class="modal-title">{{ title }}</h4>\n</div>\n');
$templateCache.put('App/app_wrapper.html','<header>\n    <div class="row">\n        <div class="col-xs-6">\n            <div class="brand" ng-bind-html="brand"></div>\n        </div>\n\n        <div class="col-xs-6">\n            <div class="btn-config pull-xs-right" ng-click="show()">\n                <i class="fa fa-gear"></i> <span class="hidden-sm-down">Configure</span>\n            </div>\n        </div>\n    </div>\n</header>\n\n<div class="page" ui-view>\n</div>\n');
$templateCache.put('WebsiteList/list_element.html','<div class="panel panel-default" ng-repeat="site in $ctrl.sites" data-toggle="collapse" data-target="#{{ \'panel-\' + $index }}" aria-expanded="false" aria-controls="{{ \'panel-\' + $index }}">\n    <div class="panel-heading" role="tab">\n        <h4 class="panel-title">\n            <!--a data-toggle="collapse" data-parent="#accordion" href="#{{ \'panel-\' + $index }}" aria-expanded="true" aria-controls="collapseOne"-->\n                {{ site.title }}\n            <!--/a-->\n\n            <div class="pull-xs-right">\n                <status-element-component status="site.status" text="site.text"></status-element-component>\n            </div>\n        </h4>\n\n        <div class="duration text-muted">\n            <div ng-show="!site.checked">Status pending</div>\n            <div ng-hide="!site.checked">Last checked <span am-time-ago="site.checked"></span></div>\n        </div>\n    </div>\n\n    <div id="{{ \'panel-\' + $index }}" class="panel-content panel-collapse p-t-1 collapse" role="tabpanel" aria-labelledby="headingOne">\n        <p>This monitor checks <strong>{{ site.url }}</strong> every 5 minutes. Typically, the website is online. Click here for more info.</p>\n    </div>\n</div>\n');
$templateCache.put('WebsiteList/status_element.html','<span class="status-text hidden-sm-down" ng-hide="$ctrl.text === null">{{ $ctrl.text }}</span>\n<div class="status status-{{ $ctrl.status }}"></div>\n');
$templateCache.put('HomePage/home.html','<div class="website-list">\n    <list-element-component></list-element-component>\n</div>\n\n<modal visible="configModal" backdrop="static">\n    <modal-header title="Configuration"></modal-header>\n    <modal-body>\n        <div class="form-group">\n            <h5>Theme Settings</h5>\n            <p class="m-y-1 text-muted">Customize the overall appearance of the monitor. The dark theme is recommended for easier readability, especially for late nights on call.</p>\n            <select class="form-control custom-select" ng-model="theme">\n                <option value="light">Light</option>\n                <option value="dark">Dark</option>\n            </select>\n        </div>\n\n        <div class="form-group">\n            <h5>Monitors</h5>\n        </div>\n    </modal-body>\n    <modal-footer>\n        <button class="btn btn-primary" ng-click="hide()">Save</button>\n    </modal-footer>\n</modal>\n');}]);