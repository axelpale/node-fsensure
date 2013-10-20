// ensure.js
// 
// Author
//     Akseli Palén <akseli.palen@gmail.com>
// 
// Version
//     1.1.2 2013-10-20 Comments added, node-fs changed to mkdirp
//     1.1.1 2013-08-30 file.move, file.remove fix
//     1.1.0 2013-07-29 file.copy, file.unlink, file.remove
//     1.0.1 2013-07-02
// 
// Description
//     Convenience wrappers for file operations.
//     Ensures that directories exist.
// 

var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');

exports.dir = {
    exists: function (path, mode, callback) {
        // Parameter
        //     path
        //         Absolute file path.
        //     mode (optional, default '0777')
        //         Path permission string or int e.g. '0755' or 755.
        //     callback
        // 
        // Callback
        //     err
        //         Null if no errors
        mkdirp(path, mode, callback);
    },
    
    existsSync: function (path, mode) {
        // Syncronized version of dir.exists
        return mkdirp.sync(path, mode);
    }
};

exports.file = {
    
    move: function (source, target, callback) {
        // Alias for rename.
        return exports.file.rename(source, target, callback);
    },
    
    rename: function (source, target, callback) {
        // Ensures that the directory path for target file exists.
        // 
        // Parameters
        //     source
        //         Absolute path of source file.
        //     target
        //         Absolute path of target file.
        //     callback
        //         function (err)
        //             if everythin ok then err is null
        
        // Directory of the target file
        // http://nodejs.org/api/path.html#path_path_dirname_p
        var dirpath = path.dirname(target);
        
        exports.dir.exists(dirpath, function (err) {
            if (err) { callback(err); return; }
            
            // Move the file.
            // Absolute paths required by rename.
            fs.rename(source, target, callback);
        });
    },
    
    dir: {
        exists: function (filepath, callback) {
            // Ensures that the directory path for the file exists.
            // 
            // Parameters
            //     filepath
            //         Absolute path of a file.
            //     callback
            //         function (err)
            //             if everythin ok then err is null
            
            // Directory of the target file
            // http://nodejs.org/api/path.html#path_path_dirname_p
            var dirpath = path.dirname(filepath);
            
            exports.dir.exists(dirpath, callback);
        }
    },
    
    copy: function (source, target, callback) {
        // Copies the file and ensures that target directory path exists.
        // 
        // Parameters
        //     source
        //         Absolute path of source file.
        //     target
        //         Absolute path of target file.
        //     callback
        //         function (err)
        //             if everythin ok then err is null
        
        // Directory of the target file
        // http://nodejs.org/api/path.html#path_path_dirname_p
        var dirpath = path.dirname(target);
        
        exports.dir.exists(dirpath, function (err) {
            if (err) { callback(err); return; }
            
            // Copy the file.
            // Absolute paths required by rename.
            
            // http://stackoverflow.com/a/14387791/638546
            var callback_is_called = false;

            var rd = fs.createReadStream(source);
            rd.on("error", function(err) {
                done(err);
            });
            var wr = fs.createWriteStream(target);
            wr.on("error", function(err) {
                done(err);
            });
            wr.on("close", function(ex) {
                done();
            });
            rd.pipe(wr);

            function done(err) {
                if (!callback_is_called) {
                  callback(err);
                  callback_is_called = true;
                }
            }
            
        });
    },
    
    remove: function (target, callback) {
        // Alias for unlink.
        exports.file.unlink(target, callback);
    },
    
    unlink: function (target, callback) {
        //
        // Ensure that the file is unlinked i.e. deleted.
        // Will success even when the target does not exist.
        // 
        // Parameters
        //     target
        //         Absolute filepath of the file
        //     callback
        //         function (err) {}
        fs.unlink(target, function (err) {
            if (err) {
                if (err.errno === 34) {
                    // File does not exist.
                    // This means that file can be thought to be
                    // already deleted.
                    callback(null);
                    return;
                } else {
                    callback(err);
                    return;
                }
            }
            // File was really deleted
            callback(null);
        });
    }
    
};

