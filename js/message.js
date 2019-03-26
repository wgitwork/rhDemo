var hid = localStorage.getItem("hid");
var uname = localStorage.getItem("uname");
console.log(hid);
var access_token = localStorage.getItem("access_token");

var conn = {};
var firends=[];
conn = new WebIM.connection({
	isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
	https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
	url: WebIM.config.xmppURL,
	isAutoLogin: false,
	heartBeatWait: WebIM.config.heartBeatWait,
	autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
	autoReconnectInterval: WebIM.config.autoReconnectInterval,
	apiUrl: WebIM.config.apiURL
});
conn.listen({
	onOpened: function(message) { //杩炴帴鎴愬姛鍥炶皟锛岃繛鎺ユ垚鍔熷悗鎵嶅彲浠ュ彂閫佹秷鎭�
		//濡傛灉isAutoLogin璁剧疆涓篺alse锛岄偅涔堝繀椤绘墜鍔ㄨ缃笂绾匡紝鍚﹀垯鏃犳硶鏀舵秷鎭�
		// 鎵嬪姩涓婄嚎鎸囩殑鏄皟鐢╟onn.setPresence(); 鍦ㄦ湰渚嬩腑锛宑onn鍒濆鍖栨椂宸插皢isAutoLogin璁剧疆涓簍rue
		// 鎵€浠ユ棤闇€璋冪敤conn.setPresence();
		console.log("%c [opened] 杩炴帴宸叉垚鍔熷缓绔�", "color: green");
		// getRoasters();
		conn.setPresence();
	},
	onTextMessage: function(message) {
		// 鍦ㄦ鎺ユ敹鍜屽鐞嗘秷鎭紝鏍规嵁message.type鍖哄垎娑堟伅鏉ユ簮锛岀鑱婃垨缇ょ粍鎴栬亰澶╁
		console.log(message);
		console.log(message.type);
		console.log(message.type.text);
		// setTimeout(function(){
			var div = document.getElementById('ly');
			detailMessage(message.data,message.from,message.to,'chat',message.id,'');
        	// showMessage(message.data);
        	showHandleTextMessage(message);
        	div.scrollTop = div.scrollHeight;
		// },0)
		
	}, //鏀跺埌鏂囨湰娑堟伅
	onEmojiMessage: function(message) {
		// 褰撲负WebIM娣诲姞浜咵moji灞炴€у悗锛岃嫢鍙戦€佺殑娑堟伅鍚玏ebIM.Emoji閲岀壒瀹氱殑瀛楃涓诧紝connection灏变細鑷姩灏�
		// 杩欎簺瀛楃涓插拰鍏跺畠鏂囧瓧鎸夐『搴忕粍鍚堟垚涓€涓暟缁勶紝姣忎竴涓暟缁勫厓绱犵殑缁撴瀯涓簕type: 'emoji(鎴栬€卼xt)', data:''}
		// 褰搕ype='emoji'鏃讹紝data琛ㄧず琛ㄦ儏鍥惧儚鐨勮矾寰勶紝褰搕ype='txt'鏃讹紝data琛ㄧず鏂囨湰娑堟伅
		console.log('Emoji');
		// var data = message.data;
		// for(var i = 0, l = data.length; i < l; i++) {
		// 	console.log(data[i]);
		// }
		for(var i=0;i<message.data.length;i++){
            var img = message.data[i];
            var string;
            if (img.type=='txt') {string = string+img.data;}
            else{string = string+'<img class="emoji" '+'src="'+img.data +'">';}
        }
        string = string.replace('undefined','');
        console.log(string);
        detailMessage(string,message.from,'text',message.id,'');
        showMessage(message.from);
	}, //鏀跺埌琛ㄦ儏娑堟伅
	onPictureMessage: function(message) {
		console.log(message);
		var div = document.getElementById('ly');
		// WebIM.utils.download.call(conn, options); // 鎰忎箟寰呮煡
		detailMessage(message.url,message.from,message.to,'picture',message.id,'');
        handleTextMessage(message.url);
        div.scrollTop = div.scrollHeight;

	}, //鏀跺埌鍥剧墖娑堟伅
	onCmdMessage: function(message) {
		console.log('CMD');
	}, //鏀跺埌鍛戒护娑堟伅
	onAudioMessage: function(message) {
		console.log("Audio");
	}, //鏀跺埌闊抽娑堟伅
	onLocationMessage: function(message) {
		console.log("Location");
	}, //鏀跺埌浣嶇疆娑堟伅
	onFileMessage: function(message) {
		console.log("File");
	}, //鏀跺埌鏂囦欢娑堟伅
	onVideoMessage: function(message) {
		var node = document.getElementById('privateVideo');
		var option = {
			url: message.url,
			headers: {
				'Accept': 'audio/mp4'
			},
			onFileDownloadComplete: function(response) {
				var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
				node.src = objectURL;
			},
			onFileDownloadError: function() {
				console.log('File down load error.')
			}
		};
		WebIM.utils.download.call(conn, option);
	}, //鏀跺埌瑙嗛娑堟伅
	onPresence: function(message) {
		switch(message.type) {
			case 'subscribe': // 瀵规柟璇锋眰娣诲姞濂藉弸
				// 鍚屾剰瀵规柟娣诲姞濂藉弸
				document.getElementById('agreeFriends').onclick = function(message) {
					conn.subscribed({
						to: 'asdfghj',
						message: "[resp:true]"
					});
				};
				// 鎷掔粷瀵规柟娣诲姞濂藉弸
				document.getElementById('rejectFriends').onclick = function(message) {
					conn.unsubscribed({
						to: message.from,
						message: "rejectAddFriend" // 鎷掔粷娣诲姞濂藉弸鍥炲淇℃伅
					});
				};

				break;
			case 'subscribed': // 瀵规柟鍚屾剰娣诲姞濂藉弸锛屽凡鏂瑰悓鎰忔坊鍔犲ソ鍙�
				break;
			case 'unsubscribe': // 瀵规柟鍒犻櫎濂藉弸
				break;
			case 'unsubscribed': // 琚嫆缁濇坊鍔犲ソ鍙嬶紝鎴栬瀵规柟鍒犻櫎濂藉弸鎴愬姛
				break;
			case 'memberJoinPublicGroupSuccess': // 鎴愬姛鍔犲叆鑱婂ぉ瀹�
				console.log('join chat room success');
				break;
			case 'joinChatRoomFaild': // 鍔犲叆鑱婂ぉ瀹ゅけ璐�
				console.log('join chat room faild');
				break;
			case 'joinPublicGroupSuccess': // 鎰忎箟寰呮煡
				console.log('join public group success', message.from);
				break;
			case 'createGroupACK':
				conn.createGroupAsync({
					from: message.from,
					success: function(option) {
						console.log('Create Group Succeed');
					}
				});
				break;
		}
	}, //鏀跺埌鑱旂郴浜鸿闃呰姹傦紙鍔犲ソ鍙嬶級銆佸鐞嗙兢缁勩€佽亰澶╁琚涪瑙ｆ暎绛夋秷鎭�
	onRoster: function(message) {
		console.log('Roster');
	}, //澶勭悊濂藉弸鐢宠
	onInviteMessage: function(message) {
		console.log('Invite');
	}, //澶勭悊缇ょ粍閭€璇�
	onOnline: function() {
		console.log('onLine');
	}, //鏈満缃戠粶杩炴帴鎴愬姛
	onOffline: function() {
		console.log('offline');
	}, //鏈満缃戠粶鎺夌嚎
	onError: function(message) {
		console.log('Error');
		console.log(message);
		if(message && message.type == 1) {
			console.warn('杩炴帴寤虹珛澶辫触锛佽纭鎮ㄧ殑鐧诲綍璐﹀彿鏄惁鍜宎ppKey鍖归厤銆�')
		}
	}, //澶辫触鍥炶皟
	onBlacklistUpdate: function(list) {
		// 鏌ヨ榛戝悕鍗曪紝灏嗗ソ鍙嬫媺榛戯紝灏嗗ソ鍙嬩粠榛戝悕鍗曠Щ闄ら兘浼氬洖璋冭繖涓嚱鏁帮紝list鍒欐槸榛戝悕鍗曠幇鏈夌殑鎵€鏈夊ソ鍙嬩俊鎭�
		console.log(list);
	} // 榛戝悕鍗曞彉鍔�
});
// 鍒濆鍖朩ebRTC Call
var rtcCall = null
if(WebIM.WebRTC) {
	rtcCall = new WebIM.WebRTC.Call({
		connection: conn,

		mediaStreamConstaints: {
			audio: true,
			video: true
		},

		listener: {
			onAcceptCall: function(from, options) {
				console.log('onAcceptCall::', 'from: ', from, 'options: ', options);
			},
			onGotRemoteStream: function(stream, streamType) {
				console.log('onGotRemoteStream::', 'stream: ', stream, 'streamType: ', streamType);
				var video = document.getElementById('video');
				video.srcObject = stream;
			},
			onGotLocalStream: function(stream, streamType) {
				console.log('onGotLocalStream::', 'stream:', stream, 'streamType: ', streamType);
				var video = document.getElementById('localVideo');
				video.srcObject = stream;
			},
			onRinging: function(caller) {
				console.log('onRinging::', 'caller:', caller);
			},
			onTermCall: function(reason) {
				console.log('onTermCall::');
				console.log('reason:', reason);
			},
			onIceConnectionStateChange: function(iceState) {
				console.log('onIceConnectionStateChange::', 'iceState:', iceState);
			},
			onError: function(e) {
				console.log(e);
			}
		}
	});
} else {
	console.warn('涓嶈兘杩涜瑙嗛閫氳瘽锛佹偍鐨勬祻瑙堝櫒涓嶆敮鎸亀ebrtc鎴栬€呭崗璁笉鏄痟ttps銆�')
}
//	var unames=localStorage.getItem('uname');
	var unames='1';
