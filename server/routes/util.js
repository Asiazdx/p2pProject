var express=require('express');
var router=express.Router();
//���Ͷ�����֤��
router.use('/sendMsg',function(req,res){
    var code='';
    var random = new Array(0,1,2,3,4,5,6,7,8,9);//�����
    for(var i=0;i<6;i++) {//ѭ������
        var index = Math.floor(Math.random() * 10);//ȡ���������������0~9��
        code += random[index];//��������ȡ��������ӵ�code��
    }

    res.send(code);
})
module.exports=router;