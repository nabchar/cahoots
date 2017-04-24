import React from 'react';
import { connect } from 'react-redux';
import {withRouter, hashHistory} from 'react-router';
import { logOut } from '../../actions/session_actions';
import { createChannel,  } from '../../actions/channel_actions';
import Modal from 'react-modal';
import { allChannels } from '../../reducers/selectors';
import { subscribeToChannel, fetchChannel } from '../../actions/channel_actions';

import UserNav from './user_nav';
import ChannelList from './channel_list';
import ChannelForm from '../modals/channel_form';
import ChannelSearch from '../modals/channel_search';

const mapStateToProps = ({session, errors, channels}) => {
  // channels user is subscribed
  const userChannels = session.subscriptions.map( sub => channels[sub.id]);
  return {
    session,
    channels: Object.values(channels),
    userChannels,
    errors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    createChannel: (channel) => dispatch(createChannel(channel)),
    subscribeToChannel: (channelId) => dispatch(subscribeToChannel(channelId)),
    fetchChannel: (id) => dispatch(fetchChannel(id))
  };
};


class ChannelSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalContent: <div></div>
    };

    this.modalStyle = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFF',
        zIndex: 10
      },
      content: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100vh',
        padding: '20px',
        zIndex: 11
      },
    };

    this.closeModal = this.closeModal.bind(this);
    this.openChannelForm = this.openChannelForm.bind(this);
    this.openChannelSearch = this.openChannelSearch.bind(this);
    this.handleClick = this.handleClick.bind(this); // to remove
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  componentWillMount() {
    Modal.setAppElement('body');
 }

  openChannelForm() {
    this.setState({
      showModal: true,
      modalContent: (
        <ChannelForm
          createChannel={this.props.createChannel}
          closeModal={this.closeModal}
          currentUser={this.props.session.currentUser}
          subscribeToChannel={this.props.subscribeToChannel}
          fetchChannel={this.props.fetchChannel}
          errors={this.props.errors}/>
      ),
    });
  }

  openChannelSearch() {
    this.setState({
      showModal: true,
      modalContent: (
        <ChannelSearch
          subscribedChannels={this.props.session.subscriptions}
          allChannels={this.props.channels}
          subscribeToChannel={this.props.subscribeToChannel}
          closeModal={this.closeModal} />
      ),
    });
  }

  handleClick () {
    this.props.logOut().then(() => hashHistory.push('/signin'));
  }

  render () {
    let { currentUser } = this.props.session;
    let { userChannels } = this.props;

    return (
      <div className='channel-index-outer'>
        <UserNav currentUser={currentUser}
                 logOut={this.props.logOut}/>
        <ChannelList userChannels={userChannels}
                     openChannelForm={this.openChannelForm}
                     openChannelSearch={this.openChannelSearch}
                     currentUser={currentUser}/>


        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeModal}
          style={this.modalStyle}
          contentLabel='channelModal'>

          {this.state.modalContent}
          <button
            className="modal-close"
            onClick={this.closeModal}>
            <span className="modal-close-icon">✕</span>
            <span className="modal-close-text">esc</span>
          </button>
        </Modal>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSidebar);
