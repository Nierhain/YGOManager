import { useEffect, useState }from 'react'
import { useQuery, useQueryClient,  } from 'react-query'
import { getCard, getCards } from '../scripts/api'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import { Card } from 'antd'
import GridOverview from '../components/GridOverview'
import SingleCard from '../components/SingleCard'


const CardOverview = () => {
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const { path, url } = useRouteMatch();

    const { status, data, error, isFetching } = useQuery(['cards', page, limit], () => getCards(page, limit), { keepPreviousData: true, staleTime:5000 });

    // useEffect(() => {
    //     queryClient.fetchQuery(['cards', page], () => getCards(page + 1, limit))
    // }, [])

    useEffect(() => {
        if (data?.hasMore) {
            queryClient.prefetchQuery(['cards', page + 1, limit], () => getCards(page + 1, limit))
        }
    }, [data, page, limit, queryClient])

    const onLimitChange = (current: number, size: number) => {
        setLimit((size))
    }

    const onPageChange = (page: number, pageSize?: number) => {
        setPage(page)
        setLimit((currLimit) => pageSize ? pageSize : currLimit)
    }

    return (
    //     <div>
    //         {status === 'loading' ? (
    //             <Card loading={true}/>
    //         ) : status === 'error' && error instanceof Error? (
    //         <p>Error: {error.message}</p>
    //         ) :
    //                 <GridOverview data={data.cards} routeURL="/cards/" type="card" limit={limit} onSizeChange={onLimitChange} onPageChange={onPageChange}page={page} totalItems={data.totalItems}/>
    //     }      {
    //     // Since the last page's data potentially sticks around between page requests,
    //     // we can use `isFetching` to show a background loading
    //     // indicator since our `status === 'loading'` state won't be triggered
    //     isFetching && typeof data === 'undefined' ? <Card loading={true} /> : null
    //   }{' '}
    //     </div>
        <div className="container mx-auto">
            <Switch>
                <Route exact path="/cards">
                    {status === 'loading' ? (<Card loading={true}/>) : <GridOverview data={data.cards} routeURL="/cards/" type="card" limit={limit} onSizeChange={onLimitChange} onPageChange={onPageChange} page={page} totalItems={data.totalItems} />
                    }
                </Route>
                <Route exact path="/cards/:id" component={SingleCard}/>
            </Switch>
        </div>
    )
}

export default CardOverview;