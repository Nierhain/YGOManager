import { Breadcrumb, Card, Image, Typography, Row, Col, Divider, Button } from 'antd'
import { useEffect, useState } from 'react'
import { match, RouteComponentProps, withRouter } from 'react-router-dom'
import { getCard } from '../scripts/api'
import { useQuery, useQueryClient } from 'react-query'
const { Meta } = Card
const { Text, Title } = Typography
type props = {
    name: string,
    id: string,
    image: string,
    effect: string,
    type: string,
    attribute: string,
    race: string,
    level: number,
    atk: number,
    def: number
}

type CardParams = {
    id: string
}

type cardProps = RouteComponentProps<CardParams>

const SingleCard = ({ match }: cardProps) => {
    const queryClient = useQueryClient()
    const {isLoading, data} = useQuery(['singleCard', match.params.id], () => getCard(match.params.id))
    
    useEffect(() => {
        queryClient.fetchQuery('singleCard')
    }, [isLoading, data, queryClient])
    
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-4 p-8">
                {isLoading ? <Card loading={true} /> : 
                    <>
                    <div className="bg-gray-900 rounded-lg border-gray-900 border">
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
                            <Col span={6} offset={5}>
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

                    <div className="bg-gray-900 rounded-lg border-gray-900 border">
                            <Divider>Collected:</Divider>
                            <Button>-</Button>  <Button>+</Button>
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default withRouter(SingleCard)