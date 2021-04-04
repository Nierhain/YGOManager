import { useEffect, useState }from 'react'
import { useQuery, useQueryClient,  } from 'react-query'
import { getCards } from '../scripts/api'

import { Card, Table } from 'antd'


const CardOverview = () => {
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const { status, data, error, isFetching } = useQuery(['cards', page], () => getCards(page, 5), { keepPreviousData: true, staleTime:5000 });

    useEffect(() => {
        queryClient.fetchQuery(['cards', page], () => getCards(page + 1, 5))
    }, [])

    useEffect(() => {
        if (data?.hasMore) {
            queryClient.prefetchQuery(['cards', page + 1], () => getCards(page + 1, 5))
        }
    }, [data, page, queryClient])

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Passcode', dataIndex: 'id', key: 'id' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Amount in collection', dataIndex: 'amount', key: 'amount'}
    ]

    return (
        <div>
            {status === 'loading' ? (
                <Card loading={true}/>
            ) : status === 'error' && error instanceof Error? (
            <p>Error: {error.message}</p>
            ) :
            <Table dataSource={data.cards} columns={columns} />
        }      {
        // Since the last page's data potentially sticks around between page requests,
        // we can use `isFetching` to show a background loading
        // indicator since our `status === 'loading'` state won't be triggered
        isFetching ? <span> Loading...</span> : null
      }{' '}
        </div>
    )
}

export default CardOverview;