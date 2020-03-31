let path = 'http://shanxi.tunnel.homolo.org/';
let apiGet = (url) => {
	console.log('apiResource', url)
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${path}${url}`,
			method: 'GET',
			success: (res) => {
				resolve(res.data)
			}
		})
	})
}
export default {
	// 节目详情
	getSpecialDetail: function(id) {
		return apiGet('api/helpOutService/getRepeatProgrammeInfo?id=' + id)
	},
	// 纠纷类型
	grtDisputeList: function() {
		return apiGet('service/rest/mediation.Stb/6d936e2d7ca94bf8a887619f3022ff4d/getCategory')
	},
	// 案发区域
	grtAreaList: function() {
		return apiGet('service/rest/tk.Zone/086/tree')
	}

}
