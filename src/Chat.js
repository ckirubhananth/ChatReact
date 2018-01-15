import React from "react";
import io from "socket.io-client";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        /* The primary states used to Chat 
         The group by default is 'Public'. On changing the group by dropdown list the value will get changed. */
        this.state = {
            group: 'Public',
            username: '',
            message: '',
            messages: []
        };

        // The client needs to look into this server nd port for socket connection
        this.socket = io('localhost:8080');

        // Even that will be triggered on incoming data through socket
        this.socket.on('receive', function (data) {
            addMessage(data);
        });

        // Method that adds the received data into an array to manage history
        const addMessage = data => {
            if (this.state.group === data.group) {
                this.setState({ messages: [...this.state.messages, data] });
            }
        };

        // The event throws data into the socket to send to another client
        this.sendMessage = ev => {
            ev.preventDefault();

            this.socket.emit('send', {
                group: this.state.group,
                author: this.state.username,
                message: this.state.message
            });
            this.setState({ message: '' });

        };

        // Event to change the chat room
        this.changeGroup = ev => {
            this.setState({ group: ev.target.value });
        };
    }
    render() {
        return (
            // The main module that holds the chat window and the view logics
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav class="navbar navbar-custom">
                            <div class="container-fluid">
                                <div class="navbar-header">
                                    <a class="navbar-brand" href="#">Chat & React</a>
                                </div>
                                <ul class="nav navbar-nav">
                                    <li class="active"><b>Kirubha's Chat Application</b></li>
                                </ul>
                            </div>
                        </nav>
                        <br />
                        <div className="row">
                            <div className="col-4">
                                Select a group : &nbsp;
                            <select defaultValue={this.state.selectValue} onChange={this.changeGroup} >
                                    <option value="Public">Public</option>
                                    <option value="India">India</option>
                                    <option value="World">World</option>
                                </select>
                            </div>
                            <div className="col-4">

                            </div>
                            <div className="col-4">
                                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} className="form-control" />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-4">
                                <div class="alert alert-info"> Joined the room {this.state.group} </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12">
                                {this.state.messages.map(message => {
                                    return (
                                        <div>{message.author}: {message.message}</div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col-4"></div>
                            <div className="col-4">
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;