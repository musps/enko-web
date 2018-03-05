import React, { Component } from 'react'
import { Layout, Steps, Checkbox, Form, Input, Icon, Row, Col, Button } from 'antd';

import './login.css'

const { Content } = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;

class Login extends Component
{

  state = {
    user: {
      email: '',
      password: ''
    },
    errorUser: {
      email: null,
      password: null
    },
    errorUserMessage: {
      email: null,
      password: null
    },
  }

  constructor(props) {
   super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
    this.setErrorField = this.setErrorField.bind(this);
    this.enableError = this.enableError.bind(this);
    this.enableErrorMsg = this.enableErrorMsg.bind(this);
    this.setErrorFieldMsg = this.setErrorFieldMsg.bind(this);
  }

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

  handleSubmit = (e) =>  {
    e.preventDefault();
    this.makeRequest();
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
    let uri = 'http://127.0.0.1:8080/api/v1/auth/logIn';
    fetch(uri, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
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
        localStorage.setItem('user::token', resp.data);
        this.props.history.push('/');

      }
    });

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

        <Row className="rowStyle">
          <Col span={12}>
            <Form onSubmit={this.handleSubmit} method="POST" className="login-form">

              <FormItem {...formItemLayout} label="Email" hasFeedback
                validateStatus={this.enableError('email')}
                help={this.enableErrorMsg('email')}>
                <Input name="email" value={this.state.user.email} onChange={this.handleChange} />
              </FormItem>

              <FormItem {...formItemLayout} label="Mot de passe" hasFeedback
                validateStatus={this.enableError('password')}
                help={this.enableErrorMsg('password')}>
                <Input type="password" name="password" value={this.state.user.password} onChange={this.handleChange} />
              </FormItem>

              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Se connecter</Button>
              </FormItem>

            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Login