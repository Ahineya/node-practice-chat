var CommentBox = React.createClass({
    componentDidMount: function() {
        var self = this;
        socket.on('new message', function(data) {
            self.setState({messages: self.state.messages.concat(data.message)});
        });
    },
    getInitialState: function() {
        return {
            messages: ['lala', 'lalala']
        }
    },
    sendMessage: function() {
        var message = React.findDOMNode(this.refs.myMessage).value.trim();
        console.log( message );
        socket.emit('send message', {message: message});
        React.findDOMNode(this.refs.myMessage).value = '';
    },
    handleKeyPress: function(e) {
        if (e.which === 13) {
            this.sendMessage();
        }
    },
    render: function() {
        return (
            <div className="chat">
                <ul>
                    {this.state.messages.map(function(message) {
                        return <Message message={message} />
                    })}
                </ul>
                <div className="controls">
                    <input onKeyPress={this.handleKeyPress} type="text" ref="myMessage"/>
                    <button onClick={this.sendMessage}>Send</button>
                </div>
            </div>
        );
    }
});
