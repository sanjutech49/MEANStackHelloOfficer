window.hasOwnProperty = function(o,p,u){u='undefined';return typeof o==u||typeof p==u||typeof o[p]==u?!1:o[p]!==o.constructor.prototype[p]};