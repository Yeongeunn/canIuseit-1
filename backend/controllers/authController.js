const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 구글 로그인 처리
exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

// 구글 로그인 콜백 처리
exports.googleCallback = passport.authenticate('google', { session: false, failureRedirect: '/' });

// 구글 로그인 성공 후 처리
exports.googleCallbackSuccess = (req, res) => {
  req.login(req.user, (err) => {
    if (err) {
      console.error('Error logging in user:', err);
      return res.redirect('/');
    }
    const token = req.user.generateJwt();
    return res.redirect(`http://localhost:3000`);
  });
};

// 네이버 로그인 처리
exports.naverLogin = passport.authenticate('naver');

// 네이버 로그인 콜백 처리
exports.naverCallback = passport.authenticate('naver', { failureRedirect: '/' });

// 네이버 로그인 성공 후 처리
exports.naverCallbackSuccess = (req, res) => {
  req.login(req.user, (err) => {
    if (err) {
      return res.redirect('/');
    }
    const token = req.user.generateJwt();
    return res.redirect(`http://localhost:3000`);
  });
};

// 사용자 정보 반환
exports.getUserProfile = (req, res) => {
  res.json(req.user);
};

