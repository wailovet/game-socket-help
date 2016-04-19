var GameSocketHelp = function (io, view) {
    this.view = view;
    this.io = io;
    var _this = this;
    this.io.on('connection', function (socket) {
        _this.socket_list.push(socket);
        socket.on('view', function (data) {
            if (!_this.receive_callback) {
                throw "未定义处理方法";
            }
            var rt_data = _this.receive_callback(data, _this.view);
            if (rt_data && typeof rt_data !== 'undefined') {
                _this.view = rt_data;
            }
            _this.notice();
        });
    });
}

GameSocketHelp.prototype.receive_callback = null
GameSocketHelp.prototype.receive = function (cb) {
    GameSocketHelp.prototype.receive_callback = cb;
}


GameSocketHelp.prototype.notice = function () {
    for (var i in this.socket_list) {
        this.socket_list[i].emit('view', this.view);
    }
}

GameSocketHelp.prototype.io = null;
GameSocketHelp.prototype.view = {};
GameSocketHelp.prototype.socket_list = [];
module.exports = GameSocketHelp;