$(document).ready(function(){  //页面加载完成执行这个函数
    var game = new Game($(".go-board"), $(".board tbody"));

    //初始化AI难度
    gameData.level='easy';
    $('#chose-level input[type="radio"]').on('change', function(){
        gameData.level=$(this).val();
    });

    //初始化先手颜色
    gameData.color='white'
    $('#chose-first-color input[type="radio"]').on('change', function(){
        gameData.color=$(this).val();
    });

    //绑定悔棋按钮
    $("#undo-button").on('click', function(){
        game.undo();
    });
    
    //绑定开始游戏按键
    $("#start-game").on('click',function(){
        gameData.mode='vscomputer';
        
        try{
            game.white.worker.terminate();
            game.black.worker.terminate();
        }catch(e){}

        var color, other;
        if(gameData.color==='black'){
            color='black';
            other='white';
        }else{
            color='white';
            other='black';
        }
        game.mode=gameData.level;
        game.init(new HumanPlayer(color), new AIPlayer(game.mode, other));
        game.start();
    });
})

// gamaData
gameData={
    prefix: 'yyjhao.gomoku.',
    records: {},
    addRecord: function(name, defaultVal,applyFunc){
        this.records[name]=defaultVal;
        var func;
        if(!applyFunc){
            func=function(){};
        }
        else{
            func=applyFunc;
        }
        Object.defineProperty(this, name, {
            get: function(){
                return localStorage[this.prefix+name];
            },
            set: function(val){
                func(val);
                localStorage[this.prefix+name] = val;
            }
        });
    },
    ini: function(){
        for(var i in this.records){
            this[i]=this.records[i];
        }
    },
    apply: function(){
        for (var i in this.records){
            this[i]=this[i];
        }
    }
  };
  
  gameData.addRecord('firstTime','firstTime');
  
  gameData.addRecord('mode', 'vscomputer', function(val){
    $('#mode-select input[value="'+val+'"]').attr('checked',true);
  });
  gameData.addRecord('color', 'black', function(val){
    $('#color-select input[value="'+val+'"]').attr('checked',true);
  });
  gameData.addRecord('level', 'medium', function(val){
    $('#level-select input[value="'+val+'"]').attr('checked',true);
  });
  
  gameData.load=function(){
    if(!this.firstTime){
        this.ini();
    }
    this.apply();
  };
  