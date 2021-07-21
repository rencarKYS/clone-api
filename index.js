const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors');
const { response } = require('express');
const app = express()
const PORT = process.env.PORT || 5000

const users = []

const mainData = {
  areaLists: [
    {
      area: '울산',
      count: 110,
      image: 'https://d2ur7st6jjikze.cloudfront.net/landscapes/662_large_square_1475117380.jpg?1475117380',
    },
    {
      area: '대구',
      count: 50,
      image: 'https://d2ur7st6jjikze.cloudfront.net/landscapes/455_large_square_1439866837.jpg?1439866837',
    },
    {
      area: '제주도',
      count: 2100,
      image: 'https://d2ur7st6jjikze.cloudfront.net/landscapes/4737_large_square_1535949304.jpg?1535949304',
    },
    {
      area: '부산',
      count: 900,
      image: 'https://d2ur7st6jjikze.cloudfront.net/landscapes/455_large_square_1439866837.jpg?1439866837',
    },
    {
      area: '경기도',
      count: 110,
      image: 'https://d2ur7st6jjikze.cloudfront.net/landscapes/4744_large_square_1535960572.jpg?1535960572',
    },
    {
      area: '경상도',
      count: 110,
      image: 'https://d2ur7st6jjikze.cloudfront.net/landscapes/292_large_square_1430355824.jpg?1430355824',
    },
    {
      area: '부산',
      count: 310,
      image: 'https://d2ur7st6jjikze.cloudfront.net/landscapes/833_large_square_1493259817.jpg?1493259817',
    },
    {
      area: '서울',
      count: 1000,
      image: 'https://d2ur7st6jjikze.cloudfront.net/landscapes/5192_large_square_1593063893.jpg?1593063893',
    },
  ],
  bannerLists: [
    {
      image: 'https://d2ur7st6jjikze.cloudfront.net/cms/1389_original_1625102569.png?1625102569',
    },
    {
      image: 'https://d2ur7st6jjikze.cloudfront.net/cms/1205_original_1594183285.jpg?1594183285',
    },
    {
      image: 'https://d2ur7st6jjikze.cloudfront.net/cms/1560_original_1626656375.jpg?1626656375',
    }
  ],
  realBestProduct: [
    {
      title: '[애월] *즉시할인* 아르떼뮤지엄 입장권',
      image: 'https://d2ur7st6jjikze.cloudfront.net/offer_photos/100914/564880_medium_1620955369.jpg?1620955369',
      ratings: 5,
      ratingCount: 1005,
      price: 10000,
      discount: 20,
      bestPriceGuarantee: false,
    },
    {
      title: "[제주전체] 쿠폰할인 제주투어패스 48시간 프리패스권",
      image: 'https://d2ur7st6jjikze.cloudfront.net/offer_photos/102916/559859_medium_1615787835.jpg?1615787835',
      ratings: 4,
      ratingCount: 147,
      price: 25000,
      discount: 20,
      bestPriceGuarantee: false,
    },
    {
      title: '[애월] *즉시할인* 9.81 파크 이용권',
      image: 'https://d2ur7st6jjikze.cloudfront.net/offer_photos/101144/549339_medium_1608606480.jpg?1608606480',
      ratings: 5,
      ratingCount: 200,
      price: 34000,
      discount: 10,
      bestPriceGuarantee: true,
    },
    {
      title: '[단독특가] 레스케이프 호첼 팔레드신 TO-GO 메뉴 이용권',
      image: 'https://d2ur7st6jjikze.cloudfront.net/offer_photos/104818/571141_medium_1625657418.jpg?1625657418',
      ratings: 5,
      ratingCount: 2,
      price: 182000,
      discount: 20,
      bestPriceGuarantee: false,
    },
    {
      title: '[성산] 이서준 가이드의 제주 빛의벙커 도슨트투어(입장 티켓 포함)',
      image: 'https://d2ur7st6jjikze.cloudfront.net/offer_photos/85005/563814_medium_1620029198.jpg?1620029198',
      ratings: 3,
      ratingCount: 202,
      price: 42000,
      discount: 0,
      bestPriceGuarantee: false,
    },
    {
      title: '[경북 경주] *QR바로입장* 경주월드 자유이용권 7월',
      image: 'https://d2ur7st6jjikze.cloudfront.net/offer_photos/38753/241316_medium_1531781729.jpg?1531781729',
      ratings: 3,
      ratingCount: 383,
      price: 26000,
      discount: 10,
      bestPriceGuarantee: false,
    },
    {
      title: '[세고비아&톨레도] ※평점5.0 ※인생사진 ※프라도 6유로 ※내부설명 ※톨레도 전망대 노을',
      image: 'https://d2ur7st6jjikze.cloudfront.net/offer_photos/81174/520863_medium_1595998823.jpg?1595998823',
      ratings: 5,
      ratingCount: 1005,
      price: 79000,
      discount: 20,
      bestPriceGuarantee: false,
    },
    {
      title: '[제주전체] 제주 카페패스, 커피일주일 무제한 이용권',
      image: 'https://d2ur7st6jjikze.cloudfront.net/offer_photos/81492/570380_medium_1625054793.jpg?1625054793',
      ratings: 4,
      ratingCount: 747,
      price: 50000,
      discount: 5,
      bestPriceGuarantee: false,
    },
  ]
}

