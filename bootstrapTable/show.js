	var State={1:"投资回收期、内部收益率、经济净现值计算完毕",
		2:"经济性指标、财务风险计算完毕",
		3:"经济性概览指标",
		4:"敏感性分析（发电量、成本--全部投资）计算完毕",
		5:"敏感性分析（发电量、成本--自有资金）计算完毕",
		6:"敏感性分析（电价）计算完毕",
		7:"经济评价报表已经生成"}
	
	function getDataCosts(inputid){
	var costs;
	$.ajax({
				url:urlTitle+"ivm/costs/filter",
				data:{"inputid":inputid,"year":""},				
				type: "GET",
		        dataType: 'json', 
				async : false,
				success:function (data) { 
					  costs=data;
				
				}
		});	
 
		return costs;
	} 
	
	function getDataProfits(inputid){
	var profits;
	$.ajax({
				url:urlTitle+"ivm/profits/filter",
				data:{"inputid":inputid,"year":""},				
				type: "GET",
		        dataType: 'json', 
				async : false,
				success:function (data) { 
				
					profits=data;
				}
		});	
	return profits;
	}
	
	
	//未使用
	function getChart(this_chart){
		var mq = window.matchMedia( "(min-width: 992px)" );
		var screenwidth=screen.width;
		//alert(screenwidth);
		   if(screenwidth>=1360)
			   this_chart.highcharts().setSize(992*0.833, 400, false);
		   else  if(screenwidth>=1280)
				this_chart.highcharts().setSize(992*0.7, 400, false);
			else if(screenwidth>=1024)
				this_chart.highcharts().setSize(992*0.65, 400, false);
		   else if(screenwidth>=720)
			   this_chart.highcharts().setSize(992*0.3, 400, false);
			else if(screenwidth>=414)
				this_chart.highcharts().setSize(992*0.35, 400, false);
		   else if(screenwidth>=375)
			   this_chart.highcharts().setSize(992*0.31, 400, false);
			else if(screenwidth<=320)
				this_chart.highcharts().setSize(992*0.26, 400, false);
			else
				this_chart.highcharts().setSize(992*0.31, 400, false);
	} 
	
	
	
	//成本饼图与对比图加载及变化
	function advanceChengbenCompare(costs){ 
		$.each(costs, function(i,obj){
			var a = '<option value='+costs[i].Year+'>'+costs[i].Year+'</option>';
				$(".Chengben").append(a);
			});
			 
		$("#chengben_select_1").find("option[value=平均值]").attr("selected",true);
		$("#chengben_select_2").find("option[value="+costs[1].Year+"]").attr("selected",true);
		year1=$('#chengben_select_1 option:selected').val();
		year2=$('#chengben_select_2 option:selected').val(); 
			
		chengbenCompare(costs,year1,year2);	//首次加载运营成本成分分析柱状图+饼图
 
		$("#chengben_select_1,#chengben_select_2").change(function(){
			year1=$('#chengben_select_1 option:selected').val();
			year2=$('#chengben_select_2 option:selected').val(); 
			chengbenComparenopie(costs,year1,year2);	//运营成本成分分析对比图变化
		});
		$("#chengben_select_0").change(function(){
			year1=$('#chengben_select_0 option:selected').val();
			chengbenComparePie(costs,year1);//运营成本成分分析饼图变化
		});	     
	};
		
	function dataWhich(array,year){
		var find;
		$.each(array,function(key,ele){
			if(ele.Year==year){
				find=ele;
				return 
			}
		}
		)
 
			return find;
	}
	
	
	function chengbenCompare(costs,year1,year2){
	//首次加载 运营成本成分分析饼图与运营成本成分分析对比图
	

			data1 = dataWhich(costs,year1) ;
			data2 = dataWhich(costs,year2);
 
 
		series=[{
        	name:"管理费用",
            data: [data1.ManagementFee,data2.ManagementFee]
        }, {
        	name:"维护费用 ",
            data: [data1.MaintenanceFee,data2.MaintenanceFee]
        },{
        	name:"折旧摊销",
            data: [data1.DepreciationFee,data2.DepreciationFee]
        },{
        	name:"利息费用",
            data: [data1.InterestFee,data2.InterestFee]
        },{
        	name:"所得税",
            data: [data1.IncomeTax,data2.IncomeTax]
        }];
		
 
		
		//运营成本成分分析对比图
		thisBarOption=barOption; 
		thisBarOption.series=series;
		thisBarOption.xAxis={categories: [data1.Year, data2.Year]}
		$('#chartchengben_compare').highcharts(thisBarOption);

		//运营成本成分分析饼图
		data=[["管理费用",parseFloat(data1.ManagementFee.toFixed(2))],
		["维护费用",parseFloat(data1.MaintenanceFee.toFixed(2))],
		["折旧摊销",parseFloat(data1.DepreciationFee.toFixed(2))],
		["利息费用",parseFloat(data1.InterestFee.toFixed(2))],
		["所得税",parseFloat(data1.IncomeTax.toFixed(2))]];

		thisPieOption=pieOption; 
		thisPieOption.series[0].data=data;

		$('#chartchengben').highcharts(thisPieOption);

	}
		
	function chengbenComparenopie(costs,year1,year2){
		//chengben_select_1与chengben_select_2产生营成本成分分析对比图变化
 
			data1 = dataWhich(costs,year1);
			data2 = dataWhich(costs,year2);
 

		series=[{
        	name:"管理费用",
            data: [data1.ManagementFee,data2.ManagementFee]
        }, {
        	name:"维护费用 ",
            data: [data1.MaintenanceFee,data2.MaintenanceFee]
        },{
        	name:"折旧摊销",
            data: [data1.DepreciationFee,data2.DepreciationFee]
        },{
        	name:"利息费用",
            data: [data1.InterestFee,data2.InterestFee]
        },{
        	name:"所得税",
            data: [data1.IncomeTax,data2.IncomeTax]
        }];
		thisBarOption=barOption; 
		thisBarOption.series=series;
		thisBarOption.xAxis={categories: [data1.Year, data2.Year]}
		$('#chartchengben_compare').highcharts(thisBarOption);

	}	

		
		
	function chengbenComparePie(costs,year1){
		//chengben_select_0使运营成本成分分析饼图变化
			data1 = dataWhich(costs,year1);
 
 

				
		data=[["管理费用",parseFloat(data1.ManagementFee.toFixed(2))],
		["维护费用",parseFloat(data1.MaintenanceFee.toFixed(2))],
		["折旧摊销",parseFloat(data1.DepreciationFee.toFixed(2))],
		["利息费用",parseFloat(data1.InterestFee.toFixed(2))],
		["所得税",parseFloat(data1.IncomeTax.toFixed(2))]];
			
		
		thisPieOption=pieOption; 
		thisPieOption.series[0].data=data;
 
		$('#chartchengben').highcharts(thisPieOption);				
	}
	
	
	
	
	
	//利润饼图与对比图加载及变化
	function advanceLirunCompare(profits){	
 
		$.each(profits, function(i,obj){
		var a = '<option value='+profits[i].Year+'>'+profits[i].Year+'</option>';
			$(".Lirun").append(a);
		});
		
		$("#Lirun_select_1").find("option[value=平均值]").attr("selected",true);
		$("#Lirun_select_2").find("option[value="+profits[1].Year+"]").attr("selected",true);
		year1=$('#Lirun_select_1 option:selected').val();
		year2=$('#Lirun_select_2 option:selected').val(); 
		lirunCompare(profits,year1,year2);//首次加载营业利润构成及分析饼图+对比图调用
		

		
		$("#Lirun_select_1,#Lirun_select_2").change(function(){
			year1=$('#Lirun_select_1 option:selected').val();
			year2=$('#Lirun_select_2 option:selected').val(); 
			lirunComparenoPie(profits,year1,year2)//加载营业利润构成及分对比图调用
		})
		
		$("#Lirun_select_0").change(function(){
		 
			year1=$('#Lirun_select_0 option:selected').val();
			lirunComparePie(profits,year1);//加载营业利润构成及分饼图调用
		});	     
	};	
	
	
	
