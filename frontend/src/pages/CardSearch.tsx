import { useQueryClient, useQuery } from "react-query";
import { useState, useEffect } from 'react'
import { searchCards } from '../scripts/api'
import { Card } from 'antd'
import GridOverview from '../components/GridOverview'
import { RouteComponentProps, useLocation } from "react-router-dom";
import HelmetFactory from "../components/HelmetFactory";

type searchParams = {
    q: string
}

type searchProp = RouteComponentProps<searchParams>;

const CardSearch = ({match} : searchProp) => {
    const queryClient = useQueryClient()
    const location = useLocation();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);

    const { status, data, error } = useQuery(['cardSearch', location.search], () => searchCards(location.search, page, limit), {keepPreviousData: true, staleTime: 5000});
    
    useEffect(() => {
        if (data?.hasMore) {
            queryClient.prefetchQuery(['cardSearch', location.search], () => searchCards(location.search, page + 1, limit))
        }
    },[data, location.search, page, limit, queryClient])
    const onLimitChange = (current: number, size: number) => {
        setLimit((size))
    }

    const onPageChange = (page: number, pageSize?: number) => {
        setPage(page)
        setLimit((currLimit) => pageSize ? pageSize : currLimit)
    }
    
    return (
        <>
            {status === 'loading' ? (<Card loading={true} />) :
                status === 'error' && error instanceof Error ?
                    <Card title={error.message} /> : <>
                        <HelmetFactory title={'"' + location.search.slice(8) + '"'} />
                        <GridOverview data={data.cards} routeURL="/cards/" type="card" limit={limit} onSizeChange={onLimitChange} onPageChange={onPageChange} page={page} totalItems={data.totalItems} />
                    </>
                    }
        </>
    )
}
export default CardSearch