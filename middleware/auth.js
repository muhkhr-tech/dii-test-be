const jwt = require('jsonwebtoken');
const { UserRole } = require('../models');

// const checkUserRoles = async (req, res, next) => {
//   try {
//     console.log(req)
//     const userId = req.user?.id;

//     if (!userId) {
//       return res.status(401).json({ message: 'Unauthorized: user not found in request' });
//     }

//     const roles = await UserRole.findAll({
//       where: { user_id: userId },
//       attributes: ['role_id']
//     });

//     req.user.roleCount = roles.length;
//     req.user.roleIds = roles.map(r => r.role_id);

//     next();

//   } catch (error) {
//     console.error('Error checking user roles:', error);
//     return res.status(500).json({ message: 'Internal server error saat cek role' });
//   }
// };

const authenticateToken = async (req, res, next) => {
  const authToken = req.headers['authorization'];

  if (!authToken || !authToken.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan atau format salah' });
  }

  const token = authToken.split(' ')[1];
  const tokenVerified = jwt.verify(token, process.env.JWT_SECRET)

  if (!tokenVerified) return res.status(403).json({ message: 'Token tidak valid' });

  const user = tokenVerified

  if (!user.role) return res.status(403).json({message: 'User tidak memilki role'})
  
  if (user.role.length > 1 && req.path!== '/choose-user-role') {
    return res.status(403).json({message: 'Silakan pilih role terlebih dahulu', redirect: '/choose-user-role'})
  }

  req.user = user
  next()
}

module.exports = {authenticateToken};
