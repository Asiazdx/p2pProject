var express=require('express');
var router=express.Router();
var mysql=require("../common/mysql");
var async =require("async");
router.use('/',function(req,res) {
    var lunboList = [];//�ֲ��б�
    var firstInvestList = [];//��һ�б�Ͷ�ʲ�Ʒ
    var firstLoganList=[];//��һ�б�����Ʒ
    var secondList = [];//�ڶ��б�
    var thirdList = [];//�����б�(�����б�)
    var fothList = [];//�����б�
    var adList = [];//����б�
    var sqls=[];
    sqls[0]= 'select * from investment_type where pos=0 and status=0 order by id desc limit 2';//��ȡ�ֲ�λ�õ�Ͷ�ʲ�Ʒ
    sqls[1] = 'select * from borrow_type where pos=0 and status=0 order by id desc limit 2';//��ȡ�ֲ�λ�õĽ����Ʒ
    sqls[2] = 'select * from news where pos=0 order by id desc limit 1';//��ȡ�ֲ���������
    sqls[3]= 'select * from investment_type where pos=1 and status=0 order by id desc limit 2';//��ȡ��һ�б���Ͷ�ʲ�Ʒ
    sqls[4] = 'select * from borrow_type where pos=1 and status=0 order by id desc limit 2';//��ȡ��һ�б��Ľ����Ʒ
    sqls[5] = 'select * from news where pos=1 order by id desc limit 4';//��ȡ�����б�
    sqls[6] = 'select * from news where pos=2 order by id desc limit 1';//��ȡ���
    sqls[7] = 'select * from borrow_type where pos=2 and status=0 order by id desc limit 1'//��ȡ�����б��Ľ����Ʒ
    sqls[8]= 'select * from investment_type where pos=2 and status=0 order by id desc limit 3'//��ȡ�����б���Ͷ�ʲ�Ʒ
    //ʹ��async��each������ע������eachSerise����������ģ�
    async.each(sqls,function(sql,cb){
        mysql.query(sql,function(err,rows){
            if(rows){
                if(sql==sqls[0]||sql==sqls[1]||sql==sqls[2]){
                    rows.forEach(function (obj,index) {
                        lunboList.push(obj);//�ֲ��б�
                    });
                }else if(sql==sqls[3]){
                    rows.forEach(function(obj,index){
                        firstInvestList.push(obj);//��һ�б�Ͷ�ʣ�
                    })
                }else if(sql==sqls[4]){
                    rows.forEach(function(obj,index){
                        firstLoganList.push(obj);//��һ�б������
                    })
                } else if(sql==sqls[5]){
                    rows.forEach(function(obj,index){
                        secondList.push(obj);//�����б�
                    })
                }else if(sql==sqls[6]){
                    rows.forEach(function(obj,index){
                        adList.push(obj);//�������
                    })
                }else if(sql==sqls[7]){//����б�3
                   rows.forEach(function(obj,index){
                       thirdList.push(obj);
                   })
                }else if(sql==sqls[8]){//Ͷ���б�4
                    rows.forEach(function(obj,index){
                        fothList.push(obj);
                    })
                }
            }
        cb();
        })
    },function(){
        var data={
            title:'homeData',
            lunboList:lunboList,
            firstInvestList:firstInvestList,
            firstLoganList:firstLoganList,
            secondList:secondList,
            thirdList:thirdList,
            fothList:fothList,
            adList:adList
        }
        res.send(data);
    })
});
module.exports=router;