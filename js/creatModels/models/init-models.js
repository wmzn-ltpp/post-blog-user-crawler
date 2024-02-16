var DataTypes = require("sequelize").DataTypes;
var _answer = require("./answer");
var _article = require("./article");
var _article_data = require("./article_data");
var _articlecomment = require("./articlecomment");
var _blackip = require("./blackip");
var _chat_file_path = require("./chat_file_path");
var _class_ = require("./class");
var _cloud_file_path = require("./cloud_file_path");
var _codehistory = require("./codehistory");
var _college = require("./college");
var _contest = require("./contest");
var _contestproblem = require("./contestproblem");
var _contestrank = require("./contestrank");
var _contestrankcache = require("./contestrankcache");
var _dayproblem = require("./dayproblem");
var _fabulousarticle = require("./fabulousarticle");
var _fabulousvideo = require("./fabulousvideo");
var _file_data = require("./file_data");
var _file_path = require("./file_path");
var _followfans = require("./followfans");
var _goods = require("./goods");
var _group = require("./group");
var _groupchat = require("./groupchat");
var _groupuser = require("./groupuser");
var _home_photo = require("./home_photo");
var _image = require("./image");
var _joincontest = require("./joincontest");
var _lovearticle = require("./lovearticle");
var _lovequestion = require("./lovequestion");
var _lovevideo = require("./lovevideo");
var _monitor = require("./monitor");
var _notice = require("./notice");
var _oj = require("./oj");
var _oj_test_data = require("./oj_test_data");
var _orderforgoods = require("./orderforgoods");
var _privatechat = require("./privatechat");
var _privateuser = require("./privateuser");
var _question = require("./question");
var _robotcontestfinish = require("./robotcontestfinish");
var _school = require("./school");
var _setting = require("./setting");
var _shortsentence = require("./shortsentence");
var _solveproblem = require("./solveproblem");
var _ssh = require("./ssh");
var _subject = require("./subject");
var _user = require("./user");
var _usernotice = require("./usernotice");
var _video = require("./video");
var _videocomment = require("./videocomment");

function initModels(sequelize) {
  var answer = _answer(sequelize, DataTypes);
  var article = _article(sequelize, DataTypes);
  var article_data = _article_data(sequelize, DataTypes);
  var articlecomment = _articlecomment(sequelize, DataTypes);
  var blackip = _blackip(sequelize, DataTypes);
  var chat_file_path = _chat_file_path(sequelize, DataTypes);
  var class_ = _class_(sequelize, DataTypes);
  var cloud_file_path = _cloud_file_path(sequelize, DataTypes);
  var codehistory = _codehistory(sequelize, DataTypes);
  var college = _college(sequelize, DataTypes);
  var contest = _contest(sequelize, DataTypes);
  var contestproblem = _contestproblem(sequelize, DataTypes);
  var contestrank = _contestrank(sequelize, DataTypes);
  var contestrankcache = _contestrankcache(sequelize, DataTypes);
  var dayproblem = _dayproblem(sequelize, DataTypes);
  var fabulousarticle = _fabulousarticle(sequelize, DataTypes);
  var fabulousvideo = _fabulousvideo(sequelize, DataTypes);
  var file_data = _file_data(sequelize, DataTypes);
  var file_path = _file_path(sequelize, DataTypes);
  var followfans = _followfans(sequelize, DataTypes);
  var goods = _goods(sequelize, DataTypes);
  var group = _group(sequelize, DataTypes);
  var groupchat = _groupchat(sequelize, DataTypes);
  var groupuser = _groupuser(sequelize, DataTypes);
  var home_photo = _home_photo(sequelize, DataTypes);
  var image = _image(sequelize, DataTypes);
  var joincontest = _joincontest(sequelize, DataTypes);
  var lovearticle = _lovearticle(sequelize, DataTypes);
  var lovequestion = _lovequestion(sequelize, DataTypes);
  var lovevideo = _lovevideo(sequelize, DataTypes);
  var monitor = _monitor(sequelize, DataTypes);
  var notice = _notice(sequelize, DataTypes);
  var oj = _oj(sequelize, DataTypes);
  var oj_test_data = _oj_test_data(sequelize, DataTypes);
  var orderforgoods = _orderforgoods(sequelize, DataTypes);
  var privatechat = _privatechat(sequelize, DataTypes);
  var privateuser = _privateuser(sequelize, DataTypes);
  var question = _question(sequelize, DataTypes);
  var robotcontestfinish = _robotcontestfinish(sequelize, DataTypes);
  var school = _school(sequelize, DataTypes);
  var setting = _setting(sequelize, DataTypes);
  var shortsentence = _shortsentence(sequelize, DataTypes);
  var solveproblem = _solveproblem(sequelize, DataTypes);
  var ssh = _ssh(sequelize, DataTypes);
  var subject = _subject(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var usernotice = _usernotice(sequelize, DataTypes);
  var video = _video(sequelize, DataTypes);
  var videocomment = _videocomment(sequelize, DataTypes);


  return {
    answer,
    article,
    article_data,
    articlecomment,
    blackip,
    chat_file_path,
    class_,
    cloud_file_path,
    codehistory,
    college,
    contest,
    contestproblem,
    contestrank,
    contestrankcache,
    dayproblem,
    fabulousarticle,
    fabulousvideo,
    file_data,
    file_path,
    followfans,
    goods,
    group,
    groupchat,
    groupuser,
    home_photo,
    image,
    joincontest,
    lovearticle,
    lovequestion,
    lovevideo,
    monitor,
    notice,
    oj,
    oj_test_data,
    orderforgoods,
    privatechat,
    privateuser,
    question,
    robotcontestfinish,
    school,
    setting,
    shortsentence,
    solveproblem,
    ssh,
    subject,
    user,
    usernotice,
    video,
    videocomment,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
