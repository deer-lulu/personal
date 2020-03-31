<template>
	<view class="dispute-wrap">
		<view class="dispute-tab border-bottom">纠纷事项</view>
		<view class="dispute-item flex-nowrap border-bottom">
			<view class="item-title">纠纷类型</view>
			<view class="item-select" v-if="disputeType[0] && disputeType[0].name">
				<picker @change="bindPickerChange" :value="typeIndex" :range="disputeType" range-key="name">
					<view class="item-input flex-nowrap">
						<view class="item-word">{{disputeType[typeIndex].name}}</view>
						<view class="item-arrow">></view>
					</view>
				</picker>
			</view>
		</view>
		<view class="dispute-item flex-nowrap border-bottom">
			<view class="item-title">案发区域</view>
			<view class="item-select" v-if="area[2] && area[2][0]">
				<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="areaIndex" :range="area" range-key="name">
					<view class="item-input flex-nowrap">
						<view class="item-word">{{area[0][areaIndex[0]].name}}，{{area[1][areaIndex[1]].name}}，{{area[2][areaIndex[2]].name}}</view>
						<view class="item-arrow">></view>
					</view>
				</picker>
			</view>
		</view>
		<view class="dispute-item flex-nowrap border-bottom">
			<view class="item-title">详细地址</view>
			<view class="item-select">
				<input class="item-address" v-model="apply.address" placeholder="详细信息" placeholder-class="input-placeholder" />
			</view>
		</view>
		<view class="dispute-item flex-nowrap border-bottom">
			<view class="item-title">纠纷描述</view>
			<view class="item-select">
				<input class="item-address" v-model="apply.introduce" placeholder="详细信息" placeholder-class="input-placeholder" />
			</view>
		</view>
		<view class="dispute-item flex-nowrap border-bottom" @tap="chooseVideo">
			<view class="item-title-upload">
				<view class="upload">上传附件</view>
				<view class="upload-video">上传视频，以描述您的纠纷</view>
			</view>
			<view class="upload-arrow">></view>
		</view>
		<video v-if="apply.videoSrc" class="video-content" :src="apply.videoSrc"></video>

		<view class="dispute-tab border-bottom">被申请人</view>
		<view class="dispute-item flex-nowrap border-bottom">
			<view class="item-title">姓名</view>
			<view class="item-select">
				<input class="item-address" v-model="apply.respondentName" placeholder="详细信息" placeholder-class="input-placeholder" />
			</view>
		</view>
		<view class="dispute-item flex-nowrap border-bottom">
			<view class="item-title">联系电话</view>
			<view class="item-select">
				<input class="item-address" v-model="apply.respondentMobile" placeholder="详细信息" placeholder-class="input-placeholder" />
			</view>
		</view>
		<view class="dispute-tab border-bottom">申请人</view>
		<view class="dispute-item flex-nowrap border-bottom">
			<view class="item-title">姓名</view>
			<view class="item-select">
				<input class="item-address" v-model="apply.applyName" placeholder="详细信息" placeholder-class="input-placeholder" />
			</view>
		</view>
		<view class="dispute-item flex-nowrap border-bottom">
			<view class="item-title">联系电话</view>
			<view class="item-select">
				<input class="item-address" v-model="apply.applyMobile" placeholder="详细信息" placeholder-class="input-placeholder" />
			</view>
		</view>
		<view class="dispute-item flex-nowrap border-bottom">
			<view class="item-title">验证码</view>
			<view class="item-select-code">
				<input class="item-address" v-model="apply.code" placeholder="详细信息" placeholder-class="input-placeholder" />
			</view>
			<view class="get-code" @tap="openPopup">获取验证码</view>
		</view>
		<view class="submit">
			<button class="submit-button" type="primary" :disabled="buttonType" @tap="submit">提交</button>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popup-tip">
				<view class="popup-tip-content border-bottom">验证码已发送，请注意查收</view>
				<view class="popup-tip-button" @click="closePopup()">确定</view>
			</view>
		</uni-popup>
	</view>

