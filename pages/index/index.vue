<template>
	<view class="index-wrap">
		<view class="banner">
			<swiper class="swiper" indicator-dots="true" indicator-color="#ecedf0" indicator-active-color="#9ea5ba" autoplay="true"
			 interval="4000" duration="500" circular="true">
				<swiper-item>
					<view class="swiper-item"></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"></view>
				</swiper-item>
			</swiper>
		</view>
		<view class="index-body">
			<view class="guide flex-nowrap">
				<view class="flex-nowrap">
					<view class="service-block">
						<view class="iconfont service"></view>
					</view>
					<view class="service-word">服务</view>
				</view>
				<!-- <view class="flex-nowrap">
					<view class="service-word">服务指南</view>
					<view class="iconfont arrow-right"></view>
				</view> -->
			</view>
			<view class="online-dispute flex-nowrap">
				<navigator class="dispute-item" url="../online-dispute/online-dispute" hover-class="navigator-hover">
					<view class="item-image">
						<view class="iconfont mediation"></view>
					</view>
					<view class="item-word">在线调解</view>
				</navigator>
				<!-- <view class="dispute-item">
					<view class="item-image">
						<view class="iconfont consulting"></view>
					</view>
					<view class="item-word">留言咨询</view>
				</view> -->
				<navigator class="dispute-item" url="../dispute-team/dispute-team" hover-class="navigator-hover">
					<view class="item-image">
						<view class="iconfont team"></view>
					</view>
					<view class="item-word">调解队伍</view>
				</navigator>
			</view>
			<view class="guide flex-nowrap">
				<view class="flex-nowrap">
					<view class="service-block">
						<view class="iconfont project"></view>
					</view>
					<view class="service-word">专题</view>
				</view>
			</view>
			<view class="online-dispute">
				<navigator :url="'../special-detail/special-detail?id='+item.id" hover-class="navigator-hover" class="special-list flex-nowrap" v-for="(item , index ) in specialList" :key="index">
					<view class="list-image" :style="{'background-image': 'url(' + item.img + ')'}"></view>
					<view class="list-detail">
						<view class="list-title">{{item.title}}</view>
						<view class="list-content">{{item.content}}</view>
					</view>
				</navigator>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				specialList: [{
						id: '0ca16c1c979a4895b1ae2a146773182e',
						title: '帮忙有一套',
						img: '/static/images/project.png',
						content: '《帮忙有一套》电视节目预告、回访及直播。'
					},
					// {
					// 	id: '0ca16c1c979a4895b1ae2a146773182e',
					// 	title: '帮忙有一套',
					// 	img: '/static/images/logo.png',
					// 	content: '《帮忙有一套》电视节目预告、回访及直播。'
					// },
					// {
					// 	id: '0ca16c1c979a4895b1ae2a146773182e',
					// 	title: '帮忙有一套',
					// 	img: '/static/images/project.png',
					// 	content: '《帮忙有一套》电视节目预告、回访及直播。'
					// }
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.index-wrap {
		width: 100%;
		height: 100%;

		.banner {
			width: 100%;
			height: 316rpx;

			.swiper {
				width: 100%;
				height: 100%;
			}

			.swiper-item {
				width: 100%;
				height: 100%;
				background-image: url(../../static/images/home_banner.png);
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center center;

			}
		}

		.index-body {
			padding: 0 40rpx;
		}

		.guide {
			justify-content: space-between;
			padding-top: 70rpx;

			.service-block {
				width: 40rpx;
				height: 40rpx;
				background-color: #9ea5ba;

				.iconfont {
					width: 28rpx;
					height: 28rpx;
					margin: auto;
					line-height: 40rpx;
					font-size: 28rpx;
					color: $white;
				}
			}

			.service-word {
				padding-left: 16rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				color: #9ea5ba;
			}

			.arrow-right {
				padding-left: 16rpx;
				font-size: 28rpx;
				line-height: 40rpx;
				color: #9ea5ba;
			}
		}

		.online-dispute {
			padding-top: 30rpx;
		}

		.dispute-item {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			width: calc((100% - 20rpx) / 2);
			height: 210rpx;
			margin-right: 20rpx;

			&:first-child {
				background-color: #2d5afe;
				box-shadow: 0 16rpx 32rpx rgba(45, 90, 254, 0.4);

				.item-image {
					background-color: rgba(0, 0, 0, .2);
				}
			}

			&:nth-child(2) {
				background-color: #2e87fe;
				box-shadow: 0 16rpx 32rpx rgba(46, 135, 254, 0.4);

				.item-image {
					background-color: rgb(36, 108, 203);
				}
			}

			&:last-child {
				margin-right: 0;
				background-color: #2eadfe;
				box-shadow: 0 16rpx 32rpx rgba(46, 173, 254, 0.4);

				.item-image {
					background-color: rgb(36, 138, 203);
				}
			}

			.item-image {
				margin-top: 40rpx;
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;

				.iconfont {
					width: 48rpx;
					height: 48rpx;
					margin: auto;
					line-height: 88rpx;
					font-size: 48rpx;
					color: $white;
				}
			}

			.item-word {
				width: 100%;
				text-align: center;
				font-size: 30rpx;
				line-height: 42rpx;
				color: $white;
			}
		}

		.special-list {
			padding: 30rpx;
			margin-bottom: 20rpx;
			background-color: #f5f6fa;

			.list-image {
				width: 160rpx;
				height: 160rpx;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center;
			}

			.list-detail {
				width: calc(100% - 160rpx);
				height: auto;
				padding-left: 24rpx;
			}

			.list-title {
				font-size: 34rpx;
				color: $black;
			}

			.list-content {
				padding-top: 20rpx;
				font-size: 28rpx;
				color: $gray-base;

			}
		}
	}
</style>
