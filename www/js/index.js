/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var map = null;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		//加入onPause事件，適時取消偵測搖一搖，避免過於耗電
		/*document.addEventListener("pause", function(){
			window.unListenShake();
		}, false);
		document.addEventListener("resume", function(){
			window.listenShake();
		}, false);*/
		$("#like-soc").click(function(){
			$.ajax({
				url: HOST+"handle.php?type=9&to_id=1&uuid="+device.uuid,
				type: 'GET',
				dataType:'text',
				success: function(msg){
					if(msg == "1"){
						alert("投票成功");
						setLikeButton(false);
					}else{
						alert("投票失敗，不能重複投票唷");
					}
				},
				error:function(xhr, ajaxOptions, thrownError){}
			});
		});
		$("#like-sot").click(function(){
			$.ajax({
				url: HOST+"handle.php?type=9&to_id=2&uuid="+device.uuid,
				type: 'GET',
				dataType:'text',
				success: function(msg){
					if(msg == "1"){
						alert("投票成功");
						setLikeButton(false);
					}else{
						alert("投票失敗，不能重複投票唷");
					}
				},
				error:function(xhr, ajaxOptions, thrownError){}
			});
		});
		$("#like-soi").click(function(){
			$.ajax({
				url: HOST+"handle.php?type=9&to_id=3&uuid="+device.uuid,
				type: 'GET',
				dataType:'text',
				success: function(msg){
					if(msg == "1"){
						alert("投票成功");
						setLikeButton(false);
					}else{
						alert("投票失敗，不能重複投票唷");
					}
				},
				error:function(xhr, ajaxOptions, thrownError){}
			});
		});
		$("#like-sohs").click(function(){
			$.ajax({
				url: HOST+"handle.php?type=9&to_id=4&uuid="+device.uuid,
				type: 'GET',
				dataType:'text',
				success: function(msg){
					if(msg == "1"){
						alert("投票成功");
						setLikeButton(false);
					}else{
						alert("投票失敗，不能重複投票唷");
					}
				},
				error:function(xhr, ajaxOptions, thrownError){}
			});
		});
		$("#like-sohm").click(function(){
			$.ajax({
				url: HOST+"handle.php?type=9&to_id=5&uuid="+device.uuid,
				type: 'GET',
				dataType:'text',
				success: function(msg){
					if(msg == "1"){
						alert("投票成功");
						setLikeButton(false);
					}else{
						alert("投票失敗，不能重複投票唷");
					}
				},
				error:function(xhr, ajaxOptions, thrownError){}
			});
		});
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
		window.open = cordova.InAppBrowser.open;
		$( ":mobile-pagecontainer" ).on( "pagecontainerbeforehide", function( event, ui ) {
			if(ui.toPage[0].id != "menu"){
				$('#banner').slick('slickPause');
				if(isIphone()){
					$(".ui-header[id!='menu']").css('border-top-width', '21px');
					$(".ui-content[id!='menu']").css('padding-top', '26px');
				}
			}else{
				$('#banner').slick('slickPlay');
			}
		} );
		$( ":mobile-pagecontainer" ).on( "pagecontainershow", function( event, ui ) {
			if (ui.toPage[0].id == "news"){
				getNews();
			}else if(ui.toPage[0].id == "event"){
				getEvent();
			}else if(ui.toPage[0].id == "live"){
				getLive();
			}else if(ui.toPage[0].id == "lost"){
				getLost();
			}else if(ui.toPage[0].id == "admin"){
				if(!app.AdminCreated){
					getAdmin();
					app.AdminCreated = true;
				}
			}else if(ui.toPage[0].id == "traffic"){
				if(!app.frafficCreated){
					gettraffic();
					app.trafficCreated = true;
				}
			}else if(ui.toPage[0].id == "academic"){
				if(!app.AcademicCreated){
					getAcademic();
					app.AcademicCreated = true;
				}
			}else if(ui.toPage[0].id == "map"){
				if(!map){
					var mapOptions = {
						center: { lat: 25.0117584, lng: 121.2696277},
						zoom: 17
					};
					map = new google.maps.Map(document.getElementById('map-canvas'),
						mapOptions);
				}
			}else if(ui.toPage[0].id == "shake"){
				checkShake();
			}else if(ui.toPage[0].id == "menu"){
				if(could_shake){
					window.unListenShake();
				}
			}
		});
		
		var screen = $.mobile.getScreenHeight();
		var header = $(".ui-header").hasClass("ui-header-fixed") ? $(".ui-header").outerHeight()  - 1 : $(".ui-header").outerHeight();
		var footer = $(".ui-footer").hasClass("ui-footer-fixed") ? $(".ui-footer").outerHeight() - 1 : $(".ui-footer").outerHeight();

		/* content div has padding of 1em = 16px (32px top+bottom). This step
		   can be skipped by subtracting 32px from content var directly. */
		   
		var toolbar = (isIphone()?20:0);
		var contentCurrent = $(".ui-content").outerHeight() - $(".ui-content").height();
		var content = screen - contentCurrent;
		
		$(".ui-content").css('min-height', content + 'px');
		$("#menu-content").css('min-height', (content - footer) + 'px');
		$("#news-popupDialog .ui-content").css('min-height', '300px');
		$("#event-popupDialog .ui-content").css('min-height', '300px');
		$("#lost-popupDialog .ui-content").css('min-height', '300px');
		$('#about-version').text("Version");
		cordova.getAppVersion.getVersionNumber().then(function (version) {
			$('#about-version').text(version);
		});
		getBanner();
		//console.log(cordova.getAppVersion.getVersionNumber());
    }
};
app.initialize();


