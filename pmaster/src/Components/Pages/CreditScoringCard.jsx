import React, { useCallback, useState } from "react";
import "./Common.css";

const CreditScoringCard = () => {
  const [data, setData] = useState([
    {
      variable: "",
      scoringCriteria: [
        {
          condition: "",
          conditionVal: "",
          notMasterDrop: "",
          notMasterField: "",
        },
      ],
      score: [""],
      flag: [false],
      narration: [""],
      weightage: "",
    },
    // If we do not want default addRow then we have to comment the above obj.//
  ]);
  const [product_credit_score, setProduct_credit_score] = useState(data);

  // const [jsonData,setJsonData] = useState("")
  //const jsonData = JSON.stringify(data);
  console.log("data", data);

  const [formValues, setFormValues] = useState({
    name: "",
    display_type: "Displaying On an Pop-Up",
    condition_display_type: "Scoring Criteria",
    scale_up: false,
    offset: "",
    factor: "",
  });

  const addRow = () => {
    // let oldData =data;
    // oldData.push({
    //   variable: "",
    //   scoringCriteria: [
    //     {
    //       condition: "",
    //       conditionVal: "",
    //       notMasterDrop: "",
    //       notMasterField: "",
    //     },
    //   ],
    //   score: [""],
    //   flag: [false],
    //   narration: [""],
    //   weightage: "",
    // })
    // console.log(oldData,data,'kjsad')
    setData([
      ...data,
      {
        variable: "",
        scoringCriteria: [
          {
            condition: "",
            conditionVal: "",
            notMasterDrop: "",
            notMasterField: "",
          },
        ],
        score: [""],
        flag: [false],
        narration: [""],
        weightage: "",
      },
    ]);
  };

  const deleteRow = useCallback((idx) => {
    setData((ps) => {
      let d = JSON.parse(JSON.stringify(ps));
      d.splice(idx, 1);
      return d;
    });
  }, []);

  const addSubRow = useCallback((rowIdx) => {
    setData((ps) => {
      let d = JSON.parse(JSON.stringify(ps));
      d[rowIdx].scoringCriteria.push({
        condition: "",
        conditionVal: "",
        notMasterDrop: "",
        notMasterField: "",
      });
      d[rowIdx].score.push("");
      d[rowIdx].flag.push(false);
      d[rowIdx].narration.push("");
      return d;
    });
  }, []);

  const deleteSubRow = useCallback((rowIdx, idx) => {
    setData((ps) => {
      let d = JSON.parse(JSON.stringify(ps));
      d[rowIdx].scoringCriteria.splice(idx, 1);
      d[rowIdx].score.splice(idx, 1);
      d[rowIdx].flag.splice(idx, 1);
      d[rowIdx].narration.splice(idx, 1);
      return d;
    });
  }, []);

  const handleChange = (e, rowIdx, subRowIdx) => {
    const selectedValue = e.target.value;
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[rowIdx].scoringCriteria[subRowIdx].condition = selectedValue;
      // You can handle the logic for the 'between' case here
      // For now, let's set the default value as an example
      // updatedData[rowIdx].scoringCriteria[subRowIdx].conditionVal = selectedValue === 'between' ? "25|88" : "";
      return updatedData;
    });
  };
  const handlevariableChange = (e, rowIdx) => {
    console.log("ee", e.target.value);
    setData((ps) => {
      let d = JSON.parse(JSON.stringify(ps));
      d[rowIdx].variable = e.target.value;
      return d;
    });
  };

  const handleweightageChange = (e, rowIdx) => {
    console.log("ee", e.target.value);
    setData((ps) => {
      let d = JSON.parse(JSON.stringify(ps));
      d[rowIdx].weightage = e.target.value;
      return d;
    });
  };

  const handlescore_valueChange = (e, rowIdx, subRowIdx) => {
    console.log("ee", data, e.target.value);
    setData((ps) => {
      let d = JSON.parse(JSON.stringify(ps));
      d[rowIdx].score[subRowIdx] = e.target.value;
      return d;
    });
  };

  const handleflagChange = (e, rowIdx, subRowIdx) => {
    console.log("ee", e.target.checked);
    setData((ps) => {
      let d = JSON.parse(JSON.stringify(ps));
      d[rowIdx].flag[subRowIdx] = e.target.checked;
      return d;
    });
  };
  const handleNarationChange = (e, rowIdx, subRowIdx) => {
    console.log("ee", e.target.value);
    setData((ps) => {
      let d = JSON.parse(JSON.stringify(ps));
      d[rowIdx].narration[subRowIdx] = e.target.value;
      console.log(d, "d");
      return d;
    });
  };

  const handleValueChange = (e, rowIdx, subRowIdx) => {
    console.log("ee", e.target.value);
    setData((ps) => {
      let d = JSON.parse(JSON.stringify(ps));

      d[rowIdx].scoringCriteria[subRowIdx].conditionVal = e.target.value;
      return d;
    });
  };

  const handleMinMaxChange = (e, rowIdx, subRowIdx,type) => {
    console.log("ee", e.target.value);
    setData((ps) => {
      let d = JSON.parse(JSON.stringify(ps));
      if (
        d[rowIdx].scoringCriteria[subRowIdx].conditionVal.indexOf("|") >-1
      )
      d[rowIdx].scoringCriteria[subRowIdx].conditionVal= type==="min"?`${ e.target.value}|${   d[rowIdx].scoringCriteria[subRowIdx].conditionVal.split("|")[1]??""}`:`${ d[rowIdx].scoringCriteria[subRowIdx].conditionVal.split("|")[0]??""}|${ e.target.value}`  
     else(
      d[rowIdx].scoringCriteria[subRowIdx].conditionVal = type==="min"?`${ e.target.value}|""}`:`""}|${ e.target.value}`  

     )
      return d;
    });
  };

  const submitData = useCallback(() => {
    const flattenedData = data.flatMap((row) => {
      return row.scoringCriteria.map((subRow, subIdx) => ({
        variable: row.variable,
        scoringCriteria: subRow.condition,
        criteria: subRow.conditionVal,
        score_value: row.score[subIdx],
        flag: row.flag[subIdx],
        narration: row.narration[subIdx],
        weightage: row.weightage,
      }));
    });
  
    const payload = {
      ...formValues,
      product_credit_score: flattenedData,
    };
  
    console.log("JSON data to be submitted:", payload);
  }, [data, formValues]);
  
  
  console.log(data, "jkdskj");
  return (
    <div style={{ margin: "10px" }}>
    {/* <h1>Hello {process.env.REACT_APP_KEY}</h1> */}
      <div class="card">
        <div class="card-body">
          <form class="form-grid">
            <div class="form-group">
              <label for="ReplicateScorecard">Replicate Scorecard:</label>
              <select
                class="form-control"
                id="ReplicateScorecard"
                name="ReplicateScorecard"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    score_card: e.target.value,
                  })
                }
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div class="form-group">
              <label for="DisplayType">Display Type:</label>
              <select
                class="form-control"
                id="DisplayType"
                name="DisplayType"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    display_type: e.target.value,
                  })
                }
              >
                <option value="Displaying On an Pop-Up">
                  Displaying On an Pop-Up
                </option>
                <option value="Letter Grade">Letter Grade</option>
              </select>
            </div>

            <div class="form-group">
              <label for="ConditionalDisplayType">
                Conditional Display Type:
              </label>
              <select
                class="form-control"
                id="ConditionalDisplayType"
                name="ConditionalDisplayType"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    condition_display_type: e.target.value,
                  })
                }
              >
                <option value="Scoring Criteria">Scoring Criteria</option>
                <option value="When Conditions Met">When Conditions Met</option>
                <option value="Discription">Discription</option>
              </select>
            </div>

            <div class="form-group">
              <label for="Name">Name:</label>
              <input
                type="text"
                class="form-control"
                id="Name"
                name="Name"
                placeholder="Name"
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
              />
            </div>

            <div class="form-group">
              <label for="Intercept">Intercept:</label>
              <input
                type="number"
                class="form-control"
                id="Intercept"
                name="Intercept"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    intercept: e.target.value,
                  })
                }
              />
            </div>

            <div class="form-group">
              <label for="Offset">Offset:</label>
              <input
                type="number"
                class="form-control"
                id="Offset"
                name="Offset"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    offset: e.target.value,
                  })
                }
              />
            </div>

            <div class="form-group">
              <label>Scale Up:</label>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="ScaleUpYes"
                  name="ScaleUp"
                  value="Yes"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      scale_up: e.target.checked?'Yes':'No',
                    })
                  }
                />
                <label class="form-check-label" for="ScaleUpYes">
                  Yes
                </label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="ScaleUpNo"
                  name="ScaleUp"
                  value="No"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      scale_up: e.target.checked?'No':'Yes',
                    })
                  }
                />
                <label class="form-check-label" for="ScaleUpNo">
                  No
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div style={{ display: "flex", marginBottom: "10px" }}>
        <button type="button" class="Submit-button1" onClick={() => addRow()}>
          ADD
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Variable</th>
              <th scope="col">Scoring Criteria</th>
              <th scope="col">Score</th>
              <th scope="col">Flag</th>
              <th scope="col">Narration</th>
              <th scope="col">Weightage (%)</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <select
                      className="form-control"
                      onChange={(e) => handlevariableChange(e, idx)}
                    >
                      <option value="1">Number Of Shops in th Vicinity</option>
                      <option value="2">TIN Registration</option>
                      <option value="3">Years in Business</option>
                      <option value="4">Owners(s) Age</option>
                      <option value="5">Loan to Existing Borrowers </option>
                    </select>
                  </td>
                  <td>
                    {row.scoringCriteria.map((subRow, subIdx) => {
                      return (
                        <div style={{ display: "flex", marginBottom: "8px" }}>
                          <div
                            className="col-4"
                            style={{ paddingRight: "8px" }}
                          >
                            <select
                              className="form-control"
                              onChange={(e) => handleChange(e, idx, subIdx)}
                            >
                              <option value="n/a">N/A</option>

                              <option value="equals">Equals</option>
                              <option value="between">Between</option>
                              <option value="greaterThan">Greater than</option>
                              <option value="lessThan">Less than</option>
                              <option value="greaterThanOrEqual">
                                Greater than or Equal
                              </option>
                              <option value="lessThanOrEqual">
                                Less than or Equal
                              </option>
                              <option value="value">Value</option>
                            </select>
                          </div>
                          {subRow.condition === "between" ? (
                            <>
                              <div
                                className="col-4"
                                style={{ paddingRight: "8px" }}
                              >
                                 <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Min Value"
                                       
                                  onChange={(e)=>handleMinMaxChange (e, idx, subIdx,"min")}
                                />
                              </div>
                              <div className="col-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Max Value"
                                  onChange={(e)=>handleMinMaxChange (e, idx, subIdx,"max")}

                                />
                              </div>
                            </>
                          ) : subRow.condition === "equals" ||
                            subRow.condition === "value" ? (
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Value"
                                onChange={(e) =>
                                  handleValueChange(e, idx, subIdx)
                                }
                              />
                            </div>
                          ) : [
                              "greaterThan",
                              "lessThan",
                              "greaterThanOrEqual",
                              "lessThanOrEqual",
                            ].includes(subRow.condition) ? (
                            <div className="col-8">
                                <input
                                type="text"
                                className="form-control"
                                placeholder="condition"
                                // disabled={true}
                                // value={conditionSymbol[subRow.condition]}
                                onChange={(e) =>
                                  handleValueChange(e, idx, subIdx)
                                }

                              />
                            </div>
                          ) : (
                            <>
                              <div
                                className="col-4"
                                style={{ paddingRight: "8px" }}
                              >
                                <select className="form-control">
                                  <option value="1" selected>
                                    Not From Masters
                                  </option>
                                  <option value="2">From Masters</option>
                                  {/* Add other options here */}
                                </select>
                              </div>
                              <div className="col-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Not From Masters Fields"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </td>
                  <td>
                    {row.score.map((s, subIdx) => {
                      return (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Score"
                          style={{ marginBottom: "8px" }}
                          onChange={(e) =>
                            handlescore_valueChange(e, idx, subIdx)
                          }
                        />
                      );
                    })}
                  </td>

                  <td
                    style={{ display: "flex", flexDirection: "column" }}

                    //
                  >
                    {row.flag.map((n, subIdx) => {
                      return (
                        <input
                          type="checkbox"
                          style={{ margin: "12px 0px 20px 0px" }}
                          onClick={(e) => handleflagChange(e, idx, subIdx)}
                        />
                      );
                    })}
                  </td>

                  <td>
                    {row.narration.map((n, subIdx) => {
                      return (
                        <div
                          style={{ display: "flex", marginBottom: "8px" }}
                          key={subIdx}
                        >
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Narration"
                            style={{ marginRight: "15px" }}
                            onChange={(e) =>
                              handleNarationChange(e, idx, subIdx)
                            }
                          />
                          {subIdx === 0 ? (
                            <span
                              onClick={() => addSubRow(idx)}
                              style={{
                                margin: "auto",
                                background: "#3db43d",
                                color: "white",
                                height: "28px",
                                width: "28px",
                                cursor: "pointer",
                              }}
                            >
                              <i
                                className="fa-sharp fa-solid fa-plus"
                                style={{ padding: "5px" }}
                              ></i>
                            </span>
                          ) : (
                            <span
                              onClick={() => deleteSubRow(idx, subIdx)}
                              style={{
                                margin: "auto",
                                background: "#d41919",
                                color: "white",
                                height: "28px",
                                width: "28px",
                                cursor: "pointer",
                              }}
                            >
                              <i
                                class="fa-sharp fa-solid fa-trash"
                                style={{ padding: "5px" }}
                              ></i>
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {/* add btns */}
                  </td>

                  <td
                    style={{ verticalAlign: "middle" }}
                    onChange={(e) => handleweightageChange(e, idx)}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="% Weightage"
                    />
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "-webkit-center",
                    }}
                  >
                    <span
                      onClick={() => deleteRow(idx)}
                      style={{
                        background: "#d41919",
                        color: "white",
                        height: "30px",
                        width: "30px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i
                        class="fa-sharp fa-solid fa-trash"
                        style={{ padding: "5px" }}
                      ></i>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {data.length > 0 && (
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <button class="Submit-button" onClick={submitData}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditScoringCard;

const conditionSymbol = {
  greaterThan: "> than",
  lessThan: "< than",
  greaterThanOrEqual: ">=",
  lessThanOrEqual: "<=",
};
