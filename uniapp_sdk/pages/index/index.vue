<template>
    <view>
		<button type="warn" @click="shareInstance">shareInstance</button>
		<button type="warn" @click="scanDevice">scanDevice</button>
		<button type="primary" @click="peripheralStateChange">peripheralStateChange</button>
		<!-- 新增以下按钮 -->
		<button type="default" @click="peripheralIsReadSendData">peripheralIsReadSendData</button>
		<button type="default" @click="bluetoothPowerStateChange">bluetoothPowerStateChange</button>
		<button type="default" @click="bluetoothAncsStateChange">bluetoothAncsStateChange</button>
		<button type="default" @click="setIsNeedReconnect">setIsNeedReconnect</button>
		<button type="default" @click="reconnectDevice">reconnectDevice</button>
		<button type="default" @click="getSystemListPeripheral">getSystemListPeripheral</button>
		<button type="default" @click="stopScan">stopScan</button>
		<button type="default" @click="connectDevice">connectDevice</button>
		<button type="default" @click="otaDisconnect">otaDisconnect</button>
		<button type="default" @click="disconnect">disconnect</button>
		<button type="default" @click="getDeviceSupportList">getDeviceSupportList</button>
	</view>
</template>
 
<script>
	// 首先需要通过 uni.requireNativePlugin("ModuleName") 获取 module
	var zy = uni.requireNativePlugin("ZySDK-ZyUniappMethodModel")
	console.log('---------------------zy----------------:', zy)
	export default {
		methods: {
			shareInstance() {
				zy.shareInstance()
			},
			scanDevice() {
				// uniapp端调用示例
				zy.scanDevice(res => {
				  if(res.eventType === 'deviceFound') {
				    console.log('发现新设备:', res.device)
				  } else if(res.eventType === 'deviceUpdate') {
				    console.log('设备列表更新:', res.deviceList)
				  }
				})
			},  
			peripheralStateChange() {
				zy.peripheralStateChange(res => {
				  console.log(`Device state changed to: ${res.stateName} (${res.state})`);
				  if (res.state === 0) {
				    // Handle disconnection
				  }
				});
			},  
			peripheralIsReadSendData() {
				zy.peripheralIsReadSendData(res => {
				  if(res.status === 'ready') {
				    console.log('可以发送数据了');
				  }
				})
			},  
			bluetoothPowerStateChange() {
				zy.bluetoothPowerStateChange(res => {
				  if(res.state === 5) {
				    console.log('蓝牙已开启');
				  } else if(res.state === 4) {
				    console.log('蓝牙已关闭');
				  }
				});
			},  
			bluetoothAncsStateChange(){
				zy.bluetoothAncsStateChange(res => {
				  console.log('通知中心状态:', res.enabled ? '已启用' : '未启用')
				})
			},  
			setIsNeedReconnect(){
				// 启用自动重连
				zy.setIsNeedReconnect({state: true});
				
				// 禁用自动重连
				// zy.setIsNeedReconnect({state: false});
			},  
			reconnectDevice() {
				zy.reconnectDevice(res => {
				  console.log('设备重连操作已触发');
				});
			},  
			getSystemListPeripheral() {
				zy.getSystemListPeripheral(res => {
				  console.log('系统已配对设备:', res.deviceList)
				})
			},  
			stopScan(){
				// 停止扫描
				zy.stopScan({});
				console.log('扫描已停止');
			},  
			connectDevice(){
				zy.connectDevice({
				  uuid: '设备唯一标识',
				  mac: 'MAC地址（备用）'
				}, res => {
				  console.log(res.success ? '连接成功' : '连接失败')
				})
			},  
			otaDisconnect(){
				// 触发OTA断开连接
				zy.otaDisconnect({});
				console.log('OTA连接已断开');
			},  
			disconnect(){
				zy.disconnect(res => {
				  console.log('设备已断开连接')
				})
			},  
			getDeviceSupportList(){
				zy.getDeviceSupportList(res => {
				    if (res.error) {
				        console.error('错误:', res.error.message);
				        return;
				    }
				    
				    // 检查步数功能支持
				    if (res.functionList.step) {
				        console.log('设备支持步数监测');
				    }
				    
				    // 获取心率监测配置
				    if (res.functionDetails.heartrate) {
				        console.log('心率监测间隔:', res.functionDetails.heartrate.measurementInterval);
				    }
				});
			}  
		}
	}
</script>
 
