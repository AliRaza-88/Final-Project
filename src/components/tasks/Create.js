import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function Create(props) {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
   
  const navigate = useNavigate();


  const handleRadioChange = (event) => {
    setCompleted(event.target.id === 'flexRadioDefault1');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const myTask = {
        id: uuidv4(),
        title: title,
        completed: completed
    }
    const updatedData = [myTask, ...props.apiData];
    props.setApiData(updatedData);
    localStorage.setItem('localStorageData', JSON.stringify(updatedData));
    navigate('/');
    
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-2 mt-2">
            <Link to="/">
              <button className="btn btn-primary">Home Page</button>
            </Link>
          </div>
          <div className="bg-primary p-4 text-center">
            <h1>Add Todo</h1>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="">Enter New Todo:</label>
              <input
                type="text"
                placeholder="New Task"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div class="form-check mt-3" >
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked={completed}
                onChange={handleRadioChange}
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Completed
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked={!completed}
                onChange={handleRadioChange}
                
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Not Completed
              </label>
            </div>
            <br />
            <div className="d-grid">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
