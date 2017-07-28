// ==UserScript==
// @name         淘宝 图片获取脚本
// @namespace    https://item.taobao.com/
// @version      0.81
// @description  淘宝缩略图、分类图、详情图（详情图需要所有详情图片显示完毕再点击才能正常下载）下载
// @author       Richard He
// @iconURL      http://www.xuebalib.cn/userjs/icon.ico
// @resource css http://www.xuebalib.cn/userjs/css.css?v=23
// @match        https://item.taobao.com/*
// @grant        GM_setClipboard
// @grant        GM_notification
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_download
// ==/UserScript==

GM_addStyle(GM_getResourceText('css'));

//缩略图
var lis = document.getElementById('J_UlThumb').getElementsByTagName('li');
var src,index=0;
for(var i in lis)
{
	if(typeof lis[i]=='object')
	{
		index++;
		var br = document.createElement('button');
		src = lis[i].getElementsByTagName('img')[0].src.slice(0,-16);
		br.title = src;
		br.className = 'comBut butS';
		br.style.backgroundImage = "url("+src+"_50x50.jpg"+")";
		br.onclick = function()
		{
			GM_download(this.title,"S");
		};
		document.getElementsByClassName('tb-item-info-l')[0].appendChild(br);
	}
}

//分类图
var tbProp = document.getElementsByClassName('tb-prop');
if(tbProp===null){}
else
{
	//创建所需元素
	var down = document.createElement('dl');
	var dt1 = document.createElement('dt');
	tbProp[0].parentNode.insertBefore(down,tbProp[0].nextSibling);
	dt1.className = 'tb-property-type';
	dt1.innerText = '下载分类';
	down.appendChild(dt1);
	var dd = document.createElement('dd');
	down.appendChild(dd);
	var ul = document.createElement('ul');
	ul.className = 'J_TSaleProp tb-img tb-clearfix';
	dd.appendChild(ul);

	var as = tbProp[0].getElementsByTagName('a');
	for(var i in as)
	{
		if(typeof as[i] == 'object')
		{
			src = as[i].style.backgroundImage.slice(5,-12);
			var li = document.createElement('li');
			var bt = document.createElement('button');
			bt.className = 'comBut butF';
			bt.title = 'http:' + src;
			bt.style.backgroundImage = "url("+src+"_30x30.jpg"+")";
			bt.style.backgroundRepeat = "no-repeat";
			bt.style.backgroundPosition = "center center";
			bt.onclick = function()
			{
				GM_download(this.title,"F");
			};
			ul.appendChild(li);
			li.appendChild(bt);
		}
	}
}

//获取详情图
var imgAdrs = [];
var buttonC = document.createElement('button');
buttonC.onclick = function() 
{
	var desLis = document.getElementById('J_DivItemDesc').childNodes;
	var des = document.getElementById('J_DivItemDesc');
	var imgs = des.getElementsByTagName('img');
	for(var i in imgs)
	{
		if(typeof imgs[i] == 'object' && imgs[i].src.indexOf('assets')<0)
		imgAdrs.push(imgs[i].src);
	}
	GM_notification({
		text:'本次将下载 '+imgAdrs.length+ ' 张图片',
		title:'友情提示',timeout:3000},function()
					{
		for(var j in imgAdrs)
		{
			GM_download(imgAdrs[j],"X"+j);
		}
	});
};
buttonC.innerHTML = '获取详情页';
buttonC.style.bottom = '0px';
buttonC.className = 'comBut butX';
document.body.appendChild(buttonC);

//图片加边框
var buttonD= document.createElement('button');
buttonD.onclick = function() 
{
	var des = document.getElementById('J_DivItemDesc');
	var imgs = des.getElementsByTagName('img');
	for(var i in imgs)
	{
		if(typeof imgs[i] == 'object' && imgs[i].src.indexOf('assets')<0)
		imgs[i].style.border = '4px solid red';
	}
};
buttonD.innerHTML = '图片加边框';
buttonD.style.bottom = '40px';
buttonD.className = 'comBut butX';
document.body.appendChild(buttonD);
