function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
if (getUrlParameter('name').length > 0) {
  alert(
    `${getUrlParameter('name')} is now the manager of the ${getUrlParameter(
      'department'
    )}.`
  );
}
