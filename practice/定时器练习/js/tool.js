//移动动画函数,speed的正负在内部判断
/* 
	obj：要执行动画的对象
	attr：字符串，要执行动画的样式， top left width等等
	target：动画目标位置
	speed：移动速度
	callback:回调函数，当前动画完成后执行
 */
function move(obj, attr, target, speed, callback) {
	clearInterval(obj.timer); //禁止多次点击建立多个不可控计时器

	//判断speed的正负,确认移动方向
	var cur = parseInt(getStyle(obj, attr));
	if (cur > target) {
		speed = -speed;
	}

	//给元素对象添加定时器属性,用来保存当前动画自身的定时器
	obj.timer = setInterval(function() {
		var oldValue = parseInt(getStyle(obj, attr));
		var newValue = oldValue + speed;
		if (speed < 0 && newValue < target || speed > 0 && newValue > target) {
			newValue = target;
		}
		obj.style[attr] = newValue + "px";
		if (newValue == target) {
			clearInterval(obj.timer);
			//有回调函数参数就执行,没有就不执行
			callback && callback();
		}
	}, 50);
};
//获取当前样式函数
function getStyle(obj, str) {
	return window.getComputedStyle ? getComputedStyle(obj, null)[str] : obj.currentStyle[str];
};
