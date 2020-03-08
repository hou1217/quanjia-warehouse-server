const Koa = require('koa');
var cors = require('koa2-cors');
const Router = require('koa-router');

let server = new Koa();
server.use(cors());
server.listen(8086);
server.context.db=require('./libs/database');
server.use(async (ctx, next)=>{
  try{
    await next();
  }catch(e){
    ctx.body='出错了';
  }
});

let router=new Router();
//店铺库存
router.get('/stock/:type', async ctx=>{
  let type = ctx.params.type;
  let order = ctx.query.order;
  let sort = ctx.query.isAsc === 'true'?'ASC':'DESC';
  console.log(ctx.query);
  let res = null;
  if(type !== '1'){
    res = await ctx.db.query(`SELECT * FROM stock_table 
    WHERE TYPE = ${type-1} ORDER BY ${order} ${sort}`);
  }else{
    res = await ctx.db.query(`SELECT * FROM stock_table 
    ORDER BY ${order} ${sort}`);
  }
  
  // console.log(res);
  ctx.body={
    state: 200,
    data:{
      cards:res
    }
  }
});
//商品总仓
router.get('/generalStock/:type', async ctx=>{
  let type = ctx.params.type;
  let order = ctx.query.order;
  let sort = ctx.query.isAsc === 'true'?'ASC':'DESC';
  console.log(ctx.query);
  var res = null;
  if(type !== '1'){
    res = await ctx.db.query(`SELECT * FROM generalStock_table 
    WHERE TYPE = ${type-1} ORDER BY ${order} ${sort}`);
  }else{
    res = await ctx.db.query(`SELECT * FROM generalStock_table 
    ORDER BY ${order} ${sort}`);
  }
  res = res.map(item => {
    return Object.assign(item,{
      otherGoods:[
        {
          id:1
        },
        {
          id:2
        }
      ]
    })
  });
  
  console.log(res);
  ctx.body={
    state: 200,
    data:{
      cards:res
    }
  }
});
//最佳伴侣
router.get('/mateList', async ctx=>{
  var res = null;
 
  res = await ctx.db.query('SELECT * FROM mateList_table');
    
  
  // console.log(res);
  ctx.body={
    state: 200,
    data:{
      cards:res
    }
  }
});
// categoryList
router.get('/categoryList', async ctx=>{
  var res = null;
 
  res = [
    {
      title: '饮用水',
      "value": [{
        id: "12",
        headId: 'demo1.png',
        name: '脉动（Mizone）青柠口味 维生素功能饮料 600ml',
        goodNum: '98',
        monthNum: '43',
        price: '5.50',
        labels: [
          "满25减5"
        ]
      }]
    },
    {
      title: '茶饮料',
      "value": [{
        id: "13",
        headId: 'demo1.png',
        name: '康师傅冰红茶500ml',
        goodNum: '96',
        monthNum: '52',
        price: '4.50',
        labels: [
          "满25减5"
        ]
      }]
    },
    {
      title: '碳酸饮料',
      "value": [{
        id: "15",
        headId: 'demo1.png',
        name: '可口可乐 Coca-Cola 汽水 碳酸饮料 330ml',
        goodNum: '99',
        monthNum: '45',
        price: '4.20',
        labels: [
          "满25减5"
        ]
      }]
    },
    {
      title: '果汁',
      "value": [{
        id: "14",
        headId: 'demo1.png',
        name: ' 椰树 正宗鲜榨椰汁 ',
        goodNum: '90',
        monthNum: '50',
        price: '5.50',
        labels: [
          "满25减5"
        ]
      }]
    },
    {
      title: '牛奶',
      "value": [{
        id: "3",
        headId: 'demo1.png',
        name: '维他奶（vitasoy） 维他柠檬茶饮料 维他奶出品饮品 250ml*24盒装 锡兰红茶',
        goodNum: '95',
        monthNum: '12',
        price: '12.2',
        labels: [
          "满25减5"
        ]
      }]
    },
    {
      title: '其他',
      "value": [{
        id: "9",
        headId: 'demo1.png',
        name: '瓜子',
        goodNum: '85',
        monthNum: '41',
        price: '8.88',
        labels: [
          "满25减5"
        ]
      }]
    }
  ]
    
  
  // console.log(res);
  ctx.body={
    state: 200,
    data:{
      cards:res
    }
  }
});
server.use(router.routes());




