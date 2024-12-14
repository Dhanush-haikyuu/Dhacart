import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {

    const navigate = useNavigate();

    function searching(){
        navigate('/search?keyword='+Keyword);
    }

    const [Keyword,SetKeyword] = useState()
  return (
    <div className="input-group">
      <input
        type="text"
        id="search_field"
        className="form-control"
        placeholder="Enter Product Name ..."
        onChange={(e)=>SetKeyword(e.target.value)}
      />
      <div className="input-group-append">
        <button onClick={searching} id="search_btn" className="btn">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
