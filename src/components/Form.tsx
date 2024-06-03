import 'antd/dist/reset.css';
import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Form, Input, Button,  Modal, Typography} from 'antd';
import { EditOutlined,EditFilled } from '@ant-design/icons';
import axios from "axios";
import { api } from './common/http-common';
import { getCurrentUser } from "../services/auth.service";
const { Title } = Typography;
const { TextArea } = Input;

const EditForm: React.FC = (props:any) => {
    let navigate: NavigateFunction = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [isShow, setIsShow] = React.useState(false); 
    const aa:any = JSON.parse(localStorage.getItem('e') || "{}");
   // console.log("aa  ", aa)
    //console.log('aa.title ',aa.title)
    const contentRules = [
        {required: true, message: 'Please input somethings'}    
      ]

      const handleFormSubmit  = (values: any) => {
        const n = values.name;
        const b = values.breed;
        const a = values.age;
        const g = values.gender;
        const s = values.size;
        const d = values.description;
        const l = values.location;
        const u = values.imageurl;
        const ui = values.userID;
        const currentUser = getCurrentUser();

       // console.log('new article '+ t,a,s,d,u,currentUser.id);
        const postDog = {
          name: n,
          breed: b,
          age: a,
          
          gender: g,
          size: s,
          description: d,
          location: l,
          imageurl: u,
          userID: ui
        };

        if(props.isNew==false){
       console.log(`path: ${api.uri}/dogs/3`)
        axios.put(`${api.uri}/dogs/3`, postDog, {
            headers: {
              'Authorization': `Basic ${localStorage.getItem('aToken')}`
            }
          })
            .then((res)=> {
            alert("Dogs detail updated")
            console.log(res.data);
            localStorage.removeItem("e");
             navigate("/");
            window.location.reload();
        });
      }
       else
       {console.log(`path: ${api.uri}/dogs`)
        axios.post(`${api.uri}/dogs/`, postDog, {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('aToken')}`
        }
      })
        .then((res)=> {
        alert("New Dogs created into the list")
        console.log(res.data);
         navigate("/");
        window.location.reload();
      });
      }
    }
  return (
    <>
      <Button icon={<EditOutlined />} onClick={()=>{setIsShow(true)}} />
      <Modal open={isShow} onCancel={()=>{setIsShow(false)}} title="Welcome Charity worker" footer={[]}> 
    <p></p>
    {props.isNew?(<Title level={3} style={{color:"#0032b3"}}>Create New Dogs</Title>):(<Title level={3} style={{color:"#0032b3"}}>Update Dogs detail</Title>)}
    <Form name="dog" onFinish={(values)=>handleFormSubmit(values)}>
      <Form.Item name="name" label="Dog Name" rules={contentRules}>
      {props.isNew? ( <Input  />):( <Input defaultValue={!props.isNew&&aa.name} />)}
      </Form.Item>
      <Form.Item name="breed" label="Breed" rules={contentRules}>
      {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.breed} />)}       
      </Form.Item>
      <Form.Item name="age" label="Age" >
      {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.age} />)}
      </Form.Item>
      <Form.Item name="gender" label="Dogs gender" >
        {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.gender} />)}
        </Form.Item>
      <Form.Item name="size" label="Dog Size" >
        {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.size} />)}
        </Form.Item>
      <Form.Item name="description" label="Detail Description" >
      {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.description} />)}
      </Form.Item>
      <Form.Item name="location" label="Centre Location" >
        {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.location} />)}
        </Form.Item>
      <Form.Item name="imageurl" label="ImageURL" >
      {props.isNew? ( <Input  />):( <Input defaultValue={!props.isNew&&aa.imageurl} />)}  
      </Form.Item>
      <Form.Item name="userID" label="UserID" >
        {props.isNew? ( <Input  />):( <Input defaultValue={!props.isNew&&aa.userID} />)}  
        </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>     
    </Form>
    </Modal>
    </>
  );
};


export default EditForm;