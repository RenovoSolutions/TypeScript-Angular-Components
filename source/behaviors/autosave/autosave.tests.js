/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../typings/lodash/lodash.d.ts' />
'use strict';
var autosave_1 = require('./autosave');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var angular = require('angular');
require('angular-mocks');
var rl;
(function (rl) {
    var ui;
    (function (ui) {
        var behaviors;
        (function (behaviors) {
            var autosave;
            (function (autosave_2) {
                var test = typescript_angular_utilities_1.services.test;
                var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
                describe('AutosaveController', function () {
                    var scope;
                    var autosave;
                    var parentChildBehavior;
                    var $attrs;
                    var autosaveSpy;
                    var childLink;
                    beforeEach(function () {
                        angular.mock.module(autosave_1.moduleName);
                        $attrs = {
                            validate: '',
                            rlAutosave: 'link',
                        };
                        autosaveSpy = sinon.spy(function () { return true; });
                        var autosaveService = { autosave: autosaveSpy };
                        var autosaveFactory = {
                            getInstance: sinon.spy(function (save, contentForm, validate) {
                                return autosaveService;
                            }),
                        };
                        test.angularFixture.mock({
                            $attrs: $attrs,
                            autosaveFactory: autosaveFactory,
                        });
                        var services = test.angularFixture.inject(__parentChild.serviceName);
                        parentChildBehavior = services[__parentChild.serviceName];
                    });
                    it('should trigger an autosave when the autosave behavior is called', function () {
                        buildController();
                        var behavior = parentChildBehavior.getChildBehavior(scope.childLink);
                        var close = behavior.autosave();
                        expect(close).to.be.true;
                        sinon.assert.calledOnce(autosaveSpy);
                    });
                    function buildController() {
                        if (childLink == null) {
                            childLink = {};
                        }
                        var $element = {
                            controller: function () {
                                return null;
                            },
                        };
                        var $parse = function (expression) {
                            if (expression === 'link') {
                                return sinon.spy(function () {
                                    return childLink;
                                });
                            }
                            else {
                                return sinon.spy();
                            }
                        };
                        var controllerResult = test.angularFixture.controllerWithBindings(autosave_1.controllerName, null, { $element: $element, $parse: $parse }, { childLink: childLink, });
                        scope = controllerResult.scope;
                        autosave = controllerResult.controller;
                    }
                });
            })(autosave = behaviors.autosave || (behaviors.autosave = {}));
        })(behaviors = ui.behaviors || (ui.behaviors = {}));
    })(ui = rl.ui || (rl.ui = {}));
})(rl || (rl = {}));
//# sourceMappingURL=autosave.tests.js.map