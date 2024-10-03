const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    const checkUserName = await User.findOne({ userName });

    if (checkUserName)
      return res.json({
        success: false,
        message:
          'User Name Already exists! Please try again with different one.',
      });

    if (checkUser)
      return res.json({
        success: false,
        message: 'Email Already exists! Please try again with different one.',
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: 'Registration Successful', success: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'some error occurred', success: false });
  }
};

//login

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: 'Email is not registered! Please register email first.',
      });

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword)
      return res.json({
        success: false,
        message:
          'Incorrect Password! Please check email or password you entered.',
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.SECRET_KEY || 'SECRET_KEY',
      { expiresIn: '60m' }
    );
    res
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: false,
      })
      .status(200)
      .json({
        success: true,
        message: 'Login Successful',
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          userName: checkUser.userName,
        },
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'some error occurred', success: false });
  }
};

//logout
const logoutUser = async (req, res) => {
  try {
    return res
      .clearCookie('token')
      .json({ message: 'Logged out successfully.', success: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'some error occurred', success: false });
  }
};

//authMiddleware

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Unauthorized user!' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'SECRET_KEY');

    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'some error occurred', success: false });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
