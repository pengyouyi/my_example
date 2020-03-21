<template>
  <div class="WorldChart">
  	<div class="title">vue中插入Echarts示例画map图</div>
	<div id="world-chart"></div>
	<div class="country">
		<div class="value">{{country.name}}</div>
		<div class="value">{{country.number}}</div>
	</div>
  </div>
</template>

<script>
	const echarts = require('echarts/lib/echarts');
	require('echarts/lib/chart/map');
	import world from 'echarts/map/js/world';
	import population from '../assets/js/population.js';
	export default {
		data() {
			return {
				country: {
					name: 'china',
					number: 1359821465
				},
				option: {
					series: [{
						name: 'population',
						type: 'map',
						mapType: 'world',
						roam: false,
						selectedMode: 'single',
						itemStyle: {
							normal: {
								areaColor: '#999',
								borderColor: 'white'
							},
							emphasis: {
								areaColor: '#FF4500',
								label: {
									show: false
								}
							}
						},
						markPoint: {
							symbol: 'pin',
							symbolSize: 50
						},
						data: population
					}]
				}
			};
		},
		computed: {
			chart() {
				return echarts.init(document.getElementById('world-chart'));
			}
		},
		mounted() {
			this.chart.on('mouseover', function(params) {
				if (params.value) {
					this.country.name = params.name;
					this.country.number = params.value;
				}
			}.bind(this));
			this.chart.setOption(this.option);
		}
	};

</script>

<style scoped>
#world-chart {
	width: 600px;
	height: 300px;
	margin: 0 auto;
}
</style>