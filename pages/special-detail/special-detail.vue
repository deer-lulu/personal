<template>
	<view class="special-wrap">
		<view class="special-video">
			<video class="video-content" :src="detail.playUrl"></video>
		</view>
		<view class="detail-content">
			<view class="detail-tips">节目详情</view>
			<view class="detail-main flex-nowrap">
				<view class="detail-title">节目名称</view>
				<view class="detail-desc">{{detail.name}}</view>
			</view>
			<view class="detail-main flex-nowrap">
				<view class="detail-title">直播时间</view>
				<view class="detail-desc">{{detail.playTime}}</view>
			</view>
			<view class="detail-main flex-nowrap">
				<view class="detail-title">节目时长</view>
				<view class="detail-desc">{{detail.duration}}</view>
			</view>
			<view class="detail-main flex-nowrap">
				<view class="detail-title">播放次数</view>
				<view class="detail-desc">{{detail.playCount}}</view>
			</view>
			<view class="detail-main flex-nowrap">
				<view class="detail-title">节目简介</view>
				<view class="detail-desc">{{detail.introduction}}</view>
			</view>

		</view>

	</view>
</template>

<script>
	import API from '../../static/js/api.js'
	export default {
		data() {
			return {
				detail: {
					name: '',
					playTime: '',
					duration: '',
					playCount: '',
					introduction: '',
					playUrl: '',
				}
			};
		},
		// 监听页面加载
		onLoad: function(option) {
			console.log('id', option.id);
			API.getSpecialDetail(option.id).then(res => {
				this.detail.name = res.result.name,
				this.detail.playTime = res.result.playTime,
				this.detail.duration = res.result.duration,
				this.detail.playCount = res.result.playCount,
				this.detail.introduction = res.result.introduction,
				this.detail.playUrl = res.result.playUrl
				console.log('111', res, this.detail);
			})
		}
	}
</script>

<style lang="scss">
	.special-wrap {
		width: 100%;
		height: 100%;

		.special-video {
			width: 100%;
			height: 420rpx;

			.video-content {
				width: 100%;
				height: 100%;
			}
		}

		.detail-content {
			margin-top: 20rpx;
			padding: 38rpx 40rpx 0 40rpx;

			.detail-tips {
				padding-bottom: 40rpx;
				font-size: 36rpx;
				color: $black;
				line-height: 50rpx;
			}
		}

		.detail-main {
			padding-bottom: 22rpx;

			.detail-title {
				width: 120rpx;
				font-size: 30rpx;
				color: $black;
			}

			.detail-desc {
				width: calc(100% - 120rpx);
				padding-left: 30rpx;
				font-size: 30rpx;
				color: $gray-base;
			}
		}
	}
</style>
