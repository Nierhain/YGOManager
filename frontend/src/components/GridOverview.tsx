import { Pagination, Row, Col, Card, Image, Typography, Empty } from 'antd'
import {Link} from 'react-router-dom'
const { Meta } = Card
const {Text} = Typography

type props = {
    data: [{
        name: string,
        id: string,
        image: string
    }],
    type?: 'card' | 'deck'
    page: number,
    limit: number,
    totalItems: number,
    routeURL: string,
    onSizeChange: (current: number, size: number) => void,
    onPageChange: (page: number, pageSize?: number) => void,
}

const GridOverview = (props: props) => {
    return (
    <>
        { props.data.length?
            <>
                <div className="grid grid-cols-6 gap-4 mt-12">
                {props.data.map((card) => {
                    return (
                        <Link to={props.routeURL + card.id} >
                            <Card
                            onClick={() => {}}
                                hoverable
                                size={'small'}
                                cover={<Image alt={card.name} preview={ false } src={card.image}/>}
                            >
                            <Meta description={<Text>{card.name}</Text>}/>
                            </Card>
                        </Link>
                    )
                })}
                </div>
                <Row justify="center" className="mt-6">
                    <Col>
                        <Pagination
                            showSizeChanger
                            onChange={props.onPageChange}
                            onShowSizeChange={props.onSizeChange}
                            defaultCurrent={props.page}
                            defaultPageSize={props.limit}
                            total={props.totalItems}
                            pageSizeOptions={["6", "12", "24", "48"]}
                        ></Pagination>
                    </Col>
                </Row>
            </>
                : <Row justify="center" className="mt-12"><Empty description={<Text>No entry found</Text>}/></Row>
            }
        </>
    )
}

export default GridOverview