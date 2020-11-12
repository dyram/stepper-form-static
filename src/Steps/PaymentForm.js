import React, { useEffect } from "react";
import { Typography, Button, Row, Col, Divider } from "antd";

export default function PaymentForm(props) {
  const { Title, Text } = Typography;

  const { data, action, step, stepperData, reset, source } = props;

  useEffect(() => {
    if (!stepperData || stepperData !== null) {
      console.log("DATA REHDYRATE : ", stepperData[step]);
    }
  }, [step, stepperData]);

  const moveNextStep = () => {
    let data = {
      paymentFormData: "Goes here"
    };
    action(step, data);
  };

  return (
    <div style={{ margin: "0% 1%", padding: "0.5%" }}>
      <Row justify="space-between">
        <Col span={16}>
          <div
            style={{
              margin: "1%",
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
              {stepperData[0]?.valueFromInput?.replace(
                /(\d{3})(\d{3})(\d{4})/,
                "$1 $2 $3"
              )}
            </Text>{" "}
            for an amount of{" "}
            <Text style={{ color: "darkblue" }} strong>
              ${data.charge}
            </Text>
            . This action could change / drop exisiting promotion on source
            account
          </div>
          <Text>Amount to be paid to move subscriber</Text>
          <div>
            <Text style={{ fontSize: "large" }}>$</Text>{" "}
            <Text strong style={{ color: "darkgreen", fontSize: "xx-large" }}>
              10.99
            </Text>
          </div>
          <div>
            <Title>Payment Form goes here</Title>
          </div>
        </Col>

        <Col span={8}>
          <div style={{ background: "white", padding: "2%" }}>
            <Text strong style={{ color: "#52C41A" }}>
              Frequently asked questions
            </Text>
            <Divider />
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              felis ipsum. Duis libero lacus, ultricies non nibh in, egestas
              porttitor metus. Donec eget congue velit. Pellentesque id felis et
              risus lacinia facilisis in eget erat aquila.
            </Text>
          </div>
        </Col>
      </Row>

      <Button type="primary" onClick={moveNextStep}>
        Next
      </Button>
      <Button danger style={{ margin: "0% 1%" }} onClick={reset}>
        CANCEL
      </Button>
    </div>
  );
}
