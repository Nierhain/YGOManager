import { Helmet } from 'react-helmet'

type props = {
    title?: string
}

const HelmetFactory = (props: props) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <meta
            name="description"
            content="a Yu-Gi-Oh! collection manager"
            />
            <title>{props.title} - YGOManager</title>
        </Helmet>
    )
}

export default HelmetFactory