import React, { Component } from 'react'
import { Layout, Steps, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const Step = Steps.Step;
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class Register extends Component
{

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
      <Content style={{ padding: '0 50px', marginTop: 64 }}>

        <Steps>
          <Step status="wait" title="Login" icon={<Icon type="user" />} />
          <Step status="wait" title="Verification" icon={<Icon type="solution" />} />
          <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
        </Steps>

        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
          name : {this.props.match.params.name}
        </div>
      </Content>
    );
  }
}


export default Register