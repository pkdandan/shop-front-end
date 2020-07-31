import React, {useState,useEffect} from 'react';
import {Row, Col, Typography, Input, Form, Button, Select, message} from 'antd';
import axios from 'axios';
import {useHistory} from 'react-router';

const {Title} = Typography;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const OrderForm = () => {
  const [loading, setLoading] = useState(false);
  const [orderItemData, setOrderItemData] = useState([]);
  const history = useHistory();

  useEffect(() =>{
  
      axios.get('http://localhost:8082/orderItem/fetchAllItem')
      .then(res => {
        if(res.data && res.data.data){
          console.log(JSON.stringify(res.data.data));
          setOrderItemData(res.data.data);
        }
      })
      .catch(error => {
        message.error(error);
      })
  },[]);

  const handleSubmit = (payload: any) => {
    setLoading(true);
    axios.post('http://localhost:8081/order/saveOrder', 
      payload
    )
    .then(res => {
      setLoading(false);
      message.success('Order Added Successfully!');
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
            Please Fill the Order Details
            </Title>
            </Col>
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={18}>
          <Form {...layout} onFinish={handleSubmit}>
            <Form.Item name="customerName" label="CustomerName"
            rules={[
              {
                required: true,
                message: 'Please input customer name',
              }
            ]}
            >
              <Input placeholder="Please Enter customer name" />
            </Form.Item>
            <Form.Item name="shippingAddress" label="Shipping Address" 
            rules={[
              {
                required: true,
                message: 'Please input your address',
              }
            ]}
            >
              <Input placeholder="Please Enter your address" />
            </Form.Item>
            <Form.Item name="orderItem" label="Items" 
            rules={[
              {
                required: true,
                message: 'Please select your items'
              }
            ]}
            >
              <Select placeholder="Please select you Item">
              { orderItemData.map((item:any) => <Option key={item.id} value={item.id}>{item.productName}</Option>)}
              </Select>
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

export default OrderForm;
