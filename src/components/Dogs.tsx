import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin, Input, Checkbox, Space } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import PostIcon from './PostIcon';
import Displaycomment from './comment';
import { getCurrentUser } from "../services/auth.service";



const Dogs: React.FC = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAvailable, setShowAvailable] = useState(false);
  const currentUser = getCurrentUser();
  

  useEffect(() => {
    axios.get(`${api.uri}/dogs`)
      .then((res) => {
        setDogs(res.data);
        localStorage.setItem('a', JSON.stringify(res.data));
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  const filteredDogs = dogs.filter((dog) => {
    const nameMatch = dog.name.toLowerCase().includes(searchTerm.toLowerCase());
    const availabilityMatch = !showAvailable || dog.a_status === 1;
    return nameMatch && availabilityMatch;
  });

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    return <Spin indicator={antIcon} />;
  }

  return (
    <>
      <Space style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Search dogs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Checkbox
          checked={showAvailable}
          onChange={(e) => setShowAvailable(e.target.checked)}
        >
          Show available only
        </Checkbox>
      </Space>

      <Row gutter={[16, 16]} style={{ marginLeft: '15px' }}>
        {filteredDogs.map(({ ID, name, imageurl, links,a_status}) => (
          <Col key={`${ID}-${name}`}>
            <Card
              title={name}
              style={{ width: 300 }}
              cover={<img alt="" src={imageurl} />}
              hoverable
              actions={[
                <Link to={`/${ID}`}>Details</Link>,
                <Displaycomment    msgLink={links.msg} id={ID}/>,
                <PostIcon type="heart" FavLink={links.fav} id={ID} />

                
              ]}
            >
              {a_status === 1 ? 'available' : 'unavailable'}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Dogs;