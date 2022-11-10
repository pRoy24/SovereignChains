import { checkAddressForWhitelist, getUserCoupon } from '../models/Whitelist';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/address_whitelist', function(req, res) {
  const {address} = req.query;
  checkAddressForWhitelist(address).then(function(dataResponse) {
    res.send({'message': 'success'});
  });
});


router.get('/user_coupon', function(req, res) {
  const {chain, address} = req.query;
  getUserCoupon(chain, address).then(function(couponDataResponse) {
    res.send(couponDataResponse);
  });
});

module.exports = router;