function isIphone(){
	var sUserAgent = navigator.userAgent.toLowerCase();
	var isIphone = sUserAgent.match(/iphone/i) == "iphone";
	return isIphone;
}

/*首頁上圖 相關方法*/
function getBanner(){
	$.mobile.loading("show",{
		text: '資料載入中請稍後',
		textVisible: true,
		theme: $.mobile.loader.prototype.options.theme,
		textonly: false,
		html: ""
    });
	$.ajax({
		url: 'http://www.knu.edu.tw/knu/page/POR/index.aspx',
		type: 'GET',
		dataType:'text',
		success: function(msg){
			var reg = /^\s*document\.write\(\'.*<a.*href=\"(.*?)\".*<img.*src=\"(.*?)\"/gm;
			var banner_array = [];
			while (match = reg.exec(msg)) {
				banner_array.push(match);
			}
			console.log(banner_array);
			$('#news-content-table').html('');
			$.each(banner_array,function(index,value){//even odd
				$('#banner').append('<div><a href="' + value[1] + '" target="_blank""><img src="http://www.knu.edu.tw/knu/page/POR/' + value[2] + '" width="100%"/></a></div>');
			});
			$.mobile.loading("hide");
			$('#banner').slick({
			  arrows: false,
			  autoplay: true,
			  autoplaySpeed: 2000,
			  fade: true,
			  cssEase: 'linear'
			});
		},
		error:function(xhr, ajaxOptions, thrownError){ 
		}
	});
}

/*最新消息 相關方法*/
function getNews(){
	$.mobile.loading("show",{
		text: '資料載入中請稍後',
		textVisible: true,
		theme: $.mobile.loader.prototype.options.theme,
		textonly: false,
		html: ""
    });
	$.ajax({
		url: 'http://www.knu.edu.tw/knu/page/POR/newslist.aspx',
		type: 'GET',
		dataType:'text',
		success: function(msg){
			var reg = /news_inside.aspx\?sno=(.*?)'.*?>(.*?)<\/a>.*?<\/td>.*?>(.*?)</gm;
			var news_array = [];
			var nowDate = "";
			while (match = reg.exec(msg)) {
				match[2] = match[2].replace(/<br \/>/g, "");
				match[2] = match[2].replace(/<[/]{0,1}span.*?>/g, "");
				match[2] = match[2].replace(/<\/span.*?>/g, "");
				news_array.push(match);
			}
			console.log(news_array);
			$('#news-list').html('');
			$.each(news_array,function(index,value){//even odd
				if(nowDate != value[3]){
					$('#news-list').append('<li data-role="list-divider">' + value[3] + '</li>');
					nowDate = value[3];
				}
				$('#news-list').append('<li><a onclick="getNewsContent(' + value[1] + ',\'' + value[2] + '\')"><h2>' + value[2] + '</h2></li>');
			});
			$("#news-list").listview( "refresh" );
			$.mobile.loading("hide");
		},
		error:function(xhr, ajaxOptions, thrownError){ 
			$('#news-content').text('資料取得失敗' + thrownError);
		}
	});
}

function getNewsContent(newsID,newsTitle){
	$.mobile.loading("show",{
		text: '資料載入中請稍後',
		textVisible: true,
		theme: $.mobile.loader.prototype.options.theme,
		textonly: false,
		html: ""
    });
	$.ajax({
		url: 'http://www.knu.edu.tw/knu/page/POR/news_inside.aspx',
		data: {"sno" : newsID},
		type: 'GET',
		dataType:'text',
		success: function(msg){
			var reg = /<!--.*下圖文處理-->([.\S\D]*?)<\/table>/gm;
			var match;
			
			match = reg.exec(msg);
			
			match[1] = match[1].replace(/\/knu\/PORTAL_FILE/g, "http://www.knu.edu.tw/knu/PORTAL_FILE");
			match[1] = match[1].replace(/<img src/g, "<img class=\"img-responsive\" src");
			$('#news-popupDialog .ui-content').html('');
			$('#news-popupDialog .ui-content').append('<table>' + match[1] + '</table>');
			
			$.mobile.loading("hide");
			$("#news-popupDialog-title").text(newsTitle);
			$("#news-popupDialog").popup("open");
		},
		error:function(xhr, ajaxOptions, thrownError){ 
			$('#news-popupDialog .ui-content').text('資料取得失敗' + thrownError);
			$("#news-popupDialog").popup("open");
		}
	});
}
function closeNewsContent(){
	$("#news-popupDialog").popup("close");
}

/*活動演講 相關方法*/
function getEvent(){
	$.mobile.loading("show",{
		text: '資料載入中請稍後',
		textVisible: true,
		theme: $.mobile.loader.prototype.options.theme,
		textonly: false,
		html: ""
    });
	$.ajax({
		url: 'http://www.knu.edu.tw/knu/page/POR/index.aspx',
		type: 'GET',
		dataType:'text',
		success: function(msg){
			var reg = /<span id="tableEvents" style="display:none;">([.\S\D]*?)<tr><td colspan ='2' align='right'  valign='top'>/gm;
			var match;
			
			match = reg.exec(msg);
			
			match[1] = match[1].replace(/src='..\/images\//g, "src='http://www.knu.edu.tw/knu/page/images/");
			match[1] = match[1].replace(/background='..\/images\//g, "background='http://www.knu.edu.tw/knu/page/images/");
			match[1] = match[1].replace(/ border="0"  width="700"/g, "");
			match[1] = match[1].replace(/href='Calendar_inside\.aspx\?SNO=(.*?)'\s*style.*?>(.*?)<\/a>/g, "onclick=\"getEventContent($1,'$2')\">$2</a>");

			$('#event-content').html('');
			$('#event-content').append(match[1] + '</table>');
			$.mobile.loading("hide");
		},
		error:function(xhr, ajaxOptions, thrownError){ 
			$('#enevt-content').text('資料取得失敗' + thrownError);
		}
	});
}

function getEventContent(eventID,eventTitle){
	$.mobile.loading("show",{
		text: '資料載入中請稍後',
		textVisible: true,
		theme: $.mobile.loader.prototype.options.theme,
		textonly: false,
		html: ""
    });
	$.ajax({
		url: 'http://www.knu.edu.tw/knu/page/POR/Calendar_inside.aspx',
		data: {"sno" : eventID},
		type: 'GET',
		dataType:'text',
		success: function(msg){
			var reg = /<span id="(.*?)">(.*?)<\/span>/gm;
			var reg_img = /<img src='(.*?)'  class='postImg2' \/>/gm;
			var match;
			var event_array = {};
			
			$('#event-popupDialog-table').html('');
			
			while (match = reg.exec(msg)) {
				event_array[match[1]] = match[2];
			}
			
			$.each(event_array,function(key,value){
				if(getEventMap(key) !== false){
					value = value.replace(/<img src=\'\.\.\/images\/private_notice_22.gif' width='16' height='16' align='absmiddle' \/>/,"");
					$('#event-popupDialog-table').append('<tr><td>' + getEventMap(key) + '</td></tr>');
					$('#event-popupDialog-table').append('<tr style="border-bottom-style:solid; border-bottom-width:medium;"><td>' + value + '</td></tr>');
				}
			});
			
			while (match = reg_img.exec(msg)) {
				$('#event-popupDialog-table').append('<tr><td colspan="2"><img src="http://www.knu.edu.tw/' + match[1] + '" class=\"img-responsive\" /></td></tr>');
			}
			$.mobile.loading("hide");
			$("#event-popupDialog").popup("open");
		},
		error:function(xhr, ajaxOptions, thrownError){ 
			$('#event-popupDialog-table').text('資料取得失敗' + thrownError);
			$("#event-popupDialog").popup("open");
		}
	});
}
function closeEventContent(){
	$("#enevt-popupDialog").popup("close");
}
function getEventMap(key){
	switch(key){
		case "M_EVENT_S_DATE":
			return "起始日期";
		case "M_EVENT_E_DATE":
			return "結束日期";
		case "M_EVENT_NAME":
			return "活動名稱";
		case "M_EVENT_LOCATION":
			return "活動地點";
		case "M_PARTICIPANTS":
			return "參加對象";
		case "M_ORGANIZERS":
			return "主辦單位";
		case "M_CONTACT":
			return "聯絡方式";
		case "M_EVENT_LINK":
			return "活動網址";
		case "M_PASSPORT_MK":
			return "學習護照";
		default:
			return false;
	}
}

/*行政單位 相關方法*/
function getAdmin(){
	$.mobile.loading("show",{
		text: '資料載入中請稍後',
		textVisible: true,
		theme: $.mobile.loader.prototype.options.theme,
		textonly: false,
		html: ""
    });
	$.ajax({
		url: 'admin.json',
		type: 'GET',
		dataType:'json',
		success: function(msg){
			$.each(msg,function(index,value){
				if(value.Divider){
					$('#admin-list').append('<li data-role="list-divider"><h2>' + value.Title + '</h2></li>');
				}else{
					$('#admin-list').append('<li data-icon="action"><a href="' + value.URL + '" target="_blank"><h2>' + value.Title + '</h2><p>' + value.Introduction + '</p></a></li>');
				}
			});
			$("#admin-list").listview( "refresh" );
			$.mobile.loading("hide");
		},
		error:function(xhr, ajaxOptions, thrownError){ 
			$('#admin-list').text('資料取得失敗' + thrownError);
		}
	});
}

/*學術單位 相關方法*/
function getAcademic(){
	$.mobile.loading("show",{
		text: '資料載入中請稍後',
		textVisible: true,
		theme: $.mobile.loader.prototype.options.theme,
		textonly: false,
		html: ""
    });
	$.ajax({
		url: 'academic.json',
		type: 'GET',
		dataType:'json',
		success: function(msg){
			$.each(msg,function(index,value){
				$('#academic-list').append('<li data-role="list-divider"><h2>' + value.AcademyTitle + '</h2></li>');
				$.each(value.Department,function(index_d,value_d){
					$('#academic-list').append('<li data-icon="action"><a href="' + value_d.URL + '" target="_blank"><h2>' + value_d.Title + '</h2><p>' + value_d.Introduction + '</p></a></li>');
				});
			});
			$("#academic-list").listview( "refresh" );
			$.mobile.loading("hide");
		},
		error:function(xhr, ajaxOptions, thrownError){ 
			$('#academic-list').text('資料取得失敗' + thrownError);
		}
	});
}



/*公車資訊 相關方法
function gettraffic(){
	$.mobile.loading("show",{
		text: '資料載入中請稍後',
		textVisible: true,
		theme: $.mobile.loader.prototype.options.theme,
		textonly: false,
		html: ""
    });
	$.ajax({
		url: 'bus.json',
		type: 'GET',
		dataType:'json',
		success: function(msg){
			$.each(msg.Line,function(index,value){
				$('#traffic-bus-list').append('<li data-icon="action" ><h2>' + value.Name + '</h2>' + (value.Memo != undefined ? value.Memo : "") + '</p></li>');
					//$.each(msg.Stops,function(index,array){
						//$('#traffic-bus-list').append('<li data-icon="action" >' + value.Name + (value.Memo != undefined ? value.Memo : "") +  + value.Picture + '</li>');
					//};
					$.each(value.TimeTable,function(index_Time,value_Time)){
						$('#traffic-bus-list').append('<li data-icon="action" >' + value.value_Time + '</li>' );
						/*$.each(msg.ToSchool,function(index,value){
							$('#traffic-bus-list').append('<li data-icon="action" >' + value.Time + value.week + '</li>');
						};
					};
			});
			$("#traffic-bus-list").listview( "refresh" );
			$.mobile.loading("hide");
		},
		error:function(xhr, ajaxOptions, thrownError){ 
			$('#traffic-bus-list').text('資料取得失敗' + thrownError);
		}
	});
}

function gettrafficContent(trafficID){
	$.mobile.loading("show",{
		text: '資料載入中請稍後',
		textVisible: true,
		theme: $.mobile.loader.prototype.options.theme,
		textonly: false,
		html: ""
    });
}
function closetrafficContent(){
	$("#traffic-popupDialog").popup("close");
}
*/


/*租屋資訊 相關方法*/
function getLive(){
	$.mobile.loading("show",{
		text: '資料載入中請稍後',
		textVisible: true,
		theme: $.mobile.loader.prototype.options.theme,
		textonly: false,
		html: ""
    });
	
	$.ajax({
		url: 'http://sa.knu.edu.tw/counsel/house.asp',
		type: 'GET',
		dataType:'text',
		success: function(msg){
			
			var reg = /<td.*?>(.*?)<\/td>\s*?<td.*?>(.*?)<\/td>\s*?<td.*?>(.*?)<\/td>\s*?<td.*?>(.*?)<\/td>\s*?<td.*?>(.*?)<\/td>\s*?<td.*?>(.*?)<\/td>\s*?<td.*?>(.*?)<\/td>\s*?<td.*?>([.\D]*?)<\/td>/gm;
			var live_array = [];
			var nowDate = "";
			
			while (match = reg.exec(msg)) {
				//alert(match[1] + match[2] + match[8])
				//if (match[8].indexOf("已通過本校安全評核") > 0) {
					live_array.push(match);
				//}
			}

			$('#live-list').html('');
			$.each(live_array,function(index,value){
				$('#live-list').append('<li><h2>' + value[3] + '</h2><p><strong>房東：' + value[2]  + '</p><p>電話：' + value[4] + '</p><p>數量：' + value[5] + '</p><p>租金：' + value[6] + '</p><p>押金：' + value[7] + '</p><p>' + value[8] +'</p></li>');
			});
			
			$("#live-list").listview( "refresh" );
			$.mobile.loading("hide");
		},
		error:function(xhr, ajaxOptions, thrownError){ 
			$('#live-list').text('資料取得失敗' + thrownError);
		}
	});
}

/*失物招領 相關方法*/
function getLost(){
	$.mobile.loading("show",{
		text: '資料載入中請稍後',
		textVisible: true,
		theme: $.mobile.loader.prototype.options.theme,
		textonly: false,
		html: ""
    });
	//alert("text")
	$.ajax({
		url: 'http://sa.knu.edu.tw/counsel/lost.asp',
		type: 'GET',
		dataType:'text',
		success: function(msg){
			var reg = /<td.*?>(.*?)<\/td>\s*?<td.*?>(.*?)<\/td>\s*?<td.*?>(.*?)<\/td>\s*?<td.*?>(.*?)<\/td>\s*?<td.*?>(.*?)<\/td>\s*?<td.*?>(.*?)<\/td>\s*?<td.*?><span.*?>(.*?)<\/span><\/td>/gm;
			var lost_array = [];

			while (match = reg.exec(msg)) {
				//alert(match)
				//alert(match[2])
				match[2] = match[2].replace(/\/file\/Counsel\/Lost/g, "http://sa.knu.edu.tw/file/Counsel/Lost");
				
				lost_array.push(match);
			}

			$('#lost-list').html('');
			$.each(lost_array,function(index,value){
				$('#lost-list').append('<li><h2>' + value[3] +'</h2><p>照片：' + value[2]  + '</p><p>日期：' + value[4] + '</p><p>地點：' + value[5] + '</p><p>特徵：' + value[6] + '</p><p>狀況：' + value[7] +'</p></li>');
			});

			$("#lost-list").listview( "refresh" );
			$.mobile.loading("hide");
		},
		error:function(xhr, ajaxOptions, thrownError){ 
			$('#lost-list').text('資料取得失敗' + thrownError);
		}
	});
}

/*處理搖一搖相關方法*/
var HOST = "http://211.22.103.176/lanternFestival/";
var SHAKE_THRESHOLD = 3000;
var last_update = 0;
var x= 0,y= 0,z= 0,last_x= 0,last_y= 0,last_z=0;
var watchId;
var shake_count = 0;
var could_shake = false;
//開南大學
//var target_lat = 25.012767;
//var target_lon = 121.269475;
//燈會場地
var target_lat = 25.004652;
var target_lon = 121.20659;
var target_error = 1.5;//誤差6公里，因為展場就長4公里6000
var is_at_target = false;

var crown_top = ["48%","57.5%","67%","76.5%","86%"];

window.listenShake = function(shake_threshold){
	if(!isNaN(shake_threshold))SHAKE_THRESHOLD = parseInt(shake_threshold);
	if (window.DeviceMotionEvent) {// 判断设备标准javascript是否支持加速度API
		window.addEventListener('devicemotion',deviceMotionHandler, false);
		return true;
	} else if(device.isAccelerometerAvailable){ // 如果不支持则判断是否扩展该功能(这个是cordova的扩展方法，其他扩展可以自己再加判断)
		watchId = navigator.accelerometer.watchAcceleration(deviceMotionHandler,null,{frequency: 100});
		return true;
	}
	return false;// 如果不支持会返回false。
};

window.unListenShake = function(){
	window.removeEventListener('devicemotion',deviceMotionHandler, false);
	if(watchId)navigator.accelerometer.clearWatch(watchId);
	watchId = null;
};
	
function deviceMotionHandler(eventData) {
	var acceleration = eventData.accelerationIncludingGravity || eventData;
	var curTime = new Date().getTime();
	if ((curTime - last_update)> 100) {
		var diffTime = curTime -last_update;
		last_update = curTime;
		x = acceleration.x;
		y = acceleration.y;
		z = acceleration.z;
		var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
		if (speed > SHAKE_THRESHOLD) {
			shake_count++;
			$('#shake-count').html(shake_count);
			if(shake_count%5 ===0){
				$.ajax({
					url: HOST+"handle.php?type=3&id=1",
					type: 'GET',
					dataType:'text',
					success: function(msg){},
					error:function(xhr, ajaxOptions, thrownError){}}
				);
			}
		}
		last_x = x;
		last_y = y;
		last_z = z;
	}
}

function distance(lat1,lon1,lat2,lon2) {
 var R = 6371; // km (change this constant to get miles)
 var dLat = (lat2-lat1) * Math.PI / 180;
 var dLon = (lon2-lon1) * Math.PI / 180;
 var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
 var d = R * c;
 return d;
}

function setLikeButton(enable){
	if(enable){
		$("#like-soc").css({"display":""});
		$("#like-sot").css("display","");
		$("#like-soi").css("display","");
		$("#like-sohs").css("display","");
		$("#like-sohm").css("display","");
	}else{
		$("#like-soc").css("display","none");
		$("#like-sot").css("display","none");
		$("#like-soi").css("display","none");
		$("#like-sohs").css("display","none");
		$("#like-sohm").css("display","none");
	}
}

function checkServerData(){
	$.ajax({
		url: HOST+'handle.php?type=8&uuid='+device.uuid+'&id=1',
		type: 'GET',
		dataType:'text',
		success: function(msg){
			var vote_result = msg.split(",");
			if(is_at_target){
				//可否開始搖一搖
				if(vote_result[0] == "1"){
					$("#shake-count").html("");
					window.listenShake();
					could_shake = true;
				}else{
					$("#shake-count").html("搖一搖還沒開始唷");
					could_shake = false;
				}
				//可否參加投票
				if(vote_result[1] == "1"){
					setLikeButton(true);
				}else{
					setLikeButton(false);
				}
			}else{
				could_shake = false;
				setLikeButton(false);
				$("#shake-count").html("請到燈會現場唷");
				alert("您現在位置不在燈會現場，所以不能參加搖一搖和投票活動唷");
			}
			
			var votes_arr = [parseInt(vote_result[2],10),parseInt(vote_result[3],10),parseInt(vote_result[4],10),parseInt(vote_result[5],10),parseInt(vote_result[6],10)];
			var max_vote = 0;
			var max_idx = -1;
			for(var i=0;i<votes_arr.length;i++){
				if(votes_arr[i]>max_vote){
					max_vote = votes_arr[i];
					max_idx = i;
				}
			}
			if(max_idx<0){
				$("#crown").css("display","none");
			}else{
				$("#crown").css("display","inline");
				$("#crown").css("top",crown_top[max_idx]);
			}
			
			$("#vote-soc").html(vote_result[2]);
			$("#vote-sot").html(vote_result[3]);
			$("#vote-soi").html(vote_result[4]);
			$("#vote-sohs").html(vote_result[5]);
			$("#vote-sohm").html(vote_result[6]);
			$.mobile.loading("hide");
		},
		error:function(xhr, ajaxOptions, thrownError){ 
			$.mobile.loading("hide");
			alert('資料取得失敗' + thrownError);
			history.back();
		}
	});
}

function checkShake(){
	//清空欄位
	$("#shake-count").html("");
	$("#vote-soc").html("");
	$("#vote-sot").html("");
	$("#vote-soi").html("");
	$("#vote-sohs").html("");
	$("#vote-sohm").html("");
	$.mobile.loading("show",{
		text: '資料載入中請稍後',
		textVisible: true,
		theme: $.mobile.loader.prototype.options.theme,
		textonly: false,
		html: ""
    });
	
	if(is_at_target){
		checkServerData();
	}else{
		navigator.geolocation.getCurrentPosition(
			function(position){
				if(distance(position.coords.latitude,position.coords.longitude,target_lat,target_lon) < target_error){
					is_at_target = true;
				}else{
					is_at_target = false;
				}
				checkServerData();
			},
			function(error){
				$.mobile.loading("hide");
				alert('尋找當前座標錯誤 \n code: '+ error.code + '\n' + 'message: ' + error.message + '\n');
				history.back();
			});
	}
	
}
