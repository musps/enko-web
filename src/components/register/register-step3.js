import React, { Component } from 'react'
import { Layout, Steps, Form, Input, Icon, Row, Col, Button } from 'antd';

import './register.css'

const { Content } = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;

class RegisterStep3 extends Component
{


  constructor(props) {
    super(props);

  }

  nextStep = () => {
    this.props.history.push('/login');
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
              <Step status="finish" title="Vérification" icon={<Icon type="solution" />} />
              <Step status="finish" title="Connexion" icon={<Icon type="smile-o" />} />
            </Steps>
          </Col>
        </Row>
        <Row className="rowStyle">
          <Col span={12}>
            <p>
              Félicitation vous êtes officiellement inscrit.
            </p>
            <Button type="primary" size="large" onClick={this.nextStep}>Me connecter</Button>
          </Col>
        </Row>
      </div>
    );
  }
}


export default RegisterStep3