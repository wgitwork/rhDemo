//图表渲染的容器对象
var chartContainer = document.getElementById("main");

//加载图表  
var myChart = echarts.init(chartContainer);
myChart.setOption({
	//图表标题  
	title: {
		//		text: "单位（吨）", //正标题  
		subtext: '单位（吨）',
		x: "center", //标题水平方向位置 
		//副标题样式  
		subtextStyle: {
			fontSize: 12,
			color: "#333"
		}
	},
	grid: {  //设置图表边距
		top: "30rem",
		left: "40rem",
		right: "30rem",
		bottom: "30rem",

	},
	xAxis: [{
		type: 'category',
		scale: true,
		//		show:false,
		data: ['18周', '19周', '20周', '上周', '本周'],
		splitLine: {  //设置x轴线
			show: false  
		},
		axisLabel: {
			show: true, //设置x轴文字显示
			textStyle: {
				color: '#04c599'  //设置x轴文字颜色
			}
		},
		axisLine: {
			lineStyle: {
				color: '#04c599'  //设置x轴颜色
			}
		},
		axisTick: {  //设置x轴刻度显示
        	show:false,  
    	},
	}],
	legend: {
		data: [], //这里需要与series内的每一组数据的name值保持一致  
	},
	//Y轴配置  
	yAxis: [{
		type: 'value',
		scale: true,
		//		show:false,
		splitArea: {
			show: false
		},
		splitLine: {
			show: false
		},
		axisTick: {
        	show: false
    	},
		min: 0,
		max: 1,
	}],
	//图表Series数据序列配置  
	series: [{
		name: '蒸发量',
		type: 'line',
		data: [0.2, 0.6, 0.6, 0.2, 0.4],
		symbol: "none",
		itemStyle: {
			normal: {
				color: '#04c599',
				lineStyle: {
					color: '#04c599'
				}
			}
		},
	}]
});