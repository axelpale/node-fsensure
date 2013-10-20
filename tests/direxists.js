// Based on mkdirp/test/mkdirp.js by James Halliday

var fsensure = require('../');
var path = require('path');
var fs = require('fs');
var test = require('tap').test;

test('fsensure.dir.exists', function (t) {
    t.plan(2);
    var x = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    var y = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    var z = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    
    var dirpath = '/tmp/' + [x,y,z].join('/');
    var mode = 0755;
    
    fsensure.dir.exists(dirpath, mode, function (err) {
        if (err) { t.fail(err); return; }
        
        path.exists(dirpath, function (ex) {
            if (!ex) { t.fail('directory not created'); return; }
            
            fs.stat(dirpath, function (err, stat) {
                if (err) { t.fail(err); return; }
                
                t.equal(stat.mode & 0777, mode);
                t.ok(stat.isDirectory(), 'target not a directory');
                t.end();
            })
        })
    });
});
