// ==UserScript==
// @name         ix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://ixagar.net/
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
var url="ws://chat2.ixagar.net:4590/"
var usurl="ws://localhost:3000"
var usws = new WebSocket('ws://localhost:3000')
var ws = new WebSocket(url)
var userid;
var init = false;
var db=[];
ws.onopen = function()
               {
                  ws.send('{"op":"JoinToServer"}');
               };
ws.onmessage = function (evt)
               {
                  var received_msg = evt.data;
                  var data = JSON.parse(received_msg);
                  userid = data['userId'];
                  if(init!=true){
                     ws.send('{"op":"UpdateUserInfo","userId":'+userid+',"data":{"siteSig":"ix","serverSig":"EA-FREE","name":" ","team":"","code":"ERRERR","skinUrl":"http://ixagar.net/skins/ghost.png","envSig":"ERRERR","profileComment":"","showTripKey":false}}');
                     init = true;
                  };
                  if(data["op"] == "UpdateUserInfos"){
                      var infos = data["infos"];
                      for (let i=0; i<infos.length; i++) {
                          if($.inArray(infos[i],db)!=-1){
                              var temp = db.indexOf(infos[i]);
                              db[index] = infos[i];
                          }
                          else{
                              db.push(infos[i]);
                          }
                      }
                      console.log(db);
                      usws.send(JSON.stringify(db));
                  }
               };
})();