</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import API from "../../static/js/api.js"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				// 纠纷类型
				disputeType: [],
				typeIndex: 0,
				// 案发区域
				area: [],
				areaIndex: [0, 0, 0],
				allAreaList: [],
				// buttonType: true,
				apply: {
					address: '',
					introduce: '',
					videoSrc: '',
					respondentName: '',
					respondentMobile: '',
					applyName: '',
					applyMobile: '',
					code: ''
				},

			};
		},
		methods: {
			// 单列选择
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			// 多列选择
			bindMultiPickerColumnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				this.areaIndex[e.detail.column] = e.detail.value
				switch (e.detail.column) {
					case 0:
						this.area[1] = this.allAreaList[e.detail.value].children.map(e => {
							return {
								id: e.id,
								name: e.name
							}
						});
						this.area[2] = this.allAreaList[e.detail.value].children[this.areaIndex[0]].children.map(e => {
							return {
								id: e.id,
								name: e.name
							}
						});
						break
					case 1:
						this.area[2] = this.allAreaList[this.areaIndex[0]].children[this.areaIndex[1]].children.map(e => {
							return {
								id: e.id,
								name: e.name
							}
						})
						break
				}
				console.log(this.areaIndex)
				this.$forceUpdate()
			},
			// 上传视频
			chooseVideo: function() {
				var self = this;
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						self.apply.videoSrc = res.tempFilePath;
						console.log('video', res)
					}
				});
			},
			// 打开弹框
			openPopup: function() {
				this.$refs.popup.open()
				// uni.showModal({
				//     content: '验证码已发送，请注意查收',
				// 		showCancel: false,
				// });
			},
			// 关闭弹框
			closePopup: function() {
				this.$refs.popup.close()
			},
			// 提交
			submit: function() {
				console.log(this.apply)
				let applyList = {
					typeIndex: this.typeIndex,
					areaIndex: this.areaIndex,
					apply: this.apply
				}
				uni.setStorage({
					key: 'storage_applyList',
					data: JSON.stringify(applyList)
				});
				uni.showModal({
					content: '提交成功',
					showCancel: false,
					success: function() {
						uni.switchTab({
							url: '/pages/index/index'
						});
					}
				});
			}
		},
		computed: {
			buttonType: function() {
				// console.log('apply', this.apply)
				let flag = 0
				Object.keys(this.apply).forEach(i => {
					// console.log(this.apply[i])
					if (this.apply[i] !== '') {
						console.log('false')
						flag++;
					}
				});
				console.log(flag)
				if (flag === 8) {
					return false;
				} else {
					return true;
				}
			}
		},
		onLoad(e) {
			API.grtDisputeList().then(res => {
					// console.log('111', res);
					this.disputeType = res.children.map(e => {
						return {
							id: e.id,
							name: e.name
						}
					});
					// console.log('disputeList', this.disputeType)
				}),
				API.grtAreaList().then(res => {
					// console.log('111', res.children);
					this.allAreaList = res.children
					this.area[0] = this.allAreaList.map(e => {
						return {
							id: e.id,
							name: e.name
						}
					});
					this.area[1] = this.allAreaList[0].children.map(e => {
						return {
							id: e.id,
							name: e.name
						}
					});
					this.area[2] = this.allAreaList[0].children[0].children.map(e => {
						return {
							id: e.id,
							name: e.name
						}
					});
					this.$forceUpdate()
					// console.log('area', this.area)
				})
				const _this = this;
				uni.getStorage({
					key: 'storage_applyList',
					success(res) {
						console.log(this,_this)
						let applyList = JSON.parse(res.data)
						_this.apply = applyList.apply,
						_this.typeIndex = applyList.typeIndex,
						_this.areaIndex = applyList.areaIndex
						console.log('this.apply',this.apply)
					}
				})
		}

	}
</script>

<style lang="scss">
	.dispute-wrap {
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;

		.dispute-tab {
			padding: 40rpx 32px 16rpx 32rpx;
			font-size: 26rpx;
			color: $gray-base;

		}

		.dispute-item {
			// position: relative;
			padding: 25rpx 30rpx;
			// line-height: 48rpx;
			font-size: 32px;
			background-color: $white;

			// &::after {
			// 	position: absolute;
			// 	bottom: 0;
			// 	left: 0;
			// 	width: 100%;
			// 	height: 1px;
			// 	content: "";
			// 	background-color: #e5e5e5;
			// }

			&:hover {
				background-color: #e7e7e7;
			}

			.item-title {
				width: 130rpx;
				color: $gray-base;
			}

			.item-select {
				width: calc(100% - 130rpx);
				padding-left: 40rpx;
				color: $black;
			}

			.item-input {
				justify-content: space-between;
			}

			.item-arrow {
				color: #c7c7cc;
			}

			.item-address {
				border: none;
				resize: none;
			}

			.input-placeholder {
				color: $gray-dark;
			}
		}

		.item-title-upload {
			width: calc(100% - 130rpx);
			color: $gray-base;
			font-size: 32rpx;

			.upload-video {
				font-size: 26rpx;
			}
		}

		.upload-arrow {
			width: 130rpx;
			color: #c7c7c7;
			text-align: right;
		}

		.video-content {
			width: 100%;
			height: 400rpx;
		}

		.item-select-code {
			width: calc(100% - 290rpx);
			padding-left: 40rpx;
		}

		.get-code {
			width: 160rpx;
			font-size: 32rpx;
			color: #056efe;
		}

		.submit {
			padding: 80rpx 40rpx 50rpx 40rpx;

			.submit-button {
				width: 100%;
				height: 96rpx;
				border: none;
				border-radius: 0;
			}
		}

		.popup-tip {
			width: 560rpx;
			height: auto;
			text-align: center;
			background-color: $white;
			border-radius: 8rpx;

			.popup-tip-content {
				padding: 60rpx 0;
				font-size: 30rpx;
				color: $gray-dark;
			}

			.popup-tip-button {
				line-height: 100rpx;
				font-size: 36rpx;
				color: #056efe;
			}
		}
	}
</style>
