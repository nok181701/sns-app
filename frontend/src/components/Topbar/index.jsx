import React from "react";

const Topbar = () => {
  return (
    <div className="topbarConteiner">
      <div className="topbarLeft">
        <span className="logo">SNS APP</span>
      </div>
      <div className="topbarCenter">
        <div className="serchbar">
          <input
            type="text"
            className="serchInput"
            placeholder="探し物はなんですか？"
          />
        </div>
        <div className="topbarRight">
          <div className="topbarIconItem">1</div>
          <div className="topbarIconItem">2</div>
        </div>
        <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
      </div>
    </div>
  );
};

export default Topbar;