//首次加载营业利润构成及分析饼图+对比图时调用
	function lirunCompare(profits,year1,year2){
			data1 = dataWhich(profits,year1);
			data2 = dataWhich(profits,year2)
 
 
		
		series=[{
        	name:"营业成本及税金",
            data: [data1.CostTax,data2.CostTax]
        },{
        	name:"营业净利润",
            data: [data1.NetProfit,data2.NetProfit]
        }];
		thisBarOption=barOption; 
		thisBarOption.series=series;
		thisBarOption.xAxis={categories: [data1.Year, data2.Year]}
		$('#chartLirun_compare').highcharts(thisBarOption);
		
		data4=[["营业成本及税金",data1.CostTax],
		["营业净利润",data1.NetProfit]];
			
		
		thisPieOption=pieOption; 
		thisPieOption.series[0].data=data4;
		$('#profits').highcharts(thisPieOption);
		
		}
		
		//营业利润构成及分析饼图下拉框变化时调用
	function lirunComparePie(profits,year1){
		var data1=dataWhich(profits,year1);

		data3=[["营业成本及税金",data1.CostTax],
		["营业净利润",data1.NetProfit]];

		thisPieOption=pieOption; 
		thisPieOption.series[0].data=data3;
		$('#profits').highcharts(thisPieOption);

		}
		
		//营业利润构成及分析对比图下拉框变化时调用
		function lirunComparenoPie(profits,year1,year2){
			data1 = dataWhich(profits,year1);
			data2 = dataWhich(profits,year2)
 
 
 
 
		
		series=[{
        	name:"营业成本及税金",
            data: [data1.CostTax,data2.CostTax]
        },{
        	name:"营业净利润",
            data: [data1.NetProfit,data2.NetProfit]
        }];
		thisBarOption=barOption; 
		thisBarOption.series=series;
		thisBarOption.xAxis={categories: [data1.Year, data2.Year]}
		$('#chartLirun_compare').highcharts(thisBarOption);

		}

		
		
	

	//初始投资成分图绘制
	function advanceCostPieInit(data){

		data=[{name:"管理费用","y":parseFloat(thousands(data.ManagementFee,2)),money:data.ManagementFee+"万元"},
			{name:"运维费用","y":parseFloat(data.OperationalFee.toFixed(2)),money:data.OperationalFee+"万元"},
			{name:"风电场设备含税","y":parseFloat(data.EquipmentCost.toFixed(2)),money:data.EquipmentCost+"万元"},
			{name:"建筑安装工程费用","y":parseFloat(data.ConstructionCost.toFixed(2)),money:data.ConstructionCost+"万元"},
			{name:"建设用地费","y":parseFloat(data.LandCost.toFixed(2)),money:data.LandCost+"万元"},
			{name:"其它费用","y":parseFloat(data.OtherCost.toFixed(2)),money:data.OtherCost+"万元"},
			{name:"预备费","y":parseFloat(data.ReserveCost.toFixed(2)),money:data.ReserveCost+"万元"},
			{name:"建设期利息","y": data.ConstructionInterest,money:data.ConstructionInterest+"万元"}];
		    pieOption.reflow=false;
			thisPieOption=pieOption; 
			thisPieOption.series[0].data=data;
			//thisPieOption.color={"red","blue"};
		$('#chartInital').highcharts(thisPieOption);
 
	}



	
	function advanceCashflows(inputid){
	//股东现金流
	var ShareholderCf = new Array();
	var Inflow = new Array();
	var Outflow = new Array();	
	var Year = new Array();
	$.getJSON(urlTitle+"ivm/cashflows/filter?inputid="+inputid+"&year=").done(function (data) {
		/*股东现金流前置处理*/
				$.each(data, function(i,obj){
					if(i>0&&i<21){
						Year[i-1] = data[i].Year;
						ShareholderCf[i-1] = data[i].ShareholderCf.toFixed(0);
						Inflow[i-1] = data[i].Inflow.toFixed(0); 
						Outflow[i-1] = data[i].Outflow.toFixed(0);	
					}					
				});
				Inflow = Inflow.map(function(val) {
				     return parseInt(val, 10);
				});
				Outflow = Outflow.map(function(val) {
				     return parseInt(val, 10);
				});
				ShareholderCf = ShareholderCf.map(function(val) {
				     return parseInt(val, 10);
				});
		/*股东现金流前置处理完毕*/
		
				$('#cashflows').highcharts({ 
		
						title: {  //图表标题 
							text: '' 
						}, 
						xAxis: { //x轴 
							categories: Year,  //X轴类别 
							labels:{y:18}  //x轴标签位置：距X轴下方18像素 
						}, 
						yAxis: {  //y轴 
							title: {text: ''}, //y轴标题 
							lineWidth: 2 ,//基线宽度 
							max:6000,
							min:-4000,
							tickPixelInterval:10,
							tickInterval:2000							
						}, 
			              tooltip: {  
						 formatter:function(){
						
									return this.x+"<br><b>"+this.series.name+"</b>:"+Highcharts.numberFormat(this.y, 2, ".", ",")+' 万元';
							  //"<b>"+this.key+"</b>:"+this.percentage.toFixed(2)+"%<br>"+Highcharts.numberFormat(this.y, 2, ".", ",")+' 万元';
						   }
							   
						},
						labels: { //图表标签 
									items: [{ 
									html: '', 
									style: { 
									left: '48px', 
									top: '8px' 
									} 
									}] 
								}, 
						exporting: { 
							enabled: false  //设置导出按钮不可用 
						}, 
						credits: {  
							text: '', 
							href: '' 
						}, 
						series: [{ //数据列 
							type: 'column', 
							name: '流入', 
							data: Inflow

						}, 
						{ 
							type: 'column', 
							name: '流出', 
							data: Outflow
						},
						{ 
							type: 'spline', 
							name: '股东现金流', 
							data: ShareholderCf
						}] 
					});				
		
		});	
	}
	
	function getInputSimple(inputid){
		
		var input;
		$.ajax({
					url:urlTitle+"ivm/inputbasics/"+inputid,		
					type: "GET",
					dataType: 'json', 
					async : false,
					success:function (data) { 
						input=data
					}
			});	
		return input;		
	}	
	
	function getInputAdvance(inputid){
		
		var input;
		$.ajax({
					url:urlTitle+"ivm/inputadvanceds/"+inputid,		
					type: "GET",
					dataType: 'json', 
					async : false,
					success:function (data) { 
						input=data
					}
			});	
		return input;		
	}

	
	
	function getTotalfunds(totalfundsTitle,inputid,model){
		$.ajax({
					url:urlTitle+"ivm/totalfunds/filter",
					data:{"inputid":inputid,"model":model},				
					type: "GET",
					dataType: 'json', 
					async : false,
					success:function (data) { 
						$.each(data,function(i,v){
						$.each(v,function(key,val){
							if(typeof(val)=="number"){v[key]=val.toFixed(2)}
						})		
						})	
						totalfunds=totalfundsTitle.concat(data);		
					}
			});	
			

		return totalfunds;		
	}	
	
	function getOwnedfunds(totalfundsTitle,inputid,model){
		$.ajax({
					url:urlTitle+"ivm/ownedfunds/filter",
					data:{"inputid":inputid,"model":model},				
					type: "GET",
					dataType: 'json', 
					async : false,
					success:function (data) { 
						$.each(data,function(i,v){
							$.each(v,function(key,val){
								if(typeof(val)=="number"){v[key]=val.toFixed(2)}
							})		
						})
						ownedfunds=totalfundsTitle.concat(data);	
					}
			});	

		return ownedfunds;		
	}	

	function getEleprices(inputid,model){
		$.ajax({
					url:urlTitle+"ivm/elecprices/filter",
					data:{"inputid":inputid,"model":model},				
					type: "GET",
					dataType: 'json', 
					async : false,
					success:function (data) { 
						elecprices=data;						
						$.each(data,function(i,v){
							$.each(v,function(key,val){
								if(typeof(val)=="number"){v[key]=val.toFixed(2)}
							})		
						})		
					}
			});	
		return elecprices;		
	}	

	
