/*const User = require('../models/user.model');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const role = email === 'adminCoder@coder.com' ? 'admin' : 'user';
  const user = new User({ email, password, role });
  await user.save();
  req.session.user = user;
  req.session.role = user.role;
  res.redirect('/products');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await user.isValidPassword(password)) {
    return res.status(401).send({ message: 'Correo o contraseña incorrectos.' });
  }
  req.session.user = user;
  req.session.role = user.role;
  res.redirect('/products');
};

*/

