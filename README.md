fsensure
========

Ensure directories and files exists or are removed in Node.js.

Install
=======

With [npm](http://npmjs.org) do:

```
npm install fsensure
```

Examples
========
Create directories recursively like `mkdir -p`.

```js
var fsensure = require('fsensure');

fsensure.dir.exists('/tmp/foo/bar/baz', function (err) {
    if (err) { console.error(err); return; }
    console.log('/tmp/foo/bar/baz now exists');
});
```

Move files around and automatically create the required directories.

```js
var fsensure = require('fsensure');

fsensure.file.move('/tmp/info.txt', '/tmp/archive/info.md', function (err) {
    if (err) { console.error(err); return; }
    console.log('/tmp/info.txt moved to /tmp/archive/info.md');
});
```

API
===

## dir.exists(path, \[mode\], callback)

Ensure that directory exists. If directory does not exist, try to create the directory in path. Understand the path as a path to directory.

## dir.existsSync(path, \[mode\])

Sync version of fsensure.dir.exists.

## file.move(source, target, callback)

Alias of fsensure.file.rename.

## file.rename(source, target, callback)

First ensures that the directories of the target filepath exists, creates the directories then renames the file.

## file.dir.exists(filepath, callback)

Ensures that the directories of filepath exist. Difference to dir.exists is that here filepath is understood as path to a non-directory file.

## file.copy(source, target, callback)

Ensure that target path exists and copy the file.

## file.remove(target, callback)

Alias of fsensure.file.unlink

## file.unlink(target, callback)

Ensure that target file is removed. Remove the file if possible.

TODO
====

- more tests
- accurate documentation
- file.dir.existsSync
