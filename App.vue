<script>
	import API from './static/js/api.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './common/common.scss';
	@import './common/iconfont.css';

	/* 首页轮播图样式指示点修改 */
	.index-wrap .uni-swiper-wrapper .uni-swiper-dot {
		width: 50rpx;
		height: 8rpx;
		border-radius: 0;
	}

	.index-wrap .uni-swiper-wrapper .uni-swiper-dots-horizontal {
		left: 100rpx;
	}

	button::after {
		border: none;
	}

	// .border-bottom {
	// 	position: relative;
	// 	&::after {
	// 		position: absolute;
	// 		bottom: 0;
	// 		left: 0;
	// 		width: 100%;
	// 		height: 1px;
	// 		content: "";
	// 		background-color: #e5e5e5;
	// 	}
	// }
</style>
