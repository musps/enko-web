import React, { Component } from 'react'
import { notification, Layout, Steps, Form, Input, Icon, Row, Col, Button } from 'antd';
import './account.me.css'

const { Content } = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;

class AccountMe extends Component
{

  state = {
    editMode: false,
    user: {
      enable: null,
      id: null,
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      password: ''
    },
    errorUser: {
      enable: null,
      id: null,
      firstname: null,
      lastname: null,
      phone: null,
      email: null,
      password: null
    },
    errorUserMessage: {
      enable: null,
      id: null,
      firstname: null,
      lastname: null,
      phone: null,
      email: null,
      password: null
    },
  }

  constructor(props) {
    super(props);
    this.makeRequest();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
    this.setErrorField = this.setErrorField.bind(this);
    this.enableError = this.enableError.bind(this);
    this.enableErrorMsg = this.enableErrorMsg.bind(this);
    this.setErrorFieldMsg = this.setErrorFieldMsg.bind(this);
  }


  openNotification = () => {
    notification.open({
      message: 'Mise à jour du profil',
      description: 'Maj OK.',
    });
  };

  enableError = (target) => {
    return this.state.errorUser[target] === true ? 'error' : null;
  }

  enableErrorMsg = (target) => {
    return this.state.errorUserMessage[target];
  }

  setErrorField = (target, value) => {
    this.setState({
      errorUser: {
        ...this.state.errorUser,
        [target]: value
      }
    })
  }

  setErrorFieldMsg = (target, msg) => {
    this.setState({
      errorUserMessage: {
        ...this.state.errorUserMessage,
        [target]: msg
      }
    })
  }

  isEdit() {
    console.log('val : ' + this.state.editMode);
    return this.state.editMode === false ? true : false;
  }
  handleChange = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    });
  }

  makeRequest() {
    let token = localStorage.getItem('user::token');
    if(token === null) {
      return false;
    }

    let uri = 'http://127.0.0.1:8080/api/v1/user/me';
    fetch(uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token, 
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((resp) => {
      console.log(resp);
      this.setState({
        user: resp.data
      });
    });
  }

  makeRequestUpdate() {
    let token = localStorage.getItem('user::token');
    if(token === null) {
      return false;
    }

    let uri = 'http://127.0.0.1:8080/api/v1/user/me/update';
    fetch(uri, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token, 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.user)
    })
    .then((response) => response.json())
    .then((resp) => {
      if (resp.success === false && resp.data !== null) {
        // --- error.
        for (let field in this.state.user) {
          if (typeof resp.data[field] === 'undefined') {
            this.setErrorFieldMsg(field, null);
            this.setErrorField(field, null);
          } else {
            this.setErrorFieldMsg(field, resp.data[field]);
            this.setErrorField(field, true);
          }
        }

      } else {
        // --- success.
        for (let field in this.state.user) {
          this.setErrorFieldMsg(field, null);
          this.setErrorField(field, null);
        }
        // --- save account data in localstorage and redirect.
        this.openNotification();
      }
      console.log(resp);
    });
  }

  handleSubmit = (e) =>  {
    e.preventDefault();
    if(! this.state.editMode) {
      console.log('update edit mode');
      this.setState({
        editMode: true
      });
    } else {
      this.makeRequestUpdate();
      this.setState({
        editMode: false
      });
    }
  }

  render() {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div>
        <Row className="rowStyle rowStyleSteps">
          <Col span={12}>
            <Form onSubmit={this.handleSubmit} method="POST">

              <FormItem {...formItemLayout} label="Nom" hasFeedback
                validateStatus={this.enableError('lastname')}
                help={this.enableErrorMsg('lastname')}>
                <Input name="lastname" value={this.state.user.lastname} onChange={this.handleChange} disabled={this.isEdit()} />
              </FormItem>

              <FormItem {...formItemLayout} label="Prénom" hasFeedback
                validateStatus={this.enableError('firstname')}
                help={this.enableErrorMsg('firstname')}>
                <Input name="firstname" value={this.state.user.firstname} onChange={this.handleChange} disabled={this.isEdit()} />
              </FormItem>

              <FormItem {...formItemLayout} label="Numéro de téléphone" hasFeedback
                validateStatus={this.enableError('phone')}
                help={this.enableErrorMsg('phone')}>
                <Input name="phone" value={this.state.user.phone} onChange={this.handleChange} disabled={this.isEdit()} />
              </FormItem>

              <FormItem {...formItemLayout} label="Adresse e-mail" hasFeedback
                validateStatus={this.enableError('email')}
                help={this.enableErrorMsg('email')}>
                <Input name="email" value={this.state.user.email} onChange={this.handleChange} disabled={this.isEdit()} />
              </FormItem>

              <FormItem {...formItemLayout} label="Mot de passe" hasFeedback
                validateStatus={this.enableError('password')}
                help={this.enableErrorMsg('password')}>
                <Input name="password" type="password" value={this.state.user.password} onChange={this.handleChange} disabled={this.isEdit()} />
              </FormItem>

              {this.state.editMode ? (
              <FormItem {...tailFormItemLayout}>
                <Button size="large" type="primary" htmlType="submit">Valider</Button>
              </FormItem>
              ) : (
              <FormItem {...tailFormItemLayout}>
                <Button size="large" type="primary" htmlType="submit">Modifier mon profil</Button>
              </FormItem>
              )}


            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}


export default AccountMe