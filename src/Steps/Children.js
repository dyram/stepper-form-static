import React, { useState } from "react";
import { Typography, Select } from "antd";
import AccountDetails from "./AccountDetails";
import PaymentForm from "./PaymentForm";
import Confirmation from "./Confirmation";

let dataFromSteppers = {};

export default function Children(props) {
  const { index, data, actionButton, resetEvent, source } = props;

  const { Title, Text } = Typography;
  const { Option } = Select;

  const [selectedNumber, setSelectedNumber] = useState(source[0]?.value);

  const selectSourceNumber = (value) => {
    resetStepper();
    setSelectedNumber(value);
  };

  const nextAction = (stepIndex, dataToBeStored) => {
    dataFromSteppers[stepIndex.toString()] = dataToBeStored;
    console.log("DATA STORED : ", dataFromSteppers);
    actionButton();
  };

  const finishStep = (stepIndex, dataToBeStored) => {
    dataFromSteppers[stepIndex] = dataToBeStored;
    console.log("DATA STORED : ", dataFromSteppers);
    resetStepper();
  };

  const resetStepper = () => {
    dataFromSteppers = {};
    resetEvent();
    setSelectedNumber(source[0]?.value);
  };

  return (
    <div>
      <div style={{ padding: "2%" }}>
        <Text disabled>Moving Subscriber Number</Text>
        <div />
        <Title level={4}>
          <Select
            size="large"
            bordered={false}
            value={selectedNumber}
            onChange={selectSourceNumber}
            disabled={index > 0}
            style={{ fontSize: "x-large" }}
          >
            {source?.map((numbers, index) => (
              <Option value={numbers.value}>
                {numbers.value
                  .toString()
                  .replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
              </Option>
            ))}
          </Select>
        </Title>
      </div>
      {index === 0 && (
        <AccountDetails
          step={index}
          data={data}
          source={selectedNumber}
          action={nextAction}
          stepperData={dataFromSteppers}
          reset={resetStepper}
        />
      )}
      {index === 1 && (
        <PaymentForm
          step={index}
          data={data}
          source={selectedNumber}
          action={nextAction}
          stepperData={dataFromSteppers}
          reset={resetStepper}
        />
      )}
      {index === 2 && (
        <Confirmation
          step={index}
          data={data}
          source={selectedNumber}
          action={finishStep}
          stepperData={dataFromSteppers}
        />
      )}
    </div>
  );
}
