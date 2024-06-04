import React from 'react';
import axios from 'axios';
import { LikeOutlined,LikeFilled,HeartOutlined,HeartFilled} from '@ant-design/icons';
import { getCurrentUser } from "../services/auth.service";
import { NavigateFunction, useNavigate } from 'react-router-dom';

function getIcon (theme:any, iconType:any) {
  let Icon:any;

  if (theme === 'filled') {
    if (iconType === 'like') {
      Icon = LikeFilled
    } else if (iconType === 'heart') {
      Icon = HeartFilled
    } 
  } else if (theme === 'outlined') {
    if (iconType === 'like') {
      Icon = LikeOutlined
    } else if (iconType === 'heart') {
      Icon = HeartOutlined
    } 
  }

  return Icon;
}

  const  PostIcon = (props:any) =>{
  const [selected, setSelected] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const theme = selected ? 'filled' : 'outlined'; 
  const iconType = props.type;
  const Icon = getIcon(theme, iconType);
  const currentUser = getCurrentUser();
  const navigate: NavigateFunction = useNavigate();

  const onclick = () =>{
    //reverse the selected state with every click
   console.log('currentUser',  currentUser)

    if((!currentUser))
      {alert("Pls. login to procceed this action")}
    else  
      if(props.type=='like')  {setSelected(!selected);postLike();;
       ;}
    else
      if(props.type=='heart') {setSelected(!selected);addFav();setSelected(!selected);}


  };



    function addFav() {
      if (props.type === 'heart' && currentUser.username !== "undefined") {
        console.log(`Logging fav: ${currentUser.username}`);
        return axios.post(props.FavLink, '', {
          headers: {
            'Authorization': `Basic ${localStorage.getItem('aToken')}`
          }
        })
        .then(response => {
          if (response.data.userid &&response.data.message === "added") {
            alert("Fav added");
            navigate("/favpage");
            window.location.reload();
          } else {
            alert("You have already added this Fav");
          }
        })
        .catch(error => {
          console.error('Error adding Fav:', error);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            alert(`Error adding Fav: ${error.response.data.message}`);
          } else if (error.request) {
            // The request was made but no response was received
            alert("Error: Check network connection"+" "+ props.FavLink);
          } else {
            // Something happened in setting up the request that triggered an Error
            alert("Error: An unexpected error occurred");
          }
        });
      }
    }

  React.useEffect(()=>{
    if(props.type=='like'){
      console.log("props.countLink ",props.countLink)
     axios.get(props.countLink)
    .then((res)=>{
      console.log(' res ', res.data)
      setCount(res.data);
      console.log('count ', count)
    })
    .catch(err => {
      console.log('err ', err)
      console.log(`${props.type} icon error for post ${props.type} `)
    });
  }
   });


    return (

      <span>        
        <Icon
          onClick={onclick}   
          style={{color:'steelblue'}}  />
         {props.type=='like'&&count}
      </span>





)

}

export default PostIcon;