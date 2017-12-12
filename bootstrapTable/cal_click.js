
$(document).ready(function(){
	
	





//	$("#li_ele").click(function(){
//		document.getElementById("menu_name").innerHTML="发电量估算";
//	});
//	
//	$("#li_simple").click(function(){
//		document.getElementById("menu_name").innerHTML="项目简单评价";
//	});
//	
//	$("#li_advance").click(function(){
//		document.getElementById("menu_name").innerHTML="项目高级评价";
//	});
//	
//	$("#userAdminMenu").click(function(){
//		document.getElementById("menu_name").innerHTML="用户管理";
//	});
//	
//	$("#li_log").click(function(){
//		document.getElementById("menu_name").innerHTML="评估日志";
//	});
	
	
	
	
	var tempProvince = "";
	$.ajax({
		url:urlTitle+"v1/provinces/all",		
		type: "GET",
        crossDomain: true,
        dataType: 'json',
		success:function (data) {
			$.each(data,function(i,n){

				if(i==0)
					tempProvince= '<option selected id="province'+i+'" value="'+data[i]+'">'+data[i]+'</option>';
				else
				    tempProvince +=  '<option id="province'+i+'" value="'+data[i]+'">'+data[i]+'</option>';
			});

			var obj2=$("#Province_simple");
			obj2.empty();
			obj2.append(tempProvince);
			//更新内容刷新到相应的位置
			obj2.selectpicker('render');
			obj2.selectpicker('refresh');

		}
 
	});
	
	var tempProvince1 = "";
	$.ajax({
		url:urlTitle+"v1/provinces/all",		
		type: "GET",
        crossDomain: true,
        dataType: 'json',
		success:function (data) {
			$.each(data,function(i,n){

				if(i==0)
					tempProvince1= '<option selected id="province'+i+'" value="'+data[i]+'">'+data[i]+'</option>';
				else
				    tempProvince1 +=  '<option id="province'+i+'" value="'+data[i]+'">'+data[i]+'</option>';
			});
			$("#Province_advance").empty();
			$("#Province_advance").append(tempProvince1);
			//更新内容刷新到相应的位置
			$('#Province_advance').selectpicker('render');
			$('#Province_advance').selectpicker('refresh');

		}
	});
		//获取机型
		var tempAjax = "";
		$.ajax({
			type : 'GET',
			url : urlTitle+"v1//windturbinemodels/filter?company=",
			dateType : 'json',
			success: function(msg){
				$.each(msg,function(i,n){
					if(i==0)
						tempAjax = "<option selected value='"+n.WindturbineModelId+"'>"+n.WindturbineModelName+"</option>";
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
			}
		});

	var a5=100.0003;

});

//只允许输入正小数
/*
$(":input").keydown(function(event) {
	var theEvent = event || window.event;
	var key = theEvent.keyCode || theEvent.which;
	var value=parseFloat($(this).val());
	var dotindex= $(this).val().indexOf(".");

	// Allow: backspace, delete, tab, escape, and enter
	if ( key == 46 || key == 8 || key == 9 || key == 27 || key == 13 ||  key == 110 || key == 190 ||
				// Allow: Ctrl+A
			(key == 65 && theEvent.ctrlKey === true) ||
				// Allow: home, end, left, right
			(key >= 35 && key <= 39)) {
		// let it happen, don't do anything

		if(key==110&&dotindex>=0)
		{
			//只允许输入一个小数点
			theEvent.preventDefault();
		}
		return;
	}
	else {
		// Ensure that it is a number and stop the keypress
		if (theEvent.shiftKey || (key < 48 || key > 57) && (key < 96 || key > 105 )||key==189) {

			theEvent.preventDefault();
		}

	}	
}); */

//function clearNoNum(obj){
//
//obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
//}





