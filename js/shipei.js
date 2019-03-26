(function(doc, win) {
    var docEl = doc.documentElement, // 鑾峰彇html瀵硅薄
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize', // 妯睆鏄惁鏀寔锛屼笉鏀寔鍒欎负娴忚鍣ㄥぇ灏忔敼鍙�

        // 璁＄畻椤甸潰瀛椾綋澶у皬
        recalc = function() {
            // 鑾峰彇椤甸潰瀹藉害
            var clientWidth = docEl.clientWidth;
            // 鑾峰彇涓嶅埌椤甸潰瀹藉害锛岀洿鎺ヨ繑鍥�
            if (!clientWidth) return;
            // 璁剧疆html瀛椾綋澶у皬(娴忚鍣ㄩ粯璁ゅ瓧浣撳ぇ灏忎负16px)
            docEl.style.fontSize = clientWidth / 375 * 16 + "px";
        };
    // 涓嶆敮鎸乤ddEventListener,杩斿洖
    if (!doc.addEventListener) return;
    // 鐩戝惉浜嬩欢锛岃幏鍙栧綋鍓峢tml鏍囩鐨勫瓧浣撳ぇ灏�
    win.addEventListener(resizeEvt, recalc, false);
    // dom鍐呭鍔犲湪瀹屾垚浜嬩欢
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);