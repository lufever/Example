var dataPreferences = {
        series: [
            [25, 30, 20, 25]
        ]
    };
	
userInfo=JSON.parse(sessionStorage.userInfo); 
dataPatch={"UserId":userInfo.UserId};

var optionsPreferences = {
    donut: true,
    donutWidth: 40,
    startAngle: 0,
    height: "350px",
    total: 100,
    showLabel: false,
    axisX: {
        showGrid: false
    }
};

 
pieOption={   chart: {},
            title: {
                text: ''
            },
            tooltip: {

		 formatter:function(){

			  return "<b>"+this.key+"</b>:"+this.percentage.toFixed(2)+"%<br>"+Highcharts.numberFormat(this.y, 2, ".", ",")+' 万元';
		   }
			   
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: '',
                money:'',
                data: [
                ]
            }]
 }


barOption={  
        chart: {
            type: 'bar'
        },
        title: {
            text: ''
        },
        xAxis: {
		labels: {enabled:false}},
        yAxis: {
			title:{
				text:''				
				}
        },
		
      tooltip: {
        	   // pointFormat: 
		 formatter:function(params){
			 
				
					return "<b>"+this.series.name+"</b>:"+Highcharts.numberFormat(this.y, 2, ".", ",")+' 万元';
			  //"<b>"+this.key+"</b>:"+this.percentage.toFixed(2)+"%<br>"+Highcharts.numberFormat(this.y, 2, ".", ",")+' 万元';
		   }
			   
            },
        plotOptions: {
            series: {
                stacking: 'normal',
                pointWidth: 28
            }
        },
        colors: ["#FB404B", "#9368E9","#FFA534","#87CB16","#23CCEF"],
        visible:true
    }




function showResult(page,inputid){

		   var target="#"+page.closest("[data-role=page]").attr("id");
		   $(".sidebar-wrapper ul.nav").find("li[data-target="+target+"]").addClass("active").siblings("li").removeClass("active");
		   $(target).siblings('.content[data-role$=page].active').removeClass("active");	
		   $(target).addClass("active");
		   page.siblings(".page").removeClass("active").hide();
		   page.show();
			var totop = setInterval(function () {
				page.parent().animate({ scrollTop: 0 }, 0);
			}, 1);

			setTimeout(function () {
				page.addClass("active");
				setTimeout(function () {
					clearInterval(totop);
				}, 1000);
			}, 100);		
			
			$("#menu_name").html( $(".sidebar-wrapper ul.nav").find("li[data-target="+target+"]").find("p").html());
			if(location.hash.split('/')[1]==undefined){
			uri=target+"/show/"+inputid;
			window.history.pushState({},"",uri);
			}

			
			
			$container.scrollTop(0);
			$container.perfectScrollbar('update');
			
	}; 




function thousands(s, n) {
		if (typeof s=="undefined" ) return "";
	    n = n > 0 && n <= 20 ? n : 2; 
	    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
	    var l = s.split(".")[0].split("").reverse(), 
	        r = s.split(".")[1]; // '789'
	    var len = (s.indexOf("-")　 != -1) ? l.length - 1 : l.length; 
	    t = "";
	    for (i = 0; i < len; i++) 
	    {
	        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != len ? "," : ""); 
	    }
	    return ((s.indexOf("-")　 != -1) ? "-" : "") + t.split("").reverse().join("") + "." + r; //这个返回 举个例子 没懂呀 
	}
	
	
$.fn.serializeObject = function() {    
   var o = {};    
   var a = this.serializeArray();    
   $.each(a, function() {    
	   if (o[this.name]) {    
		   if (!o[this.name].push) {    
			   o[this.name] = [o[this.name]];    
		   }    
		   o[this.name].push(this.value || '');    
	   } else {    
		   o[this.name] = this.value || '';    
	   }    
   });    
   return o;    
};

function isChina(s) //判断字符是否是中文字符 
{ 
var patrn= /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi; 
	if (!patrn.exec(s))
	{ 
	return false; 
	}else{ 
	return true; 
	}
}


//获得随机数,参数under最小值,over最大值
function fRandomBy(under, over){
    switch(arguments.length){
        case 1: return parseInt(Math.random()*under+1);
        case 2: return parseInt(Math.random()*(over-under+1) + under);
        default: return 0;
    }
}

	function chartjustify(){

		if ($("#advance_output").hasClass("active")){	
		hcharts=$("#advance_output").find(".hchart");
		$.each(hcharts,function(index,ele){
			var id=$(ele).attr("id");
			chart= $("#"+id).highcharts();
			chart.setSize($("#"+id).width(), $("#"+id).height());			
		})
		}
	}
