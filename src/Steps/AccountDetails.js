import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Select,
  Radio,
  Input,
  Typography,
  Button,
  message
} from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

export default function AccountDetails(props) {
  const { Title, Text } = Typography;
  const { Option } = Select;

  const { step, data, action, stepperData, reset, source } = props;

  useEffect(() => {
    if (!stepperData || stepperData !== null) {
      console.log("DATA REHDYRATE : ", stepperData[step]);
      let currentStepData = stepperData[step];
      setAccountOrCtn(currentStepData?.accountOrCtn);
      setValueFromInput(currentStepData?.valueFromInput);
      setPinOrQuestion(currentStepData?.pinOrQuestion);
      setShowSuccessIcon(currentStepData?.showSuccessIcon);
      setValueFromSecurity(currentStepData?.valueFromSecurity);
      setSecuritySuccessIcon(currentStepData?.securitySuccessIcon);
    }
  }, [step, stepperData]);

  const [accountOrCtn, setAccountOrCtn] = useState(undefined);
  const [valueFromInput, setValueFromInput] = useState(undefined);
  const [pinOrQuestion, setPinOrQuestion] = useState(undefined);
  const [showSuccessIcon, setShowSuccessIcon] = useState(false);
  const [valueFromSecurity, setValueFromSecurity] = useState("");
  const [securitySuccessIcon, setSecuritySuccessIcon] = useState(false);

  const moveNextStep = () => {
    let data = {
      accountOrCtn,
      valueFromInput,
      pinOrQuestion,
      showSuccessIcon,
      valueFromSecurity,
      securitySuccessIcon
    };
    action(step, data);
  };

  const resetCurrentStep = () => {
    setAccountOrCtn(undefined);
    setValueFromInput(undefined);
    setPinOrQuestion(undefined);
    setShowSuccessIcon(false);
    setValueFromSecurity("");
    setSecuritySuccessIcon(false);
    reset();
  };

  const selectAccountOrCtn = (value) => {
    setValueFromInput(undefined);
    setShowSuccessIcon(false);
    setAccountOrCtn(value);
  };

  const setValue = (e) => {
    let { value } = e.target;
    setValueFromInput(value);
  };

  const setChoice = (e) => {
    setPinOrQuestion(e.target.value);
    setValueFromSecurity("");
    setSecuritySuccessIcon(false);
  };

  const setSecurityAnswer = (e) => {
    let { value } = e.target;
    setValueFromSecurity(value);
  };

  const validateSecurityAnswer = () => {
    if (pinOrQuestion === "question") {
      if (
        valueFromSecurity === data.securityQuestion.answer &&
        valueFromInput.length >= 9 &&
        valueFromInput !== undefined
      ) {
        setSecuritySuccessIcon(true);
        setShowSuccessIcon(true);
      } else {
        setSecuritySuccessIcon(false);
        setShowSuccessIcon(false);
        message.error("Wrong details entered");
      }
    }
    if (pinOrQuestion === "pin") {
      if (
        valueFromSecurity === data.securityPin &&
        valueFromInput.length === 8
      ) {
        setSecuritySuccessIcon(true);
        setShowSuccessIcon(true);
      } else {
        setSecuritySuccessIcon(false);
        setShowSuccessIcon(false);
        message.error("Wrong details entered");
      }
    }
  };

  return (
    <div style={{ margin: "0.5% 1%", padding: "2%", background: "white" }}>
      <Row>
        <Col span={11}>
          <Title level={5}>Destination Account</Title>
          <Text>Please provide subscriber details of destination account</Text>
          <Row>
            <Col span={15} style={{ margin: "1% 0%" }}>
              <Select
                allowClear
                placeholder="Account Number (or) CTN"
                onChange={selectAccountOrCtn}
                style={{ width: "100%" }}
                // disabled={showSuccessIcon && securitySuccessIcon}
                value={accountOrCtn}
              >
                <Option value="account">Account Number</Option>
                <Option value="ctn">CTN</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={15} style={{ margin: "1% 0%" }}>
              {accountOrCtn !== undefined ? (
                accountOrCtn === "ctn" ? (
                  <Input
                    placeholder="Enter CTN"
                    onChange={setValue}
                    maxLength={10}
                    value={valueFromInput}
                    // disabled={showSuccessIcon && securitySuccessIcon}
                    suffix={
                      <CheckCircleTwoTone
                        twoToneColor="#52C41A"
                        style={
                          showSuccessIcon
                            ? { visibility: "visible" }
                            : { visibility: "hidden" }
                        }
                      />
                    }
                  />
                ) : (
                  <Input
                    placeholder="Enter Account Number"
                    onChange={setValue}
                    maxLength={9}
                    value={valueFromInput}
                    // disabled={showSuccessIcon && securitySuccessIcon}
                    suffix={
                      <CheckCircleTwoTone
                        twoToneColor="#52C41A"
                        style={
                          showSuccessIcon
                            ? { visibility: "visible" }
                            : { visibility: "hidden" }
                        }
                      />
                    }
                  />
                )
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Col>

        <Col style={{ textAlign: "center" }} span={1}>
          <div style={{ borderLeft: "1px dashed gray", height: "100%" }}></div>
        </Col>

        <Col span={11}>
          <Title level={5}>Validate Destination Account</Title>
          <Radio.Group
            // disabled={showSuccessIcon && securitySuccessIcon}
            disabled={securitySuccessIcon}
            value={pinOrQuestion}
            onChange={setChoice}
          >
            <Radio value="question">Security Question</Radio>
            <Radio value="pin">Security PIN</Radio>
          </Radio.Group>
          {pinOrQuestion === "question" && (
            <div>
              <div
                style={{
                  margin: "3% 0%",
                  padding: "1% 2%",
                  background: "#F6FFED"
                }}
              >
                <Text style={{ color: "darkblue" }}>
                  Q : {data?.securityQuestion?.question}
                </Text>
              </div>
              <Row justify="space-between">
                <Col span={15} style={{ margin: "1% 0%" }}>
                  <Input
                    type="text"
                    value={valueFromSecurity}
                    onChange={setSecurityAnswer}
                    // disabled={showSuccessIcon && securitySuccessIcon}
                    disabled={securitySuccessIcon}
                    suffix={
                      <CheckCircleTwoTone
                        twoToneColor="#52C41A"
                        style={
                          securitySuccessIcon
                            ? { visibility: "visible" }
                            : { visibility: "hidden" }
                        }
                      />
                    }
                  />
                </Col>
                <Col span={7} style={{ margin: "1% 0%" }}>
                  <Button
                    disabled={
                      (valueFromSecurity.length < 0 &&
                        valueFromSecurity !== null) ||
                      (showSuccessIcon && securitySuccessIcon)
                    }
                    onClick={validateSecurityAnswer}
                  >
                    VALIDATE
                  </Button>
                </Col>
              </Row>
            </div>
          )}
          {pinOrQuestion === "pin" && (
            <Row>
              <Col span={15} style={{ margin: "5% 0%" }}>
                <Input
                  type="text"
                  placeholder="Enter Security PIN"
                  value={valueFromSecurity}
                  onChange={setSecurityAnswer}
                  suffix={
                    <CheckCircleTwoTone
                      twoToneColor="#52C41A"
                      style={
                        securitySuccessIcon
                          ? { visibility: "visible" }
                          : { visibility: "hidden" }
                      }
                    />
                  }
                />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      {showSuccessIcon && securitySuccessIcon ? (
        <div>
          <div
            style={{
              margin: "3% 0%",
              padding: "1%",
              background: "#F6FFED",
              color: "darkblue",
              border: "1px dashed #52C41A"
            }}
          >
            You are about to move subscriber from{" "}
            <Text style={{ color: "darkblue" }} strong>
              {source.toString().replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
            </Text>{" "}
            to{" "}
            <Text style={{ color: "darkblue" }} strong>
              {valueFromInput.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
            </Text>{" "}
            for an amount of{" "}
            <Text style={{ color: "darkblue" }} strong>
              ${data.charge}
            </Text>
            . This action could change / drop exisiting promotion on source
            account
          </div>
          <div>
            <Button type="primary" onClick={moveNextStep}>
              MAKE PAYMENT
            </Button>
            <Button
              danger
              style={{ margin: "0% 1%" }}
              onClick={resetCurrentStep}
            >
              CANCEL
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
