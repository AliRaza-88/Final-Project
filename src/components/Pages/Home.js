import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseURL = "https://jsonplaceholder.typicode.com/todos?_limit=6";

function Home(props) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("localStorageData")
    );

    if (localStorageData == null) {
      axios.get(baseURL).then((response) => {
        props.setApiData(response.data);
        localStorage.setItem("localStorageData", JSON.stringify(response.data));
      });
    } else {
      const filteredData = localStorageData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      // props.setApiData(localStorageData);
      props.setApiData(filteredData);
    }
  }, [searchQuery]);

  function handleKeyPress(event) {
    setSearchQuery(event.target.value);
  }

  const DeleteData = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const deletedData = props.apiData.filter((item) => item.id !== id);
      props.setApiData(deletedData);
      localStorage.setItem("localStorageData", JSON.stringify(deletedData));
    }
    
  };

  return (
    <div className="container-fluid" style={{color: props.mode==='light'? 'black' : 'white'}}
    >
    <form  role="search" className="mt-5 mb-5 d-flex justify-content-center" >
    <input className="form-control-lg" type="search" placeholder="Search Here..." aria-label="Search" value={searchQuery} onChange={handleKeyPress}/>
      </form>
      <div className="row" >
        <div className="col-md-12">
          <div className="mb-2 mt-2">
            <Link to="/newtask">
              <button
                className="btn btn-primary"
                //  onClick={goToCreate}
              >
                Add Todo
              </button>
            </Link>
          </div>
          <table className="table table-bordered table-hover " style={{color: props.mode==='light'? 'black' : 'white'}}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Todo</th>
                <th>Completed</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {props.apiData.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.completed ? "Yes" : "No"}</td>
                      <td>
                        <Link to={`/edit/${item.id}`}>
                          <button className="btn btn-primary">Edit</button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          // onClick={() => DeleteData(item.id)}
                          onClick={() => DeleteData(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
