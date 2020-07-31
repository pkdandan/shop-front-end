import React, {useState} from 'react';
import {Row, Col, Typography, Input, Form, Button, message} from 'antd';
import axios from 'axios';
import {useHistory} from 'react-router';

const {Title} = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const OrderItemForm = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (palyload: any) => {
    setLoading(true);
    axios.post('http://localhost:8082/orderItem/createOrderItem', 
      palyload
    )
    .then(res => {
      setLoading(false);
      message.success('Order Item Added Successfully!');
      history.push('/list');
    })
    .catch(error => {
      setLoading(false);
      message.error(error);
    })
  }

  return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <Title style={{textAlign: 'center'}} level={2}>
            Please Fill the Order Item Details
            </Title>
            </Col>
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={18}>
          <Form {...layout} onFinish={handleSubmit}>
            <Form.Item name="productCode" label="Product Code"
            rules={[
              {
                required: true,
                message: 'Please input product code',
              }
            ]}
            >
              <Input placeholder="Please Enter product code" />
            </Form.Item>
            <Form.Item name="productName" label="Product Name" 
            rules={[
              {
                required: true,
                message: 'Please input product name',
              }
            ]}
            >
              <Input placeholder="Please Enter product name" />
            </Form.Item>
            <Form.Item name="price" label="Product price" 
            rules={[
              {
                required: true,
                message: 'Please input product price',
              }
            ]}
            >
              <Input prefix="$SGD" type="number" placeholder="Please Enter product price" />
            </Form.Item>
            <div style={{textAlign: "center"}}>
            <Button type="primary" loading={loading} htmlType="submit">
              Save
            </Button>{' '}
            <Button type="danger" htmlType="button" onClick={() => history.push('/list')}>
              Back
            </Button>
              </div>
          </Form>
          </Col>
        </Row>
    </div>
  );
}

export default OrderItemForm;
