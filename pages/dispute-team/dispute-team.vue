<template>
	<view class="team-wrap">
		<view class="team-header">
			<view class="team-search">
				<input class="search-content" @input="search" type="text" placeholder="查找调解员" placeholder-class="input-placeholder">
			</view>
			<view class="team-tab flex-nowrap">
				<view class="tab-item flex-nowrap" @tap="changeTab('area')">
					<view class="item-title">{{areaName}}</view>
					<view class="iconfont drop-down"></view>
				</view>
				<view class="tab-item flex-nowrap" @tap="changeTab('good')">
					<view class="item-title">{{goodName}}</view>
					<view class="iconfont drop-down"></view>
				</view>
				<view class="tab-item flex-nowrap" @tap="changeTab('year')">
					<view class="item-title">{{yearName}}</view>
					<view class="iconfont drop-down"></view>
				</view>
			</view>
		</view>
		<view class="empty" v-if="teatList.length === 0">
			<view class="empty-image"></view>
			<view class="empty-word">空列表</view>
		</view>
		<scroll-view v-if="teatList.length !== 0" scroll-y="true" class="team-body" @scrolltolower="lower">
			<navigator class="team-list flex-nowrap border-bottom" :url="'../dispute-detail/dispute-detail?id=' + item.id"
			 hover-class="navigator-hover" v-for="(item, index) in teatList" :key="index">
				<view class="list-image" :style="{'background-image': 'url(' + item.image + ')'}"></view>
				<view class="list-detail">
					<view class="list-name">{{item.name}}</view>
					<view class="list-desc flex-nowrap">
						<view class="desc-tips">调解区域</view>
						<view class="desc-content">{{item.DQBM}}</view>
					</view>
					<view class="list-desc flex-nowrap">
						<view class="desc-tips">机构认证</view>
						<view class="desc-content">{{item.guideOrg}}</view>
					</view>
					<view class="list-desc flex-nowrap">
						<view class="desc-tips">擅长领域</view>
						<view class="desc-content">
							<view class="good-detail" v-for="(items, i) in item.expertise" :key="i">{{items}}</view>
						</view>
					</view>
					<view class="list-desc flex-nowrap">
						<view class="desc-tips">调解数量</view>
						<view class="desc-content">已调解&nbsp;{{item.sn}}</view>
					</view>
				</view>
			</navigator>
		</scroll-view>
		<view class="team-select" v-if="selectStatus !== ''" @tap="cancelSelect">
			<view class="team-select-item" v-if="selectStatus === 'area'">
				<view class="select-box">
					<view class="select-item flex-nowrap border-bottom" @click.stop="changeAreaSelect(index)" :style="areaIndex === index ? 'color: #056efe' : ''"
					 v-for="(item, index) in selectList" :key="index">
						<view class="select-word">{{item}}</view>
						<view class="iconfont xingzhuang" v-if="areaIndex === index"></view>
					</view>
				</view>
			</view>
			<view class="team-select-item" v-if="selectStatus === 'good'">
				<view class="select-box">
					<view class="select-item flex-nowrap border-bottom" @click.stop="changeGoodSelect(index)" :style="goodIndex === index ? 'color: #056efe' : ''"
					 v-for="(item, index) in goodList" :key="index">
						<view class="select-word">{{item}}</view>
						<view class="iconfont xingzhuang" v-if="goodIndex === index"></view>
					</view>
				</view>
			</view>
			<view class="team-select-item" v-if="selectStatus === 'year'">
				<view class="select-box">
					<view class="select-item flex-nowrap border-bottom" @click.stop="changeYearSelect(index)" :style="yearIndex === index ? 'color: #056efe' : ''"
					 v-for="(item, index) in yearList" :key="index">
						<view class="select-word">{{item}}</view>
						<view class="iconfont xingzhuang" v-if="yearIndex === index"></view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				areaName: '区域',
				goodName: '擅长领域',
				yearName: '从业年限',
				teatList: [
					// {
					// 		id: '0b01a73f192a4da78555ad87478b7c92',
					// 		img: '../static/project.png',
					// 		name: '汪超',
					// 		area: '西安市 蓝田县',
					// 		organ: '白云街道人民调解委员会',
					// 		good: ['邻里纠纷', '婚姻纠纷'],
					// 		number: 31
					// 	}
				],
				selectStatus: '',
				selectList: ['全部', '西安市', '宝鸡市', '咸阳市', '铜川市'],
				goodList: ['全部', '婚姻纠纷', '邻里纠纷', '财产纠纷'],
				yearList: ['全部', '1', '2', '3', '4'],
				areaIndex: 0,
				goodIndex: 0,
				yearIndex: 0,
				data: {
					dqbm: '',
					isBMYYT: false,
					pageSize: 10,
					pageNo: 1.,
					name: '',
					lengthService: '',
					expertise: ''
				}
			};
		},
		methods: {
			// 下拉加载
			lower: function(e) {
				console.log(e)
				this.data.pageNo += 1
				console.log('data',this.data.pageNo)
				this.getTeatList('get')
			},
			// 搜索列表
			search: function(event) {
				this.data.name = event.target.value;
				console.log(this.data.name)
				this.getTeatList('update')
			},
			// 获取队伍列表
			getTeatList: function(e) {
				uni.request({
					url: 'http://shanxi.tunnel.homolo.org/api/apiMediatorService/searchMediatorList',
					data: this.data,
					success: (res) => {
						if (e === 'update') {
							this.teatList = [];
							this.data.pageNo = 1;
						}
						// console.log('111', res.data.result.result);
						res.data.result.result.map(e => {
							let ex = ''
							if (e.expertise && e.expertise !== '') {
								ex = e.expertise.split(',');
							}
							let item = {
								image: '/static/images/project.png',
								id: e.id,
								name: e.properties.name,
								DQBM: e.DQBM,
								guideOrg: e.guideOrg,
								expertise: ex,
								sn: e.sn,
							}
							this.teatList.push(item)
						})
						// console.log('222', this.teatList);
					},
				});
			},
			// 点击区域筛选
			changeAreaSelect: function(index) {
				console.log('this.selectList[index]',this.selectList[index])
				this.areaName = this.selectList[index];
				this.areaIndex = index;
				this.selectStatus = '';
				this.data.dqbm = '610102';
				this.getTeatList('update')
			},
			// 点击擅长领域筛选
			changeGoodSelect: function(index) {
				this.goodName = this.goodList[index];
				this.goodIndex = index;
				this.data.expertise = 'd4f8e51f3f0a405abd93207c4520c272';
				this.selectStatus = '';
				this.getTeatList('update')
			},
			// 点击从业年限筛选
			changeYearSelect: function(index) {
				this.yearName = this.yearList[index] + '年';
				this.yearIndex = index;
				this.data.lengthService = this.yearList[index];
				this.selectStatus = '';
				this.getTeatList('update')
			},
			changeTab: function(e) {
				this.selectStatus = e
			},
			cancelSelect: function() {
				this.selectStatus = ''
			}
		},
		// 监听页面加载
		onLoad: function(option) {
			this.getTeatList()
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.team-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;

		.team-header {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 180rpx;
		}

		.team-select {
			position: absolute;
			top: 180rpx;
			left: 0;
			width: 100%;
			height: calc(100% - 180rpx);
			z-index: 10;
			background-color: rgba(0, 0, 0, .3);

			.team-select-item {
				width: 100%;
				height: 100%;
			}
		}

		.team-search {
			padding: 20rpx 40rpx 0 40rpx;
			background-color: $white;

			.search-content {
				height: 70rpx;
				padding: 0 20rpx;
				background-color: #f5f5f5;
			}

			.input-placeholder {
				text-align: center;
			}
		}

		.team-tab {
			background-color: $white;

			.tab-item {
				width: calc(100% / 3);
				justify-content: center;
				padding: 26rpx 0 18rpx 0;
				line-height: 46rpx;
			}

			.item-title {
				padding-right: 25rpx;
				font-size: 30rpx;
				color: $black;
			}

			.drop-down {
				font-size: 23rpx;
				color: #9ea5ba;
			}
		}
		.empty {
			width: 100%;
			height: calc(100vh - 180rpx);
			padding-top: 320rpx;
			background-color: $white;
			.empty-image{
				width: 143rpx;
				height: 183rpx;
				margin: auto;
				background-image: url(../../static/images/empty.png);
				background-repeat: no-repeat;
				background-position: center;
				background-size: contain;
			}
			.empty-word {
				padding-top: 60rpx;
				font-size: 28rpx;
				color: #9ea5ba;
				text-align: center;
			}
			
		}
		.team-body {
			position: absolute;
			top: 180rpx;
			left: 0;
			width: 100%;
			height: calc(100% - 180rpx);

			.team-list {
				padding: 40rpx;
				background-color: $white;

				&:first-child {
					margin-top: 10rpx;
				}
			}

			.list-image {
				width: 208rpx;
				height: 288rpx;
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
			}

			.list-detail {
				width: calc(100% - 209rpx);
				padding-left: 32rpx;
			}

			.list-name {
				font-size: 40rpx;
				color: $black;
				line-height: 100%;
			}

			.list-desc {
				padding-top: 18rpx;
			}

			.desc-tips {
				width: 120rpx;
				height: 40rpx;
				padding: 0 8rpx;
				font-size: 24rpx;
				line-height: 36rpx;
				color: #9ea5ba;
				border: 1px solid #cfe4ff;
			}

			.desc-content {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				max-width: calc(100% - 120rpx);
				padding-left: 24rpx;
			}

			.good-detail {
				padding-right: 24rpx;
				font-size: 26rpx;
				line-height: 40rpx;
				color: $black;
			}
		}

		.select-box {
			padding: 20rpx 40rpx;
			background-color: $white;
		}

		.select-item {
			justify-content: space-between;
			padding: 20rpx 0;
			font-size: 30rpx;
			color: $gray-dark;

			.iconfont {
				font-size: 32rpx;
				color: #056efe;
			}
		}
	}
</style>
