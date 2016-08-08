/*首页的js*/
$(".header_cart").hover(function(){//鼠标移入购物车
	$(this).find("a").css( {
		"color":"#f00",
		"background-color":"#fff"
	} );
	$(this).find("p").css("height","100px");
},function(){//移出购物车
	$(this).find("a").css( {
		"color":"",
		"background-color":""
	} );
	$(this).find("p").css("height","0");
})
$("#header").find(".head_input1").focus(function(){  //获取焦点
	$(this).css('border-color','#ff6700');
	$(".head_input2").css('border-color','#ff6700');
	$(".head_form").find(".detalist").show();

	
})
var onoff= true;//用于确定列表的显示和隐藏

$("#header").find(".head_input1").blur(function(){  //失去焦点
	$(this).css('border-color','');
	$(".head_input2").css('border-color','');
	if(onoff){
		$(".head_form").find(".detalist").hide();
	}
})
$(".detalist").mouseover(function(){//鼠标移入列表
	onoff = false;
});
$(".detalist").mouseout(function(){//鼠标移出列表
	onoff = true;
})
$(".detalist").find("li").each(function(){//鼠标移入列表点击之后再隐藏列表
	$(this).click(function(){
		$(".detalist").hide();
	})
})
var timer = null;//延时定时器开关

$(".head_nav li").not(".noselect").hover(function(){//鼠标移入设置下拉菜单的边框和高度
	clearTimeout(timer);
	$(".details").css("border-top","1px solid #e0e0e0").stop().animate( {height:"230px"} ).find("li").eq($(this).index()).show().siblings().hide();
},function(){//鼠标离开延时消失
	fnHide();
})

$(".details li").hover(function(){//鼠标移入菜单 清除延时定时器
	clearTimeout(timer);
},function(){//鼠标离开 开启延时定时器
	fnHide();
})

function fnHide(){//延时隐藏函数
	timer = setTimeout(function(){
		$(".details").css("border-top","").stop().animate( {height: 0} ).find("li").hide();
	},100)
}

//banner区域
$(".aside_txt").find(".topic").hover(function(){
	$(this).find(".children_list").show();
},function(){
	$(this).find(".children_list").hide();
})

var _index = 0;
var oTimer = null; //控制banner的自动播放
$(".banner_img").hover(function(){
	clearInterval( oTimer );
},function(){
	//主动触发事件
	oTimer=setInterval(function(){$(".banner_img .btnright").trigger("click")},2000);
//	oTimer = setInterval(function(){//循环播放
//		fnNext();
//	},2000)
})
$(".banner_img .btnright").click(function(){//banner 右按钮
	fnNext();
	
})

$(".banner_img .btnleft").click(function(){//banner 左按钮
	fnPrev();
	
})
$(".banner_btn").find("li").hover(function(){//banner底部按钮
	$(this).css("background-color","#f2f2f2");
},function(){
	$(this).css("background-color","");
})
//主动触发事件
oTimer=setInterval(function(){$(".banner_img .btnright").trigger("click")},2000);
//oTimer = setInterval(function(){//循环播放
//	fnNext();
//},2000)
function fnNext(){
	_index++;
	if(_index==$(".banner_img_list li").length){
		_index = 0;
	}
	fnDo();
}
function fnPrev(){
	_index--;
	if(_index<0){
		_index = $(".banner_img_list li").length-1;
	}
	fnDo();
}
function fnDo(){
	$(".banner_img_list li").eq(_index).css("left","0").fadeIn().siblings().fadeOut();
	$(".banner_btn li").eq(_index).addClass("active").siblings().removeClass();
}
//banner底部小圆点切换
$(".banner_btn li").click(function(){
	
	if( _index != $(this).index() ){//判断当前点（$(this).index()）和之前点（_index）
		var m = _index < $(this).index() ? 1 : -1;
		var oneWidth = $(".banner_img_list li").width();
		
		$(".banner_img_list li").eq(_index).animate({"left":-m*oneWidth},function(){
			$(this).hide();
		}).end().eq( $(this).index() ).show().css("left",m*oneWidth).animate({"left":0})
		
		_index = $(this).index();//将当前点赋值给之前点供下次切换比较大小时实用
		$(this).addClass("active").siblings().removeClass("active");
	}
})

