const fs=require("fs");
const xlsx=require("node-xlsx")

const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/test01.xlsx`));
let {name,data}=workSheetsFromBuffer[0];
// name:Sheet1 
// data:[ 
//   [ 'apple', 12 ],
//   [ 'banana', 10 ],
//   [ 'orange', 6 ],
//   [ 'pear', 4 ] 
// ]
let tmpARR=[];
//把data扁平化
data.forEach((item)=>{
    tmpARR.push(item[0])
})

//vue源码里找的正则表达式,el-input可以动态拼接成任意标签
// str.match(/([\\s\\S]*?)(<\/el-input[^>]*>)/g);

fs.readFile('./html.vue', 'utf-8', (err, _data) => {
    if (err) {
        console.log(err)
    }
    let arr=_data.match(/([\\s\\S]*?)(<el-input[^>]*>)/g);//arr匹配到的是标签的前半部分
    let sourceArr=JSON.parse(JSON.stringify(arr));// 深拷贝arr

    //处理arr每一项的v-model
    for (let i=0;i<arr.length;i++) {
        let varr=arr[i].split(" ");
        for (let j=0;j<varr.length;j++) {
            if(varr[j].indexOf("v-model")>-1){
                varr[j]=`v-model="${tmpARR[i]}"`
            }
        }
        arr[i]=varr.join(" ")
    }
    let index=0;//储存上一次的end位置
    //从各个匹配的位置替换原来标签
    for (let i=0;i<sourceArr.length;i++) {
        let start=_data.indexOf(sourceArr[i],index);
        let len=sourceArr[i].length
        let end=start+len;
        console.log(index)
        _data=_data.substring(0,start-1)+arr[i]+_data.substring(end,_data.length);
        index=end;   
    }
    //写入一个新的文件里，当然也可以覆盖原来的文件
    fs.writeFile('./tmp_html.vue',_data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
})