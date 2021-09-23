import axios from "axios";
import { useState } from "react";

export const userRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (prpos = {}) => {
    try {
      setErrors(null);
      const response = await axios({
        method,
        url,
        data: {
          ...body,
          ...prpos
        }
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {
              err?.response?.data?.errors
                .map((e, index) => (
                  <li key={index}>{e.message}</li>
                ))
            }
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
}