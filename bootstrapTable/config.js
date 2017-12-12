debugMode=false;	
testMode=false;	

var urlTitle = "http://windmagics.com:6104/api/";
var urlTitletest = "http://192.168.1.210:61589/api/";//申台式机
var urlTitletest2 = "http://192.168.1.201/api/";//测试服务器
 
var urlTitletest3 = "http://192.168.1.204:8888/api/";//笔记本
var urlTitletest4 = "http://localhost:8888/api/";//本机
var urlTitle=urlTitletest;

jQuery.extend(jQuery.validator.messages, { 
  digits: "只能输入整数"  
});


$.validator.setDefaults({ 
		onfocusout: function(element) {$(element).valid()},
		onkeyup: function(element) {$(element).valid()}
	}) 


$.ajaxSetup({
　　　　timeout: 120000,
　　　　//success: function (data) { show.append('success invoke!' + data + '<br/>'); },
　　　　//请求失败遇到异常触发
　　　　error: function (xhr, status, e) {	
		$('#loading').modal('hide');
		swal('服务器异常,请检查网络状况或提交的参数..'); },
　　　　//完成请求后触发。即在success或error触发后触发
　　　　//complete: function (xhr, status) { show.append('complete invoke! status:' + status+'<br/>'); },
　　　　//发送请求前触发
　　　　beforeSend: function (xhr) {

　　　　}
　　});	
 
 	jQuery.validator.addMethod("CompareShortage", function(value, element, param) {
		value=Number($(param).val())
		cvalue=Number($(param).val())
		return  value < cvalue  || value ==cvalue  ;
		}, $.validator.format("最终稳定限电比不能大于投产前限电比!"));		
 
	$.validator.addMethod("stringlength", function(value, element,params) {
    params = $.extend([true,-1,-1],params); //对于默认参数支持
    if(params[0]){  //过滤首尾空格
        value=$.trim(value);
    }
    value = value.replace(/<(?:.)*?>/g,""); //验证时过滤标签
    return this.optional(element) || ((params[1]<0 || value.length>=params[1])&&(params[2]<0 || value.length<=params[2]));

}, jQuery.format("长度在{1}-{2}之间") );
	eleFrmValidate =	{
	    rules: {
	      ProjectName: "required",
	      TurbineNumber: "required",
		  WindSpeed: "required",
		  AirDensity: "required",
		  WeibullK: "required",
		  Discount: "required",
	      ProjectName: {
			specialCharValidate:false,
			stringlength:[true,"1","50"],
	        required: true
	      },
	      TurbineNumber: {
	        required: true,
	        max: 200,
			min:1
	      },
	      WindSpeed: {
	        required: true,
	        max:10.9,
			min:5.0			
	      },
	      AirDensity: {
	        required: true,
	        max:2.000,
			min:1.000	
	      },
		  WeibullK: {
	        required: true,
	        max:2.0,
			min:1.7
	      },
		  Discount: {
	        required: true,
	        max:40,
			min:20
	      },
	    },
	    messages: {
	      ProjectName:{
	      	stringlength:jQuery.format("长度在{1}和{2}之间"),
	        required: "请输入项目名称",
			specialCharValidate:"请不要输入特殊字符"
	      },
	      TurbineNumber: {
	        required: "请输入风机台数",
	        max: "最大值不能超过200",
			min:"最小值不能小于1"
	      },
	      WindSpeed: {
	        required: "请输入风速",
	        max: "最大值不能超过10.9",
			min:"最小值不能小于5.0"
	      },
	      AirDensity: {
	        required: "请输入空气密度",
	        max: "最大值不能超过2.000",
			min:"最小值不能小于1.000"
	      },
		  WeibullK: {
	        required: "请输入韦伯K值",
	        max: "最大值不能超过2.0",
			min:"最小值不能小于1.7"
	      },
		  Discount: {
	        required: "请输入电量折减",
	        max: "最大值不能超过40%",
			min:"最小值不能小于20%"
	      }	      
	    }
	};
	
		
	simpleFrmValidate={
	    rules: {
	      ProjectName: "required",
	      InstalledCapacity: "required",
		  GeneratingHours: "required",
		  ElectricityPrice: "required",
		  Year: "required",
		  Month: "required",
		  ManagementFee: "required",
		  OperationalFee: "required",
		  CostPerkW: "required",
		  ShortageYears: "required",
		  ShortageRatio: "required",
		  ShortageDegression: "required",
		  ShortageStable: "required",
	      ProjectName: {
			specialCharValidate:false,
			stringlength:[true,"1","50"],
	        required: true,
	      },
	      InstalledCapacity: {
	        required: true,
//	        max:10.9,
			min:0			
	      },
	      GeneratingHours: {
	        required: true,
//	        max:1.000,
			min:0	
	      },
		  ElectricityPrice: {
	        required: true,
//	        max:1.7,
			min:0
	      },
		  Year: {
			digits:true,
	        required: true,
	        max:9999,
			min:1900
	      },
		  Month: {
	        required: true,
	        max:12,
			min:1
	      },
		  ManagementFee: {
	        required: true,
	        // max:20,
			min:0
	      },
		  OperationalFee: {
	        required: true,
	        // max:20,
			min:0
	      },
		  CostPerkW: {
	        required: true,
	        // max:20,
			min:0
	      },
		  ShortageYears: {
	        required: true,
	        max:20,
			min:0,
			digits:true
	      },
		  ShortageRatio: {
	        required: true,
	        max:100,
			min:0
	      },
		  ShortageDegression: {
	        required: true,
	        max:100,
	        CompareShortage:"#simple_ShortageRatio",
			min:0
	      },
		  ShortageStable: {
	        required: true,
	        CompareShortage:"#simple_ShortageRatio",
			min:0
	      },
	    },
	    messages: {
	      ProjectName:{
	      	stringlength:jQuery.format("长度在{1}和{2}之间"),
	        required: "请输入项目名称",
			specialCharValidate:"请不要输入特殊字符"
	      },
	      InstalledCapacity: {
	        required: "请输入风场规模"

	      },
	      GeneratingHours: {
	        required: "请输入年标准小时",
	        // max: "最大值不能超过10.9",
			min:"最小值不能小于0"
	      },
	      ElectricityPrice: {
	        required: "请输入风电上网电价",
	        // max: "最大值不能超过2.000",
			min:"最小值不能小于0"
	      },
		  Year: {
	        required: "请输入年份",
	        max: "最大值不能超过9999",
			min:"最小值不能小于1900"
	      },
		  Month: {
	        required: "请输入月份"
	      },
		  ManagementFee: {
	        required: "请输入管理费用",
	        // max: "最大值不能超过40%",
			min:"最小值不能小于0"
	      },
		  OperationalFee: {
	        required: "请输入运维费用",
	        // max: "最大值不能超过40%",
			min:"最小值不能小于0"
	      },
		  CostPerkW: {
	        required: "请输入每千瓦造价",
	        // max: "最大值不能超过40%",
			min:"最小值不能小于0"
	      },
		  ShortageYears: {
	        required: "请输入投产前年数"
	      },
		  ShortageRatio: {
	        required: "请输入投产前考虑限电比",
	        max: "最大值不能超过100",
			min:"最小值不能小于0"
	      },
		  ShortageDegression: {
	        required: "请输入限电逐年递减比例",
	        CompareShortage: "限电递减率比不能大于投产前限电率",
	        max: "最大值不能超过100",
			min:"最小值不能小于0"
	      },
		  ShortageStable: {
	        required: "请输入最终稳定限电比",
	        CompareShortage: "最终限电率不能大于初始限电率",
			min:"最小值不能小于0"
	      }			  
	    }
	};



    advanceFrmValidate={
	    rules: {
	      ProjectName: "required",
	      InstalledCapacity: "required",
		  GeneratingHours: "required",
		  ElectricityPrice: "required",
		  Year: "required",
		  Month: "required",
		  ManagementFee: "required",
		  OperationalFee: "required",
		  EquipmentCost: "required",
		  ConstructionCost: "required",
		  LandCost: "required",
		  OtherCost: "required",
		  ReserveCost: "required",
		  ConstructionInterest: "required",
		  ShortageFrontYears: "required",
		  Shortage1: "required",
		  Shortage2: "required",
		  Shortage3: "required",
	      ProjectName: {
			specialCharValidate:false,
			stringlength:[true,"1","50"],
	        required: true
	      },
	      InstalledCapacity: {
	        required: true,
	        // max:10.9,
			min:0			
	      },
	      GeneratingHours: {
	        required: true,
	        // max:1.000,
			min:0	
	      },
		  ElectricityPrice: {
	        required: true,
	        // max:1.7,
			min:0
	      },
		  Year: {
			digits:true,
	        required: true,
	        max:9999,
			min:1900
	      },
		  Month: {
	        required: true,
	        max:12,
			min:1
	      },
		  ManagementFee: {
	        required: true,
	        // max:20,
			min:0
	      },
		  OperationalFee: {
	        required: true,
	        // max:20,
			min:0
	      },
		  EquipmentCost: {
	        required: true,
	        // max:20,
			min:0
	      },
		  ConstructionCost: {
	        required: true,
	        // max:50,
			min:0
	      },
		  LandCost: {
	        required: true,
	        // max:50,
			min:0
	      },
		  OtherCost: {
	        required: true,
	        // max:50,
			min:0
	      },
		  ReserveCost: {
	        required: true,
	        // max:50,
			min:0
	      },
		  ConstructionInterest: {
	        required: true,
	        // max:50,
			min:0
	      },
		  
		  ShortageFrontYears: {
	        required: true,
	        max:20,
			min:0,
			digits:true
	      },
		  Shortage1: {
	        required: true,
	        max:100,
			min:0
	      },
		  Shortage2: {
	        required: true,
	        max:100,
	        CompareShortage:"#advance_ShortageRatio",
			min:0
	      },
		  Shortage3: {
	        required: true,
	        CompareShortage:"#advance_ShortageRatio",
			min:0
	      } 
	    },
	    messages: {
	      ProjectName:{

	        required: "请输入项目名称",
			specialCharValidate:"请不要输入特殊字符"
	      },
	      InstalledCapacity: {
	        required: "请输入风场规模",
	        // max: "最大值不能超过200",
			min:"最小值不能小于0"
	      },
	      GeneratingHours: {
	        required: "请输入年标准小时",
	        // max: "最大值不能超过10.9",
			min:"最小值不能小于0"
	      },
	      ElectricityPrice: {
	        required: "请输入风电上网电价",
	        // max: "最大值不能超过2.000",
			min:"最小值不能小于0"
	      },
		  Year: {
	        required: "请输入拟投产年",
	        max: "最大值不能超过9999",
			min:"最小值不能小于1900"
	      },
		  Month: {
	        required: "请输入拟投产月",
	        max: "最大值不能超过12",
			min:"最小值不能小于1"
	      },
		  ManagementFee: {
	        required: "请输入管理费用",
	        // max: "最大值不能超过40%",
			min:"最小值不能小于0"
	      },
		  OperationalFee: {
	        required: "请输入运维费用",
	        // max: "最大值不能超过40%",
			min:"最小值不能小于0"
	      },
		  EquipmentCost: {
	        required: "请输入风电场设备含税",
	        // max: "最大值不能超过40%",
			min:"最小值不能小于0"
	      },
		  ConstructionCost: {
	        required: "请输入建筑安装工程费用",
	        // max: "最大值不能超过50",
			min:"最小值不能小于0"
	      },
		  LandCost: {
	        required: "请输入建设用地费",
	        // max: "最大值不能超过50",
			min:"最小值不能小于0"
	      },
		  OtherCost: {
	        required: "请输入其它费用",
	        // max: "最大值不能超过50",
			min:"最小值不能小于0"
	      },
		  ReserveCost: {
	        required: "请输入预备费",
	        // max: "最大值不能超过50",
			min:"最小值不能小于0"
	      },
		  ConstructionInterest: {
	        required: "请输入建设期利息",
	        // max: "最大值不能超过50",
			min:"最小值不能小于0"
	      },
		  ShortageFrontYears: {
	        required: "请输入投产前年数",

	      },
		  Shortage1: {
	        required: "请输入投产前考虑限电",
	        max: "最大值不能超过100",
			min:"最小值不能小于0"
	      },
		  Shortage2: {
	        CompareShortage: "限电递减率比不能大于投产前限电率",
	        required: "请输入投产后限电比例",
	        max: "最大值不能超过100",
			min:"最小值不能小于0"
	      },
		  Shortage3: {			  
	        required: "请输入最终稳定限电比例",
	        CompareShortage: "最终限电率不能大于初始限电率",
			min:"最小值不能小于0"
	      }			  
		}
	}

	

