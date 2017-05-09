[![Build Status](https://travis-ci.org/advanced-rest-client/web-unzip.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/web-unzip)  

# web-unzip

`<web-unzip>` A web component that unzips files.

The elment, after assigning an array of files (either file from file input or
from drop event) will read zip structure automatically. After structure is read
it will set the `fileStructure` property and will fire
`web-unzip-file-structure` custom event.
It the `auto-read` attribute is set (`autoRead` property) then it will
automatically ready files content and will send `web-unzip-read` custom event.
Otherwise `getAllData()` or `getFileContent()` function must be called
to read all / entry data.

## Dependency files
This component uses web workers. Files required by the workers are included
into the element body and in most cases it doesn't depend on external files.
However, IE10 doesnt work this way. Or at least zip.js worker script and
it throws unhandled error in the web worker. For IE10 and Safari it will
import `inflate.js` and `deflate.js` scripts from `zipjs` folder.

Make sure that the build process copies this two libraries into
`bower_components/web-unzip/zipjs` directory.

### Killing the web worker
The zip.js library uses web worker to unzip files. Each time the `file` property change
previously created web worker will be killed and removed from memory.
You can call the `closeLastReader()` function to close the worker manually. Later read file content will be not possible.

Additionally the element will kill the web worker when it's detached from the document (web compnents detachedCallback).

### Example
```
<web-unzip></web-unzip>
```



### Events
| Name | Description | Params |
| --- | --- | --- |
| error | Fired when error occurred anywhere in the element. | message **String** - An error message. |
| web-unzip-file-structure | Fired when the list of files has been read from the zip file. | __none__ |
| web-unzip-read | Fired when all files were read. The Entry elements in the structure will not contain `content` property with a File object. They also will not contain `getData` function anymore. | __none__ |
