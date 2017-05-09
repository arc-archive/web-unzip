function getFile(filename) {
  var baseUrl = location.href.substr(0, location.href.lastIndexOf('/') + 1);
  return fetch(baseUrl + filename)
  .then(function(response) {
    if (response.ok) {
      return response.blob();
    } else {
      throw new Error('Errored response.');
    }
  });
}

function setupStructure(element, blob) {
  return new Promise(function(resolve, reject) {
    var callbackError;
    var callback = function(e) {
      element.removeEventListener('web-unzip-file-structure', callback);
      element.removeEventListener('error', callbackError);
      resolve(e.detail.fileStructure);
    };
    callbackError = function(e) {
      element.removeEventListener('error', callbackError);
      element.removeEventListener('web-unzip-file-structure', callback);
      reject(new Error(e.detail.message));
    };
    element.addEventListener('web-unzip-file-structure', callback);
    element.addEventListener('error', callbackError);
    element.file = [blob];
  });
}
