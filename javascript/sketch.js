//ページスクロールリンク
$(function(){
  $('a[href^="#"]').click(function(){
    var adjust = 35;
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top + adjust;
    $('html, body').animate({scrollTop:position}, speed, "swing");
    return false;
  });
});
//単語リスト
var arr1 = [

  /なるほど/g,
/大丈夫/g,
/それでいいです/g,
/みんな/g,
/ぶっちゃけ/g,
/教えて/g,
/忘れて/g,
/気にしないでください/g,
/ですか？/g,
/確認/g,
/お願いして/g,
/暇/g,
/の時/g,
/くれると/g,
/どうぞ/g,
/手伝って/g,
/覚えておいて/g,
/ごめんなさい/g,
/できません/g,
/苦手なので/g,
/苦手なため/g,
/ちょっと/g,
/本当に/g,
/中止/g,
/嬉しいです/g,
/おめでとうございます/g,
/頑張り/g,
/普通/g,
/残念です/g,
/やりたくない/g,
/モヤモヤ/g,
/放っておけ/g,
/思います/g,
/思っています/g,
/思って/g,
/確かに/g,
/超/g,
/ほんのわずか/g,
/１つ１つ/g,
/だいたい/g,
/大体/g,
/とりあえず/g,
/わかりました/g,
/役立てる/g,
/役に立つ/g,
/役に立てるように/g,
/ご苦労さま/g,
/了解/g,
/ご一緒させて/g,
/お分かりいただけ/g,
/ご持参/g,
/な時/g,
/ご苦労様/g,

  ];
var arr2 = [

  "おっしゃる通りです",
"問題ございません",
"異存はございません",
"みなさん",
"正味のところ",
"ご教示",
"失念して",
"ご放念ください",
"でしょうか？",
"確認のほど",
"お使いたてして",
"お手すき",
"の際",
"いただけると",
"何卒",
"お力をお貸し",
"お見知り置き",
"申し訳ありません",
"しかねます",
"不調法なもので",
"不調法なもので",
"少々",
"平に",
"お蔵入り",
"冥利につきます",
"慶賀に耐えません",
"尽力し",
"月並み",
"遺憾に思います",
"気が進まない",
"しこり",
"看過でき",
"存じます",
"考えております",
"考え",
"正に",
"極めて",
"申し訳程度",
"逐一",
"概ね",
"概ね",
"さしずめ",
"承知しました",
"資する",
"資する",
"資することができるよう",
"お疲れ様",
"承知",
"お供させて",
"ご理解いただけ",
"お持ちになって",
"の際",
"お疲れ様",

  ];
var arr3 = [

  "なるほど",
  "大丈夫",
  "それでいいです",
  "みんな",
  "ぶっちゃけ",
  "教えて",
  "忘れて",
  "気にしないでください",
  "ですか？",
  "確認",
  "お願いして",
  "暇",
  "の時",
  "くれると",
  "どうぞ",
  "手伝って",
  "覚えておいて",
  "ごめんなさい",
  "できません",
  "苦手なので",
  "苦手なため",
  "ちょっと",
  "本当に",
  "中止",
  "嬉しいです",
  "おめでとうございます",
  "頑張り",
  "普通",
  "残念です",
  "やりたくない",
  "モヤモヤ",
  "放っておけ",
  "思います",
  "思っています",
  "思って",
  "確かに",
  "超",
  "ほんのわずか",
  "１つ１つ",
  "だいたい",
  "大体",
  "とりあえず",
  "わかりました",
  "役立てる",
  "役に立つ",
  "役に立てるように",
  "ご苦労さま",
  "了解",
  "ご一緒させて",
  "お分かりいただけ",
  "ご持参",
  "な時",
  "ご苦労様",

  ];

//翻訳作業

function update_field() {

  var text  = $('textarea[name="text"]').val();

  document.getElementById("output").innerHTML = text;
//改行を<brに変換>
  $("#output").html(text.replace(/\r?\n/g, '<br>'));

//覚えておきたい語句
     for(h=0, len=arr1.length; h<len; h++){
       if(text.match(arr1[h])) {
         // 対応する文字、リンク表示
         document.getElementById("output_alter").innerHTML = arr3[h];
         document.getElementById("output_alter2").innerHTML = arr2[h];


         //ボックスを複製
       let boxes = document.getElementById("boxes");
       let clone = boxes.firstElementChild.cloneNode(true);
       boxes.appendChild(clone);
       clone.id = "content_area" + h;
       $('#content_area26 .saiyou_title').attr('id', 'saiyou_title'+h);
       setSwipe("#content_area" + h);

       };
     };
  // 前の語句〜後の語句を削除
    document.getElementById("boxes_none").style.display ="none";

   };



//コピー要素
function clipboard_ni_copy2()
{
    var copyText = document.querySelector('#output');

    var range = document.createRange();
    range.selectNodeContents(copyText);

    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    if(document.execCommand('copy')) {
        alert('クリップボードにコピーしました.');
    } else {
        alert('Ctrl+Cを押してください.');
    }
}

//スワイプ処理

function setSwipe(elem) {
    let t = document.querySelector(elem);
    let res = t.id.replace(/[^0-9]/g, '');  // 数字のみ取り出す
    let startX;        // タッチ開始 x座標
    let startY;        // タッチ開始 y座標
    let moveX;    // スワイプ中の x座標
    let moveY;    // スワイプ中の y座標
    let dist = 30;
    t.addEventListener("touchstart", function(e) {
        e.preventDefault();
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
    });

    // スワイプ中： xy座標を取得
    t.addEventListener("touchmove", function(e) {
        e.preventDefault();
        moveX = e.changedTouches[0].pageX;
        moveY = e.changedTouches[0].pageY;
    });

    // タッチ終了時： スワイプした距離から左右どちらにスワイプしたかを判定する/距離が短い場合何もしない
    t.addEventListener("touchend", function(e) {
        if (startX > moveX && startX > moveX + dist) {        // 右から左にスワイプ
            // 右から左にスワイプした時の処理(不採用)
            $('#saiyou_title'+res).html("不採用");

            // 語句を置換する
            var txt = $('#output').html();
            $('#output').html(
              txt.replace('<span class="kaisei">' + arr2[res]+ '</span>',
                arr3[res])
            );

            // boxの変化
            console.log("hidari");
            $('#content_area'+res).css({
               'background-color' : '#F9CADE' ,
               'font-size' : '20px' ,
               'opacity' : '0.8' ,
              'margin-left' : '0'});

            $('#saiyou_title'+res).css({
               'color' : '#FF7BA8',
              'opacity' : '1'});
        }
        else if (startX < moveX && startX + dist < moveX) {    // 左から右にスワイプ
            // 左から右にスワイプした時の処理(採用)

            console.log("migi");
            $('#saiyou_title'+res).html("採用");

            // 語句を置換する
            var txt = $('#output').html();
            $('#output').html(
              txt.replace(arr1[res],
                  '<span class="kaisei">' + arr2[res]+ '</span>')
            );

            // boxの変化
            $('#content_area'+res).css({
               'background-color' : '#C2EDF9' ,
               'font-size' : '20px' ,
               'opacity' : '0.8' ,
              'margin-right' : '0'});

            $('#saiyou_title'+res).css({
               'color' : '#29A8DF',
             'opacity' : '1'});
        }
    });
}
