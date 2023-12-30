var DataTypes = require("sequelize").DataTypes;
var _answer = require("./answer");
var _article = require("./article");
var _articlecomment = require("./articlecomment");
var _blackip = require("./blackip");
var _class_ = require("./class");
var _codehistory = require("./codehistory");
var _college = require("./college");
var _contest = require("./contest");
var _contestproblem = require("./contestproblem");
var _contestrank = require("./contestrank");
var _dayproblem = require("./dayproblem");
var _fabulousarticle = require("./fabulousarticle");
var _fabulousvideo = require("./fabulousvideo");
var _followfans = require("./followfans");
var _goods = require("./goods");
var _group = require("./group");
var _groupchat = require("./groupchat");
var _groupuser = require("./groupuser");
var _image = require("./image");
var _joincontest = require("./joincontest");
var _lovearticle = require("./lovearticle");
var _lovequestion = require("./lovequestion");
var _lovevideo = require("./lovevideo");
var _monitor = require("./monitor");
var _notice = require("./notice");
var _oj = require("./oj");
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
  var articlecomment = _articlecomment(sequelize, DataTypes);
  var blackip = _blackip(sequelize, DataTypes);
  var class_ = _class_(sequelize, DataTypes);
  var codehistory = _codehistory(sequelize, DataTypes);
  var college = _college(sequelize, DataTypes);
  var contest = _contest(sequelize, DataTypes);
  var contestproblem = _contestproblem(sequelize, DataTypes);
  var contestrank = _contestrank(sequelize, DataTypes);
  var dayproblem = _dayproblem(sequelize, DataTypes);
  var fabulousarticle = _fabulousarticle(sequelize, DataTypes);
  var fabulousvideo = _fabulousvideo(sequelize, DataTypes);
  var followfans = _followfans(sequelize, DataTypes);
  var goods = _goods(sequelize, DataTypes);
  var group = _group(sequelize, DataTypes);
  var groupchat = _groupchat(sequelize, DataTypes);
  var groupuser = _groupuser(sequelize, DataTypes);
  var image = _image(sequelize, DataTypes);
  var joincontest = _joincontest(sequelize, DataTypes);
  var lovearticle = _lovearticle(sequelize, DataTypes);
  var lovequestion = _lovequestion(sequelize, DataTypes);
  var lovevideo = _lovevideo(sequelize, DataTypes);
  var monitor = _monitor(sequelize, DataTypes);
  var notice = _notice(sequelize, DataTypes);
  var oj = _oj(sequelize, DataTypes);
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
    articlecomment,
    blackip,
    class_,
    codehistory,
    college,
    contest,
    contestproblem,
    contestrank,
    dayproblem,
    fabulousarticle,
    fabulousvideo,
    followfans,
    goods,
    group,
    groupchat,
    groupuser,
    image,
    joincontest,
    lovearticle,
    lovequestion,
    lovevideo,
    monitor,
    notice,
    oj,
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
