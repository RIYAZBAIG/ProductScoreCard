
import React, { useState } from "react";
import CreditScoringCard from "./CreditScoringCard";

const CreditScoringList = () => {
  const [showCreditScoringCard, setShowCreditScoringCard] = useState(false);
  const [showHome, setShowHome] = useState(true);

  const handleButtonClick = () => {
    setShowCreditScoringCard(true);
    setShowHome(false);
  };

  const handleNavigateBack = () => {
    setShowCreditScoringCard(false);
    setShowHome(true);
  };

  return (
    <div className="table-container">
      {showHome ? (
        <div>
          <button onClick={handleButtonClick} className="btn2">
            Add Scoring Card
          </button>
          <table className="table">
   
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>Name</th>
            <th>Version</th>
            <th>Created Date</th>
            <th className="text-right">Approved Date</th>
            <th className="text-right">Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">1</td>
          </tr>
          <tr>
            <td className="text-center">2</td>
          </tr>
          <tr>
            <td className="text-center">3</td>
          </tr>
        </tbody>
          </table>
        </div>
      ) : (
        <div>
          <button onClick={handleNavigateBack} className="btn3">
            Back 
          </button>
          {showCreditScoringCard && <CreditScoringCard />}
        </div>
      )}
    </div>
  );
};

export default CreditScoringList;
