function getParameter(name){
  name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1])
}
module.exports={
  getParameter,
}