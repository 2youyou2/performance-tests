const baseRenderScene = require("baseRenderScene");
let config = require("config");

let totalCount = 0;
let count = 0;
let amount = 0;

cc.Class({
    extends: baseRenderScene,

    properties: {
        prefab: cc.Prefab,
        number: cc.Label,
        root: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this._super(this.name.match(/<(\S*)>/)[1]);

        this.number.node.zIndex = config.HIGHEST_ZINDEX;

        this.reset();
    },

    reset: function () {
        this.nodes = [];
        
        totalCount = config.SCENE_ARGS.count;
        count = 0;
        amount = 50;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        let node, i;
        if (this.nodes.length < totalCount) {
            for (i = 0; i < amount; i++) {
                node = cc.instantiate(this.prefab);
                this.randomPosition(node);
                this.root.addChild(node);
                this.nodes.push(node);
                count++;
            }
            this.number.string = count;
        }
    },

    randomPosition (node) {
        let width = cc.visibleRect.width;
        let height = cc.visibleRect.height;
        node.x = Math.random() * width - width/2;
        node.y = Math.random() * height - height/2;
    },

});