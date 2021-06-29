const JWT={
    ADMIN_SECRET:"myjwtadminsecret",
    DEVICE_SECRET:"myjwtdevicesecret",
    CLIENT_SECRET:"myjwtclientsecret",
    DESKTOP_SECRET:"myjwtdesktopsecret",
    EXPIRESIN: 10000
}

const USER_ROLE ={
    Admin:1,
}

const PLATFORM = {
    ADMIN:1,
    DEVICE:2,
    CLIENT:3,
    DESKTOP:4,
}

let LOGIN_ACCESS ={
    [USER_ROLE.Admin]:[PLATFORM.ADMIN],        
}

const DEFAULT_ROLE= 1

const ROLE_RIGHTS={
    
    [USER_ROLE.Admin] : [
  "getAllByAdminInAdminPlatform",
  "getByAdminInAdminPlatform",
  "aggregateByAdminInAdminPlatform",
  "getCountByAdminInAdminPlatform",
  "createByAdminInAdminPlatform",
  "addBulkByAdminInAdminPlatform",
  "updateByAdminInAdminPlatform",
  "updateBulkByAdminInAdminPlatform",
  "partialUpdateByAdminInAdminPlatform",
  "deleteByAdminInAdminPlatform",
  "softDeleteByAdminInAdminPlatform",
  "upsertByAdminInAdminPlatform",
  "changePasswordByAdminInAdminPlatform"
],
    
}


const FORGOT_PASSWORD_WITH = {
  OTP: {
    email: true,
    sms: false
  },
  EXPIRETIME: 20
}

module.exports = {
    JWT,
    USER_ROLE,
    DEFAULT_ROLE,
    ROLE_RIGHTS,
    PLATFORM,
    FORGOT_PASSWORD_WITH,
    LOGIN_ACCESS
}