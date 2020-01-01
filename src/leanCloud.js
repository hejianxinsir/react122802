var AV = require('leancloud-storage');

AV.init({
appId: "j5fPHDH1A8Kq3DoCnnRc0fku-gzGzoHsz",
appKey: "QV1V60qhFMK7uogBXI3qvMEj",
serverURLs: "https://leancloud.cn"
});

export default AV;

export function signUp(email, username,password,successFn,errorFn){
	var user = new AV.User()
	user.setUsername(username)
	user.setPassword(password)
	user.setEmail(email)
	user.signUp().then(function(loginedUser){
		let user = getUserFromAVUser(loginedUser)
		successFn.call(null, user)
	}, function(error){
		errorFn.call(null, error)
	})

	return undefined
}

export function getCurrentUser(){
	let user = AV.User.current()
	if(user){
		return getUserFromAVUser(user)
	}else{
		return null
	}
}

export function signOut(){
	AV.User.logOut()
	return undefined
}

export function signIn(username, password, successFn, errorFn){
	AV.User.logIn(username, password).then(function(loginedUser){
		let user = getUserFromAVUser(loginedUser)
		successFn.call(null, user)
	},function(error){
		errorFn.call(null, error)
	})
}

export function sendPasswordResetEmail(email, successFn, errorFn){
	AV.User.requestPasswordReset(email).then(function(success){
		successFn.call()
	}, function(error){
		errorFn.call(null, error)
	})
}

function getUserFromAVUser(AVUser){
	return {
		id: AVUser.id,
		...AVUser.attributes
	}
}

