var GameSocketHelp = function (view) {
    this.view = view

    this.io.on('connection', function (socket) {
        this.socket_list.push(socket);
        socket.on('view', function (data) {
            if (!this.receive_callback) {
                throw "未定义处理方法";
            }
            var rt_data = this.receive_callback(data, this.view);
            if (rt_data && typeof rt_data !== 'undefined') {
                this.view = rt_data;
            }
            this.notice();
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

GameSocketHelp.prototype.io = null
GameSocketHelp.prototype.view = {}
GameSocketHelp.prototype.socket_list = [];
module.exports = GameSocketHelp;
module.exports.io = function (m_io) {
    this.io = m_io;
}