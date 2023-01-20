import React from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import TodoItem from "../components/TodoItem";
import TodoModal from "../components/TodoModal";
import NoData from "../assets/image/no-data.gif";

const Home = () => {
  const [show, setShow] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const todoList = useSelector((state) => state.todo.todoList);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const itemsPerPage = 5;
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = todoList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(todoList.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % todoList.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className='container py-5'>
        <div className='todoContainer'>
          <div className='d-flex justify-content-between py-3'>
            <h3>TODO APP</h3>
            <Button variant='primary' onClick={() => handleShow()}>
              Add Todo
            </Button>
          </div>
          <div>
            <Table striped responsive>
              <thead className='bg-primary'>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {todoList && todoList.length > 0 ? (
                  currentItems.map((todo, index) => <TodoItem todo={todo} index={index} />)
                ) : (
                  <div className='d-flex justify-content-center'>
                    <img className='w-50' src={NoData} alt='' />
                  </div>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <div className='container'>
        <nav aria-label='Page navigation'>
          <ReactPaginate
            previousLabel={`Prev`}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            containerClassName={"pagination justify-content-center"}
            pageClassName={`page-item`}
            pageLinkClassName={`page-link`}
            previousClassName={`page-item`}
            previousLinkClassName={`page-link page-link-prev`}
            nextClassName={`page-item`}
            nextLinkClassName={`page-link page-link-next`}
            disabledClassName={"disabled"}
            activeClassName={"active"}
          />
        </nav>
      </div>

      {show && <TodoModal type={"add"} todo={null} show={show} handleClose={handleClose} />}
    </>
  );
};

export default Home;
