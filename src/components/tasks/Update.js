import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


function Update(props) {
  const { id } = useParams();
  const [task, setTask] = useState({id: '', title: '', completed: false});
  const [completed, setCompleted] = useState(false);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();


  useEffect(()=>{
    const localStorageData = JSON.parse(localStorage.getItem('localStorageData'));
    const editTask = localStorageData.find((item) => item.id.toString() === id.toString());

    if (editTask) {
      setTask(editTask); 
      setTitle(editTask.title);
      setCompleted(editTask.completed);
    }
  },[id])

  const handleRadioChange = (event) => {
    setCompleted(event.target.id === 'flexRadioDefault1');
  };



  const handleSubmit = ((e)=>{
    e.preventDefault();
    const updatedTask = { ...task, title: title, completed: completed };
    const updatedData = props.apiData.map((item) =>
      item.id.toString() === updatedTask.id.toString() ? updatedTask : item
    );

    props.setApiData(updatedData);
    localStorage.setItem('localStorageData', JSON.stringify(updatedData));

    navigate('/');

  })
  return (
    <>
    <div className="row d-flex justify-content-center">
      <div className="col-md-6 ">
        <div className="mb-3 mt-5 ">
          <Link to="/">
            <button className="btn btn-primary">Home Page</button>
          </Link>
        </div>
        <div className="bg-primary p-4 text-center text-white">
          <h1>Edit Todo</h1>
        </div>
        <br />
        <form onSubmit={handleSubmit} style={{color: props.mode==='light'? 'black' : 'white'}}>
          <div className="form-group">
            <label htmlFor="">Edit Todo:</label>
            <input
              type="text"
              placeholder="Edit Task"
              className="form-control"
              required
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
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  </>
  )
}

export default Update