//	var pwds=localStorage.getItem('upwd');
	var pwds='123456';
    var options = { 
    apiUrl: WebIM.config.apiURL,
      user: unames,
      pwd: pwds,
      appKey: WebIM.config.appkey,
      success: function(res) {
          //鐧诲綍鎴愬姛鍚庤烦杞埌涓婚〉
          // console.log(res);
          // console.log(res.access_token)
        localStorage.setItem("hid",res.user.uuid);
         // localStorage.setItem("access_token",res.access_token)
      },
      error: function(res) {
          console.info(res)
      }
    };
    conn.open(options);

// function getRoasters() {
// 	curUserId = conn.context.userid;
// 	var option = {
// 		success: function(roster) {
// 			// roster鏄墍鏈夊ソ鍙嬶紝鏍煎紡涓猴細
// 			/*
// 			 [
// 			 {
// 			 jid:"easemob#chatdemoui_test1@easemob.com",
// 			 name:"test1",
// 			 subscription: "both"
// 			 // subscription鐨勫€肩殑闆嗗悎鏄瘂both, to, from, none},
// 			 // both琛ㄧず浜掔浉鍦ㄥ鏂圭殑濂藉弸鍒楄〃涓紝
// 			 // to 鍜� from鎰忎箟寰呭畾
// 			 // 濡傛灉娣诲姞瀵规柟涓哄ソ鍙嬭鎷掔粷鍒欎负none
// 			 }
// 			 ]
// 			 */
// 			console.log(roster);
// 			var jid;
// 			var name;
// 			var subscription;
// 			var tempHTML="";
// 			for(var o in roster) {
// 				jid=roster[o].jid;
// 				name=roster[o].name;
// 				subscription=roster[o].subscription;
// 				tempHTML+='<ul style="padding:3%;height: 40px;background: white;border-bottom: 1px solid #f7f7f7"><li style="width: 40px;height: 40px;text-align: center;line-height: 40px;border:1px solid #ccc;border-radius: 50%;float: left;">濮�</li><li style="float: left;margin-left: 2%;"><p style="line-height: 25px">'+ name +'</p><p style="margin-top: 1%;">'+ name +'</p></li><li style="float: right;font-size: 24px;line-height: 40px;color: #ccc" class="ion-ios-telephone"></li></ul>';
// 			}
// 			$('.content').html(tempHTML);
// 		}
// 	};
// 	conn.getRoster(option);
// };

// 鍗曡亰鍙戦€佹枃鏈秷鎭�
