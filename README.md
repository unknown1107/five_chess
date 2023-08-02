# 打开方式
使用`vscode`安装插件`Live Server`, 在`Live Server`中打开`index.html`文件

# AI的搜索层数
在`js/AI.js`文件中有AI搜索的层数和`totry`
```c++
ai.ini=function(mode,color){
    this.color=color;
    this.otc = color==='black' ? 'white' : 'black'
    //设置ai的模式
    if (mode == 'easy') {
        this.depth=3
        this.totry=[15, 15]
    } else if (mode == 'middle') {
        this.depth=7
        this.totry=[12, 12]
    } else if (mode == 'hard') {
        this.depth=9
        this.totry=[10, 10]
    }
    
    postMessage({'type': 'ini_complete'});
};
```