import { useState } from "react";
import Router from "next/router";
import { userRequest } from "../../hooks/use-request.hooks";

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { doRequest, errors } = userRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price
    },
    onSuccess: () => Router.push('/')
  });

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      setPrice('');
      return;
    }

    setPrice(value.toFixed(2));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    doRequest();
  }

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input className="form-control" value={price} onBlur={onBlur} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
      {errors}
    </div>
  );
};

export default NewTicket;