'use client';
"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secured = exports.UserPermissions = void 0;
/* generated using generate_permissions -- do not edit */
var auth_1 = require("./auth");
var UserPermissions = /** @class */ (function () {
    function UserPermissions() {
    }
    return UserPermissions;
}());
exports.UserPermissions = UserPermissions;
// List of possible permissions{% for permission in permissions %}
(function () {
    {
        permission.key;
    }
})();
{
     % endfor % ;
}
getAllPermissions();
{
    return [{} % ];
    for (permission in permissions % )
        ;
}
this.;
{
    {
        permission.key;
    }
}
{
     % ;
    if (not)
        loop.last % ;
}
{
     % endif % ;
}
{
     % endfor % ;
}
;
hasPermission(permission);
{
    if (!this.getAllPermissions().includes(permission)) {
        console.error('Permission not found amongst possibilities: ' + permission);
    }
    var currentUserPermissions = (0, auth_1.getUserPermissions)();
    return currentUserPermissions.includes(permission);
}
has;
{
    {
        permission.method_name;
    }
}
(function () {
    return _this.hasPermission(_this., {}, { permission: permission, : .key });
}, userPermissions);
;
{
     % endfor % ;
}
function Secured(_a) {
    var children = _a.children, permissions = _a.permissions;
    console.log('UserPermission', permissions);
    return <>
        { % verbatim % } {{ children: children }} { % endverbatim % }
    </>;
}
exports.Secured = Secured;
