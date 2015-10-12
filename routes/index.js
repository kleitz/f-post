var express = require('express');
var router = express.Router();
var request = require("request");
var FB = require('fb');
FB.options({'appId': '178669502471398', 'appSecret': '8cf86115ffe72716344c13e5f4776610'});

var user = {
  email: "root@root"
  , password: "darthvader"
}
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/login/fb/cb', function(req, res, next) {
  request.get('https://graph.facebook.com/v2.3/oauth/access_token?client_id=178669502471398&redirect_uri=http://fpost.com.br:3000/login/fb/cb&client_secret=8cf86115ffe72716344c13e5f4776610&code='+req.query.code, {json: true}, function(err, resp, body){
    if(body.access_token == undefined)
        return res.redirect("/login");
    req.session.user = body.access_token;
    return res.redirect("/post");
  });
});

router.get('/login/fb', function(req, res, next) {
  return res.redirect(
    FB.getLoginUrl({
        scope: 'email,user_managed_groups,user_posts,publish_actions',
        redirect_uri: 'http://fpost.com.br:3000/login/fb/cb'
    })
  );
});

router.get('/post', function(req, res, next) {
  FB.setAccessToken(req.session.user);
  FB.api('me/groups', 'get', {}, function (resp) {
    if(!resp || resp.error) {
      console.log(!resp ? 'error occurred' : resp.error);
      return res.redirect("/post");
    }
    return res.render('post', { groups: resp.data });
  });
});

router.post('/post/new', function(req, res, next) {
  if(!req.body.groups)
    return res.redirect("/post");

  FB.setAccessToken(req.session.user);

  if (_.isArray(req.body.groups)){
    async.map(req.body.groups, function (group, callback) {
       console.log(group);
       FB.api(group+'/feed', 'post', { message: req.body.body }, function (resp) {
        if(!resp || resp.error)
            return callback(resp.error)
        return callback(null, resp);
      });
    }, function (error, posts) {
      if(error){
        console.log("ERROR", error);
        return false;
      }
      return res.redirect("/post");
    });
  }else{
    FB.api(req.body.groups+'/feed', 'post', { message: req.body.body }, function (resp) {
      if(!resp || resp.error){
        console.log("ERROR", resp.error);
        return false;
      }
      return res.redirect("/post");
    });
  }
});

module.exports = router;
