import React, { useState, useEffect } from "react";
import "./ToDo.css";

const ToDoArrayItems = () => {
  const localStorageTodoArray = JSON.parse(localStorage.getItem("ToDoList"));
  if (localStorageTodoArray) {
    return localStorageTodoArray;
  } else {
    return [];
  }
};
const ToDo = () => {
  const [inputData, setinputData] = useState("");
  const [toDoItemsArray, setToDoItemsArray] = useState(ToDoArrayItems());
  const [editedItem, setEditedItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const onInputHandler = (e) => {
    setinputData(e.target.value);
  };

  const addItemHandler = (e) => {
    if (e.key === "Enter") {
      if (inputData && toggleButton) {
        setToDoItemsArray(
          toDoItemsArray.map((currElem) => {
            if (currElem.id === editedItem) {
              return { ...currElem, itemName: inputData };
            } else {
              return currElem;
            }
          })
        );
        setinputData("");
        setToggleButton(false);
      } else if (inputData && !toggleButton) {
        const inputDataObject = {
          id: new Date().getTime().toString(),
          itemName: inputData,
        };

        setToDoItemsArray([...toDoItemsArray, inputDataObject]);
        setinputData("");
        setToggleButton(false);
      }
    }
  };

  const addBtnHandler = (e) => {
    if (!inputData) {
    } else {
      const inputDataObject = {
        id: new Date().getTime().toString(),
        itemName: inputData,
      };
      setToDoItemsArray([...toDoItemsArray, inputDataObject]);
    }
    setinputData("");
    console.log(toDoItemsArray);
  };

  const inputEditHandler = () => {
    if (inputData && toggleButton) {
      setToDoItemsArray(
        toDoItemsArray.map((currElem) => {
          if (currElem.id === editedItem) {
            return { ...currElem, itemName: inputData };
          } else {
            return currElem;
          }
        })
      );
      setinputData("");
      setToggleButton(false);
    } else {
      setinputData("");
      setToggleButton(false);
    }
  };

  const RemoveAllHandler = () => {
    setToDoItemsArray([]);
  };

  const deleteItem = (itemId) => {
    const UpdatedToDoArray = toDoItemsArray.filter((item) => {
      return item.id !== itemId;
    });
    setToDoItemsArray([...UpdatedToDoArray]);
  };

  const editItem = (itemId) => {
    const itemToEdit = toDoItemsArray.find((item) => {
      return item.id === itemId;
    });
    setToggleButton(true);
    setEditedItem(itemToEdit.id);
    console.log(editedItem);
    setinputData(itemToEdit.itemName);
  };

  //local Storage Storing
  useEffect(() => {
    localStorage.setItem("ToDoList", JSON.stringify(toDoItemsArray));
  }, [toDoItemsArray]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <div className="header">TO DO APP </div>
          <div className="addItems">
            <input
              type="text"
              placeholder="ToDo Items"
              className="form-control"
              value={inputData}
              onChange={onInputHandler}
              onKeyDown={addItemHandler}
            />
            {toggleButton ? (
              <i className="far fa-edit edit-btn" onClick={inputEditHandler} />
            ) : (
              <i className="fa fa-plus add-btn" onClick={addBtnHandler} />
            )}
          </div>

          {/* Show the TO DO list  */}
          <div className="showItems">
            {toDoItemsArray.map((item, index) => {
              return (
                <div
                  className="eachItem"
                  key={index + new Date().getTime().toString()}
                >
                  <h3>{item.itemName}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit edit-btn"
                      onClick={() => {
                        editItem(item.id);
                      }}
                    />
                    <i
                      className="far fa-trash-alt delete-btn"
                      onClick={() => {
                        deleteItem(item.id);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remove Button */}
          <div className="showItems">
            <button
              className="btn clear-btn"
              data-sm-link-text="Remove All"
              onClick={RemoveAllHandler}
            >
              <span>Clear All</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
