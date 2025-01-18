import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Table } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const KitForm = ({ kitData, setKitFormData, productOptions, parentId, projectId ,onDeleteRow}) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
    // ✅ **初始化时确保 `kitData` 是数组**
  useEffect(() => {
    console.log("kitData before formatting:", kitData, "Type:", typeof kitData);

    // 强制 `kitData` 变成数组，避免对象和数组的转换问题
    const formattedData = (Array.isArray(kitData) ? kitData : (kitData?.data ? Object.values(kitData.data) : []))
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

  }, [kitData, productOptions]);

  // ✅ **新增行**
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
    setKitFormData(updatedData);
  };

  // ✅ **删除行并同步更新 `kitData`**
  const handleRemoveRow = async (index) => {
    console.log('Before remove:', kitData, "Type:", typeof kitData);

    // 确保 `kitData` 是数组
    let dataArray = Array.isArray(kitData) ? kitData : (kitData?.data ? Object.values(kitData.data) : []);

    // 获取要删除的项
    const itemToDelete = dataArray[index];

    // 如果 `itemToDelete` 在数据库中存在（有 ID），则调用 API 删除
    if (itemToDelete) {
      console.log("Deleting item:", itemToDelete);

      // 如果 `itemToDelete` 在数据库中存在（有 `field_id` 和 `project_id`），则调用 API 删除
      if (onDeleteRow && itemToDelete?.field_id && itemToDelete?.project_id) {
          await onDeleteRow(itemToDelete.field_id, itemToDelete.project_id); // ✅ 传递 `field_id` 和 `project_id`
      }
  }

    // 前端 UI 处理：过滤掉被删除的行
    const updatedItems = dataArray.filter((_, i) => i !== index);

    console.log('After remove:', updatedItems, "Type:", typeof updatedItems);

    // 更新 UI
    setDataSource(updatedItems);
    setKitFormData(updatedItems); // ✅ **确保 `kitData` 仍然是数组**
    form.setFieldsValue({ items: updatedItems });
};


  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "产品名称",
      dataIndex: "productName",
      key: "productName",
      render: (_, record) => (
        <Form.Item name={["items", record.key, "productName"]} rules={[{ required: true, message: "请选择产品名称" }]}>
          <Select placeholder="选择产品名称">
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
      render: (_, record) => (
        <Form.Item name={["items", record.key, "product_code"]}>
          <Input placeholder="输入产品代号" />
        </Form.Item>
      ),
    },
    {
      title: "数量",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <Form.Item name={["items", record.key, "quantity"]} rules={[{ required: true, message: "请输入数量" }]}>
          <Input placeholder="输入数量" />
        </Form.Item>
      ),
    },
    {
      title: "备注",
      dataIndex: "remarks",
      key: "remarks",
      render: (_, record) => (
        <Form.Item name={["items", record.key, "remarks"]}>
          <Input placeholder="输入备注" />
        </Form.Item>
      ),
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (_, __, index) => (
        <MinusCircleOutlined onClick={() => handleRemoveRow(index)} style={{ color: "red", marginLeft: 8 }} />
      ),
    },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={(changedValues, allValues) => {
        console.log("onValuesChange - allValues:", allValues);

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

        setKitFormData(updatedValues); // ✅ 确保 `kitData` 始终是数组
      }}
    >
      <Table columns={columns} dataSource={dataSource} pagination={false} bordered rowKey="key" />
      <Button type="dashed" onClick={handleAddRow} style={{ width: "100%", marginTop: 16 }}>
        <PlusOutlined /> 添加行
      </Button>
    </Form>
  );
};

export default KitForm;
