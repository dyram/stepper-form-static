import React, { useEffect } from "react";
import { Typography, Button } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

export default function Confirmation(props) {
  const { Title, Text } = Typography;

  const { data, action, step, stepperData, source } = props;

  useEffect(() => {
    if (!stepperData || stepperData !== null) {
      console.log("DATA REHDYRATE : ", stepperData[step]);
    }
  }, [step, stepperData]);

  const submitStepper = () => {
    let data = {
      finalStepData: "GoesHere"
    };
    action(step, data);
  };

  return (
    <div style={{ textAlign: "center", background: "white", padding: "1%" }}>
      <Title level={4}>
        Success <CheckCircleTwoTone twoToneColor="#52C41A" />
      </Title>
      <div style={{ color: "darkblue", margin: "1% 0%" }}>
        You have successfully moved subscriber from{" "}
        <Text style={{ color: "darkblue" }} strong>
          {source.toString().replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
        </Text>{" "}
        to{" "}
        <Text style={{ color: "darkblue" }} strong>
          {stepperData[0]?.valueFromInput?.replace(
            /(\d{3})(\d{3})(\d{4})/,
            "$1 $2 $3"
          )}
        </Text>{" "}
        for an amount of{" "}
        <Text style={{ color: "darkblue" }} strong>
          ${data.charge}
        </Text>
      </div>
      <Button type="primary" onClick={submitStepper}>
        Done
      </Button>
    </div>
  );
}
