import { Card, Image, Typography, Row, Col, Divider, Button } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { getCard, getAmountInCollection, updateCardinCollection, addCardToCollection } from '../scripts/api'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import HelmetFactory from './HelmetFactory'
const { Text, Title } = Typography

type collectionParameter = {
    id: string,
    amount: number
}

type CardParams = {
    id: string
}

type cardProps = RouteComponentProps<CardParams>


const SingleCard = ({ match }: cardProps) => {
    const queryClient = useQueryClient()
    const { isLoading: isCardLoading, data } = useQuery(['singleCard', match.params.id], () => getCard(match.params.id))
    const { isLoading: isCollectionAmountLoading, data: amount } = useQuery(['amount', match.params.id], () => getAmountInCollection(match.params.id))
    const { mutateAsync: mutateAmount } = useMutation('updateAmount', (newAmount: collectionParameter) => updateCardinCollection(newAmount.id, newAmount.amount), {
        onSuccess: () => {
            queryClient.invalidateQueries('amount')
        },
    })
    const { mutateAsync: addCard } = useMutation('addCard', (newCard: collectionParameter) => addCardToCollection(newCard.id, newCard.amount), {
        onSuccess: () => {
            queryClient.invalidateQueries('amount')
        }
    })
    
    // useEffect(() => {
    //     queryClient.fetchQuery('singleCard')
    // }, [isCardLoading, data, queryClient])

    // useEffect(() => {
    //     queryClient.fetchQuery('amount')
    // }, [isCollectionAmountLoading, amount, queryClient])

    const increaseAmount = () => {
        if (amount === 0) {
            addCard({id: data.id, amount: 1})
        } else {
            mutateAmount({id: data.id, amount: amount + 1})
        }
    }

    const decreaseAmount = () => {
        mutateAmount({id: data.id, amount: amount - 1})
    }

    return (
        <div className="container mx-auto">
            
            <div className="grid grid-cols-1 gap-4 p-8">
                {isCardLoading ? <Card loading={true} /> : 
                    
                    <div className="bg-gray-900 rounded-lg border-gray-900 border">
                        <HelmetFactory title={data.name}/>
                        <Row justify="center">
                            <Title level={2}>{data.name}</Title>
                        </Row>
                        <Row justify="center">
                            {data.type === 'Spell Card' || data.type === 'Trap Card'
                                ? <Title level={3}>{ data.race } {data.type}</Title>
                                : <Title level={3}>{ data.level }* [ { data.attribute } / {data.race} ]</Title>
                            }
                        </Row>
                        <Row align="middle">
                            <Col span={6} offset={5} className="">
                                <div>
                                <Image src={data.image} preview={ false }/>
                                </div>
                            </Col>
                            <Col span={11} offset={1} className="rounded border-gray-800 border bg-gray-800">
                                <div className="p-4">

                                <Text>{data.effect}</Text>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    }
                
                {isCollectionAmountLoading ? <Card loading={true} /> :
                    <Row justify="end">
                        <Col span={4}>
                            <div className="bg-gray-900 rounded-lg border-gray-900 border">
                            <Divider>Collected: {amount}</Divider>
                            <Row className="p-1" justify="center">
                                <Col span={12}>
                                    <Button onClick={decreaseAmount}>-</Button><Button onClick={increaseAmount}>+</Button>
                                </Col>
                            </Row>
                            </div>
                        </Col>
                    </Row>
                }
            </div>
        </div>
    )
}

export default withRouter(SingleCard)