const chroma = require('chroma');

let gfx = cc.renderer.renderEngine.gfx;

let hslMap = {};

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.lighten = 0;
        this.lightenDirection = 1;
        this.c1 = cc.color();
        this.c2 = cc.color();

        var vfmtPosColor = new gfx.VertexFormat([
            { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 3 },
            { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_UINT8, num: 4, normalize: true },
        ]);
        
        let mesh = new cc.Mesh();
        mesh.init(vfmtPosColor, 8, true);
        this.mesh = mesh;
        
        mesh.setVertices(gfx.ATTR_POSITION, [
            cc.v3(-10, 10, 10), cc.v3(-10, -10, 10), cc.v3(10, 10, 10), cc.v3(10, -10, 10),
            cc.v3(-10, 10, -10), cc.v3(-10, -10, -10), cc.v3(10, 10, -10), cc.v3(10, -10, -10)
        ]);

        mesh._minPos = cc.v3(-100, -100, -100);
        mesh._maxPos = cc.v3(100, 100, 100);

        this.updateColor(cc.Color.RED, cc.Color.BLUE);

        mesh.setIndices([
            0, 1, 2, 1, 3, 2, // front
            0, 6, 4, 0, 2, 6, // top
            2, 7, 6, 2, 3, 7, // right
            0, 5, 4, 0, 1, 5, // left
            1, 7, 5, 1, 3, 7, // bottm,
            4, 5, 6, 5, 7, 6, // back
        ]);

        let renderer = this.node.getComponent(cc.MeshRenderer);
        if (!renderer) {
            renderer = this.node.addComponent(cc.MeshRenderer);
        }
        renderer.mesh = mesh;
    },

    updateColor (c1, c2) {
        this.mesh.setVertices(gfx.ATTR_COLOR, [
            c1, c1, c1, c1,
            c2, c2, c2, c2,
        ]);
    },

    update (dt) {
        let lighten = this.lighten.toFixed(2);
        let c1 = hslMap[lighten] = hslMap[lighten] || cc.color( chroma.hsl(330, 1, lighten).toString() );
        let c2 = hslMap[1- lighten] = hslMap[1- lighten] || cc.color( chroma.hsl(100, 1, (1-lighten)).toString() );

        this.lighten += dt * 0.1 * this.lightenDirection;
        if ((this.lighten > 1 && this.lightenDirection > 0) || 
            (this.lighten < 0 && this.lightenDirection < 0)) {
            this.lightenDirection *= -1;
        }
        
        this.updateColor(c1, c2);
    },
});
