		var $table = $('#bootstrap-table');	
 
		
		GetJson = function(url){
			var result="";
			$.ajax({
				url:url,
				async:false,
				crossDomain:true,
				success:function(data){
					
					result=data;
				}
			
			})
			
			return result;
		}
		
		
		defaultUrl=urlTitle+"v1/users/pagingfilter?code=&name=&status=-1";
		url="http://192.168.1.201:8099/api/loan/wpprojects/approvals?province=-1&name="
		//jsonData=GetJson(defaultUrl);
		jsonData=[{"height":70,"channel":1,"date":"2016-10-14至2016-12-14","mean":0,"std":0,"max":0,"min":0},{"height":70,"channel":2,"date":"2016-10-14至2016-12-14","mean":0,"std":0,"max":0,"min":0},{"height":50,"channel":3,"date":"2016-10-14至2016-12-14","mean":0,"std":0,"max":0,"min":0},{"height":30,"channel":13,"date":"2016-10-14至2016-12-14","mean":0,"std":0,"max":0,"min":0},{"height":10,"channel":14,"date":"2016-10-14至2016-12-14","mean":0,"std":0,"max":0,"min":0}]
		console.log(jsonData)
        $table.bootstrapTable({
		columns: [{
			field: 'height',
			title: 'height'
		}, {
			field: 'channel',
			title: 'channel'
		} ],
			data:  jsonData,
			//url:url,
			//method: 'get', 
			striped: true,
			dataType: "json",
			timeout:120000,
			pagination: true,
			singleSelect: false,
			contentType: "application/x-www-form-urlencoded",
            pageList: [10,25,50],
			queryParams:queryParams,
			responseHandler:responseHandler,
			pageSize: 10,
			pageNumber:1,
			search: false, //显示 搜索框
			sidePagination: "server", //服务端请求		 
            toolbar: ".toolbar",
            clickToSelect: true,
            searchAlign: 'left', 
            formatShowingRows: function(pageFrom, pageTo, totalRows){
                //do nothing here, we don't want to show the text "showing x of y from..."
            },
            formatRecordsPerPage: function(pageNumber){
                return     "每页显示&nbsp;" + pageNumber +"条";
            },
            icons: {
                refresh: 'fa fa-refresh',
                toggle: 'fa fa-th-list',
                columns: 'fa fa-columns',
                detailOpen: 'fa fa-plus-circle',
                detailClose: 'fa fa-minus-circle'
            }
        });
 
 $('#table').bootstrapTable({
    url: url,
    columns: [{
        field: 'ProjectId',
        title: 'ID'
		
    }, {
        field: 'FinancingPhaseName',
        title: 'FinancingPhaseName',
		sortable:true
    }  ]
});

 

				function queryParams(params) {
		 
				return {
				pageSize: params.limit,
				pagenumber:this.pageNumber
				};
	 
				}


				function responseHandler(res) {
				//console.log(res);
				if (res) {
				//var result = b64.decode(res.ResultValue);
				//var resultStr = $.parseJSON(result);

				data={
				"rows": res.Items,
				"total": res.PageSize*res.PageCount
				};

				return data
				} else {
				return {
				"rows": [],
				"total": 0
				};
				}

				}
 
