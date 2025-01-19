import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Table } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const KitForm = ({ formKitData, setFormKitData, productOptions, parentId, projectId, onDeleteRow }) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const formattedData = (Array.isArray(formKitData) ? formKitData : (formKitData?.data ? Object.values(formKitData.data) : []))
      .map((item, index) => ({
        key: index,
        productName: productOptions.find(p => p.code === item.code)?.label || "",
        product_code: item.product_code || "",
        quantity: item.quantity || "",
        remarks: item.remarks || "",
        code: item.code || "",
        field_id: item.field_id || "",
        parent_id: parentId,
        project_id: projectId
      }));

    setDataSource(formattedData);
    form.setFieldsValue({ items: formattedData });

  }, [formKitData, productOptions]);

  const handleAddRow = () => {
    const newRow = {
      key: dataSource.length,
      productName: "",
      product_code: "",
      quantity: "",
      remarks: "",
      code: "",
      field_id: "",
      parent_id: parentId,
      project_id: projectId
    };

    const updatedData = [...dataSource, newRow];
    setDataSource(updatedData);
    setFormKitData(updatedData);
  };

  const handleRemoveRow = async (index) => {
    let dataArray = Array.isArray(formKitData) ? formKitData : (formKitData?.data ? Object.values(formKitData.data) : []);
    const itemToDelete = dataArray[index];

    if (itemToDelete && onDeleteRow && itemToDelete?.field_id && itemToDelete?.project_id) {
      await onDeleteRow(itemToDelete.field_id, itemToDelete.project_id);
    }

    const updatedItems = dataArray.filter((_, i) => i !== index);
    setDataSource(updatedItems);
    setFormKitData(updatedItems);
    form.setFieldsValue({ items: updatedItems });
  };

  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 60,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "产品名称",
      dataIndex: "productName",
      key: "productName",
      width: 200,
      render: (_, record) => (
        <Form.Item name={["items", record.key, "productName"]} rules={[{ required: true, message: "请选择产品名称" }]} style={{ marginBottom: 0 }}>
          <Select placeholder="选择产品" style={{ width: "100%" }}>
            {productOptions.map((item) => (
              <Option key={item.id} value={item.label}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "产品代号",
      dataIndex: "product_code",
      key: "product_code",
      width: 150,
      render: (_, record) => (
        <Form.Item name={["items", record.key, "product_code"]} style={{ marginBottom: 0 }}>
          <Input placeholder="输入代号" style={{ width: "100%" }} />
        </Form.Item>
      ),
    },
    {
      title: "数量",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
      render: (_, record) => (
        <Form.Item name={["items", record.key, "quantity"]} rules={[{ required: true, message: "请输入数量" }]} style={{ marginBottom: 0 }}>
          <Input placeholder="输入数量" style={{ width: "100%" }} />
        </Form.Item>
      ),
    },
    {
      title: "备注",
      dataIndex: "remarks",
      key: "remarks",
      width: 200,
      render: (_, record) => (
        <Form.Item name={["items", record.key, "remarks"]} style={{ marginBottom: 0 }}>
          <Input placeholder="输入备注" style={{ width: "100%" }} />
        </Form.Item>
      ),
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      width: 80,
      align: "center",
      render: (_, __, index) => (
        <MinusCircleOutlined onClick={() => handleRemoveRow(index)} style={{ color: "red", cursor: "pointer" }} />
      ),
    },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={(changedValues, allValues) => {
        const updatedValues = (allValues.items || []).map(item => {
          const product = productOptions.find(p => p.value === item.productName);
          return {
            ...item,
            code: product?.code || '',
            field_id: product?.id || '',
            parent_id: parentId,
            project_id: projectId,
          };
        });

        setFormKitData(updatedValues);
      }}
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
        rowKey="key"
        size="middle"
      />
      <Button type="dashed" onClick={handleAddRow} style={{ width: "100%", marginTop: 16 }}>
        <PlusOutlined /> 添加行
      </Button>
    </Form>
  );
};

export default KitForm;
