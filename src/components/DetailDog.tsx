import 'antd/dist/reset.css';
import React from 'react';
import EditForm from './Form';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spin, Col, Card } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import { RollbackOutlined, LoadingOutlined, CloseSquareOutlined, CloseSquareFilled, EditOutlined, EditFilled } from '@ant-design/icons';
import { getCurrentUser } from "../services/auth.service";

const DetailDog = () => {
  const currentUser = getCurrentUser();
  const { id } = useParams();
  const [dog, setDog] = React.useState({ id: 0, name: '', breed: '', age: '', imageurl: '', userID: 1, description: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [theme, setTheme] = React.useState('outlined');

  React.useEffect(() => {
    console.log(`path: ${api.uri}/dogs/${id}`)
    axios.get(`${api.uri}/dogs/${id}`)
      .then((res) => {
        setDog(res.data);
        localStorage.setItem('e', JSON.stringify(res.data))
        setLoading(false);
      }).then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching dog details ')
      });
  }, [id]);

  function getIcon(theme: string) {
    let Icon;

    if (theme === 'filled')
      Icon = CloseSquareFilled
    else
      Icon = CloseSquareOutlined
    return Icon;
  }


  const handleDelete = () => {
    setTheme('filled')
    axios.delete(`${api.uri}/dogs/${id}`, {
      headers: {
        "Authorization": `Basic ${localStorage.getItem('aToken')}`
      }
    })
      .then((results) => {
        console.log('respone ', JSON.stringify(results.data.message))
        if (results.data.message === "removed") {
          alert("This dog is removed from the dog list/not available")
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(`Check network problems pls. `);
        alert("Check network problems");
      })
  }


  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
    return (<Spin indicator={antIcon} />);
  }
  else {

    const Icon = getIcon(theme)
    return (
      <>
        <h2 style={{ color: 'red' }}> Welcome to Dogs Dashboard</h2>

        <Col span={24}>
          <Card title={dog.name} style={{ width: 300, marginLeft: "100px" }}
            cover={<img alt="put image here" src={dog.imageurl} />} hoverable
            actions={[
              (currentUser && currentUser.role === "admin") && <EditForm isNew={false} id={id} />,
              (currentUser && currentUser.role === "admin") && <Icon style={{ fontSize: '32px', }} onClick={() => handleDelete()} />
            ]}
          >
            <div>
              <h3>Breed</h3>
              <p>{dog.breed}</p>
              <h3>Age</h3>
              <p>{dog.age}</p>
              <h3>Detail Description</h3>
              <p> {dog.description}</p>
              <Button
                type="primary"
                icon={<RollbackOutlined />}
                onClick={() => navigate(-1)}
              /></div>

          </Card>
        </Col>

      </>
    );

  }
}

export default DetailDog;