function getOutputByIDEle(inputid)
{	
	//展示结果
 	//还原参数
	$.getJSON(urlTitle+"ivm/inputcapacities/"+inputid).done(function(data){
			
		page=$("#ele_output");
		showResult(page,inputid);	
		$.each(data,function(key,val){
		$ele=$("#ele_output").find("[data-tag="+key+"]");
		$("#"+key).html(val);
		if(key=="ProjectName"){val==""?$ele.html("未命名项目"):$ele.html(val)}
		else if(key=="Discount"){$ele.html(val*100)}
		else {	
		if($ele!=[]){
			var elehtml = key!="RiskTip"?val:val.replace(/\s+/g,'<br />');
			$ele.html(elehtml);
		}}	
		});
		GetTurbineModels(data);
		//更改机型名称
			$.getJSON(urlTitle+"v1/windturbinemodels/filter?company=").done(function(data2){
			 
				 $.each(data2,function(key,tbJson){
					if(tbJson.WindturbineModelId==data.ModelId){
						$("#ele_output").find("[data-tag=ModelId]").html(tbJson.WindturbineModelName);
					}
				 } )
			})
	
	});

}


function GetTurbineModels(data)
{
	//获取机型
	var tempAjax = "";
	$.ajax({
		type : 'GET',
		url : urlTitle+"v1//windturbinemodels/filter?company=",
		dateType : 'json',
		success: function(msg){
			$.each(msg,function(i,n){
				if(n.WindturbineModelId==data.ModelId)
					tempAjax += "<option selected value='"+n.WindturbineModelId+"'>"+n.WindturbineModelName+"</option>";
				else
					tempAjax += "<option value='"+n.WindturbineModelId+"'>"+n.WindturbineModelName+"</option>";
			});

			$("#ModelId").empty();
			$("#ModelId").append(tempAjax);
			//更新内容刷新到相应的位置
			$('#ModelId').selectpicker('render');
			$('#ModelId').selectpicker('refresh');


		},
		error: function (e) {
//			console.log(3,e);
		}
	});
}



