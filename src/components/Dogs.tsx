import 'antd/dist/reset.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin } from 'antd';

import { api } from './common/http-common';
import axios from 'axios';
import {LoadingOutlined} from '@ant-design/icons';
import PostIcon from './posticon';
import Displaycomment from './comments';



const Dogs = () => {
  const [dogs, setDogs] = React.useState(null);  
  const [loading, setLoading] = React.useState(true);    
  React.useEffect(()=>{
    axios.get(`${api.uri}/dogs`)
      .then((res)=>{
        setArticles(res.data);   
        localStorage.setItem('a',JSON.stringify(res.data))                        
      })
      .then(()=>{
        setLoading(false);
      })  

  }, []);



  if(loading){
    const antIcon = <LoadingOutlined style={{ fontSize: 48}} spin />
    return(<Spin indicator={antIcon} />);
  } else {
    if(!dogs){
      return(<div>There is no dogs available now.</div>)
    } else {


      return(<>
        <Row gutter={[16,16]} style={{marginLeft:"15px"}}>
          {
            dogs && dogs.map(({id, name, imageurl, links})=> (
            <Col key={id}>                                          
             <Card title={name} style={{width: 300}}
                   cover={<img alt="example" src={imageurl} />} hoverable
                   actions={[
                 

                  ]} 
                   >               
                  <Link to= {`/${id}`}>Details</Link>

                </Card>

              </Col>
            ))
          }
        </Row></>
      )
    }
  }
}


export default Dogs;