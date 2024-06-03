import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin, Input, Checkbox, Space } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';

const Dogs = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAvailable, setShowAvailable] = useState(false);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const res = await axios.get(`${api.uri}/dogs`);
        setDogs(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dogs:', error);
        setLoading(false);
      }
    };
    fetchDogs();
  }, []);

  const filteredDogs = dogs.filter((dog) => {
    const nameMatch = dog.name.toLowerCase().includes(searchTerm.toLowerCase());
    const availabilityMatch = !showAvailable || dog.available === 1;
    return nameMatch && availabilityMatch;
  });

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    return <Spin indicator={antIcon} />;
  }

  return (
    <>
      {/* Search and filter components */}
      <Row gutter={[16, 16]} style={{ marginLeft: '15px' }}>
        {filteredDogs.map(({ ID, name, imageurl, available }) => (
          <Col key={`${ID}-${name}`}>
            <Card
              title={name}
              style={{ width: 300 }}
              cover={<img alt="example" src={imageurl} />}
              hoverable
              actions={[
                <Link to={`/${ID}`}>Details</Link>,
              ]}
            >
              {available === 1 ? 'Available' : 'Unavailable'}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Dogs;