function getOutputByIDSimple(inputid)
{
	if(debugMode==true){inputid=1;}
		data=getInputSimple(inputid);
 
		price=data.CostPerkW;

		
		$.each(data,function(key,val){		 
			$ele=$("#simple_output").find("[data-tag="+key+"]");
			if($ele!=[]){
				var elehtm;
			 
				if(key=="ShortageYears")
					elehtml=parseInt(val);
				else if(key=="ShortageRatio"||key=="ShortageRatio"||key=="ShortageDegression"||key=="ShortageStable")
					elehtml=parseFloat(val)*100;
				else
				 elehtml =  val;
				$ele.html(elehtml);
			}
		});
	
	 //展示结果
	$.getJSON(urlTitle+"ivm/outputbasics/filter?inputid="+inputid).done(function (data) {
		data = data[0];
		//console.log(data.State+"/7",State[data.State])
		if(data.State == 7){
			model=1;		
			IRR(model,inputid,price);

			$("#simpleIRR").removeClass("hide")

		}else{				

				$("#simpleIRR").addClass("hide")

		}
	
		
		page=$("#simple_output")
		showResult(page,inputid);			
		if(debugMode==true){console.log("项目简单评价返回结果:",data);}		
		$.each(data,function(key,val){
			$ele=page.find("[data-tag="+key+"]");
			if($ele!=[]){
				var elehtml = key!="RiskTip"?thousands(val,2):val.replace(/\s+/g,'<br />');
				$ele.html(elehtml);
			}
			
		});			
	});
	
	
}

