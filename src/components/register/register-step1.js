import React, { Component } from 'react'
import { Layout, Steps, Form, Input, Icon, Row, Col, Button } from 'antd';

import './register.css'

const { Content } = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;

class RegisterStep1 extends Component
{

  state = {
    user: {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      password: ''
    },
    errorUser: {
      firstname: null,
      lastname: null,
      phone: null,
      email: null,
      password: null
    },
    errorUserMessage: {
      firstname: null,
      lastname: null,
      phone: null,
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
    let uri = 'http://127.0.0.1:8080/api/v1/auth/register';
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
        this.props.history.push('/register/step2');
      }
      console.log(resp);
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
        <Row className="rowStyle rowStyleSteps">
          <Col span={12}>
            <Steps>
              <Step status="finish" title="Inscription" icon={<Icon type="user" />} />
              <Step status="wait" title="Vérification" icon={<Icon type="solution" />} />
              <Step status="wait" title="Connexion" icon={<Icon type="smile-o" />} />
            </Steps>
          </Col>
        </Row>
        <Row className="rowStyle">
          <Col span={12}>
            <Form onSubmit={this.handleSubmit} method="POST">

              <FormItem {...formItemLayout} label="Nom" hasFeedback
                validateStatus={this.enableError('lastname')}
                help={this.enableErrorMsg('lastname')}>
                <Input name="lastname" value={this.state.user.lastname} onChange={this.handleChange} />
              </FormItem>

              <FormItem {...formItemLayout} label="Prénom" hasFeedback
                validateStatus={this.enableError('firstname')}
                help={this.enableErrorMsg('firstname')}>
                <Input name="firstname" value={this.state.user.firstname} onChange={this.handleChange} />
              </FormItem>

              <FormItem {...formItemLayout} label="Numéro de téléphone" hasFeedback
                validateStatus={this.enableError('phone')}
                help={this.enableErrorMsg('phone')}>
                <Input name="phone" value={this.state.user.phone} onChange={this.handleChange} />
              </FormItem>

              <FormItem {...formItemLayout} label="Adresse e-mail" hasFeedback
                validateStatus={this.enableError('email')}
                help={this.enableErrorMsg('email')}>
                <Input name="email" value={this.state.user.email} onChange={this.handleChange} />
              </FormItem>

              <FormItem {...formItemLayout} label="Mot de passe" hasFeedback
                validateStatus={this.enableError('password')}
                help={this.enableErrorMsg('password')}>
                <Input name="password" type="text" value={this.state.user.password} onChange={this.handleChange} />
              </FormItem>

              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Valider</Button>
              </FormItem>

            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}


export default RegisterStep1