//明星产品切换
$("#star_goods .more").find("a").click(function(){
	if( $(this).not(".not_select") ){
		//$(".goods_box").find("ul").animate({"margin-left":-1240*$(this).index()+"px"});
		$(".goods_box").find("ul").css("margin-left",-1240*$(this).index()+"px");
		$(this).addClass("current").siblings().removeClass("current");
		
	}
})


$("#collocation .more a").mouseover(function(){
	$(this).addClass("current_item").siblings().removeClass("current_item");
	$("#collocation .content_right ul").eq($(this).index()).show().siblings().hide();
})

function changeHeight(oLi,oDiv){//各个部分 鼠标显示评价信息函数封装
	$(oLi).hover(function(){//鼠标移入显示评价信息
		$(this).find(oDiv).css("height","80px");
	},function(){//鼠标移出隐藏评价信息
		$(this).find(oDiv).css("height","0");
	})
}
changeHeight("#collocation .content_right ul li",".comment_content");
changeHeight("#parts .content_right ul li",".comment_content");
changeHeight("#around .content_right ul li",".comment_content");

function fnTab(objOA,objUl){//各个部分选项切换
	objOA.mouseover(function(){
		$(this).addClass("current_item").siblings().removeClass("current_item");
		objUl.eq($(this).index()).show().siblings().hide();
	})
}

fnTab( $("#collocation .more a"),$("#collocation .content_right ul") );
fnTab( $("#parts .more a"),$("#parts .content_right ul") );
fnTab( $("#around .more a"),$("#around .content_right ul") );

//为你推荐
var count = 0;//用于计数
$("#recommend .more a").eq(1).click(function(){//左按钮
	count++;
	if(count==3){
		
		$(this).addClass("current").siblings().removeClass("current");
	
	}else if(count>3){
		count = 3;
		return;
	}
	$("#recommend .goods_box").find("ul").css("left",-1240*count+"px");
})
$("#recommend .more a").eq(0).click(function(){//右按钮
	count--;
	if(count<0){
		count = 0;
		return;
	}else if(count==0){
		
		$(this).addClass("current").siblings().removeClass("current");
	}
	$("#recommend .goods_box").find("ul").css("left",-1240*count+"px");
})

////内容
//
//function tab( obj ){//内容区域图片切换函数封装
//	obj.iNum = 0;//计数
//	obj.hover(function(){//鼠标移入显示按钮
//		$(this).find(".con_btn").find("a").show();
//	},function(){//鼠标移出隐藏按钮
//		$(this).find(".con_btn").find("a").hide();
//	})
//	
//	obj.find(".con_btn").find(".nextBtn").click(function(){//右按钮切换
//		obj.iNum++;
//		if(obj.iNum>3){
//			obj.iNum = 3;
//			return;
//		}
//		tabSelect();
//	})
//	obj.find(".con_btn").find(".prevBtn").click(function(){//左按钮切换
//		obj.iNum--;
//		if(obj.iNum<0){
//			obj.iNum = 0;
//			return;
//		}
//		tabSelect();
//	})
//	
//	function tabSelect(){//切换函数封装
//		obj.find("ul").css("left",-296*obj.iNum+"px")
//		obj.find(".dotBtn li").eq(obj.iNum).addClass("on").siblings().removeClass("on");
//	}
//	
//	obj.find(".dotBtn li").click(function(){//底部圆点切换
//		obj.iNum = $(this).index();
//		tabSelect();
//	})
//}
//
//tab( $(".content_list_con1") );
//tab( $(".content_list_con2") );
//tab( $(".content_list_con3") );
//tab( $(".content_list_con4") );

//闭包写法  内容区域图片切换
$("#content").find(".content_list ").find("li").each(function(i,elem){
	(function (obj){
		var iNum=0;
		obj.hover(function(){//鼠标移入显示按钮
			$(this).find(".con_btn").find("a").show();
		},function(){//鼠标移出隐藏按钮
			$(this).find(".con_btn").find("a").hide();
		})
		obj.find(".nextBtn").click(function(){
			if(iNum<3){
				iNum++;
				fntab();
			}
		})
		obj.find(".prevBtn").click(function(){
			if(iNum>0){
				iNum--;
				fntab();
			}
		})

		obj.find(".dotBtn").find("li").click(function(){
			iNum=$(this).index();
			fntab();
		})

		function fntab(){
			obj.find(".content_scroll").css("left",-296*iNum+"px");
			obj.find(".dotBtn").find("li").eq(iNum).addClass("on").siblings().removeClass("on");
		}
	})($(elem));
});