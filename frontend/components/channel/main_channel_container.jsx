import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import {fetchAllChannels} from '../../actions/channel_actions';
import ChannelIndexContainer from './channel_index_container';
import { logOut } from '../../actions/session_actions';




class MainChatroom extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.logOut().then(() => hashHistory.push('/signin'));
  }

  componentWillMount() {
    this.props.fetchAllChannels();
  }

  render() {
    // debugger
    let { channelId } = this.props.params;
    let { channels } = this.props;

    debugger

    //if currentUser, render content
    if (this.props.currentUser.id) {
      return (
        <div className='channel-main'>
          <div className='channel-index-outer'>
            <div className='user-nav'>
              <div>
                <p>Cahootz</p>
                <p>Welcome!</p>
                <button onClick={this.handleClick}>Sign Out</button>
              </div>
            </div>

            <ChannelIndexContainer channels={this.props.channels}/>
          </div>

          <div className='current-channel'>
            <header className='messages-header'>
              <div className='channel-nav'>
                <div className='channel-info'>Channel Info</div>
                <div className='channel-util'>Channel Util</div>
              </div>
            </header>

            <div className='message-outer'>
              <section className='messages-container'>
                Messages Index Container
                <div>message</div>
                <div>message</div>
              </section>
            </div>

            <footer className='message-input-outer'>
              <div className='message-input-inner'>
                Message Input
              </div>
            </footer>
          </div>
        </div>
      );
    } else {
      return (<div>Loading...</div>);
      }
    }
  }

const mapStateToProps = (state) => {
  debugger
  return {
    currentUser: state.session.currentUser,
    channels: state.channels
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    fetchAllChannels: () => dispatch(fetchAllChannels())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainChannel);
