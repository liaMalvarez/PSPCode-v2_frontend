import moment from 'moment';

export const uid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};


export const setCacheObject = (k, v, e = 0) => {
  if (e < 1) e = 60;
  localStorage.setItem(k,JSON.stringify({value: v, expires: moment().add(e, 'minutes')}));
};

export const getCacheObject = (k) => {
  const o = JSON.parse(localStorage.getItem(k));
  return (o && moment.duration(moment(o.expires).diff(moment())).asMilliseconds() >= 0)? o.value : null;
};




export const removeAllCokies = () => {
  (function () {
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
      var d = window.location.hostname.split(".");
      while (d.length > 0) {
        var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
        var p = location.pathname.split('/');
        document.cookie = cookieBase + '/';
        while (p.length > 0) {
          document.cookie = cookieBase + p.join('/');
          p.pop();
        };
        d.shift();
      }
    }
  })();
};
