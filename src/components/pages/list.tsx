import React, {useEffect, useState} from 'react';
import {Table, Row, Col, Button, Typography} from 'antd';
import {useHistory} from 'react-router';
import axios from 'axios';

const {Title} = Typography;


const List = () => {
  const history = useHistory();
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/order/getAllOrders').then(res => {
      setAllData(res.data.data);
    });
  },[]);

  const columns = [
    {
      title: 'Customer name',
      dataIndex: 'customerName',
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shippingAddress'
    },
    {
      title: 'Product Name',
      dataIndex: 'productName'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity'
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate'
    },
    {
      title: 'Total Amount',
      dataIndex: 'total'
    },
  ];

  const data = [{
  }];

  allData.map((order: any) => {
    data.push({
     key: order.id,
     customerName: order.customerName,
     shippingAddress: order.shippingAddress,
     productName: order.productName,
     quantity: order.quantity,
     orderDate: order.orderDate,
     total: order.total,
   })
   return data;
 });

  const handleClick = () => {
    history.push('/order-form')
  }

  const handleOrderItemClick = ()=>{
    history.push('/orderItem-form')
  }

  return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={14}>
            <Title level={2}>
            Order List
            </Title>
            </Col>
          <Col span={5}>
          <Button onClick={handleClick} block>Add Order</Button>
          </Col>
          <Col span={5}>
          <Button onClick={handleOrderItemClick} block>Add Order Item</Button>
          </Col>
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={24}>
        <Table columns={columns} dataSource={data} />
        </Col>
        </Row>
    </div>
  );
}

export default List;