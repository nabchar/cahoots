import React from 'react';
import { receiveErrors } from '../../actions/shared/error_actions';
import { Link, hashHistory } from 'react-router';
import ErrorList from '../shared/errors';


class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: "", password: "", email: ""};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.handleGuest = this.handleGuest.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.formType !== newProps.formType) {
      this.props.clearErrors();
    }
  }

  handleGuest() {

    hashHistory.push('/try');
    this.clearForm();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.authAction({user: this.state})
      .then((res) => {
        let prevChannelId = res.user.currentUser.previous_channel_id;
        let rootPath = '/messages/' + prevChannelId;
        return hashHistory.push(rootPath);
      }
    ).then( () => this.clearForm());
  }

  clearForm() {
    this.setState({username: "", password: ""});

  }

  handleChange(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }


  render () {
    let { formType, errors, authMessage } = this.props;
    let newPath = (formType === "Sign in") ? '/signup' : '/signin';
    let linkName = (newPath === '/signin') ? 'Sign In' : 'Sign Up';
    let guestAccountMessage = '';
    let emailInput = (<div></div>);

    if (formType === 'Sign up') {
      guestAccountMessage =
      (<p className='guest-message align-center'>or give it a <span onClick={this.handleGuest}>try</span>.</p>);
      emailInput = (
        <input className='auth-input'
        type="text"
        onChange={this.handleChange('email')}
        value={this.state.email}
        placeholder='you@cahootz.com'/>

      );
    }



    return (
      <div className="session-main">
        <header className="session-header">
          <p>
            <Link className="session-logo" to={'/'}>
              <i className="fa fa-slack" aria-hidden="true"></i>
              <strong>cahootz</strong>
            </Link>
          </p>
          <p>
            <Link className='session-header-link' to={newPath}>{linkName}</Link>
          </p>
        </header>

        <section className='session-content'>
          <form className='session-form' onSubmit={this.handleSubmit}>
            <h1 className='align-center'>{authMessage}</h1>

            <section className='session'>
              <p className='align-center auth-instructions'>
                  Enter your <strong> username </strong> and <strong> password</strong>.
              </p>

              <ErrorList errors={errors.base}
                         errorType={''}/>

              <input className='auth-input'
                type="text"
                onChange={this.handleChange('username')}
                value={this.state.username}
                placeholder='username'/>

              <ErrorList errors={errors.username}
                         errorType={'Username '}/>

              {emailInput}
              <ErrorList errors={errors.email}
                errorType={'Email '}/>

              <input className="auth-input"
                type="password"
                onChange={this.handleChange('password')}
                value={this.state.password}
                placeholder="password"/>

              <ErrorList errors={errors.password}
                         errorType={'Password '}/>

              <input className="session-submit" type="submit" value={formType} />
            </section>
            {guestAccountMessage}

          </form>
        </section>
        <footer className="session-footer"></footer>
      </div>
    );
  }
}

export default SessionForm;
