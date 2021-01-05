// 数据容器
    var left = 0;   //左操作数
    var right = 0;  //右操作数
    var flag = 1;   //此变量用来限制点的输入
    var flagg = 1;  //此变量用来限制百分号的输入
    var exp = "";  //显示框里的表达式
    var len = 0;
    var op = "";
    var over = 0; //表示计算是否结束
    function cal() {
       //先处理优先级最高的%
       var patt = /[0-9\.]+%/;
       var find = exp.match(patt);
       var newstr;
       while (find != null) {
           find = find[0];
           newstr = (parseFloat(find) / 100).toString();
           exp = exp.replace(find, newstr);
           find = exp.match(patt);
       }
       //再处理优先级比较高的×和÷
       patt = /[0-9\.]+[×|÷]+[0-9\.]+/;
       find = exp.match(patt);
       while(find != null) {
           find = find[0];
           left = parseFloat(find);
           len = left.toString().length;
           newstr = find.slice(len);
           op = newstr[0];
           newstr = newstr.slice(1);
           right = parseFloat(newstr);
           switch (op) {
               case "×":
                   newstr = left * right;
                   break;
               case "÷":
                   newstr = left / right;
                   break;
           }
           exp = exp.replace(find, newstr);
           find = exp.match(patt);
       }
       //最后处理优先级低的加减法
       patt = /[0-9\.]+[\+|-]+[0-9\.]+/;
       find = exp.match(patt);
       while(find != null){
           find = find[0];
           left = parseFloat(find);
           len = left.toString().length;
           newstr = find.slice(len);
           op = newstr[0];
           newstr = newstr.slice(1);
           right = parseFloat(newstr);
           switch (op){
               case "+":
                   newstr = left + right;
                   break;
               case "-":
                   newstr = left - right;
                   break;
           }
           exp = exp.replace(find,newstr);
           find = exp.match(patt);
       }
       exp = parseFloat(exp);
       update();
       over = 1;
       if(exp.toString().indexOf(".") > -1)
           flag = 0;
       else
           flag = 1;
       flagg = 1;
    }
    //更新显示框内容
    function update(){
        $("box").innerHTML = exp;
    }
    //获取按钮数字
    function getnum(obj) {
        if (exp != 0 && over == 0)
            exp += obj.innerHTML;
        else
        {
            exp = obj.innerHTML;
            flag = 1;
        }
        update();
        over = 0;
    }
    //除法
    function fd() {
        exp += "÷";
        flag = flagg = 1;
        update();
        over = 0;
    }
    //加法
    function fa() {
        exp += "+";
        flag = flagg =1;
        update();
        over = 0;
    }
    //减法
    function fs() {
        exp += "-";
        flag = flagg = 1;
        update();
        over = 0;
    }
    //乘法
    function fm() {
        exp += "×";
        flag = flagg = 1;
        update();
        over = 0;
    }
    //小数点
    function fp() {
        if (flag) {
            exp += ".";
            flag = 0;
            update();
            over = 0;
        }
    }
    //百分号
    function fper(){
        if(flagg){
            exp += "%";
            flagg = 0;
            update();
            over = 0;
        }
    }
    //清除
    function fc(){
        exp = 0;
        update();
        over = 0;
        flag = 1;
        flagg = 1;
    }
    // 获取id并返回
    function $(id) {
        return document.getElementById(id);
    }