const searchData = {
  keywords: [
    { key: '서울', highlight_suggest: "<em>서울 </em>랜드", suggest: '서울랜드' },
    { key: '서울', highlight_suggest: "<em>서울 </em>대공원", suggest: '서울대공원' },
    { key: '서울', highlight_suggest: "<em>서울 </em>스카이", suggest: '서울스카이' },
    { key: '서울', highlight_suggest: "<em>서울 </em>스냅", suggest: '서울스냅' },
    { key: '서울', highlight_suggest: "<em>서울 </em>타워", suggest: '서울타워' },
    { key: '서울', highlight_suggest: "<em>서울 </em>야간투어", suggest: '서울야간투어' },
    { key: '대구', highlight_suggest: "<em>대구 </em>랜드", suggest: '대구랜드' },
    { key: '대구', highlight_suggest: "<em>대구 </em>대공원", suggest: '대구대공원' },
    { key: '대구', highlight_suggest: "<em>대구 </em>스카이", suggest: '대구스카이' },
    { key: '대구', highlight_suggest: "<em>대구 </em>스냅", suggest: '대구스냅' },
    { key: '대구', highlight_suggest: "<em>대구 </em>타워", suggest: '대구타워' },
    { key: '대구', highlight_suggest: "<em>대구 </em>야간투어", suggest: '대구야간투어' },
    { key: '부산', highlight_suggest: "<em>부산 </em>요트", suggest: '부산요트' },
    { key: '부산', highlight_suggest: "<em>부산 </em>해운대", suggest: '부산해운대' },
    { key: '부산', highlight_suggest: "<em>부산 </em>스냅", suggest: '부산스냅' },
    { key: '부산', highlight_suggest: "<em>부산 </em>광안리", suggest: '부산광안리' },
    { key: '부산', highlight_suggest: "<em>부산 </em>아쿠아리움", suggest: '부산아쿠아리움' },
    { key: '부산', highlight_suggest: "<em>부산 </em>서핑", suggest: '부산서핑' },
  ]
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/main', (request, response) => {
  response.json(mainData)
})

app.post('/api/join', (req, res) => {
  console.log(req.body)
  const { email, name, password, passwordCheck, term } = req.body
  if (!email || !name || !password || !passwordCheck || !term) {
    return res.status(400).json({
      statue: 400,
      err_no: 10001,
      errorMessage: '필수값이 비었습니다.',
    }) 
  }
  if (password.length < 4 || password !== passwordCheck) {
    return res.status(400).json({
      statue: 400,
      err_no: 1002,
      errorMessage: '비밀번호를 확안해주세요',
    }) 
  }
  res.status(200).json({ message: 'success' })
  users.push({id: users.length + 1,...req.body})
})

app.get('/api/user/:id', (req, res) => {
  console.log(Number(req.params.id))
  if (users.length === 0) return res.json(users)
  const userData = users.filter(user => Number(user.id) === Number(req.params.id));
  res.json(userData)
})

app.post('/api/login', (req, res) => {
  console.log(req.body)
})

app.get('/api/search/:search', (req, res) => {
  const searchKeyword = decodeURIComponent(req.params.search);
  const filterData = searchData.keywords.filter(item => item.key === searchKeyword)
  if (filterData.length === 0) return res.json({ message: '검색결과가 없습니다.' })
  res.json(filterData)
})


app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!');
})


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})