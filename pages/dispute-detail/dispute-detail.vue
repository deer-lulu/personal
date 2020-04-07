<template>
	<view class="dispute-detail-wrap">
		<view class="detail-image" :style="{'background-image': 'url(' + personal.image + ')'}"></view>
		<view class="detail-card">
			<view class="detail-name">{{personal.name}}</view>
			<view class="detail-item flex-nowrap">
				<view class="item-tips">调解区域</view>
				<view class="item-desc">{{personal.DQBM}}</view>
			</view>
			<view class="detail-item flex-nowrap">
				<view class="item-tips">机构认证</view>
				<view class="item-desc">{{personal.guideOrg}}</view>
			</view>
			<view class="detail-item flex-nowrap">
				<view class="item-tips">擅长领域</view>
				<view class="item-desc">
					<view class="good-detail" v-for="(items, i) in personal.expertise" :key="i">{{items}}</view>
				</view>
			</view>
			<view class="detail-item flex-nowrap">
				<view class="item-tips">调解数量</view>
				<view class="item-desc">已调解 {{personal.sn}}</view>
			</view>
		</view>
		<view class="detail-card">
			<view class="person-intro">个人简介</view>
			<view class="intro-detail">{{personal.intro}}</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				personal: {
					image: '/static/images/project.png',
					name: '',
					DQBM: '',
					guideOrg: '',
					expertise: [],
					sn: '',
					intro: '从事调解工作7年，总计调解案件超过300件，被评为白云街道优秀调解员，被评为蓝田县模范标兵。'
				}
			};
		},
		// 监听页面加载
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log('option', option); //打印出上个页面传递的参数。
			uni.request({
				url: 'http://shanxi.tunnel.homolo.org/api/apiMediatorService/getMediatorInfo?id=' + option.id,
				success: (res) => {
					console.log('111', res.data);
					let ex = ''
					if (res.data.result.expertise && res.data.result.expertise !== '') {
						ex = res.data.result.expertise.split(',');
					}
					console.log('222', ex)
					this.personal.name = res.data.result.name,
						this.personal.DQBM = res.data.result.DQBM,
						this.personal.guideOrg = res.data.result.guideOrg,
						this.personal.expertise = ex,
						this.personal.sn = res.data.result.sn
				},
			});
		}
	}
</script>

<style lang="scss">
	.dispute-detail-wrap {
		position: relative;
		width: 100%;
		min-height: 100vh;
		padding: 156rpx 60rpx 26rpx 60rpx;
		background-color: #056efe;

		.detail-image {
			position: absolute;
			top: 60rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 238rpx;
			height: 318rpx;
			border: 6rpx solid $white;
		}

		.detail-card {
			width: 100%;
			height: auto;
			padding: 60rpx;
			background-color: $white;

			&:nth-of-type(2) {
				margin-bottom: 40rpx;
			}

			.detail-name {
				padding-top: 200rpx;
				padding-bottom: 20rpx;
				text-align: center;
				font-size: 40rpx;
				color: $black;
			}
		}

		.detail-item {
			padding-top: 24rpx;

			.item-tips {
				width: 132rpx;
				height: 40rpx;
				padding: 0 12rpx;
				font-size: 26rpx;
				color: #056efe;
				line-height: 36rpx;
				border: 1rpx solid #056efe;
			}

			.item-desc {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				max-width: calc(100% - 132rpx);
				padding-left: 30rpx;
			}
			
			.good-detail {
				padding-right: 30rpx;
				font-size: 28rpx;
				line-height: 40rpx;
				color: $black;
			}
		}

		.person-intro {
			padding-bottom: 35rpx;
			line-height: 48rpx;
			font-size: 34rpx;
			color: $black;
		}

		.intro-detail {
			font-size: 28rpx;
			color: $gray-base;
			text-align: justify;
			line-height: 48rpx;
		}
		
	}
</style>
