import { Button, Col, Row, Table, Space, Modal, InputNumber, Input, Form } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { getCollection, addCardToCollection } from '../scripts/api';

const UserCollection = () => {
    const [addCard] = Form.useForm();
    const [addList] = Form.useForm();
    const queryClient = useQueryClient()
    const [isAddDialogVisible, setIsAddDialogVisible] = useState(false)
    const [isAddListDialogVisible, setIsAddListDialogVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [amount, setAmount] = useState(1);
    const [cardName, setCardName] = useState(' ');
    const [cardList, setCardList] = useState(' ');

    const { status, data, error, isFetching } = useQuery('cards', getCollection, { keepPreviousData: true, staleTime:5000 });

    useEffect(() => {
        queryClient.fetchQuery('cards', getCollection)
    }, [])

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Passcode', dataIndex: 'id', key: 'id' },
        { title: 'Amount in collection', dataIndex: 'amount', key: 'amount'}
    ]

    const handleOk = () => {
        
        // addCardToCollection(id, amount, name?)
        setIsAddDialogVisible(false)
    }

    const handleListOk = () => {

    }

    const handleCancel = () => {
        setCardName('')
        setCardList('')
        setIsAddListDialogVisible(false)
        setIsAddDialogVisible(false)
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    return (
        <>
            <Row justify="center" className="mt-12">
                <Col span={18}>
                    <Table dataSource={data} columns={columns} pagination={false} title={() =>
                        <Row justify="end" gutter={12}>
                            <Col>
                                <Button type="primary" onClick={() => setIsAddDialogVisible((isVisible) => !isVisible)}>Add Card(s)</Button>
                            </Col>
                            <Col>
                                <Button type="primary" onClick={() => setIsAddListDialogVisible((isVisible) => !isVisible)}>Add List</Button>
                            </Col>
                        </Row>
                    } />
                </Col>
            </Row>
            <Modal forceRender title="Add Card" centered visible={isAddDialogVisible} onOk={handleOk} onCancel={handleCancel} confirmLoading={confirmLoading}>
                <Form
                    // {...layout}
                    layout="inline"
                    name="addCard"
                    form={addCard}
                >
                    <Form.Item
                    label="Card Passcode"
                    name="cardID"
                    rules={[{required: true}]}
                    >
                        <Input placeholder="e.g: 3841833" value={cardName} onChange={(e) => setCardName(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                    label="Amount"
                    name="cardAmount"
                    rules={[{required: true}]}
                    >
                        <InputNumber placeholder="e.g: 2" min={1} max={3} value={amount} onChange={setAmount} />
                    </Form.Item>
                    <Form.Item
                     {...tailLayout}
                    >
                        <Button>Add another card</Button>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ span: 1, offset: 20 }}
                    >
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>

                </Form>
            </Modal>
            <Modal forceRender title="Add Card list" centered visible={isAddListDialogVisible} onOk={handleListOk} onCancel={handleCancel} confirmLoading={confirmLoading}>
                
                <Form
                    name="addCardList"
                    form={addList}
                >
                    <Form.Item
                    name="cardList"
                    >
                        <Input.TextArea placeholder={"3x 3841833 // to add 3 copies of 'Fluffal Bear' \nseparated by comma or line" } allowClear value={cardList} onChange={(e) => setCardList(e.target.value)}/>
                    </Form.Item>
                </Form>
                
            </Modal>
        </>
    )
}

export default UserCollection;