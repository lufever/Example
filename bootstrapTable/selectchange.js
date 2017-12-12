var Chengben_Change = function(value){
		$.ajax({
		url:urlTitle+"ivm/costs/filter?inputid=10000&year="+value,		
		type: "GET",
        crossDomain: true,
        dataType: 'json',
		success:function (data) {				 
			var total = data[0].ManagementFee+data[0].MaintenanceFee+data[0].DepreciationFee+data[0].InterestFee+data[0].IncomeTax;
			var  MaintenanceFee = ~~(data[0].ManagementFee/total).toFixed(2).slice(2,4); 
			var  ManagementFee = ~~(data[0].ManagementFee/total).toFixed(2).slice(2,4); 
			var  DepreciationFee = ~~(data[0].DepreciationFee/total).toFixed(2).slice(2,4); 
			var  InterestFee = ~~(data[0].InterestFee/total).toFixed(2).slice(2,4); 
			var  IncomeTax = ~~(data[0].IncomeTax/total).toFixed(2).slice(2,4); 

			Chartist.Pie('#chartchengben', dataPreferences, optionsPreferences);
	        Chartist.Pie('#chartchengben', {
	          labels: [MaintenanceFee+"%",ManagementFee+"%",DepreciationFee+"%",InterestFee+"%",IncomeTax+"%"],
	          series: [MaintenanceFee,ManagementFee,DepreciationFee,InterestFee,IncomeTax]
	        });
	     
		},
		error: function (e) {
			console.log(2,e);
		}
	});	
}

var Chengben_Change1 = function(value){
	var chengben_select_2 = $("#chengben_select_2").val(); 
	console.log(chengben_select_2);
	console.log(chengben_select_1);
	Chengben_compare_Change(chengben_select_2,value);	
}

var Chengben_Change2 = function(value){
	var chengben_select_1 = $("#chengben_select_1").val(); 
	console.log(chengben_select_2);
	console.log(chengben_select_1);
	Chengben_compare_Change(value,chengben_select_1);	
}

var Lirun_Change = function(value){
		//Lirun下拉框
	$.ajax({
		url:urlTitle+"ivm/profits/filter?inputid=10000&year="+value,		
		type: "GET",
        crossDomain: true,
        dataType: 'json',
		success:function (data) {
			console.log(data);
			datal = data[0];			
			var  CostTax = ~~(datal.CostTax/datal.NetIncome).toFixed(2).slice(2,4); 
			var  NetProfit = ~~(datal.NetProfit/datal.NetIncome).toFixed(2).slice(2,4);

			Chartist.Pie('#chartlirun', dataPreferences, optionsPreferences);

	        Chartist.Pie('#chartlirun', {
	          labels: [CostTax+"%",NetProfit+"%"],
	          series: [CostTax,NetProfit]
	        });	
			
		},
		error: function (e) {
			console.log(2,e);
		}
	});	
	
}

var Lirun_Change1 = function(value){
	var Lirun_select_2 = $("#Lirun_select_2").val(); 
	console.log(Lirun_select_1);
	console.log(Lirun_select_2);
	Lirun_compare_Change(value,Lirun_select_2);	
}

var Lirun_Change2 = function(value){
	var Lirun_select_1 = $("#Lirun_select_1").val(); 
	console.log(Lirun_select_1);
	console.log(Lirun_select_2);
	Lirun_compare_Change(Lirun_select_1,value);	
}


