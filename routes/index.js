
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

/*
 * GET Admin page.
 */
exports.admin = function(req, res){
  res.render('admin');
};
