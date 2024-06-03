import 'antd/dist/reset.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, Row, Spin, Input, Checkbox, Space } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';

const Dogs = () => {
  const [dogs, setDogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showAvailable, setShowAvailable] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`${api.uri}/dogs`)
      .then((res) => {
        setDogs(res.data);
      })
      .then(() => {
        setLoading(false);
      });
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
      <div style={{ marginBottom: '16px' }}>
        <Space>
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
      </div>
      <Row gutter={[16, 16]} style={{ marginLeft: '15px' }}>
        {filteredDogs.map(({ id, name, imageurl, available }) => (
          <Col key={id}>
            <Card
              title={name}
              style={{ width: 300 }}
              cover={<img alt="example" src={imageurl} />}
              hoverable
              actions={[]}
            >
              <Link
                to={`/${id}`}
                onClick={() => navigate(`/${id}`, { state: { dog: id } })}
              >
                Details
              </Link>
              {available === 1 ? 'Available' : 'Unavailable'}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Dogs;