var Chengben_compare_Change = function(select1,select2){
		var data1;
		var data2;	
		$.ajax({
				url:urlTitle+"ivm/costs/filter?inputid=10000&year="+select1,		
				type: "GET",
		        crossDomain: true,
		        dataType: 'json',
				async : false,
				success:function (data) {
					data1 = data[0];
				},
				error: function (e) {
					console.log(2,e);
				}
		});	

		$.ajax({
			url:urlTitle+"ivm/costs/filter?inputid=10000&year="+select2,		
			type: "GET",
	        crossDomain: true,
	        dataType: 'json',
			async : false,
			success:function (data) {
				data2 = data[0];
			},
			error: function (e) {
				console.log(2,e);
			}
		});	
		
		
		var options={
        chart: {
            type: 'bar'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: [data1.Year, data2.Year]
        },
        yAxis: {
            min: 0,
        },
        legend: {
        	enabled:false,
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
        	name:"管理费用",
            data: [parseFloat(data1.ManagementFee.toFixed(2)),parseFloat(data2.ManagementFee.toFixed(2))]
        }, {
        	name:"维护费用 ",
            data: [parseFloat(data1.MaintenanceFee.toFixed(2)), parseFloat(data2.MaintenanceFee.toFixed(2))]
        },{
        	name:"折旧摊销",
            data: [parseFloat(data1.DepreciationFee.toFixed(2)), parseFloat(data2.DepreciationFee.toFixed(2))]
        },{
        	name:"利息费用",
            data: [parseFloat(data1.InterestFee.toFixed(2)), parseFloat(data2.InterestFee.toFixed(2))]
        },{
        	name:"所得税",
            data: [parseFloat(data1.IncomeTax.toFixed(2)), parseFloat(data2.IncomeTax.toFixed(2))]
        }],
        colors: ["#FB404B", "#9368E9","#FFA534","#87CB16","#23CCEF"],
        visible:true
    }
		console.log(options);
		var chart1 = $('#chartchengben_compare').highcharts(options);
		
	var total = data1.ManagementFee+data1.MaintenanceFee+data1.DepreciationFee+data1.InterestFee+data1.IncomeTax;
	var  MaintenanceFee = ~~(data1.ManagementFee/total).toFixed(2).slice(2,4); 
	var  ManagementFee = ~~(data1.ManagementFee/total).toFixed(2).slice(2,4); 
	var  DepreciationFee = ~~(data1.DepreciationFee/total).toFixed(2).slice(2,4); 
	var  InterestFee = ~~(data1.InterestFee/total).toFixed(2).slice(2,4); 
	var  IncomeTax = ~~(data1.IncomeTax/total).toFixed(2).slice(2,4); 

	Chartist.Pie('#chartchengben', dataPreferences, optionsPreferences);
    Chartist.Pie('#chartchengben', {
      labels: [MaintenanceFee+"%",ManagementFee+"%",DepreciationFee+"%",InterestFee+"%",IncomeTax+"%"],
      series: [MaintenanceFee,ManagementFee,DepreciationFee,InterestFee,IncomeTax]
    });
    my_compare = data2;
	var total1 = my_compare.ManagementFee+my_compare.MaintenanceFee+my_compare.DepreciationFee+my_compare.InterestFee+my_compare.IncomeTax;
	var  MaintenanceFee1 = ~~(my_compare.ManagementFee/total).toFixed(2).slice(2,4); 
	var  ManagementFee1 = ~~(my_compare.ManagementFee/total).toFixed(2).slice(2,4); 
	var  DepreciationFee1 = ~~(my_compare.DepreciationFee/total).toFixed(2).slice(2,4); 
	var  InterestFee1 = ~~(my_compare.InterestFee/total).toFixed(2).slice(2,4); 
	var  IncomeTax1 = ~~(my_compare.IncomeTax/total).toFixed(2).slice(2,4); 

	Chartist.Pie('#chartchengben1', dataPreferences, optionsPreferences);
    Chartist.Pie('#chartchengben1', {
      labels: [MaintenanceFee1+"%",ManagementFee1+"%",DepreciationFee1+"%",InterestFee1+"%",IncomeTax1+"%"],
      series: [MaintenanceFee1,ManagementFee1,DepreciationFee1,InterestFee1,IncomeTax1]
    });			
			
}

var Lirun_compare_Change = function(select1,select2){
		var data1;
		var data2;	
		$.ajax({
				url:urlTitle+"ivm/profits/filter?inputid=10000&year="+select1,		
				type: "GET",
		        crossDomain: true,
		        dataType: 'json',
				async : false,
				success:function (data) {
					data1 = data[0];
				},
				error: function (e) {
					console.log(2,e);
				}
		});	

		$.ajax({
			url:urlTitle+"ivm/profits/filter?inputid=10000&year="+select2,		
			type: "GET",
	        crossDomain: true,
	        dataType: 'json',
			async : false,
			success:function (data) {
				data2 = data[0];
			},
			error: function (e) {
				console.log(2,e);
			}
		});	
//		alert(parseFloat(data[0].NetIncome.toFixed(2)));
		$('#chartLirun_compare').highcharts({
				chart: {
					type: 'bar'
				},
				title: {
					text: ''
				},
				xAxis: {
					categories: [data1.Year, data2.Year]
				},
				yAxis: {
					min: 0,
				},
				legend: {
					enabled:false,
				},
				plotOptions: {
					series: {
						stacking: 'normal'
					}
				},
				series: [{
					name:"营业成本及税金",
					data: [parseFloat(data1.CostTax.toFixed(2)), parseFloat(data2.CostTax.toFixed(2))]
				},{
					name:"营业净利润",
					data: [parseFloat(data1.NetProfit.toFixed(2)), parseFloat(data2.NetProfit.toFixed(2))]
				}],
				colors: ["#23CCEF","#FB404B"],
				visible:true
			});			
}

	
			
		
	 
			