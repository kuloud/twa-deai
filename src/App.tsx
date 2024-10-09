import "./App.css";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import {
  Form,
  ImageUploader,
  ImageUploadItem,
  Input,
  NavBar,
  Selector,
  TextArea,
} from "antd-mobile";
import { useState } from "react";

function App() {
  const { network } = useTonConnect();

  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
  const [tonConnectUI, setOptions] = useTonConnectUI();

  async function mockUpload(file: File) {
    return {
      url: URL.createObjectURL(file),
    };
  }

  const options = [
    {
      label: "cartoon",
      value: "1",
    },
    {
      label: "cyberpunk",
      value: "2",
    },
    {
      label: "film",
      value: "3",
    },
  ];

  return (
    <div>
      <NavBar
      style={{ '--height': '56px' }}
        right={
          <TonConnectButton className="mb-4"/>
        }
        backIcon={false}
      >
        DeAI
      </NavBar>
      <Form>
        <Form.Item name="model" label="Choose a Model">
          <Input placeholder="Enter" />
        </Form.Item>
        <Form.Item
          name="textPrompt"
          label="Text Prompt"
          rules={[{ required: true }]}
        >
          <TextArea
            placeholder="Enter desired prompt here"
            // value={value}
            // onChange={val => {
            //   setValue(val)
            // }}
          />
        </Form.Item>
        <Form.Item name="imagePrompt" label="Image Prompt">
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={mockUpload}
          />
        </Form.Item>
        <Form.Item name="style" label="Style">
          <Selector
            options={options}
            defaultValue={["1"]}
            onChange={(arr, extend) => console.log(arr, extend.items)}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