function IRR(model,inputid,price){
		var fundsTitle=[{"ChangeRate":"千瓦造价(元/千瓦)","Hours":"","Irr70":price*0.7,"Irr75": 0.75*price,"Irr80":0.8*price,"Irr85":0.85*price,"Irr90":0.9*price,"Irr95":0.95*price,
		"Irr100":price,"Irr105":1.05*price,"Irr110":1.10*price,"Irr115":1.15*price,"Irr120":1.20*price,"Irr125":1.25*price,"Irr130":1.30*price},
		{"ChangeRate":"变化率(%)","Hours":"年标准小时(小时)","Irr70":"-30%","Irr75":"-25%","Irr80":"-20%","Irr85":"-15%","Irr90":"-10%","Irr95":"-5%",
		"Irr100":"0%","Irr105":"5%","Irr110":"10%","Irr115":"15%","Irr120":"20%","Irr125":"25%","Irr130":"30%"}
		];
		
		$.each(fundsTitle[0],function(key,val){
			if (key.indexOf("Irr")==0){
				if(model==1){
					fundsTitle[0][key]=thousands(Math.round(val))
					
				}else{
					fundsTitle[0][key]=thousands(val.toFixed(2))
				}
				
				}
		})

		

		
		
		totalfunds=getTotalfunds(fundsTitle,inputid,model)

		ownedfunds=getOwnedfunds(fundsTitle,inputid,model)
		
		elecprices=getEleprices(inputid,model)
		
		columns=[{"field":"Hours","cellStyle":cellStyle,"align":"center"},{"field":"ChangeRate","cellStyle":cellStyle,"align":"center"}];
		columns2=[{"field":"ItemName","cellStyle":noStyle,"align":"center"}];
		elecprices0=elecprices[0];Value2=Math.round(elecprices0["Value2"]/elecprices0["Value1"]*100);
		Value3=Math.round(elecprices0["Value3"]/elecprices0["Value1"]*100);Value4=Math.round(elecprices0["Value4"]/elecprices0["Value1"]*100);Value5=Math.round(elecprices0["Value5"]/elecprices0["Value1"]*100);
		//elecprices=[elecprices[0],{"ItemName":"变化比率","Value1":"100%","Value2":Value2+"%","Value3":Value3+"%","Value4":Value4+"%","Value5":Value5+"%"},elecprices[1]]
 
		$.each(elecprices[0],function(key,val){			
			if (key.indexOf("Value")==0){columns2.push({"field":key,"cellStyle":firstTitle,"align":"center"})}
		})
		$.each(totalfunds[2],function(key,val){			
			if (key.indexOf("Irr")==0&&val!=0){columns.push({"field":key,"cellStyle":cellStyle2,"align":"center"})}
		})
		
		
		
		if(model==1){
					 $("#simpleTotalfunds").bootstrapTable('destroy'); $("#simpleOwnedfunds").bootstrapTable('destroy'); $("#simpleElecprices").bootstrapTable('destroy')
		   $("#simpleTotalfunds").bootstrapTable({data:totalfunds,columns:columns})
	       $("#simpleOwnedfunds").bootstrapTable({data:ownedfunds,columns:columns})
			$("#simpleElecprices").bootstrapTable({data:elecprices,columns:columns2})
		}
		else{
			$("#advanceTotalfunds").bootstrapTable('destroy'); $("#advanceOwnedfunds").bootstrapTable('destroy'); $("#advanceElecprices").bootstrapTable('destroy')
		   $("#advanceTotalfunds").bootstrapTable({data:totalfunds,columns:columns})
	       $("#advanceOwnedfunds").bootstrapTable({data:ownedfunds,columns:columns})
			$("#advanceElecprices").bootstrapTable({data:elecprices,columns:columns2})
		}

}


		function noStyle(value, row, index) {
		  return {
			 //标头：白色
			css: {"background": "#fff", "font-weight": "bold"}

		  };
		}
		
		function firstTitle(value, row, index) {
		  if(index==0 ){	
			return {
			  //标题：淡蓝
			css: {"background": "rgb(184,204,228)"}
			};
		  }		  
		  else {
			return {
			//内容部分：绿色
			css: {"background": "rgb(146,208,80)"}
			
		  }
		  }
		}
		
		function cellStyle(value, row, index) {
		  if(index==0 ||index==1){	
		  return {
			 //标头：白色
			css: {"background": "#fff", "font-weight": "bold"}

		  };
		  }
		  else {
			return {
			  //标题：淡蓝
			css: {"background": "rgb(184,204,228)"}
			};
		  }
	
		}
		
		function cellStyle2(value, row, index) {
		  if(index==0 ||index==1){	
		  return {
			  //标题：淡蓝
			css: {"background": "rgb(184,204,228)"}
			};
		  }
		  else{
			return {
			//内容部分：绿色
			css: {"background": "rgb(146,208,80)"}
			
		  }
			
		}}


