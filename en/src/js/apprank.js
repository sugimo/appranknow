// JavaScript Document
$(function(){
	var count = 100;
	var windowWidth = $(window).width()
	var windowHeight = $(window).height();
	var genrename = $("#genreChanger").find(':selected').text();
	var _countryJP = $("#jp");
	var _countryUS = $("#us");
	var url = location.href;

//getParam
if(url.indexOf("?")==-1){
	var countryKey = "en";
}else{
	var countryKey = getParam();
	function getParam() {
			parameters = url.split("?");
			params = parameters[1].split("&");
			var paramsArray = [];
			for ( i = 0; i < params.length; i++ ) {
				neet = params[i].split("=");
				paramsArray.push(neet[0]);
				paramsArray[neet[0]] = neet[1];
			}
			var countryKey = paramsArray["country"];
		return countryKey;
	}
}


//json core
function core(){
  $("#target> *").remove();
  $("#target").hide();
  $("#loading").show();
  genrename = $("#genreChanger").find(':selected').text();
  $("#categolyName").text(genrename);
  $("#countryName").text(countryKey);
  $.ajax({
    type: "GET",
    scriptCharset: 'utf-8',
    dataType:'json', 
    url: "http://itunes.apple.com/" + countryKey + "/rss/" + type + "/limit=" + count + "/genre=" + genrecode + "/json",
    success: function(json){
		$("#loading").fadeOut();
		$("#target").fadeIn("slow");
		for(var i = 0; i < count; i++) {
		$("#target").append(
		"<a href='" + json.feed.entry[i]["id"]["label"] + '&at=11l4Yj' +//URL
		"' target='_blank'><section id='t"+ parseInt(i+1)+"' class='cst'><img src='" + json.feed.entry[i]["im:image"][2]["label"] +"' class='icon' />" + //ランク
		"<div class='in'><h3 class='h3appName'>" + parseInt(i+1) + "."  +//画像
		json.feed.entry[i]["im:name"]["label"] + 
		"</h3><p class='appDetail'>"+ json.feed.entry[i]["im:artist"]["label"] + "</p><p class='appDetail'>"+ json.feed.entry[i]["im:price"]["label"] + "</p></div></section></a>");//名称
		}
    },
    error:function(){}
	});
};

//

////////////////////
_countryJP.click(function(){
	$("ul#countryList").find("li").removeClass();
	countryKey = "jp";
	_countryJP.addClass("currentU");
	core();
	switcher();
});

_countryUS.click(function(){
	$("ul#countryList").find("li").removeClass();
	countryKey = "us";
	_countryUS.addClass("currentU");
	core();
	switcher();
});



////////////////////
var flag = "OFF";

function switcher(){					  
	
	if(flag == "OFF"){
		$("#container").animate({"left": "0"}, 200);
		$("#container").css("height", $(window).height()-50);
		$("#universalMenu").css("height", $(window).height()-50);
		$("body").css("width", $(window).width());
		$("#container").css("overflow","hidden");
		flag = "ON";
	}else if(flag == "ON"){
		$("#container").css("height", "");
		$("body").css("width", "100%");
		$("#container").css("overflow-y","");
		$("#container").css("overflow-x","");
		flag = "OFF";
		$("#container").animate({"left": "-250px"}, 200);
	}
	
};

$("#slideBtn").click(function(){
	switcher();
});

////////////////////
$("#feedFree").click(function(){
	$("ul#feed").find("li").removeClass();
	type = "topfreeapplications";
	$("#feedFree").addClass("current");
	$("#feedName").text("[iPhone]Free");
	core();
});


$("#feedPaid").click(function(){
	$("ul#feed").find("li").removeClass();
	type = "toppaidapplications";
	$("#feedPaid").addClass("current");
	$("#feedName").text("[iPhone]Paid");
	core();
});


$("#feedGross").click(function(){
	$("ul#feed").find("li").removeClass();
	type = "topgrossingapplications";
	$("#feedGross").addClass("current");
	$("#feedName").text("[iPhone]Grossing");
	core();
});

////////////////////
$("#displayNum100").click(function(){
	$("ul#displayNum").find("li").removeClass();
	count = 100;
	$("#displayNum100").addClass("currentU");
	switcher();
	core();
});

$("#displayNum200").click(function(){
	$("ul#displayNum").find("li").removeClass();
	count = 200;
	$("#displayNum200").addClass("currentU");
	switcher();
	core();
});

$("#displayNum400").click(function(){
	$("ul#displayNum").find("li").removeClass();
	count = 400;
	$("#displayNum400").addClass("currentU");
	switcher();
	core();
});

//////////////////
$("#genreChanger").change(function(){
	genrecode = $("#genreChanger").val();
	$(this).blur();
	switcher();
	core();
});

$("#countryChanger").change(function(){
	$("ul#countryList").find("li").removeClass();
	countryKey = $("#countryChanger").val();
	$(this).blur();
	switcher();
	core();
});

//
core();
//

});
