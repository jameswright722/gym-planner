import "./App.css";
import { useState } from "react";
import Axios from 'axios';

function App() {
  const [workout, setWorkout] = useState("");
  const [split, setSplit] = useState("");

  const [newSplit, setNewSplit] = useState("");

  const addWorkout = () => {
    Axios.post('http://localhost:3060/create', {
      workout: workout, 
      split: split
    }).then(()=> {
      setWorkout([
        ...workout,
        {
          workout: workout,
          split: split,
        }
      ])
    });
  }

  const getWorkout = () => {
    Axios.get("http://localhost:3060/workout").then((response) => {
      setWorkout(response.data);
    });
  };

  const updateWorkout = (id) => {
    Axios.put("http://localhost:3001/update", { split: newSplit, id: id }).then(
      (response) => {
        setWorkout(
          workout.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  workout: val.workout,
                  split: newSplit,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteWorkout = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setWorkout(
        workout.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Workout:</label>
        <input
          type="text"
          onChange={(event) => {
            setWorkout(event.target.value);
          }}
        />
        <label>Split:</label>
        <input
          type="text"
          onChange={(event) => {
            setSplit(event.target.value);
          }}
        />
        <button onClick={addWorkout}>Add Workout</button>
      </div>
      <div className="workouts">
      <button onClick={getWorkout}>Show Workout</button>

        {workout.map((val, key) => {
          return (
            <div className="workout">
              <div>
                <h3>Workout: {val.workout}</h3>
                <h3>Split: {val.split}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="text..."
                  onChange={(event) => {
                    setNewSplit(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateWorkout(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteWorkout(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
