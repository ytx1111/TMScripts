// ==UserScript==
// @name		拼多多编辑提交Enter
// @namespace    http://tampermonkey.net/
// @version      0.1
//@iconURL			http://www.pinduoduo.com/favicon.ico
// @description  try to take over the world!
// @author       You
// @match        http://mms.pinduoduo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
			window.onload=function ()
			{
				var btnWrap = document.getElementsByClassName('goods-add-btns')[0];
				if(btnWrap!=undefined)
				{
					window.onkeydown=function()
					{	if (event.keyCode==13)
						{
							var btn = btnWrap.getElementsByClassName('pdd-btn')[0];
							btn.click();
						}
					}
				}

			}
})();
