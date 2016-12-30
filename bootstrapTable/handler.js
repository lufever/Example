eleSubmitHandler={
	submitHandler: function(){ 
		data=$("#eleFrm").serializeObject() ;
		data.ProjectName==""?data.ProjectName="未命名项目":"";
		data.Discount = data.Discount/100;
		if(debugMode==true){data.ModelId=3;console.log("发电量估算提交参数:",data);}
		userInfo=JSON.parse(sessionStorage.userInfo); 
		dataPatch={"UserId":userInfo.UserId};
		$.extend(data,dataPatch);		
		$.ajax({
			url:urlTitle+"ivm/inputcapacities",		
			type: "POST",
			dataType:"json",
			data:JSON.stringify(data),
			contentType: "application/json",
			crossDomain:true,
			//beforeSend:function(){$('#loading').modal('show');},
			success: function (data) {
				//$('#loading').modal('hide');
				getOutputByIDEle(data.InputId);	
				$logTable.bootstrapTable("refresh");
				$indexLogTable.bootstrapTable("refresh");
			}
		});
		}
	}

//展示进度条
function loadingshow()
{
	$('#loading').modal('show');
	var i =0;
	var ms = 60000; //变量MS: 从0%到100%需要的毫秒数
	var time = setInterval(function(){
		//$("#bar .finish").css("width",i+"%");i=i+(1000/ms);
		//$("#bar .ing").text(Math.round(i)+"%");
		$(".ing").text(fRandomBy(10,50)+"."+fRandomBy(0,9)+fRandomBy(0,9)+"%"); ;
		/*if(i>=100){
			clearInterval(time);
			$("#bar .ing").text("100%")
		}*/

	},100);
	$.extend({processTime:time});
}

function advanceSuccessTips(InputId){
					swal({title:"计算完成!", html:'<div style="text-align:left;margin-left:15px"><p>感谢您的耐心等待!</p>'+

                                                        '<input type="checkbox" value="" data-toggle="checkbox"  id="ifSendEmail" checked>'+
          
                                                '发送报告到：'+userInfo.Email+'</div>', type:"success",   
												allowOutsideClick: false},function(){
										
							send=$("#ifSendEmail").prop("checked")==true?1:2;
							email=send==1?userInfo.Email:"";							
							$.ajax({
								url:urlTitle+"ivm/outputadvanceds/sendemail?id="+InputId+"&send="+send+"&email="+email,		
								type: "POST",
								success:function (data) {
											if(send==1){emailHtml="已选择发送到邮箱："+email+"，请查收！"}
											else if(send==2){emailHtml="未选择发送到邮箱，报告就绪后你可以下载报告到本地"}
											else{emailHtml=""};
											$("#emailHtml").html(emailHtml);
													
								}
								});
							
							
							}
										
				)

}


simpleSubmitHandler={
	submitHandler: function(){ 
	data=$("#simpleFrm").serializeObject() ;
	dataPatch.OperationalFee = "0" ;
	data.ShortageRatio = data.ShortageRatio/100;
	data.ShortageDegression = data.ShortageDegression/100;
	data.ShortageStable = data.ShortageStable/100;
	userInfo=JSON.parse(sessionStorage.userInfo); 
	dataPatch={"UserId":userInfo.UserId};
	$.extend(data,dataPatch);
	if(debugMode==true){console.log("项目简单评价提交参数:",data);}
	$.ajax({
		url:urlTitle+"ivm/inputbasics",
		type: "POST",
		dataType:"json",
		data:JSON.stringify(data),
		contentType: "application/json",
		beforeSend:loadingshow,
		crossDomain:true,
		success: function (data) {
			if(!$.ModaldilagIsClose) {
				$('#loading').modal('hide');
				demo.showSwal('success-message-simple');
				getOutputByIDSimple(data.InputId);
			}
			$.ModaldilagIsClose=false;
			clearInterval($.processTime);
			$logTable.bootstrapTable("refresh");
			$indexLogTable.bootstrapTable("refresh");
		}
		});
		}	
	}


advanceSubmitHandler={
	submitHandler: function(){
	data=$("#advanceFrm").serializeObject() ;
	userInfo=JSON.parse(sessionStorage.userInfo); 
	dataPatch={"UserId":userInfo.UserId};
	$.extend(data,dataPatch); 
	data.Shortage1 = data.Shortage1/100;
	data.Shortage2 = data.Shortage2/100;
	data.Shortage3 = data.Shortage3/100;
	$.ajax({
		url:urlTitle+"ivm/inputadvanceds",		
		type: "POST",
		dataType:"json",
		data:JSON.stringify(data),
		contentType: "application/json",
		beforeSend:loadingshow,
		success:function (data) {
			if(!$.ModaldilagIsClose) {
				$('#loading').modal('hide');
				advanceSuccessTips(data.InputId)
				getOutputByIDAdvance(data.InputId);

			}
			$.ModaldilagIsClose=false;
			clearInterval($.processTime);
			$logTable.bootstrapTable("refresh");
			$indexLogTable.bootstrapTable("refresh");
		}
	});
	}
}

	
	
eleFrmValidateOption=$.extend(eleFrmValidate,eleSubmitHandler);
simpleFrmValidateOption=$.extend(simpleFrmValidate,simpleSubmitHandler);
advanceFrmValidateOption=$.extend(advanceFrmValidate,advanceSubmitHandler);

$("#eleFrm").validate(eleFrmValidateOption);
$("#simpleFrm").validate(simpleFrmValidateOption);
$("#advanceFrm").validate(advanceFrmValidateOption);

 	
 