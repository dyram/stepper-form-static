import React, { useState } from "react";
import { Steps, Typography, Select, message } from "antd";
import * as AntIcons from "@ant-design/icons";

//Data from config
import params from "./data.json";

//Child Components
import Children from "./Steps/Children";

export default function Stepper(props) {
  const { Title, Text } = Typography;
  const { Step } = Steps;

  const [current, setCurrent] = useState(2);

  const getIcon = (icon) => {
    let SelectedIcon = AntIcons[icon];
    return <SelectedIcon style={{ fontSize: "xxx-large" }} />;
  };

  const nextStep = () => {
    let NCurr = current + 1;
    setCurrent(NCurr);
  };

  const navigateToStep = (index) => {
    if (index < current) {
      let Curr = index;
      setCurrent(Curr);
    } else {
      message.error("Complete this step before navigating to the next one");
    }
  };

  return (
    <div style={{ padding: "1%" }}>
      <Title level={4}>Move Subscriber</Title>

      <Steps current={current}>
        {params.steps.map((step, index) => (
          <Step
            key={step.title}
            title={
              <div
                onClick={() => {
                  navigateToStep(index);
                }}
              >
                <Text disabled>
                  Step {index < 10 ? `0${index + 1}` : index + 1}
                </Text>
                <br />
                <Title
                  level={5}
                  style={
                    current >= index ? { color: "#52c41a" } : { color: "gray" }
                  }
                >
                  {step.title.toUpperCase()}
                </Title>
              </div>
            }
            icon={getIcon(step.icon)}
          ></Step>
        ))}
      </Steps>

      {/* <div style={{ padding: "2%" }}>
        <Text disabled>Moving Subscriber Number</Text>
        <div />
        <Title level={4}>
          <Select value={selectedNumber}>{}</Select>
        </Title>
        <Title level={4}>{params.data.selectedNumber}</Title>
      </div> */}

      <div>
        <Children
          source={params.data.ctn}
          index={current}
          data={params.data}
          actionButton={(e) => {
            nextStep();
          }}
          resetEvent={(e) => {
            setCurrent(0);
          }}
        />
      </div>
    </div>
  );
}
