import db from '../models/index'

const getRole = async (user) => {
    let userRole = await db.Role.findOne({
        where: {
            roleId: user.roleId
        },
        attributes: ['id', 'roleId', 'roleName'],
        include: { model: db.Action, attributes: ['url', 'description'] }
    })
    if (userRole) {
        return {
            roleId: userRole
        }
    }
}

const getRoleWithActions = async (user) => {
    let getUserRole = await getRole(user)
    // let role = await db.Role.findOne({
    //     where: { id: getUserRole },
    // })
    return getUserRole ? getUserRole : {}
}

module.exports = {
    getRoleWithActions
}