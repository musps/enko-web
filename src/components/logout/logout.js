import React, { Component } from 'react'
import { Layout, Steps, Form, Input, Icon, Row, Col, Button } from 'antd';

import './logout.css'

const { Content } = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;

class Logout extends Component
{


  constructor(props) {
    super(props);
    if(localStorage.getItem('user::token') !== null) {
      localStorage.removeItem('user::token');
      this.props.history.push('/logout');
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
            <p>
              Vous êtes maintenant déconnecté.
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Logout