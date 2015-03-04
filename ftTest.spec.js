var recF = require('./bin2/Falcor2.js');
var Cache = require('./test/data/Cache');
var recModel = new recF(Cache());
var Expected = require('./test/data/expected');
var Values = Expected.Values;
var References = Expected.References;
var Complex = Expected.Complex;
var TestRunner = require('./test/testRunner');
var model = TestRunner.getModel(null, Cache());
var _ = require('lodash');


describe('Ready to Rumble.', function() {
    
    describe('Values', function() {
        Object.
            keys(Values()).
            forEach(function(k) {
                var expected = Values()[k];
                
                ['getPaths', 'getPathMaps'].forEach(function(q) {
                    var query = expected[q].query;
                    if (k === 'genreListErrorNull' || k === 'errorBranchSummary') {
                        return;
                    }

                    it('should test ' + JSON.stringify(query) + ' ' + k + ' AsValues', function() {
                        var count = Array(q.count || 1).join(',').split(',').map(function() { return {}; });
                        var expectedOutput = model['_' + q + 'AsValues'](model, _.cloneDeep(query), count);
                        var actualOutput = recModel._getAsValues(recModel, query);
                        TestRunner.validateOperation('_' + q + 'AsPathMap', expectedOutput, actualOutput);
                    });

                    it('should test ' + JSON.stringify(query) + ' ' + k + ' AsPathMap', function() {
                        var count = Array(q.count || 1).join(',').split(',').map(function() { return {}; });
                        var expectedOutput = model['_' + q + 'AsPathMap'](model, _.cloneDeep(query), count);
                        var out = [{}];
                        var actualOutput = recModel._getAsPathMap(recModel, query, out);
                        TestRunner.validateOperation('_' + q + 'AsPathMap', expectedOutput, actualOutput);
                    });

                    if (expected.AsJSON) {
                        it('should test ' + JSON.stringify(query) + ' ' + k + ' AsJSON', function() {
                            var count = Array(q.count || 1).join(',').split(',').map(function() { return {}; });
                            var expectedOutput = model['_' + q + 'AsJSON'](model, _.cloneDeep(query), count);
                            var out = [{}];
                            var actualOutput = recModel._getAsJSON(recModel, query, out);
                            TestRunner.validateOperation('_' + q + 'AsPathMap', expectedOutput, actualOutput);
                        });
                    }
                });
                
                
            });
    });

    describe('References', function() {
        Object.
            keys(References()).
            forEach(function(k) {
                var expected = References()[k];
                if (k === 'futureExpiredReference' || k === 'toErrorReference' || k === 'errorReferenceInBranchKey' || k === 'errorReference') {
                    return;
                }
                ['getPaths', 'getPathMaps'].forEach(function(q) {
                    var query = expected[q].query;
                    if (k === 'genreListErrorNull' || k === 'errorBranchSummary') {
                        return;
                    }

                    it('should test ' + JSON.stringify(query) + ' ' + k + ' AsValues', function() {
                        var count = Array(q.count || 1).join(',').split(',').map(function() { return {}; });
                        var expectedOutput = model['_' + q + 'AsValues'](model, _.cloneDeep(query), count);
                        var actualOutput = recModel._getAsValues(recModel, query);
                        TestRunner.validateOperation('_' + q + 'AsPathMap', expectedOutput, actualOutput);
                    });

                    it('should test ' + JSON.stringify(query) + ' ' + k + ' AsPathMap', function() {
                        var count = Array(q.count || 1).join(',').split(',').map(function() { return {}; });
                        var expectedOutput = model['_' + q + 'AsPathMap'](model, _.cloneDeep(query), count);
                        var out = [{}];
                        var actualOutput = recModel._getAsPathMap(recModel, query, out);
                        TestRunner.validateOperation('_' + q + 'AsPathMap', expectedOutput, actualOutput);
                    });

                    if (expected.AsJSON) {
                        it('should test ' + JSON.stringify(query) + ' ' + k + ' AsJSON', function() {
                            var count = Array(q.count || 1).join(',').split(',').map(function() { return {}; });
                            var expectedOutput = model['_' + q + 'AsJSON'](model, _.cloneDeep(query), count);
                            var out = [{}];
                            var actualOutput = recModel._getAsJSON(recModel, query, out);
                            TestRunner.validateOperation('_' + q + 'AsPathMap', expectedOutput, actualOutput);
                        });
                    }
                });
            });
    });

    describe('Complex', function() {
        Object.
            keys(Complex()).
            forEach(function(k) {
                var expected = Complex()[k];
                ['getPaths', 'getPathMaps'].
                    filter(function(q) { return expected[q]; }).
                    forEach(function(q) {
                        var query = expected[q].query;
                        it('should test ' + JSON.stringify(query) + ' ' + k, function () {
                            var count = [ {} ];
                            var expectedOutput = model['_' + q + 'AsValues'](model, _.cloneDeep(query), count);
                            if (k === 'toErrorReference' || k === 'errorReferenceInBranchKey' || k === 'errorReference') {
                                expectedOutput.values = [];
                            }
                            var actualOutput = recModel._getAsValues(recModel, query);
                            TestRunner.validateOperation('_getPathsAsValues', expectedOutput, actualOutput);
                        });
    
                        it('should test ' + JSON.stringify(query) + ' ' + k + ' AsPathMap', function () {
                            var count = [ {} ];
                            var expectedOutput = model['_' + q + 'AsPathMap'](model, _.cloneDeep(query), count);
                            var out = [{}];
                            var actualOutput = recModel._getAsPathMap(recModel, query, out);
                            TestRunner.validateOperation('_getPathsAsPathMap', expectedOutput, actualOutput);
                        });
    
                        if (expected.AsJSON) {
                            it('should test ' + JSON.stringify(query) + ' ' + k + ' AsJSON', function () {
                                var count = [{}];
                                var expectedOutput = model['_' + q + 'AsJSON'](model, _.cloneDeep(query), count);
                                var out = [{}];
                                var actualOutput = recModel._getAsJSON(recModel, query, out);
                                TestRunner.validateOperation('_getPathsAsJSON', expectedOutput, actualOutput);
                            });
                        }
                });
            });
    });

    xit('should pass this test', function() {
        var expected = Complex().toOnly;
        var q = expected.getPathMaps;
        var query = [{
            genreList: {
                0: {
                    0: {summary: null},
                    1: {summary: null},
                    2: {summary: null}
                },
                1: {
                    0: {summary: null},
                    1: {summary: null},
                    2: {summary: null}
                }
            }
        }];
        var count = Array(q.count || 1).join(',').split(',').map(function() { return {}; });
        var expectedOutput = model._getPathMapsAsJSON(model, _.cloneDeep(query), count);
        debugger;
        var actualOutput = recModel._getAsJSON(recModel, query);
        TestRunner.validateOperation('_' + q + 'AsPathMap', expectedOutput, actualOutput);
    });
    it.only('should pass this test', function() {
        recModel._getAsJSON(recModel, [
            {
                genreList: {
                    0: {
                        0: {summary: null},
                        1: {summary: null},
                        2: {summary: null}
                    },
                    1: {
                        0: {summary: null},
                        1: {summary: null},
                        2: {summary: null}
                    }
                }
            }
        ], [{}]);
    });
});
