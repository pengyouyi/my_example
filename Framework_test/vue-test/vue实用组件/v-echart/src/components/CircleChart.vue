<template>
  <div class="CircleChart">
  	<div class="title">vue中插入Echarts示例画pie图</div>
	<div id="circle-chart"></div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入组件
require('echarts/lib/chart/pie');
// 引入组件
require('echarts/lib/component/legend');

export default {
	data() {
		return {
            circleData: [{
					value: Math.round(Math.random() * 1000),
					name: '中东欧'
				}, {
					value: Math.round(Math.random() * 1000),
					name: '西亚'
				}, {
					value: Math.round(Math.random() * 1000),
					name: '南亚'
				}, {
					value: Math.round(Math.random() * 1000),
					name: '东亚联盟'
				}, {
					value: Math.round(Math.random() * 1000),
					name: '独联体'
			}]
		}
	},
	mounted() {
		let myChart = echarts.init(document.getElementById('circle-chart'));
		let option = {
            legend: {
				orient: 'vertical',
				left: 'left',
				top: 'top',
				data: ['中东欧', '西亚', '南亚', '东亚联盟', '独联体']
			},
			series: [{
				type: 'pie',
				center: ['50%', '60%'],
				radius: ['50%', '70%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						position: 'center',
					},
					emphasis: {
						show: true,
						fontSize: 18,
						fontWeight: 'bold',
						lineHeight: 20,
						formatter: ['{b}', '{c}', '({d}%)'].join('\n'),
						rich: {
							b: {
								color: 'black'
							}
						}
					}
				},
				data: this.circleData
			}]
		};
		myChart.setOption(option);
	}
}
</script>

<style scoped>
#circle-chart {
	width: 600px;
	height: 300px;
	margin:40px auto;
}
</style>