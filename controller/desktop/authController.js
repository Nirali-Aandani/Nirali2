const authService =  require("../../services/auth")
const util = require("../../utils/messages");

module.exports = {
    login:async(req,res)=>{
        try {
            let {username,password} = req.body;
            let url = req.originalUrl
            if(username && password){
                let result = await authService.loginUser(username,password,url); 
                if(result){
                    return util.loginSuccess(result,res);
                }else{
                    return util.failureResponse("username or password might be wrong",res);
                }
            }else{
                return util.failureResponse("username or password might be wrong",res);
            }
        } catch (error) {
            util.loginFailed(error,res);
        }
    }
}