function getOutputByIDAdvance(inputid)
{	

	$("#advanceEmailInput").val(userInfo.Email)

	//还原参数					
		data=getInputAdvance(inputid);

		
		price=(data.EquipmentCost+data.ConstructionCost+
		data.LandCost+data.OtherCost+data.ReserveCost+data.ConstructionInterest)*10/data.InstalledCapacity

		$.each(data,function(key,val){
			$ele=$("#advance_output").find("[data-tag="+key+"]");
			if($ele!=[]){
				var elehtml;
				if(key=="Month")
					elehtml=parseInt(val);
				else if(key=="ShortageFrontYears"||key=="GeneratingHours")
					elehtml=parseInt(val);
				else if(key=="Shortage1"||key=="ShortageRatio"||key=="Shortage2"||key=="Shortage3")
					elehtml=parseFloat(val)*100;
				else
				    elehtml = (typeof  val=="number" && key!="Year")?thousands(val,2):val;

				$ele.html(elehtml);
			}
			
		});
		

		//初始投资成分图	饼图1
	 	advanceCostPieInit(data);

		function modifyFilePath(State,WordFile){
			if(State == 7){
				model=2; 
				IRR(model,inputid,price);	
				filePath=urlTitle.split("api")[0]+WordFile.replace(new RegExp("\\\\",'gm'),'/')
				fileName=filePath.slice(filePath.lastIndexOf("/") + 1);
				$("#advanceDownLink").attr("href",filePath)
				$("#advanceDownLink").attr("download",fileName)
				$("#advanceDownBtn").data("prepared",1);
				$("#advanceIRR").removeClass("hide");
			}
			else{	
				$("#advanceIRR").addClass("hide");
				$("#advanceDownLink").attr("href","javascript:void(0)");
				$("#advanceDownLink").attr("download",".");
				$("#advanceDownBtn").data("prepared",0);
			}
		}		
		
			function checkState(inputid){
				var checkState;
						$.ajax({
							type : 'GET',
							async:false,
							url : urlTitle+"ivm/outputadvanceds/state?id="+inputid,
							dateType : 'json',
							success: function(data){
									checkState=data	

							}
							})
				return checkState;
				
			}


				function downloadFile(){
				filePath=$("#advanceDownLink").attr("href");				
				evt = document.createEvent("HTMLEvents");
				evt.initEvent("click", false, false);
				var aLink = document.getElementById("advanceDownLink"); 
				var isFirefox=navigator.userAgent.toUpperCase().indexOf("FIREFOX")>-1?true:false; 
					if(filePath!="javascript:void(0)"){							 
						if(isFirefox){location.href=filePath}else{aLink.dispatchEvent(evt);}
					}
				}	


								
								
		$("#advanceDownBtn").unbind('click').on("click",function(){  
			if($(this).data("prepared") == 1){
					downloadFile();
			}else{
				data=checkState(inputid);
				modifyFilePath(data.State,data.WordFile);
				if(data.State ==7){
						downloadFile()		
					}
				else {
					swal("正在进行敏感性分析，请稍候再试。");		
				}
			}
		});
		
	 //展示结果
	$.getJSON(urlTitle+"ivm/outputadvanceds/filter?inputid="+inputid).done(function (data) {
 
		data = data[0];
		if(data.SendEmail==1){emailHtml="已选择发送到邮箱："+data.Email+"，请查收！"}
		else if(data.SendEmail==2){emailHtml="未选择发送到邮箱，报告就绪后你可以下载报告到本地"}
		else{emailHtml=""};
		$("#emailHtml").html(emailHtml);
		
		modifyFilePath(data.State,data.WordFile);
		
		
			page=$("#advance_output");
			showResult(page,inputid);			
			if(debugMode==true){console.log("项目高级评价返回值:",data);}	
 
			$.each(data,function(key,val){
 
				$ele=page.find("[data-tag="+key+"]");
				if($ele!=[]){
					var elehtml = key!="RiskTip"?thousands(val,2):val.replace(/\s+/g,'<br />');
						if(key=="TotalRoi"||key=="CapitalRoe"||key=="NetProfitRate")
					{elehtml=parseFloat(val*100).toFixed(2);}
					$ele.html(elehtml);
				}
				
			});
	});
	
	

	
		costs=getDataCosts(inputid);
		profits=getDataProfits(inputid);
 
		advanceCashflows(inputid);
		advanceChengbenCompare(costs);
		advanceLirunCompare(profits);
		clearTimeout(this.id);
		this.id = setTimeout(chartjustify, 300);
}
