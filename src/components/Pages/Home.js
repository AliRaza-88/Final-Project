import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';




 
const baseURL = 'https://jsonplaceholder.typicode.com/todos?_limit=6';

function Home(props) {


  // const navigate = useNavigate();

 

  useEffect(()=>{
    const localStorageData = JSON.parse(localStorage.getItem('localStorageData'));

    if(localStorageData == null){

      axios.get(baseURL).then((response)=>{
        props.setApiData(response.data); 
        localStorage.setItem("localStorageData", JSON.stringify(response.data));
    });
    }
    else {
      props.setApiData(localStorageData);
    }
    
  },[]);

  // function goToCreate(){
  //   navigate('/newtask', {state : {apiData : apiData, setApiData : setApiData}});
  // }
  return (
    <>
    
      <div className="row">
      <div className="col-md-12">
          <div className="mb-2 mt-2">
              <Link to='/newtask'>
              <button className="btn btn-primary" 
              //  onClick={goToCreate}
               >Add Todo</button>
              </Link>
          </div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Todo</th>
              <th>Completed</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody >
            {props.apiData.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>
                        {item.completed ? "Yes" : "No"}     
                    </td>
                    <td>
                       <Link to='/edit'>   
                          <button className="btn btn-primary" >Edit</button>
                      </Link>
                    </td>
                    <td>
                      
                          <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    
    </>
  )
}

export default Home
