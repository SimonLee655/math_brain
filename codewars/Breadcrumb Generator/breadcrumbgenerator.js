console.log('BreadcrumbGenerater');
function generateBC(url, separator) {
  // remove http:// or https://
  url = url.replace('http://', '').replace('https://', '');
  // remove string after '?' or '#'
  url = url.substring(0, url.indexOf('?')!==-1?url.indexOf('?'):url.length);
  url = url.substring(0, url.indexOf('#')!==-1?url.indexOf('#'):url.length);
  // split url by '/' and remove string which has 'index' in it
  var urlsegments = url.split('/').filter((u)=>u.indexOf('index')===-1);
  urlsegments.forEach((u, i)=>{
    if(i > 1 && i < urlsegments.length - 1){
      urlsegments[i] = urlsegments[i - 1] + '/' + u;
    }
  });
  // didn't find rules for this...
  if(urlsegments.length < 2 || (urlsegments.length === 2 && !urlsegments[1])) return htmlGenerater('home', 'span');
  var ans = [];
  urlsegments.forEach((s, i)=>{
    if(i === 0){
      ans.push(htmlGenerater('home', 'a'));
      return true;
    }
    if(i === urlsegments.length - 1){
      ans.push(htmlGenerater(s, 'span'));
      return true;
    }
    ans.push(htmlGenerater(s, 'a'))
  });
  return ans.join(separator);
}
function htmlGenerater( href, type){
  var url = '';
  switch(type.toLowerCase()){
    case 'span':
      if(href.length > 30) href = over30handler(href);
      url = '<span class="active">' + href.replace(/.html|.htm|.php|.asp/ig, '').replace(/-/g, ' ').toUpperCase() + '</span>';
      break;
    case 'a':
    default:
      if(href.toLowerCase() === 'home'){
        url = '<a href="/">HOME</a>';
      } else {
        url += '<a href="/' + href.toLowerCase() + '/">';
        var hrefLength = href.substring(href.lastIndexOf('/')!==-1?href.lastIndexOf('/'):0,href.length).length;
        href = href.substring(href.lastIndexOf('/')!==-1?href.lastIndexOf('/')+1:0,href.length);
        if(hrefLength > 30){
          url += over30handler(href) + '</a>';
        } else {
          url += href.toUpperCase().replace(/-/g, ' ') + '</a>';
        }
      }
      break;
      }
  return  url;
}
function over30handler(url){
  var ignoreStr = ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"];
  return url.split('-').map((x)=>{
    if(ignoreStr.indexOf(x)!==-1){
      return '';
    } else {
      return x.substr(0, 1).toUpperCase();
    }
  }).join('');
}