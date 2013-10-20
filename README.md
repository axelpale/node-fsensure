fsensure
========

Ensure directories and files exists or are removed in Node.js.

Install
=======

With [npm](http://npmjs.org) do:

```
npm install fsensure
```

Usage
=====
```js
var fsensure = require('fsensure');

fsensure.dir.exists('/tmp/foo/bar/baz', function (err) {
    if (err) { console.error(err); return; }
    console.log('/tmp/foo/bar/baz now exists');
});
```

API
===

fsensure.dir
------------

fsensure.dir.exists(path, \[mode\], callback)
fsensure.dir.existsSync(path, \[mode\])

fsensure.file
-------------

move(source, target, callback)
rename(source, target, callback)
dir.exists(filepath, callback)
copy(source, target, callback)
remove(target, callback)
unlink(target, callback)

TODO
====

- tests
- documentation
- file.dir.existsSync
